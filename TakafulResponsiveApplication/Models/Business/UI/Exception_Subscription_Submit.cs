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
    public class Exception_Subscription_Submit
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Exception_Subscription_Submit.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Exception_Subscription_Submit.MainObject();
            var bus = new Common.Common.Business();


            //Get all employees
            var lstEmployees = tpDB.Employees.OrderBy(e => e.Emp_ID).ToList();

            for (int i = 0; i < lstEmployees.Count; i++)
            {
                var temp = new DataObjects.Internal.Exception_Subscription_Submit.Employee();
                temp.EmployeeNumber = lstEmployees[i].Emp_ID;
                temp.Name = lstEmployees[i].Emp_FullName;
                temp.Department = lstEmployees[i].Emp_Department;
                defaultDataObj.Employees.Add(temp);
            }

            //Get all recorded exceptions
            defaultDataObj.Exceptions = bus.GetSubscriptionExceptions();


            return defaultDataObj;
        }

        public string Save(long empID, int amount, string notes)
        {

            var bus = new Common.Common.Business();

            //Check if already exists
            var ex = tpDB.ExceptionAmounts.FirstOrDefault(e => e.Emp_ID == empID && (e.FundSubscription == null || e.FundSubscription.FSu_Status == 1));
            var fs = tpDB.FundSubscriptions.FirstOrDefault(f => f.Emp_ID == empID && f.FSu_Status == 1);    //Check if subscribed employee

            if (ex == null) //New exception, add the data
            {
                ex = new ExceptionAmount();
                ex.Emp_ID = empID;
                ex.Exc_Amount = amount;
                ex.Exc_Notes = notes;
                ex.Exc_IsUsed = false;
                if (fs != null)
                {
                    ex.FSu_ID = fs.FSu_ID;
                }

                tpDB.ExceptionAmounts.Add(ex);
            }
            else    //Check if already used
            {
                if (ex.Exc_IsUsed == true)
                {
                    return "AlreadyUsed";
                }

                //Check if an existing request is depending on this exception
                if (bus.IsHangingSubscriptionRequestForException(ex) == true)
                {
                    return "WillBeUsed";
                }

                //Update the exception
                ex.Exc_Amount = amount;
                ex.Exc_Notes = notes;
                if (ex.FSu_ID == null && fs != null)
                {
                    ex.FSu_ID = fs.FSu_ID;
                }

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
            var ex = tpDB.ExceptionAmounts.FirstOrDefault(e => e.Emp_ID == empID && (e.FundSubscription == null || e.FundSubscription.FSu_Status == 1));

            if (ex == null)
            {
                return "NotFound";
            }
            else    //Check if already used
            {
                if (ex.Exc_IsUsed == true)
                {
                    return "AlreadyUsed";
                }

                //Check if an existing request is depending on this exception
                if (bus.IsHangingSubscriptionRequestForException(ex) == true)
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

            string fileName = "SubscriptionExceptions";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }

    }
}
