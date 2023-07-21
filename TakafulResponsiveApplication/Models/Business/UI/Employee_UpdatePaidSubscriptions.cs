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
    public class Employee_UpdatePaidSubscriptions
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Employee_UpdatePaidSubscriptions.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Employee_UpdatePaidSubscriptions.MainObject();
            var bus = new Common.Common.Business();

            //Get only the employees that have a valid subscription
            var lstEmployees = tpDB.Employees
                //.Include(e => e.EmployeeServices)
                .Where(em => em.Emp_AccountStatus == true && em.FundSubscriptions.FirstOrDefault(fs => fs.FSu_Status == 1) != null)
                .OrderBy(e => e.Emp_ID).ToList();

            for (int i = 0; i < lstEmployees.Count; i++)
            {
                var temp = new DataObjects.Internal.Employee_UpdatePaidSubscriptions.Employee();
                long empID = lstEmployees[i].Emp_ID;
                temp.EmployeeNumber = lstEmployees[i].Emp_ID;
                temp.Name = lstEmployees[i].Emp_FullName;

                //Subscription Data
                var subscriptionData = bus.GetSubscriptionData(empID);
                if (subscriptionData != null)
                {
                    temp.CurrentSubscriptionAmount = subscriptionData.Amount;
                    temp.CurrentPaidAmount = subscriptionData.Amount;
                    temp.TotalSubscriptionAmount = subscriptionData.TotalSubscription;
                }

                //Get last recorded transaction date
                int fsID = lstEmployees[i].FundSubscriptions.FirstOrDefault(fs => fs.FSu_Status == 1).FSu_ID;
                var lastRecordedTransaction = tpDB.CostingBreakdownDetails.Where(cbd => cbd.FSu_ID == fsID).OrderByDescending(cbd => cbd.CBD_Date).FirstOrDefault();

                if (lastRecordedTransaction != null)
                {
                    temp.LastTransactionDate = lastRecordedTransaction.CBD_Date;
                }

                defaultDataObj.Employees.Add(temp);
            }



            return defaultDataObj;
        }

        public string Save(List<DataObjects.External.Employee_UpdatePaidSubscriptions_In> employeesData)
        {

            var transactions = new List<CostingBreakdownDetail>();

            //Validate & create the transaction entries
            for (int i = 0; i < employeesData.Count; i++)
            {
                var id = employeesData[i].EmployeeNumber;

                //Get subscription ID
                var fs = tpDB.FundSubscriptions.FirstOrDefault(f => f.Emp_ID == id && f.FSu_Status == 1);
                if (fs == null)
                {
                    return "NotValid";
                }

                //Validate the last transaction date for the current employee
                var fsID = fs.FSu_ID;
                DateTime transactionDate = employeesData[i].TransactionDate.Date;
                //var transactionCount = tpDB.CostingBreakdownDetails.Count(c => c.FSu_ID == fsID && c.CBD_Date >= transactionDate);

                //if (transactionCount == 0)
                //{
                    var cbd = new CostingBreakdownDetail();
                    cbd.Emp_ID = id;
                    cbd.CBD_PaidAmount = employeesData[i].Amount;
                    cbd.CBD_Details = 1;
                    cbd.CBD_Date = transactionDate;
                    cbd.FSu_ID = fsID;
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

            string fileName = "PaidSubscriptions";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }


    }
}
