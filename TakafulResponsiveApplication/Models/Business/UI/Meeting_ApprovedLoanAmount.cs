using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Meeting_ApprovedLoanAmount
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Meeting_ApprovedLoanAmount.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Meeting_ApprovedLoanAmount.MainObject();
            var bus = new Common.Common.Business();

            //Get the active meeting
            var me = tpDB.Meetings.FirstOrDefault(m => m.Mee_IsActive == true);

            if (me == null)
            {
                return null;
            }

            defaultDataObj.FormattedSerial = me.Mee_Date.Value.Year.ToString() + "/" + me.Mee_Serial.ToString();
            defaultDataObj.Date = me.Mee_Date.Value;

            //Get requests that are assigned to this meeting (transferred to the committee)
            var allRequests = tpDB.MeetingTransactions.Include("SubscriptionTransaction.Employee").Where(m => m.Mee_ID == me.Mee_ID && m.SubscriptionTransaction != null && m.SubscriptionTransaction.SuT_SubscriptionType == 4 && (m.SubscriptionTransaction.SuT_ApprovalStatus == 4 || m.SubscriptionTransaction.SuT_ApprovalStatus == 5)).ToList();

            for (int i = 0; i < allRequests.Count; i++)
            {
                var temp = new DataObjects.Internal.Meeting_ApprovedLoanAmount.Request();

                temp.EmployeeNumber = allRequests[i].Emp_ID;
                temp.Name = allRequests[i].SubscriptionTransaction.Employee.Emp_FullName;
                temp.Year = allRequests[i].SuT_Year;
                temp.Serial = allRequests[i].SuT_Serial;
                temp.Department = allRequests[i].SubscriptionTransaction.Employee.Emp_Department;
                temp.RequestDate = allRequests[i].SubscriptionTransaction.SuT_Date.Value;
                var sAmount = allRequests[i].SubscriptionTransaction.LoanAmount.LAm_SuggestedLoanAmount;
                if (sAmount.HasValue)
                {
                    temp.SuggestedAmount = sAmount.Value;
                }

                var employee = bus.GetEmployee(temp.EmployeeNumber);
                temp.RequestedAmount = allRequests[i].SubscriptionTransaction.LoanAmount.LAm_LoanAmount.Value;

                if (employee.LoanData != null && employee.LoanData.RemainingAmount > 0)
                {
                    temp.PreviousRemainingAmount = employee.LoanData.RemainingAmount;
                }

                if (allRequests[i].MeT_ApprovedAmount.HasValue)
                {
                    temp.ApprovedAmount = allRequests[i].MeT_ApprovedAmount.Value;
                }

                temp.TypeID = allRequests[i].SuT_SubscriptionType;
                temp.Type = "طلب قرض";

                defaultDataObj.Requests.Add(temp);
            }


            return defaultDataObj;
        }

        public string SaveAmount(long empID, int year, int serial, int amount)
        {
            var adminID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());
            var bus = new Common.Common.Business();
            var employee = bus.GetEmployee(empID);
            var maxAmount = 0;

            //Get the request
            var request = tpDB.MeetingTransactions.Include("SubscriptionTransaction.Employee").FirstOrDefault(m => m.Emp_ID == empID && m.SuT_Year == year && m.SuT_Serial == serial && m.SubscriptionTransaction != null && m.SubscriptionTransaction.SuT_SubscriptionType == 4 && (m.SubscriptionTransaction.SuT_ApprovalStatus == 4 || m.SubscriptionTransaction.SuT_ApprovalStatus == 5));

            //Validate aginst the maximum allowed value
            //if (employee.LoanData != null && employee.LoanData.RemainingAmount > 0)
            //{
            //    maxAmount = request.SubscriptionTransaction.LoanAmount.LAm_LoanAmount.Value + employee.LoanData.RemainingAmount;
            //}
            //else
            //{
            //    maxAmount = request.SubscriptionTransaction.LoanAmount.LAm_LoanAmount.Value;
            //}

            //if (amount > maxAmount)
            //{
            //    return "AmountViolation";
            //}

            if (amount > request.SubscriptionTransaction.LoanAmount.LAm_LoanAmount.Value)
            {
                return "AmountViolation";
            }

            request.MeT_ApprovedAmount = amount;
            request.MeT_ApprovedAmountAdminID = adminID;
            request.MeT_ApprovedAmountDate = DateTime.UtcNow;
            tpDB.Entry(request).State = EntityState.Modified;
            tpDB.SaveChanges();


            return "True";
        }

        public string ExportDataToExcel(List<List<string>> data, string path)
        {

            string fileName = "CommitteeApprovedLoanAmount";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }

    }
}
