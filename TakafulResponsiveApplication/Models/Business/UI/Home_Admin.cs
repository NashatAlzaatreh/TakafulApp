using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Home_Admin
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Home_Admin.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Home_Admin.MainObject();
            var bus = new Common.Common.Business();

            //Get the info files URL
            SolidarityFundInformation sFI = bus.GetSolidarityFundInformation();
            if (sFI != null)
            {
                defaultDataObj.InfoFile1 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath1;
                defaultDataObj.InfoFile2 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath2;
                defaultDataObj.InfoFile3 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath3;
            }

            //Get the submitted requests
            //var requests = tpDB.SubscriptionTransactions.Where(st => st.SuT_ApprovalStatus != 2 && st.SuT_ApprovalStatus != 3).ToList();
            var filter = new List<Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider>()
                {
                    new Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider{PropertyName = "SuT_ApprovalStatus",InnerOperator = Common.Common.Utility.GenericExpressionBuilder.InnerOperator.NotEqual,Value = 2,OuterOperator = Common.Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso},
                    new Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider{PropertyName = "SuT_ApprovalStatus",InnerOperator = Common.Common.Utility.GenericExpressionBuilder.InnerOperator.NotEqual,Value = 3,OuterOperator = Common.Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso}
                };


            var requests = bus.GetSubscriptionTransactions(filter).ToList();


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
