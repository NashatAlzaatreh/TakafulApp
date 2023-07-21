using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Employee_LoanClosing
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Employee_LoanClosing.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Employee_LoanClosing.MainObject();
            var bus = new Common.Common.Business();

            //Get all the employees that have a valid subscription only and have a valid loan
            var lstEmployees = tpDB.Employees
                .Where(em => em.Emp_AccountStatus == true && em.LoanAmounts.FirstOrDefault(lm => lm.LAm_Status == 1) != null)
                .OrderBy(e => e.Emp_ID).ToList();

            for (int i = 0; i < lstEmployees.Count; i++)
            {
                var temp = new DataObjects.Internal.Employee_LoanClosing.Employee();
                long empID = lstEmployees[i].Emp_ID;
                temp.EmployeeNumber = lstEmployees[i].Emp_ID;
                temp.Name = lstEmployees[i].Emp_FullName;

                //Loan Data
                var loanData = bus.GetLoanData(empID);
                if (loanData == null)
                {
                    continue;
                }

                temp.LoanAmount = loanData.LoanAmount;
                temp.LoanInstallmentAmount = loanData.LoanInstallment;
                temp.PaidLoanAmount = loanData.PaidAmount;
                temp.RemainingLoanAmount = loanData.RemainingAmount;

                if (temp.RemainingLoanAmount == 0)
                {
                    defaultDataObj.Employees.Add(temp);
                }
                else if (temp.RemainingLoanAmount < 0)
                {
                    defaultDataObj.Employees2.Add(temp);
                }
            }


            return defaultDataObj;
        }

        public string Save(List<long> employeesIDs)
        {
            var adminID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());
            var send = new Common.Common.SendEmail();

            //Create the transaction entries
            for (int i = 0; i < employeesIDs.Count; i++)
            {
                var id = employeesIDs[i];
                var employee = tpDB.Employees.FirstOrDefault(em => em.Emp_ID == id);

                //Get loan ID
                var la = tpDB.LoanAmounts.FirstOrDefault(l => l.Emp_ID == id && l.LAm_Status == 1);
                if (la == null)
                {
                    continue;
                }

                int loanID = la.LAm_ID;

                //Start the closing procedure
                //Check if already a submitted request by the user
                var st = tpDB.SubscriptionTransactions.FirstOrDefault(s => s.Emp_ID == id && s.SuT_SubscriptionType == 6 && s.LAm_ID == loanID && s.SuT_ApprovalStatus != 2 && s.SuT_ApprovalStatus != 3);

                if (st == null) //No request exists, create a new request
                {
                    st = new SubscriptionTransaction();
                    var subInfo = tpDB.SubscriptionInformations.First(j => j.SuI_IsActive == true);
                    var suTSerial = tpDB.SubscriptionTransactions.Where(s => s.SuT_SubscriptionType == 6).OrderByDescending(s => s.SortIndex);

                    st.Emp_ID = id;
                    st.SuT_Year = DateTime.UtcNow.Year;
                    st.SuT_SubscriptionType = 6;
                    st.SuT_Date = DateTime.UtcNow;
                    st.SuT_ApprovalDate = DateTime.UtcNow;
                    st.SuT_Amount = null;
                    st.SuT_Notes = "Automatically created by the system duo to 'Loan Closing Procedure'.";
                    st.SuT_ApprovalNotes = "Automatically approved by the system duo to 'Loan Closing Procedure'.";
                    st.SuI_ID = subInfo.SuI_ID;
                    st.LAm_ID = la.LAm_ID;
                    st.SuT_ApprovalStatus = 2;  //Approved
                    st.SuT_AdminID = adminID;

                    if (suTSerial.FirstOrDefault() == null || suTSerial.FirstOrDefault().SuT_Year < DateTime.UtcNow.Year)
                    {
                        st.SuT_Serial = 0001;
                    }
                    else
                    {
                        st.SuT_Serial = suTSerial.FirstOrDefault().SuT_Serial + 1;
                    }

                    tpDB.SubscriptionTransactions.Add(st);
                }
                else
                {
                    st.SuT_ApprovalDate = DateTime.UtcNow;
                    st.SuT_ApprovalNotes = "Automatically approved by the system duo to 'Loan Closing Procedure'.";
                    st.SuT_ApprovalStatus = 2;  //Approved
                    st.SuT_AdminID = adminID;

                    tpDB.Entry(st).State = EntityState.Modified;
                }

                la.LAm_Status = 2;
                tpDB.Entry(la).State = EntityState.Modified;

                //Save one loan by one to update the serial in transactions table
                tpDB.SaveChanges();

                //Send notification email & sms to the user
                if (!string.IsNullOrEmpty(employee.Emp_Email))
                {
                    send.CancelLoanRequestApproved(id);

                    //Send SMS to the employee
                    if (!string.IsNullOrEmpty(employee.Emp_MobileNumber))
                    {
                        var smsMsg = new Common.Common.SMSToUsers();
                        smsMsg.CancelLoanRequestApproved(employee.Emp_FullName, employee.Emp_MobileNumber);
                    }
                }
            }




            return "True";
        }

        public string ExportDataToExcel(List<List<string>> data, string path)
        {

            string fileName = "LoanClosing";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }

    }
}
