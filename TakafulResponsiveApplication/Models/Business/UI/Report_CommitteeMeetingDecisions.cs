using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Report_CommitteeMeetingDecisions
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Report_CommitteeMeetingDecisions.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Report_CommitteeMeetingDecisions.MainObject();


            //Get all meetings
            var lstMeetings = tpDB.Meetings.OrderByDescending(m => m.Mee_Serial).ToList();

            for (int i = 0; i < lstMeetings.Count; i++)
            {
                var meeting = new DataObjects.Internal.Report_CommitteeMeetingDecisions.Meeting();
                meeting.ID = lstMeetings[i].Mee_ID;
                meeting.Serial = lstMeetings[i].Mee_Serial;
                meeting.Date = lstMeetings[i].Mee_Date.Value;
                meeting.Notes = lstMeetings[i].Mee_Notes;
                meeting.FormattedSerial = meeting.Date.Year.ToString() + "/" + meeting.Serial.ToString();
                defaultDataObj.Meetings.Add(meeting);
            }


            return defaultDataObj;

        }

        public object Export(int meetingID)
        {

            var lstData = new List<List<string>>();
            //var lstTemp = new List<string>();
            var lstSubscriptionsData = new List<List<string>>();
            var lstLoansData = new List<List<string>>();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.Common.PathConfig.UploadPath_Temp + "/";
            string fileName = "CommitteeMeetingDecisions";
            string formattedSerial = "";
            dynamic resultObj = new ExpandoObject();


            //Get the meeting object
            var me = tpDB.Meetings.FirstOrDefault(m => m.Mee_ID == meetingID);
            formattedSerial = me.Mee_Date.Value.Year.ToString() + "/" + me.Mee_Serial.ToString();

            //Get all the approved (or rejected) requests in this meeting
            var allRequests =
                tpDB.SubscriptionTransactions
                //.Include("TransactionCommitteeDecisions.Employee.CommitteeMember")
                    .Where(
                        s =>
                            (s.SuT_ApprovalStatus == 2 || s.SuT_ApprovalStatus == 3) && s.Emp_ID==11484 &&
                            s.MeetingTransactions.Any(mt => mt.Mee_ID == meetingID))
                    .OrderBy(s => s.SortIndex)
                    .ToList();

            //Get subs data
            var lstSubs = allRequests.Where(al => al.SuT_SubscriptionType == 1 || al.SuT_SubscriptionType == 2 || al.SuT_SubscriptionType == 3).ToList();
            lstSubscriptionsData = this.GetSubscriptionRequestsData(formattedSerial, me.Mee_Date.Value.Date.ToShortDateString(), lstSubs);

            //Get loans data
            var lstLoans = allRequests.Where(al => al.SuT_SubscriptionType == 4 || al.SuT_SubscriptionType == 5 || al.SuT_SubscriptionType == 6).ToList();
            lstLoansData = this.GetLoansData(formattedSerial, me.Mee_Date.Value.Date.ToShortDateString(), lstLoans);

            //Fill the list with data
            lstData.Add(new List<string> { "" });    //Empty row
            lstData.Add(new List<string> { "رقم الإجتماع", formattedSerial });
            lstData.Add(new List<string> { "تاريخ الإجتماع", me.Mee_Date.Value.Date.ToShortDateString() });
            lstData.Add(new List<string> { "" });    //Empty row

            //Merge the two lists into one list
            lstData.Add(new List<string> { "طلبات الاشتراكات" });
            lstData.AddRange(lstSubscriptionsData);
            lstData.Add(new List<string> { "" });   //Add empty row
            lstData.Add(new List<string> { "طلبات القروض" });
            lstData.AddRange(lstLoansData);

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(lstData, fileName, filePath);
            resultObj.Name = createdFileName;
            resultObj.FullURL = Common.Common.CurrentHostingServer.Host + "/" + Common.Common.PathConfig.UploadPath_Temp + "/" + createdFileName;

            return resultObj;

        }

        private List<List<string>> GetSubscriptionRequestsData(string meetingSerial, string meetingDate, List<SubscriptionTransaction> transactions)
        {
            var lstData = new List<List<string>>();
            var lstTemp = new List<string>();

            //Fill the list with data
            //Add the table header
            lstTemp = new List<string> { "م", "الرقم الوظيفى", "الاسم", "الإدارة", "الوظيفة", "الهاتف الجوال", "مكافأة نهاية الخدمة", "نوع الطلب", "تاريخ الطلب", "حالة الطلب", "معتمد القرار", "قيمة الاشتراك", "", "", "عضو اللجنة", "الهيكل التنظيمى", "القرار", "أناب عنه" };
            lstData.Add(lstTemp);

            //Fill the requests data
            for (int i = 0; i < transactions.Count; i++)
            {
                lstTemp = new List<string>();
                string requestType = "";
                lstTemp.Add((i + 1).ToString());
                lstTemp.Add(transactions[i].Emp_ID.ToString());
                lstTemp.Add(transactions[i].Employee.Emp_FullName);
                lstTemp.Add(transactions[i].Employee.Emp_Department);
                lstTemp.Add(transactions[i].Employee.Emp_Position);
                lstTemp.Add(transactions[i].Employee.Emp_MobileNumber);
                if (transactions[i].Employee.Emp_IsLocalCitizen != true)
                {
                    var es = transactions[i].Employee.EmployeeServices.OrderByDescending(d => d.EmS_OnDate).Take(1).FirstOrDefault();
                    if (es != null && es.EmS_EndOfServiceBenefit.HasValue)
                    {
                        lstTemp.Add(es.EmS_EndOfServiceBenefit.Value.ToString());
                    }
                    else
                    {
                        lstTemp.Add("0");
                    }
                }
                else
                {
                    lstTemp.Add("0");
                }

                switch (transactions[i].SuT_SubscriptionType)
                {
                    case 1:
                        requestType = "طلب اشتراك";
                        break;
                    case 2:
                        requestType = "تعديل اشتراك";
                        break;
                    case 3:
                        requestType = "إلغاء اشتراك";
                        break;
                }

                lstTemp.Add(requestType);
                lstTemp.Add(transactions[i].SuT_Date.Value.ToShortDateString());
                lstTemp.Add(transactions[i].ApprovalStatu.ApS_ApprovalStatus);
                if (transactions[i].SuT_ApprovalNotes.Trim() == "بناءً على قرار اللجنة." && transactions[i].SuT_AdminID == null)
                {
                    lstTemp.Add("اللجنة");
                }
                else
                {
                    string name = "";
                    if (transactions[i].SuT_AdminID != null)
                    {
                        name = " (" + transactions[i].Employee2.Emp_FullName + ")";
                    }

                    lstTemp.Add("ادارى النظام" + name);
                }

                if (transactions[i].SuT_Amount.HasValue)
                {
                    lstTemp.Add(transactions[i].SuT_Amount.Value.ToString());
                }
                else
                {
                    lstTemp.Add("");
                }

                lstTemp.Add("");
                lstTemp.Add("");

                //Add the committee decisions
                var lstDecisions = transactions[i].TransactionCommitteeDecisions.ToList();
                if (lstDecisions.Count > 0)
                {
                    string memberName = "";
                    string memberPosition = "";
                    string memberDecision = "";
                    string memberDelegation = "";

                    //Add the data of the first committee member to the same row with the request data
                    memberName = lstDecisions[0].Employee.Emp_FullName;
                    //Check if still in the committee table to get his title
                    long memberID = lstDecisions[0].TCD_CommitteeMemberID;
                    var member = tpDB.CommitteeMembers.FirstOrDefault(c => c.Emp_ID == memberID);
                    if (member != null)
                    {
                        memberPosition = member.CoM_OrganizationalStructure;
                    }
                    else
                    {
                        memberPosition = "غير فعال";
                    }

                    //Get the approval status
                    if (lstDecisions[0].TCD_CommitteeApprovalStatus == 2)
                    {
                        memberDecision = "اعتماد";
                    }
                    else if (lstDecisions[0].TCD_CommitteeApprovalStatus == 3)
                    {
                        memberDecision = "رفض";
                    }

                    //Get the delegation
                    if (lstDecisions[0].TCD_AdminID == null)
                    {
                        memberDelegation = "اعتمد بنفسه";
                    }
                    else
                    {
                        memberDelegation = lstDecisions[0].Employee1.Emp_FullName;
                    }

                    //Add the data to the list
                    lstTemp.Add(memberName);
                    lstTemp.Add(memberPosition);
                    lstTemp.Add(memberDecision);
                    lstTemp.Add(memberDelegation);
                    //Add the temp list to the main list
                    lstData.Add(lstTemp);

                    //Add the rest of the committee decisions
                    for (int j = 1; j < lstDecisions.Count; j++)
                    {
                        lstTemp = new List<string>();
                        memberName = lstDecisions[j].Employee.Emp_FullName;
                        //Check if still in the committee table to get his title
                        memberID = lstDecisions[j].TCD_CommitteeMemberID;
                        member = tpDB.CommitteeMembers.FirstOrDefault(c => c.Emp_ID == memberID);
                        if (member != null)
                        {
                            memberPosition = member.CoM_OrganizationalStructure;
                        }
                        else
                        {
                            memberPosition = "غير فعال";
                        }

                        //Get the approval status
                        if (lstDecisions[j].TCD_CommitteeApprovalStatus == 2)
                        {
                            memberDecision = "اعتماد";
                        }
                        else if (lstDecisions[j].TCD_CommitteeApprovalStatus == 3)
                        {
                            memberDecision = "رفض";
                        }

                        //Get the delegation
                        if (lstDecisions[j].TCD_AdminID == null)
                        {
                            memberDelegation = "اعتمد بنفسه";
                        }
                        else
                        {
                            memberDelegation = lstDecisions[j].Employee1.Emp_FullName;
                        }

                        //Add the data to the list
                        //Add an empty cells to the first part of the row
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        //Complete the row with data
                        lstTemp.Add(memberName);
                        lstTemp.Add(memberPosition);
                        lstTemp.Add(memberDecision);
                        lstTemp.Add(memberDelegation);
                        //Add the temp list to the main list
                        lstData.Add(lstTemp);
                    }
                }
                else
                {
                    //Add the temp list to the main list
                    lstData.Add(lstTemp);
                }

                //Add empty row
                lstTemp = new List<string> { "" };
                lstData.Add(lstTemp);
            }


            return lstData;
        }

        private List<List<string>> GetLoansData(string meetingSerial, string meetingDate, List<SubscriptionTransaction> transactions)
        {
            var lstData = new List<List<string>>();
            var lstTemp = new List<string>();

            //Fill the list with data
            //Add the table header
            lstTemp = new List<string> { "م", "الرقم الوظيفى", "الاسم", "الإدارة", "الوظيفة", "الهاتف الجوال", "مكافأة نهاية الخدمة", "نوع الطلب", "تاريخ الطلب", "حالة الطلب", "معتمد القرار", "مبلغ القرض", "قيمة القسط", "", "عضو اللجنة", "الهيكل التنظيمى", "القرار", "أناب عنه" };
            lstData.Add(lstTemp);

            //Fill the requests data
            for (int i = 0; i < transactions.Count; i++)
            {
                lstTemp = new List<string>();
                string requestType = "";
                lstTemp.Add((i + 1).ToString());
                lstTemp.Add(transactions[i].Emp_ID.ToString());
                lstTemp.Add(transactions[i].Employee.Emp_FullName);
                lstTemp.Add(transactions[i].Employee.Emp_Department);
                lstTemp.Add(transactions[i].Employee.Emp_Position);
                lstTemp.Add(transactions[i].Employee.Emp_MobileNumber);
                if (transactions[i].Employee.Emp_IsLocalCitizen != true)
                {
                    var es = transactions[i].Employee.EmployeeServices.OrderByDescending(d => d.EmS_OnDate).Take(1).FirstOrDefault();
                    if (es != null && es.EmS_EndOfServiceBenefit.HasValue)
                    {
                        lstTemp.Add(es.EmS_EndOfServiceBenefit.Value.ToString());
                    }
                    else
                    {
                        lstTemp.Add("0");
                    }
                }
                else
                {
                    lstTemp.Add("0");
                }


                switch (transactions[i].SuT_SubscriptionType)
                {
                    case 4:
                        requestType = "طلب قرض";
                        break;
                    case 5:
                        requestType = "تعديل قسط قرض";
                        break;
                    case 6:
                        requestType = "سداد قرض";
                        break;
                }

                lstTemp.Add(requestType);
                lstTemp.Add(transactions[i].SuT_Date.Value.ToShortDateString());
                lstTemp.Add(transactions[i].ApprovalStatu.ApS_ApprovalStatus);
                if (transactions[i].SuT_ApprovalNotes.Trim() == "بناءً على قرار اللجنة." && transactions[i].SuT_AdminID == null)
                {
                    lstTemp.Add("اللجنة");
                }
                else
                {
                    string name = "";
                    if (transactions[i].SuT_AdminID != null)
                    {
                        name = " (" + transactions[i].Employee2.Emp_FullName + ")";
                    }

                    lstTemp.Add("ادارى النظام" + name);
                }

                lstTemp.Add(transactions[i].LoanAmount.LAm_LoanAmount.Value.ToString());  //Loan
                if (transactions[i].SuT_Amount.HasValue)    //Installment
                {
                    lstTemp.Add(transactions[i].SuT_Amount.Value.ToString());
                }
                else
                {
                    lstTemp.Add("");
                }
                lstTemp.Add("");

                //Add the committee decisions
                var lstDecisions = transactions[i].TransactionCommitteeDecisions.ToList();
                if (lstDecisions.Count > 0)
                {
                    string memberName = "";
                    string memberPosition = "";
                    string memberDecision = "";
                    string memberDelegation = "";

                    //Add the data of the first committee member to the same row with the request data
                    memberName = lstDecisions[0].Employee.Emp_FullName;
                    //Check if still in the committee table to get his title
                    long memberID = lstDecisions[0].TCD_CommitteeMemberID;
                    var member = tpDB.CommitteeMembers.FirstOrDefault(c => c.Emp_ID == memberID);
                    if (member != null)
                    {
                        memberPosition = member.CoM_OrganizationalStructure;
                    }
                    else
                    {
                        memberPosition = "غير فعال";
                    }

                    //Get the approval status
                    if (lstDecisions[0].TCD_CommitteeApprovalStatus == 2)
                    {
                        memberDecision = "اعتماد";
                    }
                    else if (lstDecisions[0].TCD_CommitteeApprovalStatus == 3)
                    {
                        memberDecision = "رفض";
                    }

                    //Get the delegation
                    if (lstDecisions[0].TCD_AdminID == null)
                    {
                        memberDelegation = "اعتمد بنفسه";
                    }
                    else
                    {
                        memberDelegation = lstDecisions[0].Employee1.Emp_FullName;
                    }

                    //Add the data to the list
                    lstTemp.Add(memberName);
                    lstTemp.Add(memberPosition);
                    lstTemp.Add(memberDecision);
                    lstTemp.Add(memberDelegation);
                    //Add the temp list to the main list
                    lstData.Add(lstTemp);

                    //Add the rest of the committee decisions
                    for (int j = 1; j < lstDecisions.Count; j++)
                    {
                        lstTemp = new List<string>();
                        memberName = lstDecisions[j].Employee.Emp_FullName;
                        //Check if still in the committee table to get his title
                        memberID = lstDecisions[j].TCD_CommitteeMemberID;
                        member = tpDB.CommitteeMembers.FirstOrDefault(c => c.Emp_ID == memberID);
                        if (member != null)
                        {
                            memberPosition = member.CoM_OrganizationalStructure;
                        }
                        else
                        {
                            memberPosition = "غير فعال";
                        }

                        //Get the approval status
                        if (lstDecisions[j].TCD_CommitteeApprovalStatus == 2)
                        {
                            memberDecision = "اعتماد";
                        }
                        else if (lstDecisions[j].TCD_CommitteeApprovalStatus == 3)
                        {
                            memberDecision = "رفض";
                        }

                        //Get the delegation
                        if (lstDecisions[j].TCD_AdminID == null)
                        {
                            memberDelegation = "اعتمد بنفسه";
                        }
                        else
                        {
                            memberDelegation = lstDecisions[j].Employee1.Emp_FullName;
                        }

                        //Add the data to the list
                        //Add an empty cells to the first part of the row
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        lstTemp.Add("");
                        //Complete the row with data
                        lstTemp.Add(memberName);
                        lstTemp.Add(memberPosition);
                        lstTemp.Add(memberDecision);
                        lstTemp.Add(memberDelegation);
                        //Add the temp list to the main list
                        lstData.Add(lstTemp);
                    }
                }
                else
                {
                    //Add the temp list to the main list
                    lstData.Add(lstTemp);
                }

                //Add empty row
                lstTemp = new List<string> { "" };
                lstData.Add(lstTemp);
            }


            return lstData;
        }

    }
}
