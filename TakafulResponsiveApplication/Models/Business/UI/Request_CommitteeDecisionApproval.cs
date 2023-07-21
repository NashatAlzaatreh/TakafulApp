using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;
using static TakafulResponsiveApplication.Models.Business.Common.Common;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Request_CommitteeDecisionApproval
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_CommitteeDecisionApproval.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Request_CommitteeDecisionApproval.MainObject();

            //Get requests that are assigned to this meeting (transferred to the committee)
            var me = tpDB.Meetings.FirstOrDefault(m => m.Mee_IsActive == true);

            if (me == null)
            {
                return null;
            }

            defaultDataObj.FormattedSerial = me.Mee_Date.Value.Year.ToString() + "/" + me.Mee_Serial.ToString();
            defaultDataObj.Date = me.Mee_Date.Value;

            //Get the requests
            var allRequests =
                tpDB.SubscriptionTransactions.Include("TransactionCommitteeDecisions.Employee.CommitteeMember")
                    .Where(
                        s =>
                            (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5) &&
                            s.MeetingTransactions.Any(mt => mt.Mee_ID == me.Mee_ID))
                    .OrderBy(s => s.SortIndex)
                    .ToList();


            for (int i = 0; i < allRequests.Count; i++)
            {
                var temp = new DataObjects.Internal.Request_CommitteeDecisionApproval.Request();
                temp.EmployeeNumber = allRequests[i].Emp_ID;
                temp.Name = allRequests[i].Employee.Emp_FullName;
                temp.Position = allRequests[i].Employee.Emp_Position;
                temp.Year = allRequests[i].SuT_Year;
                temp.Serial = allRequests[i].SuT_Serial;
                temp.Department = allRequests[i].Employee.Emp_Department;
                temp.RequestDate = allRequests[i].SuT_Date.Value;
                temp.TypeID = allRequests[i].SuT_SubscriptionType;
                switch (temp.TypeID)
                {
                    case 1:
                        temp.Type = "طلب اشتراك";
                        break;
                    case 2:
                        temp.Type = "تعديل اشتراك";
                        break;
                    case 3:
                        temp.Type = "إلغاء اشتراك";
                        break;
                    case 4:
                        temp.Type = "طلب قرض";
                        break;
                    case 5:
                        temp.Type = "تعديل قرض";
                        break;
                    case 6:
                        temp.Type = "إلغاء قرض";
                        break;
                }

                //Calculate the decision probabilities
                if (me.Mee_IsOpenForEvaluation != false) //Still under voting
                {
                    temp.Decision = "تحت التصويت";
                }
                else    //Calculate decesion
                {
                    var tempList = allRequests[i].TransactionCommitteeDecisions.ToList();
                    if (tempList.Count > 0)
                    {
                        int approvalCount = tempList.Count(t => t.TCD_CommitteeApprovalStatus == 2);
                        int rejectionCount = tempList.Count(t => t.TCD_CommitteeApprovalStatus == 3);

                        if (approvalCount > rejectionCount) //Approved
                        {
                            temp.Decision = "تم الاعتماد";
                        }
                        else if (rejectionCount > approvalCount)    //Rejected
                        {
                            temp.Decision = "تم الرفض";
                        }
                        else    //Equal decisions, check the committee chief
                        {
                            if (tempList.Count(t => t.TCD_CommitteeApprovalStatus == 2 && t.Employee.CommitteeMember != null && t.Employee.CommitteeMember.CoM_OSSortingOrder == 1) > 0)
                            {
                                temp.Decision = "تم الاعتماد";
                            }
                            else if (tempList.Count(t => t.TCD_CommitteeApprovalStatus == 3 && t.Employee.CommitteeMember != null && t.Employee.CommitteeMember.CoM_OSSortingOrder == 1) > 0)
                            {
                                temp.Decision = "تم الرفض";
                            }
                            else
                            {
                                temp.Decision = "معلق";
                            }
                        }

                        //Check if committee cheief or his delegate has a submitted decision 
                        if (tempList.Count(t => t.Employee.CommitteeMember.CoM_OSSortingOrder == 1 || t.Employee.CommitteeMember.CoM_OSSortingOrder == 2) == 0)
                        {
                            temp.Decision = "يلزم تصويت رئيس او نائب رئيس اللجنة";
                        }
                    }
                    else
                    {
                        temp.Decision = "لم يتم التصويت";
                    }
                }

                defaultDataObj.Requests.Add(temp);
            }




            return defaultDataObj;
        }

        public string ExportDataToExcel(List<List<string>> data, string path)
        {

            string fileName = "CommitteeRequestsDecision";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }

        public string Save()
        {

            bool isApprovedRequests = false;

            //Get the active meeting
            var activeMeeting = tpDB.Meetings.FirstOrDefault(m => m.Mee_IsActive == true);

            if (activeMeeting == null)
            {
                return "NoActiveMeeting";
            }

            if (activeMeeting.Mee_IsOpenForEvaluation != false)
            {
                return "StillOpenForEvaluation";
            }

            //Get all the requests
            var requests = tpDB.SubscriptionTransactions
                .Include("TransactionCommitteeDecisions.Employee.CommitteeMember")
                .Where(s => (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5) && s.MeetingTransactions.Any(mt => mt.Mee_ID == activeMeeting.Mee_ID))
                .OrderByDescending(s => s.SortIndex).ToList();

            if (requests.Count == 0)
            {
                return "NoRequestsExist";
            }

            //Update the sub. types text & committee decision
            for (int i = 0; i < requests.Count; i++)
            {
                //Committee decision
                var tempList = requests[i].TransactionCommitteeDecisions.ToList();

                //Calculate the decision probabilities
                if (tempList.Count > 0 && tempList.Count(t => t.Employee.CommitteeMember.CoM_OSSortingOrder == 1 || t.Employee.CommitteeMember.CoM_OSSortingOrder == 2) > 0)
                {
                    int approvalCount = tempList.Count(t => t.TCD_CommitteeApprovalStatus == 2);
                    int rejectionCount = tempList.Count(t => t.TCD_CommitteeApprovalStatus == 3);

                    if (approvalCount > rejectionCount) //Approved
                    {
                        this.ApproveCommitteeDecision(requests[i].Emp_ID, requests[i].SuT_Year, requests[i].SuT_Serial, requests[i].SuT_SubscriptionType, 2);
                        isApprovedRequests = true;
                    }
                    else if (rejectionCount > approvalCount)    //Rejected
                    {
                        this.ApproveCommitteeDecision(requests[i].Emp_ID, requests[i].SuT_Year, requests[i].SuT_Serial, requests[i].SuT_SubscriptionType, 3);
                        isApprovedRequests = true;
                    }
                    else    //Equal decisions, check the committee chief
                    {
                        if (tempList.Count(t => t.TCD_CommitteeApprovalStatus == 2 && t.Employee.CommitteeMember != null && t.Employee.CommitteeMember.CoM_OSSortingOrder == 1) > 0)
                        {
                            this.ApproveCommitteeDecision(requests[i].Emp_ID, requests[i].SuT_Year, requests[i].SuT_Serial, requests[i].SuT_SubscriptionType, 2);
                            isApprovedRequests = true;
                        }
                        else if (tempList.Count(t => t.TCD_CommitteeApprovalStatus == 3 && t.Employee.CommitteeMember != null && t.Employee.CommitteeMember.CoM_OSSortingOrder == 1) > 0)
                        {
                            this.ApproveCommitteeDecision(requests[i].Emp_ID, requests[i].SuT_Year, requests[i].SuT_Serial, requests[i].SuT_SubscriptionType, 3);
                            isApprovedRequests = true;
                        }
                        //else
                        //{
                        //    requests[i].CommitteeDecision = "معلق";
                        //}
                    }
                }
            }

            if (!isApprovedRequests)
            {
                return "NoRequestsExist";
            }

            return "True";
        }

        private void ApproveCommitteeDecision(long empID, int year, int serial, int subsType, int approvalStatus)
        {

            //Employee empAccount = tpDB.Employees.First(m => m.Emp_ID == empID);
            var bus = new Common.Common.Business();
            var act = new Common.Common.Business.RequestAction();
            string result = "";
            string notes = "بناءً على قرار اللجنة.";
            var send = new Common.Common.SendEmail();
            var smsMsg = new Common.Common.SMSToUsers();
            var emp = tpDB.Employees.FirstOrDefault(e => e.Emp_ID == empID);
            int loanAmount = 0;


            switch (subsType)
            {
                case 1: //طلب اشتراك
                    if (approvalStatus == 2)
                    {
                        result = bus.TakeActionToNewSubscriptionRequest(empID, year, serial, notes, Common.Common.Business.RequestAction.Approve, null);
                        if (result == "True")
                        {
                            //Send notification email to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_Email))
                            {
                                send.SubscriptionRequestApproved(empID);
                                //Send SMS to the employee
                                if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                                {
                                    //smsMsg.SubscriptionRequestApproved(emp.Emp_FullName, empID.ToString(), emp.Emp_Password, emp.Emp_MobileNumber);
                                    smsMsg.SubscriptionRequestApproved(emp.Emp_FullName, empID.ToString(), Helper.EncyptDecrypt.Decrypt(emp.Emp_Password_Enc,emp.SecurityStamp) , emp.Emp_MobileNumber);
                                }
                            }
                        }
                    }
                    else if (approvalStatus == 3)
                    {
                        result = bus.TakeActionToNewSubscriptionRequest(empID, year, serial, notes, Common.Common.Business.RequestAction.Reject, null);
                        if (result == "True")
                        {
                            //Send notification email to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_Email))
                            {
                                send.SubscriptionRequestRejected(empID);
                                //Send SMS to the employee
                                if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                                {
                                    smsMsg.SubscriptionRequestRejected(emp.Emp_FullName, emp.Emp_MobileNumber);
                                }
                            }
                        }
                    }
                    break;
                case 2: //تعديل اشتراك
                    if (approvalStatus == 2)
                    {
                        result = bus.TakeActionToEditSubscriptionRequest(empID, year, serial, notes, Common.Common.Business.RequestAction.Approve, null);
                        if (result == "True")
                        {
                            //Send notification email to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_Email))
                            {
                                send.EditSubscriptionRequestApproved(empID);
                                //Send SMS to the employee
                                if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                                {
                                    smsMsg.EditSubscriptionRequestApproved(emp.Emp_FullName, emp.Emp_MobileNumber);
                                }
                            }
                        }
                    }
                    else if (approvalStatus == 3)
                    {
                        result = bus.TakeActionToEditSubscriptionRequest(empID, year, serial, notes, Common.Common.Business.RequestAction.Reject, null);
                        if (result == "True")
                        {
                            //Send notification email to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_Email))
                            {
                                send.EditSubscriptionRequestRejected(empID);
                                //Send SMS to the employee
                                if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                                {
                                    smsMsg.EditSubscriptionRequestRejected(emp.Emp_FullName, emp.Emp_MobileNumber);
                                }
                            }
                        }
                    }
                    break;
                case 3: //إلغاء اشتراك
                    if (approvalStatus == 2)
                    {
                        result = bus.TakeActionToCancelSubscriptionRequest(empID, year, serial, notes, Common.Common.Business.RequestAction.Approve, null);
                        if (result == "True")
                        {
                            //Send notification email to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_Email))
                            {
                                send.CancelSubscriptionRequestApproved(empID);
                                //Send SMS to the employee
                                if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                                {
                                    smsMsg.CancelSubscriptionRequestApproved(emp.Emp_FullName, emp.Emp_MobileNumber);
                                }
                            }
                        }
                    }
                    else if (approvalStatus == 3)
                    {
                        result = bus.TakeActionToCancelSubscriptionRequest(empID, year, serial, notes, Common.Common.Business.RequestAction.Reject, null);
                        if (result == "True")
                        {
                            //Send notification email to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_Email))
                            {
                                send.CancelSubscriptionRequestRejected(empID);
                                //Send SMS to the employee
                                if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                                {
                                    smsMsg.CancelSubscriptionRequestRejected(emp.Emp_FullName, emp.Emp_MobileNumber);
                                }
                            }
                        }
                    }
                    break;
                case 4: //طلب قرض
                    if (approvalStatus == 2)
                    {
                        result = bus.TakeActionToNewLoanRequest(empID, year, serial, 0, notes, Common.Common.Business.RequestAction.Approve, true, out loanAmount, null);
                        if (result == "True")
                        {
                            //Send notification email to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_Email))
                            {
                                send.NewLoanRequestApproved(empID);
                                //Send SMS to the employee
                                if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                                {
                                    smsMsg.NewLoanRequestApproved(emp.Emp_FullName, loanAmount.ToString(), emp.Emp_MobileNumber);
                                }
                            }
                        }
                    }
                    else if (approvalStatus == 3)
                    {
                        result = bus.TakeActionToNewLoanRequest(empID, year, serial, 0, notes, Common.Common.Business.RequestAction.Reject, true, out loanAmount, null);
                        if (result == "True")
                        {
                            //Send notification email to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_Email))
                            {
                                send.NewLoanRequestRejected(empID);
                                //Send SMS to the employee
                                if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                                {
                                    smsMsg.NewLoanRequestRejected(emp.Emp_FullName, emp.Emp_MobileNumber);
                                }
                            }
                        }
                    }
                    break;
                case 5: //تعديل قسط القرض
                    if (approvalStatus == 2)
                    {
                        result = bus.TakeActionToEditLoanRequest(empID, year, serial, notes, Common.Common.Business.RequestAction.Approve, null);
                        if (result == "True")
                        {
                            //Send notification email to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_Email))
                            {
                                send.EditLoanRequestApproved(empID);
                                //Send SMS to the employee
                                if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                                {
                                    smsMsg.EditLoanRequestApproved(emp.Emp_FullName, emp.Emp_MobileNumber);
                                }
                            }
                        }
                    }
                    else if (approvalStatus == 3)
                    {
                        result = bus.TakeActionToEditLoanRequest(empID, year, serial, notes, Common.Common.Business.RequestAction.Reject, null);
                        if (result == "True")
                        {
                            //Send notification email to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_Email))
                            {
                                send.EditLoanRequestRejected(empID);
                                //Send SMS to the employee
                                if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                                {
                                    smsMsg.EditLoanRequestRejected(emp.Emp_FullName, emp.Emp_MobileNumber);
                                }
                            }
                        }
                    }
                    break;
                case 6: //سداد القرض
                    if (approvalStatus == 2)
                    {
                        result = bus.TakeActionToCancelLoanRequest(empID, year, serial, notes, Common.Common.Business.RequestAction.Approve, null);
                        if (result == "True")
                        {
                            //Send notification email to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_Email))
                            {
                                send.CancelLoanRequestApproved(empID);
                                //Send SMS to the employee
                                if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                                {
                                    smsMsg.CancelLoanRequestApproved(emp.Emp_FullName, emp.Emp_MobileNumber);
                                }
                            }
                        }
                    }
                    else if (approvalStatus == 3)
                    {
                        result = bus.TakeActionToCancelLoanRequest(empID, year, serial, notes, Common.Common.Business.RequestAction.Reject, null);
                        if (result == "True")
                        {
                            //Send notification email to the employee
                            if (!string.IsNullOrEmpty(emp.Emp_Email))
                            {
                                send.CancelLoanRequestRejected(empID);
                                //Send SMS to the employee
                                if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                                {
                                    smsMsg.CancelLoanRequestRejected(emp.Emp_FullName, emp.Emp_MobileNumber);
                                }
                            }
                        }
                    }
                    break;
            }


        }



    }

}
