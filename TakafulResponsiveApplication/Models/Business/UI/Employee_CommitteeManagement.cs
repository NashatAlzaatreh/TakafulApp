using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.OleDb;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using DocumentFormat.OpenXml.Wordprocessing;
using TakafulResponsiveApplication.Models.DB;
using System.IO;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Employee_CommitteeManagement
    {

        TakafulEntities tpDB = new TakafulEntities();

        public List<DataObjects.Internal.Employee_CommitteeManagement.MainObject> GetInitialData()
        {

            var defaultDataObj = new List<DataObjects.Internal.Employee_CommitteeManagement.MainObject>();
            var lstMembers = tpDB.CommitteeMembers.Include("Employee").OrderBy(c => c.CoM_OSSortingOrder).ToList();

            for (int i = 0; i < lstMembers.Count; i++)
            {
                var temp = new DataObjects.Internal.Employee_CommitteeManagement.MainObject();
                temp.EmpID = lstMembers[i].Emp_ID;
                temp.Name = lstMembers[i].Employee.Emp_FullName;
                temp.OrganizationalStructure = lstMembers[i].CoM_OrganizationalStructure;
                temp.Title = lstMembers[i].CoM_Title;
                temp.ImagePath = Common.Common.CurrentHostingServer.Host + "/" + lstMembers[i].CoM_ImagePath;
                defaultDataObj.Add(temp);
            }


            return defaultDataObj;
        }

        public List<DataObjects.Internal.Employee_CommitteeManagement.MainObject> Save(long empID, string title, string imageFileName, out string resultMessage)
        {

            var member = tpDB.CommitteeMembers.FirstOrDefault(c => c.Emp_ID == empID);

            member.CoM_Title = title;

            //Check if new image file
            if (imageFileName.Trim() != "")
            {
                //imageFileName = imageFileName.Replace("dottttt", ".");
                //Check if default file
                string oldImagePath = HttpContext.Current.Server.MapPath("~/" + member.CoM_ImagePath);
                string oldImageName = Path.GetFileNameWithoutExtension(oldImagePath);
                if (oldImageName == empID.ToString())   //Not a default file but a real picture
                {
                    File.Delete(oldImagePath);
                }

                string newImagePath_Temp = HttpContext.Current.Server.MapPath("~/" + Common.Common.PathConfig.UploadPath_Temp + "/" + imageFileName);
                string newImagePath_Perm = HttpContext.Current.Server.MapPath("~/" + Common.Common.PathConfig.UploadPath_Committee + "/" + empID.ToString() + Path.GetExtension(imageFileName));
                File.Move(newImagePath_Temp, newImagePath_Perm);

                member.CoM_ImagePath = Common.Common.PathConfig.UploadPath_Committee + "/" + empID.ToString() + Path.GetExtension(imageFileName);
            }

            tpDB.Entry(member).State = EntityState.Modified;

            //Save data
            tpDB.SaveChanges();


            resultMessage = "True";
            return this.GetInitialData();

        }

        public List<DataObjects.Internal.Employee_CommitteeManagement.MainObject> Move(long empID, int direction, out string resultMessage)
        {

            var member = tpDB.CommitteeMembers.FirstOrDefault(c => c.Emp_ID == empID);

            if (direction == 1) //Up
            {
                if (member.CoM_OSSortingOrder > 1)
                {
                    int newOrder = member.CoM_OSSortingOrder.Value - 1;
                    var swappedMember = tpDB.CommitteeMembers.FirstOrDefault(c => c.CoM_OSSortingOrder == newOrder);
                    member.CoM_OSSortingOrder = 9997;
                    swappedMember.CoM_OSSortingOrder = 9998;
                    tpDB.Entry(member).State = EntityState.Modified;
                    tpDB.Entry(swappedMember).State = EntityState.Modified;
                    tpDB.SaveChanges();
                    member.CoM_OSSortingOrder = newOrder;
                    swappedMember.CoM_OSSortingOrder = newOrder + 1;
                    member.CoM_OrganizationalStructure = GetOrganizationalStructure(member.CoM_OSSortingOrder.Value);
                    swappedMember.CoM_OrganizationalStructure = GetOrganizationalStructure(swappedMember.CoM_OSSortingOrder.Value);
                    tpDB.Entry(member).State = EntityState.Modified;
                    tpDB.SaveChanges();
                }

            }
            else if (direction == 2)    //Down
            {
                if (member.CoM_OSSortingOrder < tpDB.CommitteeMembers.Count())
                {
                    int newOrder = member.CoM_OSSortingOrder.Value + 1;
                    var swappedMember = tpDB.CommitteeMembers.FirstOrDefault(c => c.CoM_OSSortingOrder == newOrder);
                    member.CoM_OSSortingOrder = 9997;
                    swappedMember.CoM_OSSortingOrder = 9998;
                    tpDB.Entry(member).State = EntityState.Modified;
                    tpDB.Entry(swappedMember).State = EntityState.Modified;
                    tpDB.SaveChanges();
                    member.CoM_OSSortingOrder = newOrder;
                    swappedMember.CoM_OSSortingOrder = newOrder - 1;
                    member.CoM_OrganizationalStructure = GetOrganizationalStructure(member.CoM_OSSortingOrder.Value);
                    swappedMember.CoM_OrganizationalStructure = GetOrganizationalStructure(swappedMember.CoM_OSSortingOrder.Value);
                    tpDB.Entry(member).State = EntityState.Modified;
                    tpDB.SaveChanges();
                }
            }



            resultMessage = "True";
            return this.GetInitialData();
        }

        private string GetOrganizationalStructure(int sortingIndex)
        {

            string result = "عضو";

            switch (sortingIndex)
            {
                case 1:
                    result = "رئيس اللجنة";
                    break;
                case 2:
                    result = "نائب رئيس اللجنة";
                    break;
                case 3:
                    result = "عضو / مقرر اللجنة";
                    break;
                case 4:
                    result = "عضو / محاسب";
                    break;
                case 5:
                    result = "عضو / محاسب";
                    break;
            }


            return result;
        }

    }
}
