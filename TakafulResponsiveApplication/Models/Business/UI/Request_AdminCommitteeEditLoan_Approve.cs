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
    public class Request_AdminCommitteeEditLoan_Approve
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_AdminCommitteeEditLoan_Approve.MainObject GetInitialData(long empID, int year, int serial)
        {

            var defaultDataObj = new DataObjects.Internal.Request_AdminCommitteeEditLoan_Approve.MainObject();
            var bus = new Common.Common.Business();

            var employee = bus.GetEmployee(empID);

            if (employee != null)
            {
                defaultDataObj.EmployeeNumber = employee.EmpID;
                defaultDataObj.Name = employee.FullName;
                defaultDataObj.Department = employee.Department;
                defaultDataObj.Position = employee.Position;
                defaultDataObj.JoinDate = employee.JoiningDate;
                if (employee.ServiceData != null)
                {
                    defaultDataObj.Salary = employee.ServiceData.TotalSalary;
                }

                if (employee.SubscriptionData == null)
                {
                    return null;
                }


                //Get the submitted request
                var request = tpDB.SubscriptionTransactions.FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial && s.SuT_SubscriptionType == 5 && (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5));

                if (request == null)    //No submitted request with the provided parameters
                {
                    return null;
                }

                defaultDataObj.NewInstallmentAmount = request.SuT_Amount.Value; //New installment amount

                if (request.SuT_ApprovalStatus == 4)
                {
                    defaultDataObj.IsTransferredToCommittee = true;
                }

                //Loan data
                defaultDataObj.LoanAmount = employee.LoanData.LoanAmount;
                defaultDataObj.PaidLoanAmount = employee.LoanData.PaidAmount;
                defaultDataObj.RemainingLoanAmount = employee.LoanData.RemainingAmount;
                defaultDataObj.CurrentInstallmentAmount = employee.LoanData.LoanInstallment;    //Current installment amount

            }


            return defaultDataObj;
        }

        public string TakeAction(long empID, int year, int serial, long committeeMemberID, int action)
        {

            var adminID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());

            var aStatus = 0;

            if (action == 1)
            {
                aStatus = 2;
            }
            else if (action == 3)
            {
                aStatus = 3;
            }

            //Add the decision to the decision table
            TransactionCommitteeDecision tcd = tpDB.TransactionCommitteeDecisions.FirstOrDefault(t => t.Emp_ID == empID && t.SuT_Year == year && t.SuT_Serial == serial && t.SuT_SubscriptionType == 5 && t.TCD_CommitteeMemberID == committeeMemberID);

            if (tcd == null)
            {
                tcd = new TransactionCommitteeDecision();
                tcd.Emp_ID = empID;
                tcd.SuT_Year = year;
                tcd.SuT_Serial = serial;
                tcd.SuT_SubscriptionType = 5;
                tcd.TCD_CommitteeMemberID = committeeMemberID;
                tcd.TCD_Date = DateTime.UtcNow.Date;
                tcd.TCD_CommitteeApprovalStatus = aStatus;
                tcd.TCD_AdminID = adminID;
                tpDB.TransactionCommitteeDecisions.Add(tcd);
            }
            else
            {
                tcd.TCD_Date = DateTime.UtcNow.Date;
                tcd.TCD_CommitteeApprovalStatus = aStatus;
                tcd.TCD_AdminID = adminID;
                tpDB.Entry(tcd).State = EntityState.Modified;
            }

            tpDB.SaveChanges();


            return "True";
        }

    }
}
