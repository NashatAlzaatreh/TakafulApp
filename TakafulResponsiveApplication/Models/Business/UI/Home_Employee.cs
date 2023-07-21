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
    public class Home_Employee
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Home_Employee.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Home_Employee.MainObject();
            var empID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());
            var bus = new Common.Common.Business();

            //Get the info files URL
            SolidarityFundInformation sFI = bus.GetSolidarityFundInformation();
            if (sFI != null)
            {
                defaultDataObj.InfoFile1 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath1;
                defaultDataObj.InfoFile2 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath2;
                defaultDataObj.InfoFile3 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath3;
            }

            //Get the data for notification area
            //Current subscription amount
            var filter = new List<Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider>()
            {
                new Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                {
                    PropertyName = "Emp_ID",
                    InnerOperator = Common.Common.Utility.GenericExpressionBuilder.InnerOperator.Equal,
                    Value = empID,
                    OuterOperator = Common.Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                },
                new Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                {
                    PropertyName = "SuT_ApprovalStatus",
                    InnerOperator = Common.Common.Utility.GenericExpressionBuilder.InnerOperator.Equal,
                    Value = 2,
                    OuterOperator = Common.Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                },
                new Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                {
                    PropertyName = "",
                    InnerOperator = Common.Common.Utility.GenericExpressionBuilder.InnerOperator.NotEqual,
                    Value = null,
                    OuterOperator = Common.Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso,
                    SubExpressions = new List<Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider>()
                    {
                        new Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                        {
                            PropertyName = "SuT_SubscriptionType",
                            InnerOperator = Common.Common.Utility.GenericExpressionBuilder.InnerOperator.Equal,
                            Value = 1,
                            OuterOperator = Common.Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                        },
                        new Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                        {
                            PropertyName = "SuT_SubscriptionType",
                            InnerOperator = Common.Common.Utility.GenericExpressionBuilder.InnerOperator.Equal,
                            Value = 2,
                            OuterOperator = Common.Common.Utility.GenericExpressionBuilder.OuterOperator.OrElse
                        }
                    }
                }
            };


            var subs = bus.GetSubscriptionTransactions(filter).OrderByDescending(s => s.SortIndex).Take(1).ToList();
            if (subs.Count > 0)
            {
                defaultDataObj.MonthlySubscriptionAmount = subs[0].SuT_Amount;
            }

            //Total subscription amount
            filter = new List<Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider>()
            {
                new Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                {
                    PropertyName = "Emp_ID",
                    InnerOperator = Common.Common.Utility.GenericExpressionBuilder.InnerOperator.Equal,
                    Value = empID,
                    OuterOperator = Common.Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                },
                new Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                {
                    PropertyName = "FSu_Status",
                    InnerOperator = Common.Common.Utility.GenericExpressionBuilder.InnerOperator.Equal,
                    Value = 1,
                    OuterOperator = Common.Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                }
            };

            var fus = bus.GetFundSubscriptions(filter).FirstOrDefault();

            if (fus != null)
            {
                defaultDataObj.TotalSubscriptions = bus.GetTotalSubscriptionsForFundSubscription(fus.FSu_ID);
                //Check if subscribed since one year at least
                DateTime date = fus.FSu_Date.Date.AddYears(1);
                if (date <= DateTime.UtcNow.Date && defaultDataObj.TotalSubscriptions.HasValue && defaultDataObj.TotalSubscriptions >= 11000)
                {
                    defaultDataObj.ZakahAmount = (int)Math.Ceiling((double)defaultDataObj.TotalSubscriptions.Value / 40);
                }
            }
            else
            {
                defaultDataObj.TotalSubscriptions = null;
            }

            //Loan details (only the LAST active loan)
            filter = new List<Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider>()
            {
                new Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                {
                    PropertyName = "Emp_ID",
                    InnerOperator = Common.Common.Utility.GenericExpressionBuilder.InnerOperator.Equal,
                    Value = empID,
                    OuterOperator = Common.Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                },
                new Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                {
                    PropertyName = "LAm_Status",
                    InnerOperator = Common.Common.Utility.GenericExpressionBuilder.InnerOperator.Equal,
                    Value = 1,
                    OuterOperator = Common.Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                }
            };


            var lA = bus.GetLoanAmounts(filter).OrderByDescending(l => l.LAm_Date).FirstOrDefault();

            if (lA != null)
            {
                defaultDataObj.LoanAmount = lA.LAm_LoanAmount;

                //Current loan installment
                defaultDataObj.LoanInstallment = bus.GetLoanInstallment(lA.LAm_ID);

                //Loan paid amount & remaining amount
                defaultDataObj.PaidLoanAmount = bus.GetPaidAmountOfLoan(lA.LAm_ID);
            }

            //Last submitted request
            filter = new List<Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider>()
            {
                new Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                {
                    PropertyName = "Emp_ID",
                    InnerOperator = Common.Common.Utility.GenericExpressionBuilder.InnerOperator.Equal,
                    Value = empID,
                    OuterOperator = Common.Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                },
                new Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                {
                    PropertyName = "SuT_ApprovalStatus",
                    InnerOperator = Common.Common.Utility.GenericExpressionBuilder.InnerOperator.NotEqual,
                    Value = 2,
                    OuterOperator = Common.Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                },
                new Common.Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                {
                    PropertyName = "SuT_ApprovalStatus",
                    InnerOperator = Common.Common.Utility.GenericExpressionBuilder.InnerOperator.NotEqual,
                    Value = 3,
                    OuterOperator = Common.Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                }
            };


            var lastRequest = bus.GetSubscriptionTransactions(filter).OrderByDescending(l => l.SortIndex).FirstOrDefault();
            var type = "-";

            if (lastRequest != null)
            {
                switch (lastRequest.SuT_SubscriptionType)
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
                        type = "تعديل قسط القرض";
                        break;
                    case 6:
                        type = "سداد القرض";
                        break;
                }
                defaultDataObj.LastRequestType = type;
                defaultDataObj.LastRequestDate = lastRequest.SuT_Date;
            }


            return defaultDataObj;

        }


    }
}
