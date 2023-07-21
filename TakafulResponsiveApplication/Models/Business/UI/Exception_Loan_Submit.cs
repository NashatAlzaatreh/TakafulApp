using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Exception_Loan_Submit
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Exception_Loan_Submit.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Exception_Loan_Submit.MainObject();
            var bus = new Common.Common.Business();


            //Get all subscribed employees
            var lstEmployees = tpDB.Employees.Where(em => em.FundSubscriptions.FirstOrDefault(fs => fs.FSu_Status == 1) != null).OrderBy(e => e.Emp_ID).ToList();

            for (int i = 0; i < lstEmployees.Count; i++)
            {
                var temp = new DataObjects.Internal.Exception_Loan_Submit.Employee();
                temp.EmployeeNumber = lstEmployees[i].Emp_ID;
                temp.Name = lstEmployees[i].Emp_FullName;
                temp.Department = lstEmployees[i].Emp_Department;
                defaultDataObj.Employees.Add(temp);
            }

            //Get all recorded exceptions
            defaultDataObj.Exceptions = bus.GetLoanExceptions();


            return defaultDataObj;
        }

        public string Save(long empID, bool minSubPeriod, bool loanWithLoan, int amount, string notes)
        {

            var bus = new Common.Common.Business();

            //Check if already exists
            var ex = tpDB.LoanExceptions.FirstOrDefault(e => e.Emp_ID == empID && e.FundSubscription.FSu_Status == 1);

            if (ex == null) //New exception, add the data
            {
                var fsID = tpDB.FundSubscriptions.FirstOrDefault(fs => fs.Emp_ID == empID && fs.FSu_Status == 1).FSu_ID;    //Get the subscription id
                ex = new LoanException();
                ex.Emp_ID = empID;
                ex.LEx_LessSubscriptionPeriodForLoan = minSubPeriod;
                ex.LEx_CanRequestLoanWithCurrentActiveLoan = loanWithLoan;
                ex.LEx_MaxAmount = amount;
                ex.LEx_Notes = notes;
                ex.LEx_MaxAmount_IsUsed = false;
                ex.FSu_ID = fsID;
                tpDB.LoanExceptions.Add(ex);
            }
            else    //Check if already used (the max amount only)
            {
                //Check if an existing request is depending on this exception
                if (bus.IsHangingLoanRequestForException(ex) == true)
                {
                    return "WillBeUsed";
                }

                if (ex.LEx_MaxAmount_IsUsed == false)   //Not used, we can update the amount
                {
                    ex.LEx_MaxAmount = amount;
                }
                else
                {
                    if (ex.LEx_MaxAmount != amount)
                    {
                        return "AlreadyUsed";
                    }
                }

                //Update the exception
                ex.LEx_LessSubscriptionPeriodForLoan = minSubPeriod;
                ex.LEx_CanRequestLoanWithCurrentActiveLoan = loanWithLoan;
                ex.LEx_Notes = notes;
                tpDB.Entry(ex).State = EntityState.Modified;
            }

            //Save
            tpDB.SaveChanges();


            return "True";
        }

        public string Delete(long empID)
        {

            var bus = new Common.Common.Business();

            //Check if already exists
            var ex = tpDB.LoanExceptions.FirstOrDefault(e => e.Emp_ID == empID && e.FundSubscription.FSu_Status == 1);

            if (ex == null)
            {
                return "NotFound";
            }
            else    //Check if already used
            {
                if (ex.LEx_MaxAmount_IsUsed == true)
                {
                    return "AlreadyUsed";
                }

                //Check if an existing request is depending on this exception
                if (bus.IsHangingLoanRequestForException(ex) == true)
                {
                    return "WillBeUsed";
                }

                //Delete the exception
                tpDB.Entry(ex).State = EntityState.Deleted;
            }

            //Save
            tpDB.SaveChanges();


            return "True";
        }

        public string ExportDataToExcel(List<List<string>> data, string path)
        {

            string fileName = "LoanExceptions";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }

    }
}
