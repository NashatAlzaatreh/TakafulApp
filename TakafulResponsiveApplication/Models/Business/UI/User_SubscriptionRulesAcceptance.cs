using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class User_SubscriptionRulesAcceptance
    {

        TakafulEntities tpDB = new TakafulEntities();


        public DataObjects.Internal.User_SubscriptionRulesAcceptance GetIsApprovalNewRolesTable(long empid)
        {
            DataObjects.Internal.User_SubscriptionRulesAcceptance SubscriptionRulesAcceptance = null;

            var emp = tpDB.SubscriptionRulesAcceptances.Where(x => x.Emp_ID == empid).FirstOrDefault();
            if (emp != null)
            {
                SubscriptionRulesAcceptance = new DataObjects.Internal.User_SubscriptionRulesAcceptance();
                SubscriptionRulesAcceptance.Emp_ID = emp.Emp_ID;
                SubscriptionRulesAcceptance.Acceptance = emp.Acceptance;
                SubscriptionRulesAcceptance.AcceptanceDate = emp.AcceptanceDate;
                SubscriptionRulesAcceptance.Source = emp.Source;

            }
             
            return SubscriptionRulesAcceptance;
        }

        public bool DoIsApprovalNewRolesTable(long empid,bool IsApproval,string note)
        {
            bool isAdded = false;
            SubscriptionRulesAcceptance SubscriptionRulesAcceptance = null;
            try
            {
                var emp = tpDB.SubscriptionRulesAcceptances.Where(x => x.Emp_ID == empid).FirstOrDefault();
                if (emp == null)
                {
                    SubscriptionRulesAcceptance = new SubscriptionRulesAcceptance();
                    SubscriptionRulesAcceptance.Emp_ID =(int) empid; //emp.EmpID;
                    SubscriptionRulesAcceptance.Acceptance = IsApproval; //emp.isApproval;
                    SubscriptionRulesAcceptance.AcceptanceDate = DateTime.Now;
                    SubscriptionRulesAcceptance.Source = note;

                    tpDB.SubscriptionRulesAcceptances.Add(SubscriptionRulesAcceptance);
                    tpDB.SaveChanges();

                    isAdded = true;
                }
                else
                {
                    emp.Acceptance = IsApproval;
                    emp.Source = note;
                    emp.AcceptanceDate = DateTime.Now;

                    tpDB.SaveChanges();

                    isAdded = true;
                }
            }catch(Exception ex)
            {
                isAdded = false;
            }

            return isAdded;
        }

    }
}