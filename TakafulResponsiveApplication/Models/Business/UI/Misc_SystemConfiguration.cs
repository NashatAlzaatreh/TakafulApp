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
    public class Misc_SystemConfiguration
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Misc_SystemConfiguration.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Misc_SystemConfiguration.MainObject();

            var si = tpDB.SubscriptionInformations.FirstOrDefault(j => j.SuI_IsActive == true);
            var sfi = tpDB.SolidarityFundInformations.First();

            if (si != null)
            {
                defaultDataObj.SubscriptionPercentage = si.SuI_MinimumSubscription.Value;
                defaultDataObj.MinSubscriptionAmount = si.SuI_MinimumAmount.Value;
                defaultDataObj.MaxSubscriptionAmount = si.SuI_MaximumAmount.Value;
                defaultDataObj.MaxInstallmentsCount = si.SuI_NumberOfInstallments.Value;
                defaultDataObj.MinSubscriptionPeriod = si.SuI_LessSubscriptionPeriodForLoan.Value;
                defaultDataObj.MaxLoanAmount1 = si.SuI_LoanFirstAmount.Value;
                defaultDataObj.MaxLoanAmount2 = si.SuI_LoanMaximumAmount.Value;
                defaultDataObj.TotalSubscriptionForMaxLoanAmount = si.SuI_SubscriptionAmount.Value;
                defaultDataObj.MinPeriodBetweenLoans = si.SuI_PeriodBetweenLoans.Value;
                defaultDataObj.MaxDeductionPercentage = si.SuI_MaxDeductionPercentage.Value;
                defaultDataObj.SuI_LessPeriodForLoan4ReSubscriber = si.SuI_LessPeriodForLoan4ReSubscriber;
                defaultDataObj.SuI_LessPeriodForReSbubscrition = si.SuI_LessPeriodForReSbubscrition;
                defaultDataObj.SuI_LessPeriodForLoanNewEmployee = si.SuI_LessPeriodForLoanNewEmployee;
            }

            defaultDataObj.Email = sfi.SFI_GeneralEmail;


            return defaultDataObj;
        }

        public string Save(int subscriptionPercentage, int minSubscriptionAmount, int maxSubscriptionAmount, int maxInstallmentsCount, int minSubscriptionPeriod, int maxLoanAmount1, int maxLoanAmount2, int totalSubscriptionForMaxLoanAmount, int minPeriodBetweenLoans, int maxDeductionPercentage, string email,int suI_LessPeriodForLoan4ReSubscriber ,int suI_LessPeriodForReSbubscrition,int suI_LessPeriodForLoanNewEmployee)
        {

            //Input validation
            if (string.IsNullOrEmpty(email))
            {
                return "NotValidData";
            }

            var si = tpDB.SubscriptionInformations.FirstOrDefault(j => j.SuI_IsActive == true);
            var sfi = tpDB.SolidarityFundInformations.First();

            if (si == null) //Add new configuration entity
            {
                si = new SubscriptionInformation();
                si.SuI_MinimumSubscription = subscriptionPercentage;
                si.SuI_MinimumAmount = minSubscriptionAmount;
                si.SuI_MaximumAmount = maxSubscriptionAmount;
                si.SuI_NumberOfInstallments = maxInstallmentsCount;
                si.SuI_LessSubscriptionPeriodForLoan = minSubscriptionPeriod;
                si.SuI_LoanFirstAmount = maxLoanAmount1;
                si.SuI_LoanMaximumAmount = maxLoanAmount2;
                si.SuI_SubscriptionAmount = totalSubscriptionForMaxLoanAmount;
                si.SuI_PeriodBetweenLoans = minPeriodBetweenLoans;
                si.SuI_MaxDeductionPercentage = maxDeductionPercentage;
                si.SuI_IsActive = true;
                
                si.SuI_LessPeriodForLoan4ReSubscriber = suI_LessPeriodForLoan4ReSubscriber;
                si.SuI_LessPeriodForReSbubscrition = suI_LessPeriodForReSbubscrition;
                si.SuI_LessPeriodForLoanNewEmployee = suI_LessPeriodForLoanNewEmployee;

                tpDB.SubscriptionInformations.Add(si);
            }
            else    //Edit the current configuration
            {
                si.SuI_MinimumSubscription = subscriptionPercentage;
                si.SuI_MinimumAmount = minSubscriptionAmount;
                si.SuI_MaximumAmount = maxSubscriptionAmount;
                si.SuI_NumberOfInstallments = maxInstallmentsCount;
                si.SuI_LessSubscriptionPeriodForLoan = minSubscriptionPeriod;
                si.SuI_LoanFirstAmount = maxLoanAmount1;
                si.SuI_LoanMaximumAmount = maxLoanAmount2;
                si.SuI_SubscriptionAmount = totalSubscriptionForMaxLoanAmount;
                si.SuI_PeriodBetweenLoans = minPeriodBetweenLoans;
                si.SuI_MaxDeductionPercentage = maxDeductionPercentage;
                
                si.SuI_LessPeriodForLoan4ReSubscriber = suI_LessPeriodForLoan4ReSubscriber;
                si.SuI_LessPeriodForReSbubscrition = suI_LessPeriodForReSbubscrition;
                si.SuI_LessPeriodForLoanNewEmployee = suI_LessPeriodForLoanNewEmployee;

                tpDB.Entry(si).State = EntityState.Modified;
            }

            sfi.SFI_GeneralEmail = email.Trim();
            tpDB.Entry(sfi).State = EntityState.Modified;

            //Save
            tpDB.SaveChanges();


            return "True";
        }


    }
}
