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
    public class Home_CommitteeMember
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Home_CommitteeMember.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Home_CommitteeMember.MainObject();
            var bus = new Common.Common.Business();
            var committeeMemberID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());

            //Get the info files URL
            SolidarityFundInformation sFI = bus.GetSolidarityFundInformation();
            if (sFI != null)
            {
                defaultDataObj.InfoFile1 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath1;
                defaultDataObj.InfoFile2 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath2;
                defaultDataObj.InfoFile3 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath3;
            }

            //Get the submitted requests
            var me = tpDB.Meetings.FirstOrDefault(m => m.Mee_IsActive == true && m.Mee_IsOpenForEvaluation == true);

            if (me == null)
            {
                return defaultDataObj;
            }

            var requests =
                tpDB.SubscriptionTransactions.Include("Employee")
                    .Where(
                        s =>
                            (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5) &&
                            s.MeetingTransactions.Any(mt => mt.Mee_ID == me.Mee_ID) &&
                            s.TransactionCommitteeDecisions.FirstOrDefault(
                                d => d.TCD_CommitteeMemberID == committeeMemberID) == null)
                    .OrderBy(s => s.SortIndex)
                    .ToList();


            if (requests.Count > 0)
            {
                defaultDataObj.Requests_Subscription_New = requests.Count(r => r.SuT_SubscriptionType == 1);
                defaultDataObj.Requests_Subscription_Modification = requests.Count(r => r.SuT_SubscriptionType == 2);
                defaultDataObj.Requests_Subscription_Cancellation = requests.Count(r => r.SuT_SubscriptionType == 3);
                defaultDataObj.Requests_Loan_New = requests.Count(r => r.SuT_SubscriptionType == 4);
                defaultDataObj.Requests_Loan_Modification = requests.Count(r => r.SuT_SubscriptionType == 5);
                defaultDataObj.Requests_Loan_Cancellation = requests.Count(r => r.SuT_SubscriptionType == 6);
            }


            return defaultDataObj;

        }


    }
}
