using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Employee_UploadPaidInstallments
    {

        TakafulEntities tpDB = new TakafulEntities();

        public List<DataObjects.Internal.Employee_UploadPaidInstallments.Employee> GetUploadedData(string filePath, out string resultMessage)
        {

            var defaultDataObj = new List<DataObjects.Internal.Employee_UploadPaidInstallments.Employee>();
            var bus = new Common.Common.Business();

            //Get the employees data from the uploaded file
            //Validate the file type
            if (Path.GetExtension(filePath) != ".xls" && Path.GetExtension(filePath) != ".xlsx")
            {
                File.Delete(filePath);
                resultMessage = "BadRequest";
                return new List<DataObjects.Internal.Employee_UploadPaidInstallments.Employee>();
            }

            //Get the data from the file
            List<DictionaryEntry> lstEmployeesIDs = GetEmployeesFromExcelFile(filePath);

            var arrIDs = new long[lstEmployeesIDs.Count];

            for (int i = 0; i < lstEmployeesIDs.Count; i++)
            {
                arrIDs[i] = (long)lstEmployeesIDs[i].Key;
            }

            //Get all the employees that have a valid subscription only and have a valid loan
            var lstEmployees = tpDB.Employees
                //.Include(e => e.EmployeeServices)
                .Where(em => arrIDs.Contains(em.Emp_ID) && em.Emp_AccountStatus == true && em.FundSubscriptions.FirstOrDefault(fs => fs.FSu_Status == 1) != null && em.LoanAmounts.FirstOrDefault(lm => lm.LAm_Status == 1) != null)
                .OrderBy(e => e.Emp_ID).ToList();

            for (int i = 0; i < lstEmployeesIDs.Count; i++)
            {
                var temp = new DataObjects.Internal.Employee_UploadPaidInstallments.Employee();
                long empID = (long)lstEmployeesIDs[i].Key;
                int paidAmount = (int)lstEmployeesIDs[i].Value;
                var employee = lstEmployees.FirstOrDefault(em => em.Emp_ID == empID);
                if (employee == null)
                {
                    continue;
                }
                temp.EmployeeNumber = empID;
                temp.Name = employee.Emp_FullName;

                //Loan Data
                var loanData = bus.GetLoanData(empID);
                if (loanData != null)
                {
                    temp.LoanAmount = loanData.LoanAmount;
                    temp.LoanInstallmentAmount = loanData.LoanInstallment;
                    temp.CurrentPaidAmount = paidAmount;
                    temp.PaidLoanAmount = loanData.PaidAmount;
                    temp.RemainingLoanAmount = loanData.RemainingAmount;
                }
                else
                {
                    temp.LoanAmount = 0;
                    temp.LoanInstallmentAmount = 0;
                    temp.CurrentPaidAmount = 0;
                    temp.PaidLoanAmount = 0;
                    temp.RemainingLoanAmount = 0;
                }

                //Get last recorded transaction date
                int loanID = employee.LoanAmounts.FirstOrDefault(lm => lm.LAm_Status == 1).LAm_ID;
                var lastRecordedTransaction_Loan = tpDB.CostingBreakdownDetails.Where(cbd => cbd.LAm_ID == loanID).OrderByDescending(cbd => cbd.CBD_Date).FirstOrDefault();

                if (lastRecordedTransaction_Loan != null)
                {
                    temp.LastTransactionDate = lastRecordedTransaction_Loan.CBD_Date;
                }

                defaultDataObj.Add(temp);
            }

            //Delete the uploaded file
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            resultMessage = "True";
            return defaultDataObj;
        }

        public object Save(List<DataObjects.External.Employee_UploadPaidInstallments_In> employeesData)
        {

            var transactions = new List<CostingBreakdownDetail>();
            dynamic resultObj = new ExpandoObject();
            int transactionCount = 0;
            int totalCredit = 0;
            int totalDebit = 0;
            DateTime current = DateTime.UtcNow;

            //Validate & create the transaction entries
            for (int i = 0; i < employeesData.Count; i++)
            {
                var id = employeesData[i].EmployeeNumber;

                //Get subscription ID & loan ID
                var fs = tpDB.FundSubscriptions.FirstOrDefault(f => f.Emp_ID == id && f.FSu_Status == 1);
                var la = tpDB.LoanAmounts.FirstOrDefault(l => l.Emp_ID == id && l.LAm_Status == 1);
                if (fs == null || la == null)
                {
                    //return "NotValid";
                    continue;
                }

                //Validate the last transaction date for the current employee
                var laID = la.LAm_ID;
                current = current.AddMilliseconds(10);
                DateTime uploadedDate = employeesData[i].TransactionDate.Date;
                DateTime transactionDate = new DateTime(uploadedDate.Year, uploadedDate.Month, uploadedDate.Day, current.Hour, current.Minute, current.Second, current.Millisecond);
                //var transactionCount = tpDB.CostingBreakdownDetails.Count(c => c.LAm_ID == laID && c.CBD_Date >= transactionDate);

                //if (transactionCount == 0)
                //{
                var cbd = new CostingBreakdownDetail();
                cbd.Emp_ID = id;
                cbd.CBD_PaidAmount = employeesData[i].Amount;
                cbd.CBD_Details = 2;
                cbd.CBD_Date = transactionDate;
                cbd.LAm_ID = laID;
                transactions.Add(cbd);

                //Update counters
                transactionCount++;
                if (employeesData[i].Amount > 0)
                {
                    totalCredit += employeesData[i].Amount;
                }
                else
                {
                    totalDebit += employeesData[i].Amount;
                }
                //}
            }


            //Begin the saving operation in transaction scope
            using (var dbContextTransaction = tpDB.Database.BeginTransaction())
            {
                try
                {
                    tpDB.CostingBreakdownDetails.AddRange(transactions);
                    tpDB.SaveChanges();

                    //All operations completed, commit...
                    dbContextTransaction.Commit();

                }
                catch (Exception ex)
                {
                    //Rollback...
                    dbContextTransaction.Rollback();
                    throw;
                }
            }


            resultObj.TransactionCount = transactionCount;
            resultObj.TotalCredit = totalCredit;
            resultObj.TotalDebit = totalDebit * -1;
            resultObj.Message = "True";

            return resultObj;
        }

        public string ExportDataToExcel(List<List<string>> data, string path)
        {

            string fileName = "UploadedPaidInstallments";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }

        private List<DictionaryEntry> GetEmployeesFromExcelFile(string filePath)
        {

            var lstEmployees = new List<DictionaryEntry>();
            OleDbConnection excelConnection;


            string constr = string.Format(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=""Excel 12.0 Xml;HDR=NO;""", filePath);
            excelConnection = new OleDbConnection(constr);

            //string Query = string.Format("Select [رقم الموظف]," +
            //                             "[المبلغ المسدد]" +
            //                             "FROM [{0}]", "Employee$");

            string Query = string.Format("Select * " +
                                         "FROM [{0}]", "Sheet1$");

            OleDbCommand Ecom = new OleDbCommand(Query, excelConnection);
            excelConnection.Open();

            var ds = new DataSet();
            var oda = new OleDbDataAdapter(Query, excelConnection);
            excelConnection.Close();
            oda.Fill(ds);
            DataTable Exceldt = ds.Tables[0];

            //Read the items to the list
            for (int i = 0; i < Exceldt.Rows.Count; i++)
            {
                long id = 0;
                int amount = 0;
                DataRow row = Exceldt.Rows[i];

                //Employee ID
                if (row[0].ToString().Trim() == "" || long.TryParse(row[0].ToString().Trim(), out id) == false)
                {
                    continue;
                }

                //Transaction Type
                if (row[3].ToString().Trim() != "LOAN")
                {
                    continue;
                }

                //Amount
                double pAmount = 0;
                double nAmount = 0;
                double.TryParse(row[7].ToString().Trim(), out pAmount);
                double.TryParse(row[6].ToString().Trim(), out nAmount);

                pAmount = (int)pAmount;
                nAmount = (int)nAmount;
                if (!(pAmount > 0) && !(nAmount > 0))
                {
                    continue;
                }

                if (pAmount > 0)
                {
                    amount = (int)pAmount;
                }
                else
                {
                    amount = (int)(nAmount * -1);
                }

                ////Check if employee id exists before
                //if (lstEmployees.Count(em => (long)em.Key == id) > 0)
                //{
                //    continue;
                //}

                //Add to list
                lstEmployees.Add(new DictionaryEntry(id, amount));

            }

            return lstEmployees;

        }

    }
}
