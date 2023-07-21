using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Employee_UpdatePaidInstallments
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Employee_UpdatePaidInstallments.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Employee_UpdatePaidInstallments.MainObject();
            var bus = new Common.Common.Business();

            //Get all the employees that have a valid subscription only and have a valid loan
            var lstEmployees = tpDB.Employees
                //.Include(e => e.EmployeeServices)
                .Where(em => em.Emp_AccountStatus == true && em.LoanAmounts.FirstOrDefault(lm => lm.LAm_Status == 1) != null)
                .OrderBy(e => e.Emp_ID).ToList();

            for (int i = 0; i < lstEmployees.Count; i++)
            {
                var temp = new DataObjects.Internal.Employee_UpdatePaidInstallments.Employee();
                long empID = lstEmployees[i].Emp_ID;
                temp.EmployeeNumber = lstEmployees[i].Emp_ID;
                temp.Name = lstEmployees[i].Emp_FullName;

                //Loan Data
                var loanData = bus.GetLoanData(empID);
                if (loanData != null)
                {
                    temp.LoanAmount = loanData.LoanAmount;
                    temp.LoanInstallmentAmount = loanData.LoanInstallment;
                    temp.CurrentPaidAmount = loanData.LoanInstallment;
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
                int loanID = lstEmployees[i].LoanAmounts.FirstOrDefault(lm => lm.LAm_Status == 1).LAm_ID;
                var lastRecordedTransaction_Loan = tpDB.CostingBreakdownDetails.Where(cbd => cbd.LAm_ID == loanID).OrderByDescending(cbd => cbd.CBD_Date).FirstOrDefault();

                if (lastRecordedTransaction_Loan != null)
                {
                    temp.LastTransactionDate = lastRecordedTransaction_Loan.CBD_Date;
                }

                defaultDataObj.Employees.Add(temp);
            }



            return defaultDataObj;
        }

        public string Save(List<DataObjects.External.Employee_UpdatePaidInstallments_In> employeesData)
        {

            var transactions = new List<CostingBreakdownDetail>();

            //Validate & create the transaction entries
            for (int i = 0; i < employeesData.Count; i++)
            {
                var id = employeesData[i].EmployeeNumber;

                //Get loan ID
                var la = tpDB.LoanAmounts.FirstOrDefault(l => l.Emp_ID == id && l.LAm_Status == 1);
                if (la == null)
                {
                    return "NotValid";
                }

                //Validate the last transaction date for the current employee
                var laID = la.LAm_ID;
                DateTime transactionDate = employeesData[i].TransactionDate.Date;
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


            return "True";
        }

        public string ExportDataToExcel(List<List<string>> data, string path)
        {

            string fileName = "PaidInstallments";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }

    }
}
