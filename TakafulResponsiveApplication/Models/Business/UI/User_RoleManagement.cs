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
    public class User_RoleManagement
    {

        TakafulEntities tpDB = new TakafulEntities();

        public List<DataObjects.Internal.User_RoleManagement.MainObject> GetInitialData()
        {

            var defaultDataObj = new List<DataObjects.Internal.User_RoleManagement.MainObject>();
            var bus = new Common.Common.Business();

            //Get only the subscribed employees
            //var lstEmployees = tpDB.Employees.Include("CommitteeMember").Where(e => e.Emp_AccountStatus == true).OrderBy(e => e.Emp_ID).ToList();
            var lstEmployees = tpDB.Employees.Where(e => e.FundSubscriptions.FirstOrDefault(f => f.FSu_Status == 1) != null).OrderBy(e => e.Emp_ID).ToList();

            for (int i = 0; i < lstEmployees.Count; i++)
            {
                var temp = new DataObjects.Internal.User_RoleManagement.MainObject();
                temp.EmployeeNumber = lstEmployees[i].Emp_ID;
                temp.Name = lstEmployees[i].Emp_FullName;
                temp.Department = lstEmployees[i].Emp_Department;

                if (lstEmployees[i].Emp_IsAdmin == true)
                {
                    temp.IsAdmin = true;
                }

                if (lstEmployees[i].Emp_IsHelpDesk == true)
                {
                    temp.IsHelpDesk = true;
                }

                if (lstEmployees[i].CommitteeMember != null)
                {
                    temp.IsCommitteeMember = true;
                }

                defaultDataObj.Add(temp);
            }



            return defaultDataObj;
        }

        public string SetRole(long empID, int role, bool value)
        {
            var currentEmpID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());

            //Get the employee
            var employee = tpDB.Employees.FirstOrDefault(em => em.Emp_ID == empID && em.FundSubscriptions.FirstOrDefault(f => f.FSu_Status == 1) != null);

            if (employee == null)
            {
                return "NotFound";
            }

            if (role == 1)  //Admin
            {
                if (value == false) //Check if admin removing himself
                {
                    if (empID == currentEmpID)
                    {
                        return "CannotRemoveYourself_" + empID.ToString();
                    }
                }
                employee.Emp_IsAdmin = value;
                tpDB.Entry(employee).State = EntityState.Modified;
            }
            else if (role == 3) //Help desk
            {
                employee.Emp_IsHelpDesk = value;
                tpDB.Entry(employee).State = EntityState.Modified;
            }
            else if (role == 2) //Committee member
            {
                var member = tpDB.CommitteeMembers.FirstOrDefault(c => c.Emp_ID == empID);

                if (value == true)  //Add to committee members
                {
                    if (member == null)
                    {
                        member = new CommitteeMember();
                        member.Emp_ID = empID;
                        member.CoM_Title = "";
                        member.CoM_OrganizationalStructure = "عضو";
                        member.CoM_ImagePath = "Uploads/CommitteeMembers/contact-icon.png";
                        //member.CoM_OSSortingOrder = tpDB.CommitteeMembers.Count() + 1;
                        member.CoM_OSSortingOrder = this.GetNewSortingOrder();
                        tpDB.CommitteeMembers.Add(member);
                    }
                }
                else    //Remove from committee members
                {
                    if (member != null)
                    {
                        //Delete the committee member picture
                        var imagePath = HttpContext.Current.Server.MapPath("~/" + member.CoM_ImagePath);
                        string imageFileName = Path.GetFileName(imagePath);

                        if (imageFileName != "contact-icon.png")
                        {
                            File.Delete(imagePath);
                        }

                        //Delete the member entity
                        tpDB.Entry(member).State = EntityState.Deleted;
                        //Save
                        tpDB.SaveChanges();
                        //Update th sorting index
                        var lstMembers = tpDB.CommitteeMembers.OrderBy(c => c.CoM_OSSortingOrder).ToList();
                        //for (int i = 0; i < lstMembers.Count; i++)
                        //{
                        //    lstMembers[i].CoM_OSSortingOrder = i + 1;
                        //    tpDB.Entry(lstMembers[i]).State = EntityState.Modified;
                        //}
                        if (lstMembers.Count > 0)
                        {
                            for (int i = 0; i < lstMembers.Count; i++)
                            {
                                lstMembers[i].CoM_OSSortingOrder = i + 1001;
                                tpDB.Entry(lstMembers[i]).State = EntityState.Modified;
                            }
                            tpDB.SaveChanges();
                            for (int i = 0; i < lstMembers.Count; i++)
                            {
                                lstMembers[i].CoM_OSSortingOrder = i + 1;
                                tpDB.Entry(lstMembers[i]).State = EntityState.Modified;
                            }
                            tpDB.SaveChanges();
                        }
                    }
                }
            }

            //Save
            tpDB.SaveChanges();


            return "True";
        }

        public string ExportDataToExcel(List<List<string>> data, string path)
        {

            string fileName = "EmployeesRoles";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }


        //////////////////////////////////////////////////////////////////////////

        private int GetNewSortingOrder()
        {

            int result = 0;

            var lstMembers = tpDB.CommitteeMembers.OrderBy(q => q.CoM_OSSortingOrder).ToList();
            if (lstMembers.Count > 0)
            {
                result = lstMembers.Max(q => q.CoM_OSSortingOrder).Value;
            }

            return result + 1;
        }


    }
}
