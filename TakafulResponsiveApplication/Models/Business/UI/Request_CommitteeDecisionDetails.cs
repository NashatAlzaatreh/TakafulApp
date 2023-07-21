using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Request_CommitteeDecisionDetails
    {

        TakafulEntities tpDB = new TakafulEntities();

        public List<DataObjects.Internal.Request_CommitteeDecisionDetails.MainObject> GetInitialData(long empID, int year, int serial, int type)
        {

            var defaultDataObj = new List<DataObjects.Internal.Request_CommitteeDecisionDetails.MainObject>();

            var lstMembers = tpDB.CommitteeMembers.Include("Employee").OrderBy(c => c.CoM_OSSortingOrder).ToList();

            var lstDecisions = tpDB.TransactionCommitteeDecisions
                //.Include("Employee.CommitteeMember")
                .Where(d => d.Emp_ID == empID && d.SuT_Year == year && d.SuT_Serial == serial && d.SuT_SubscriptionType == type)
                .ToList();


            for (int i = 0; i < lstMembers.Count; i++)
            {
                var temp = new DataObjects.Internal.Request_CommitteeDecisionDetails.MainObject();
                temp.FullName = lstMembers[i].Employee.Emp_FullName;
                temp.OrganizationalStructure = lstMembers[i].CoM_OrganizationalStructure;

                var id = lstMembers[i].Emp_ID;
                var decision = lstDecisions.FirstOrDefault(d => d.TCD_CommitteeMemberID == id);
                if (decision == null)
                {
                    temp.Decision = "-";
                    temp.DecisionEntry = "-";
                }
                else
                {
                    //Decision
                    if (decision.TCD_CommitteeApprovalStatus == 2)
                    {
                        temp.Decision = "اعتماد";
                    }
                    else if (decision.TCD_CommitteeApprovalStatus == 3)
                    {
                        temp.Decision = "رفض";
                    }

                    //Decision entry
                    if (decision.TCD_AdminID == null)
                    {
                        temp.DecisionEntry = "بنفسه";
                    }
                    else
                    {
                        temp.DecisionEntry = decision.Employee1.Emp_FullName;
                    }
                }

                defaultDataObj.Add(temp);
            }



            return defaultDataObj;
        }

    }
}
