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
    public class Report_AdminDecisions
    {

        TakafulEntities tpDB = new TakafulEntities();

        public object Export(DateTime from, DateTime to)
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


            //Get all the approved (or rejected) requests which where not related to any meeting (decision made by admin)
            var allRequests = tpDB.SubscriptionTransactions
                .Where(s => s.SuT_Date >= from &&
                            s.SuT_Date <= to &&
                            (s.SuT_ApprovalStatus == 2 || s.SuT_ApprovalStatus == 3) &&
                            (s.MeetingTransactions.Any() == false || (s.MeetingTransactions.Any() == true && s.SuT_ApprovalNotes.Trim() != "بناءً على قرار اللجنة."))
                )
                .OrderBy(s => s.SortIndex)
                .ToList();

            //Get subscription data
            var lstSubs = allRequests.Where(al => al.SuT_SubscriptionType == 1 || al.SuT_SubscriptionType == 2 || al.SuT_SubscriptionType == 3).ToList();
            lstSubscriptionsData = this.GetSubscriptionRequestsData(lstSubs);

            //Get loans data
            var lstLoans = allRequests.Where(al => al.SuT_SubscriptionType == 4 || al.SuT_SubscriptionType == 5 || al.SuT_SubscriptionType == 6).ToList();
            lstLoansData = this.GetLoansData(lstLoans);

            //Fill the list with data
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

        private List<List<string>> GetSubscriptionRequestsData(List<SubscriptionTransaction> transactions)
        {
            var lstData = new List<List<string>>();
            var lstTemp = new List<string>();

            //Fill the list with data
            //Add the table header
            lstTemp = new List<string> { "م", "الرقم الوظيفى", "الاسم", "الإدارة", "الوظيفة", "الهاتف الجوال", "مكافأة نهاية الخدمة", "نوع الطلب", "تاريخ الطلب", "حالة الطلب", "معتمد القرار", "محول الى اللجنة", "قيمة الاشتراك" };
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
                if (transactions[i].SuT_AdminID != null)
                {
                    lstTemp.Add(transactions[i].Employee2.Emp_FullName);
                }
                else
                {
                    lstTemp.Add("");
                }

                if (transactions[i].MeetingTransactions.Any())
                {
                    lstTemp.Add("نعم");
                }
                else
                {
                    lstTemp.Add("لا");
                }

                if (transactions[i].SuT_Amount.HasValue)
                {
                    lstTemp.Add(transactions[i].SuT_Amount.Value.ToString());
                }
                else
                {
                    lstTemp.Add("");
                }


                lstData.Add(lstTemp);
            }


            return lstData;
        }

        private List<List<string>> GetLoansData(List<SubscriptionTransaction> transactions)
        {
            var lstData = new List<List<string>>();
            var lstTemp = new List<string>();

            //Fill the list with data
            //Add the table header
            lstTemp = new List<string> { "م", "الرقم الوظيفى", "الاسم", "الإدارة", "الوظيفة", "الهاتف الجوال", "مكافأة نهاية الخدمة", "نوع الطلب", "تاريخ الطلب", "حالة الطلب", "معتمد القرار", "محول الى اللجنة", "مبلغ القرض", "قيمة القسط" };
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
                if (transactions[i].SuT_AdminID != null)
                {
                    lstTemp.Add(transactions[i].Employee2.Emp_FullName);
                }
                else
                {
                    lstTemp.Add("");
                }

                if (transactions[i].MeetingTransactions.Any())
                {
                    lstTemp.Add("نعم");
                }
                else
                {
                    lstTemp.Add("لا");
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

                lstData.Add(lstTemp);
            }


            return lstData;
        }

    }
}
