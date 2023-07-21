using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;
using static TakafulResponsiveApplication.Models.Business.Common.Common;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Request_NewSubscription_Approve
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_NewSubscription_Approve.MainObject GetInitialData(long empID, int year, int serial)
        {

            var defaultDataObj = new DataObjects.Internal.Request_NewSubscription_Approve.MainObject();
            var bus = new Common.Common.Business();

            var employee = bus.GetEmployee(empID);

            if (employee != null)
            {
                defaultDataObj.EmployeeNumber = employee.EmpID;
                defaultDataObj.Name = employee.FullName;
                defaultDataObj.Department = employee.Department;
                defaultDataObj.Position = employee.Position;
                defaultDataObj.JoinDate = employee.JoiningDate;
                if (employee.ServiceData != null && employee.ServiceData.TotalSalary != null)
                {
                    defaultDataObj.Salary = employee.ServiceData.TotalSalary;
                }

                if (employee.SubscriptionData != null)
                {
                    defaultDataObj.PrevousSubscriptionCancellationDate = employee.SubscriptionData.PreviousCancellationDate;
                }

                //Get the submitted request
                var request = tpDB.SubscriptionTransactions.FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial && s.SuT_SubscriptionType == 1 && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4));

                if (request == null || request.SuT_Amount == null)    //No submitted request with the provided parameters
                {
                    return null;
                }

                defaultDataObj.UserNotes = request.SuT_Notes;

                defaultDataObj.RequestedSubscriptionAmount = request.SuT_Amount;

                if (request.SuT_ApprovalStatus == 4)
                {
                    defaultDataObj.IsTransferredToCommittee = true;
                }
            }


            return defaultDataObj;
        }

        public DataObjects.Internal.Request_NewSubscription_Approve.NavigationObject Navigate(long empID, int year, int serial, int direction)
        {

            var defaultDataObj = new DataObjects.Internal.Request_NewSubscription_Approve.NavigationObject();
            var bus = new Common.Common.Business();
            var lst = new List<SubscriptionTransaction>();

            ////Get the submitted request
            //var request = tpDB.SubscriptionTransactions.FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial && s.SuT_SubscriptionType == 1 && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4));

            //if (request == null)    //No submitted request with the provided parameters
            //{
            //    return null;
            //}

            //Get the Next or Previous submitted request of the current one (according to direction)
            if (direction == 1)
            {
                lst = tpDB.SubscriptionTransactions.Where(s => s.SuT_SubscriptionType == 1 && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4) && (s.SuT_Year > year || s.SuT_Serial > serial)).OrderBy(s => s.SortIndex).ToList();
            }
            else if (direction == 2)
            {
                lst = tpDB.SubscriptionTransactions.Where(s => s.SuT_SubscriptionType == 1 && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4) && (s.SuT_Year < year || s.SuT_Serial < serial)).OrderByDescending(s => s.SortIndex).ToList();
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

        public string TakeAction(long empID, int year, int serial, string notes, int action)
        {

            var bus = new Common.Common.Business();
            var act = new Common.Common.Business.RequestAction();
            string result = "";
            var emp = tpDB.Employees.FirstOrDefault(e => e.Emp_ID == empID);
            long adminID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());

            switch (action)
            {
                case 1: //Approve
                    result = bus.TakeActionToNewSubscriptionRequest(empID, year, serial, notes, Common.Common.Business.RequestAction.Approve, adminID);
                    if (result == "True")
                    {
                        //Send notification email to the employee
                        if (!string.IsNullOrEmpty(emp.Emp_Email))
                        {
                            var send = new Common.Common.SendEmail();
                            send.SubscriptionRequestApproved(empID);

                            //Send SMS to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                            {
                                var smsMsg = new Common.Common.SMSToUsers();
                                //smsMsg.SubscriptionRequestApproved(emp.Emp_FullName, empID.ToString(), emp.Emp_Password, emp.Emp_MobileNumber);
                                smsMsg.SubscriptionRequestApproved(emp.Emp_FullName, empID.ToString(), Helper.EncyptDecrypt.Decrypt(emp.Emp_Password_Enc, emp.SecurityStamp), emp.Emp_MobileNumber);

                                return "Approved_Email_SMS";
                            }
                            else
                            {
                                return "Approved_Email";
                            }
                        }
                        return "Approved";
                    }
                    break;
                case 2: //Transfer to committee
                    result = bus.TakeActionToNewSubscriptionRequest(empID, year, serial, notes, Common.Common.Business.RequestAction.TransferToCommittee, null);
                    if (result == "True")
                    {
                        return "Transferred";
                    }
                    break;
                case 3: //Reject
                    result = bus.TakeActionToNewSubscriptionRequest(empID, year, serial, notes, Common.Common.Business.RequestAction.Reject, adminID);
                    if (result == "True")
                    {
                        //Send notification email to the employee
                        if (!string.IsNullOrEmpty(emp.Emp_Email))
                        {
                            var send = new Common.Common.SendEmail();
                            send.SubscriptionRequestRejected(empID);

                            //Send SMS to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                            {
                                var smsMsg = new Common.Common.SMSToUsers();
                                smsMsg.SubscriptionRequestRejected(emp.Emp_FullName, emp.Emp_MobileNumber);
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
