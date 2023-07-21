using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Request_NewSubscription_Submit
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_NewSubscription_Submit.MainObject GetInitialData(long empID)
        {

            var defaultDataObj = new DataObjects.Internal.Request_NewSubscription_Submit.MainObject();
            var bus = new Common.Common.Business();

            var employee = bus.GetEmployee(empID);

            if (employee != null)
            {
                defaultDataObj.EmployeeNumber = employee.EmpID;
                defaultDataObj.Name = employee.FullName;
                defaultDataObj.Department = employee.Department;
                defaultDataObj.Position = employee.Position;
                defaultDataObj.Date = DateTime.UtcNow;
                defaultDataObj.SubscriptionBoundaries = bus.GetSubscriptionBoundaries(empID);
                //Check if max amount is within the allowed deduction percentage
                int maxAllowedDeduction = bus.GetMaxAllowedDeduction(empID);
                if (defaultDataObj.SubscriptionBoundaries.MaximumAmount > maxAllowedDeduction)
                {
                    defaultDataObj.SubscriptionBoundaries.MaximumAmount = maxAllowedDeduction;
                }

                if (defaultDataObj.SubscriptionBoundaries.MaximumAmount_Normal > maxAllowedDeduction)
                {
                    defaultDataObj.SubscriptionBoundaries.MaximumAmount_Normal = maxAllowedDeduction;
                }
            }


            return defaultDataObj;
        }

        public string Subscribe(long empID, int amount, string notes)
        {

            var bus = new Common.Common.Business();

            //Check if eligible to subscribe
            string result = bus.IsEligibleToRegister(empID);

            if (result != "True")
            {
                switch (result)
                {
                    case "EmployeeNotFound":
                        return result;
                        break;
                    case "AlreadyRegistered":
                        return result;
                        break;
                    case "NoEmail":
                        return result;
                        break;
                    default:
                        return result;
                        break;
                }
            }

            //Check if subscription amount within range
            var bounds = bus.GetSubscriptionBoundaries(empID);
            //Max allowed deduction amount
            int maxAllowedDeduction = bus.GetMaxAllowedDeduction(empID);

            if (amount > bounds.MaximumAmount || amount > maxAllowedDeduction || amount < bounds.MinimumAmount)
            {
                return "AmountIsOutsideBoundaries";
            }

            //Check if already sbmitted a request before
            FundSubscription fSub = tpDB.FundSubscriptions.FirstOrDefault(j => j.Emp_ID == empID && j.FSu_Status == null);
            if (fSub != null)
            {
                //Msg.Text = "طلبك السابق لازال قيد المراجعة";
                return "AlreadySubmittedRequest";
            }

            //Submit the request
            var subInfo = tpDB.SubscriptionInformations.First(j => j.SuI_IsActive == true);
            var suTSerial = from SubscriptionTransactions in tpDB.SubscriptionTransactions
                            where
                              SubscriptionTransactions.SuT_SubscriptionType == 1
                            orderby
                              SubscriptionTransactions.SuT_Year descending,
                              SubscriptionTransactions.SuT_Serial descending
                            select new
                            {
                                Emp_ID = SubscriptionTransactions.Emp_ID,
                                SuT_Year = SubscriptionTransactions.SuT_Year,
                                SuT_Serial = SubscriptionTransactions.SuT_Serial,
                                SuT_SubscriptionType = SubscriptionTransactions.SuT_SubscriptionType,
                                SuT_Date = SubscriptionTransactions.SuT_Date,
                                SuT_Amount = SubscriptionTransactions.SuT_Amount,
                                SuT_Notes = SubscriptionTransactions.SuT_Notes,
                                SuT_ApprovalStatus = SubscriptionTransactions.SuT_ApprovalStatus,
                                SuT_ApprovalDate = SubscriptionTransactions.SuT_ApprovalDate,
                                SuI_ID = SubscriptionTransactions.SuI_ID
                            };

            SubscriptionTransaction suT = new SubscriptionTransaction();
            FundSubscription fS = new FundSubscription();

            suT.Emp_ID = empID;
            suT.SuT_Year = DateTime.UtcNow.Year;
            suT.SuT_SubscriptionType = 1;
            suT.SuT_Date = DateTime.UtcNow;
            suT.SuT_Amount = amount;
            suT.SuT_Notes = notes;
            suT.SuT_ApprovalStatus = 1;
            suT.SuI_ID = subInfo.SuI_ID;

            if (suTSerial.FirstOrDefault() == null || DateTime.UtcNow.Year > suTSerial.FirstOrDefault().SuT_Year)
            {
                suT.SuT_Serial = 0001;
            }
            else
            {
                suT.SuT_Serial = suTSerial.FirstOrDefault().SuT_Serial + 1;
            }

            fS.Emp_ID = empID;
            fS.FSu_Date = DateTime.UtcNow;

            tpDB.SubscriptionTransactions.Add(suT);
            tpDB.FundSubscriptions.Add(fS);

            tpDB.SaveChanges();

            suT.FSu_ID = fS.FSu_ID;
            tpDB.Entry(suT).State = EntityState.Modified;
            tpDB.SaveChanges();

            //Msg.Text = "طلبك الآن قيد المراجعة ... سيتم ارسال بريد الكترونى ورسالة نصية الى الهاتف الخاص بك بحالة الطلب";


            return "True";

        }


    }
}
