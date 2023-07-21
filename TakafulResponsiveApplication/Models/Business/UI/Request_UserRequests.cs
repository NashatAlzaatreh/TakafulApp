using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Request_UserRequests
    {

        TakafulEntities tpDB = new TakafulEntities();

        public List<DataObjects.Internal.Request_UserRequests.MainObject> GetInitialData()
        {

            var empID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());

            var defaultDataObj = new List<DataObjects.Internal.Request_UserRequests.MainObject>();

            var lstRequests = tpDB.SubscriptionTransactions.Include("ApprovalStatu").Include("LoanAmount").Where(s => s.Emp_ID == empID).OrderByDescending(s => s.SortIndex).ToList();

            if (lstRequests.Count > 0)
            {
                for (int i = 0; i < lstRequests.Count; i++)
                {
                    var temp = new DataObjects.Internal.Request_UserRequests.MainObject();
                    string type = "";
                    string amount = "-";

                    switch (lstRequests[i].SuT_SubscriptionType)
                    {
                        case 1:
                            type = "طلب اشتراك";
                            break;
                        case 2:
                            type = "تعديل اشتراك";
                            break;
                        case 3:
                            type = "إلغاء اشتراك";
                            break;
                        case 4:
                            type = "طلب قرض";
                            break;
                        case 5:
                            type = "تعديل قرض";
                            break;
                        case 6:
                            type = "إلغاء قرض";
                            break;
                    }

                    temp.Type = type;
                    temp.Date = lstRequests[i].SuT_Date.Value.ToShortDateString();
                    temp.Status = lstRequests[i].ApprovalStatu.ApS_ApprovalStatus;

                    if (lstRequests[i].SuT_Amount != null)
                    {
                        if (lstRequests[i].SuT_SubscriptionType == 4)   //New loan
                        {
                            amount = lstRequests[i].LoanAmount.LAm_LoanAmount.ToString() + " - " + lstRequests[i].SuT_Amount.ToString();
                        }
                        else
                        {
                            amount = lstRequests[i].SuT_Amount.ToString();
                        }
                    }

                    //Check if can be cancelled by the user
                    if (lstRequests[i].SuT_ApprovalStatus == 1) //Can be cancelled, set the cancellation params
                    {
                        temp.CancellationKey = new DataObjects.Internal.Request_UserRequests.RequestCancellationKey();
                        temp.CancellationKey.Year = lstRequests[i].SuT_Year;
                        temp.CancellationKey.Serial = lstRequests[i].SuT_Serial;
                    }


                    temp.Amount = amount;
                    defaultDataObj.Add(temp);
                }
            }

            return defaultDataObj;

        }

        public string WithdrawSubmittedRequest(int year, int serial)
        {
            var bus = new Common.Common.Business();

            var empID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());

            return bus.WithdrawUserRequest(empID,year,  serial,"Rejected by the user himself.");
        }

    }
}
