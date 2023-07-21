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
    public class Request_NewLoan_Approve
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_NewLoan_Approve.MainObject GetInitialData(long empID, int year, int serial)
        {

            var defaultDataObj = new DataObjects.Internal.Request_NewLoan_Approve.MainObject();
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

                defaultDataObj.CurrentSubscriptionAmount = employee.SubscriptionData.Amount;
                defaultDataObj.TotalSubscriptionAmount = employee.SubscriptionData.TotalSubscription;
                defaultDataObj.LoanInstallmentsCount = employee.SubscriptionInformation.NumberOfInstallments;
                defaultDataObj.MinimumLoanInstallmentAmount = employee.SubscriptionInformation.MinimumAmount;

                //Get the submitted request
                var request = tpDB.SubscriptionTransactions.Include("LoanAmount").FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial && s.SuT_SubscriptionType == 4 && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4));

                if (request == null || request.LoanAmount == null)    //No submitted request with the provided parameters
                {
                    return null;
                }

                defaultDataObj.UserNotes = request.SuT_Notes;

                if (request.SuT_ServiceEmployeeID != null)
                {
                    defaultDataObj.Applicant = request.Employee1.Emp_FullName;
                }

                if (request.SuT_ApprovalStatus == 4)
                {
                    defaultDataObj.IsTransferredToCommittee = true;
                }

                defaultDataObj.RequestedLoanAmount = request.LoanAmount.LAm_LoanAmount.Value;   //Requested loan amount
                int prevLoan = 0;
                if (employee.LoanData != null)
                {
                    prevLoan = employee.LoanData.RemainingAmount;
                }
                defaultDataObj.PreviousLoanAmount = prevLoan;
                if (defaultDataObj.PreviousLoanAmount > 0)
                {
                    defaultDataObj.TotalLoanAmount = defaultDataObj.RequestedLoanAmount + defaultDataObj.PreviousLoanAmount;
                }
                else
                {
                    defaultDataObj.TotalLoanAmount = defaultDataObj.RequestedLoanAmount;
                }


                if (request.LoanAmount.LAm_SuggestedLoanAmount != null) //Suggested loan amount
                {
                    defaultDataObj.SuggestedLoanAmount = request.LoanAmount.LAm_SuggestedLoanAmount.Value;
                }


                defaultDataObj.TotalDeductedAmount = employee.SubscriptionData.Amount + request.SuT_Amount.Value;  //Total deduction amount
                //Get max allowed deduction amount
                //defaultDataObj.MaxDeductedAmount = (int)(defaultDataObj.Salary / 2);
                defaultDataObj.MaxDeductedAmount = bus.GetMaxAllowedDeduction(empID);

                defaultDataObj.EndServiceBenefitAmount = employee.ServiceData.EndOfServiceBenefit.Value;    //End of service benefits
                defaultDataObj.EndServiceBenefitAmountAndTotalSubscription = defaultDataObj.EndServiceBenefitAmount + defaultDataObj.TotalSubscriptionAmount.Value; //End of service benefits + Total subscriptions
            }


            return defaultDataObj;
        }

        public DataObjects.Internal.Request_NewLoan_Approve.NavigationObject Navigate(int year, int serial, int direction)
        {

            var defaultDataObj = new DataObjects.Internal.Request_NewLoan_Approve.NavigationObject();
            var bus = new Common.Common.Business();
            var lst = new List<SubscriptionTransaction>();

            //Get the Next or Previous submitted request of the current one (according to direction)
            if (direction == 1)
            {
                lst = tpDB.SubscriptionTransactions.Where(s => s.SuT_SubscriptionType == 4 && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4) && (s.SuT_Year > year || s.SuT_Serial > serial)).OrderBy(s => s.SortIndex).ToList();
            }
            else if (direction == 2)
            {
                lst = tpDB.SubscriptionTransactions.Where(s => s.SuT_SubscriptionType == 4 && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4) && (s.SuT_Year < year || s.SuT_Serial < serial)).OrderByDescending(s => s.SortIndex).ToList();
            }
            else
            {
                return null;
            }

            if (lst.Count == 0)
            {
                return null;
            }

            defaultDataObj.EmpID = lst[0].Emp_ID;
            defaultDataObj.Year = lst[0].SuT_Year;
            defaultDataObj.Serial = lst[0].SuT_Serial;


            return defaultDataObj;
        }

        public string TakeAction(long empID, int year, int serial, int suggestedLoanAmount, string notes, int action)
        {

            var bus = new Common.Common.Business();
            var act = new Common.Common.Business.RequestAction();
            string result = "";
            var emp = tpDB.Employees.FirstOrDefault(e => e.Emp_ID == empID);
            int loanAmount = 0;
            long adminID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());


            switch (action)
            {
                case 1: //Approve
                    result = bus.TakeActionToNewLoanRequest(empID, year, serial, suggestedLoanAmount, notes, Common.Common.Business.RequestAction.Approve, false, out loanAmount, adminID);
                    if (result == "True")
                    {
                        //Send notification email to the employee
                        if (!string.IsNullOrEmpty(emp.Emp_Email))
                        {
                            var send = new Common.Common.SendEmail();
                            send.NewLoanRequestApproved(empID);

                            //Send SMS to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                            {
                                var smsMsg = new Common.Common.SMSToUsers();
                                smsMsg.NewLoanRequestApproved(emp.Emp_FullName, loanAmount.ToString(), emp.Emp_MobileNumber);
                                return "Approved_Email_SMS";
                            }
                            else
                            {
                                return "Approved_Email";
                            }
                        }
                        return "Approved";
                    }
                    //else if (result == "SuggestedAmountViolation")
                    //{
                    //    return result;
                    //}
                    break;
                case 2: //Transfer to committee
                    result = bus.TakeActionToNewLoanRequest(empID, year, serial, suggestedLoanAmount, notes, Common.Common.Business.RequestAction.TransferToCommittee, false, out loanAmount, null);
                    if (result == "True")
                    {
                        return "Transferred";
                    }
                    else if (result == "SuggestedAmountViolation")
                    {
                        return "SuggestedAmountViolation";
                    }
                    break;
                case 3: //Reject
                    result = bus.TakeActionToNewLoanRequest(empID, year, serial, suggestedLoanAmount, notes, Common.Common.Business.RequestAction.Reject, false, out loanAmount, adminID);
                    if (result == "True")
                    {
                        //Send notification email to the employee
                        if (!string.IsNullOrEmpty(emp.Emp_Email))
                        {
                            var send = new Common.Common.SendEmail();
                            send.NewLoanRequestRejected(empID);

                            //Send SMS to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                            {
                                var smsMsg = new Common.Common.SMSToUsers();
                                smsMsg.NewLoanRequestRejected(emp.Emp_FullName, emp.Emp_MobileNumber);
                                return "Rejected_Email_SMS";
                            }
                            else
                            {
                                return "Rejected_Email";
                            }
                        }
                        return "Rejected";
                    }
                    break;
            }


            return result;
        }

    }
}
