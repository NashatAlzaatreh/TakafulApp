using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Misc_CommitteeMembers
    {

        TakafulEntities tpDB = new TakafulEntities();

        public List<DataObjects.Internal.Misc_CommitteeMembers.MainObject> GetInitialData()
        {

            var defaultDataObj = new List<DataObjects.Internal.Misc_CommitteeMembers.MainObject>();
            var comMembers = (from i in tpDB.Employees join j in tpDB.CommitteeMembers on i.Emp_ID equals j.Emp_ID orderby j.CoM_OSSortingOrder ascending select new { EmployeeUser = i.Emp_ID, i.Emp_FullName, j.CoM_OrganizationalStructure, j.CoM_ImagePath }).ToList();

            if (comMembers.Count > 0)
            {
                for (int i = 0; i < comMembers.Count; i++)
                {
                    var temp = new DataObjects.Internal.Misc_CommitteeMembers.MainObject();
                    temp.FullName = comMembers[i].Emp_FullName;
                    temp.OrganizationalStructure = comMembers[i].CoM_OrganizationalStructure;
                    temp.ImagePath = Common.Common.CurrentHostingServer.Host + "/" + comMembers[i].CoM_ImagePath;
                    defaultDataObj.Add(temp);
                }
            }

            return defaultDataObj;

        }

    }
}
