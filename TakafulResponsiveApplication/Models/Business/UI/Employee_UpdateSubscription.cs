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
    public class Employee_UpdateSubscription
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Employee_UpdateSubscription.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Employee_UpdateSubscription.MainObject();
            var bus = new Common.Common.Business();
            var subInfo = bus.GetSubscriptionInformation();

            //Get the currently subscribed employees
            var employees = tpDB.Employees.Where(em => em.FundSubscriptions.FirstOrDefault(fs => fs.FSu_Status == 1) != null).OrderBy(em => em.Emp_ID).ToList();

            for (int i = 0; i < employees.Count; i++)
            {
                var temp = GetFormattedEmployee(employees[i], subInfo);
                defaultDataObj.Employees.Add(temp);
            }


            return defaultDataObj;
        }

        public string Save(List<DataObjects.External.Employee_UpdateSubscription_In> employeesData)
        {

            var transactions = new List<SubscriptionTransaction>();
            int newSerial = 0;

            //Validate & create the subscription transactions entries
            for (int i = 0; i < employeesData.Count; i++)
            {
                if (IsValidEmployeeSubscription(employeesData[i].EmployeeNumber, employeesData[i].CalculatedSubscription) == false)
                {
                    return "NotValid";
                }

                //Get the current subscription ID for this employee
                var id = employeesData[i].EmployeeNumber;
                var fsID = tpDB.FundSubscriptions.First(f => f.Emp_ID == id && f.FSu_Status == 1).FSu_ID;

                //Get new serial
                if (newSerial == 0)
                {
                    var suTSerial = tpDB.SubscriptionTransactions.Where(s => s.SuT_SubscriptionType == 2).OrderByDescending(s => s.SuT_Year).ThenByDescending(s => s.SuT_Serial).FirstOrDefault();

                    if (suTSerial == null || suTSerial.SuT_Year < DateTime.UtcNow.Year)
                    {
                        newSerial = 1;
                    }
                    else
                    {
                        newSerial = suTSerial.SuT_Serial + 1;
                    }
                }
                else
                {
                    newSerial++;
                }


                var st = new SubscriptionTransaction();
                st.Emp_ID = id;
                st.SuT_Year = DateTime.UtcNow.Year;
                st.SuT_Serial = newSerial;
                st.SuT_SubscriptionType = 2;
                st.SuT_Date = DateTime.UtcNow;
                st.SuT_Amount = employeesData[i].CalculatedSubscription;
                st.SuT_Notes = "Automatically created duo to subscription amount update.";
                st.SuT_ApprovalStatus = 2;
                st.SuT_ApprovalDate = DateTime.UtcNow;
                st.SuT_ApprovalNotes = "Automatically approved duo to subscription amount update.";
                st.SuI_ID = 1;
                st.FSu_ID = fsID;
                transactions.Add(st);
            }


            //Begin the saving operation in transaction scope
            using (var dbContextTransaction = tpDB.Database.BeginTransaction())
            {
                try
                {
                    tpDB.SubscriptionTransactions.AddRange(transactions);
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

        private DataObjects.Internal.Employee_UpdateSubscription.Employee GetFormattedEmployee(Employee employee, SubscriptionInformation subscriptionInformation)
        {

            var resultEmployee = new DataObjects.Internal.Employee_UpdateSubscription.Employee();

            resultEmployee.EmployeeNumber = employee.Emp_ID;
            resultEmployee.Name = employee.Emp_FullName;

            var salaries = employee.EmployeeServices.OrderByDescending(es => es.EmS_OnDate).Take(2).ToList();

            if (salaries.Count == 2)
            {
                resultEmployee.CurrentSalary = salaries[0].EmS_TotalSalary.Value;
                resultEmployee.PreviousSalary = salaries[1].EmS_TotalSalary.Value;
            }
            else if (salaries.Count == 1)
            {
                resultEmployee.CurrentSalary = salaries[0].EmS_TotalSalary.Value;
            }

            //Current subscribtion
            resultEmployee.CurrentSubscription = employee.FundSubscriptions.FirstOrDefault(fs => fs.FSu_Status == 1).SubscriptionTransaction.Where(s => s.SuT_ApprovalStatus == 2 && (s.SuT_SubscriptionType == 1 || s.SuT_SubscriptionType == 2)).OrderByDescending(s => s.SortIndex).First().SuT_Amount.Value;

            //Subscription boundaries
            var bus = new Common.Common.Business();
            var boundaries = bus.GetSubscriptionBoundaries(employee, subscriptionInformation);

            resultEmployee.CalculatedSubscription = boundaries.MinimumAmount;
            resultEmployee.MinimumSubscription = boundaries.MinimumAmount;
            resultEmployee.MaximumSubscription = boundaries.MaximumAmount;

            return resultEmployee;
        }

        private bool IsValidEmployeeSubscription(long employeeNumber, int subscriptionAmount)
        {

            //Subscription boundaries
            var bus = new Common.Common.Business();
            var boundaries = bus.GetSubscriptionBoundaries(employeeNumber);

            if (subscriptionAmount < boundaries.MinimumAmount || subscriptionAmount > boundaries.MaximumAmount)
            {
                return false;
            }

            return true;
        }

        public string ExportDataToExcel(List<List<string>> data, string path)
        {

            string fileName = "UpdateSubscription";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }

    }
}
