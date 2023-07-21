using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class HR_HRSheetModification_CancelledLoans
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.HR_HRSheetModification_CancelledLoans.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.HR_HRSheetModification_CancelledLoans.MainObject();


            //Get all sheets
            var lstSheets = tpDB.HRSheets.Where(s => s.HRS_IsSubsequentSheet != true).OrderByDescending(s => s.HRS_Serial).ToList();

            for (int i = 0; i < lstSheets.Count; i++)
            {
                var sheet = new DataObjects.Internal.HR_HRSheetModification_CancelledLoans.Sheet();
                sheet.ID = lstSheets[i].HRS_ID;
                sheet.Serial = lstSheets[i].HRS_Serial;
                sheet.Date = lstSheets[i].HRS_Date;
                //sheet.Month = Common.Common.Helper.GetArabicMonthName(lstSheets[i].HRS_Date.Month);
                sheet.Notes = lstSheets[i].HRS_Notes;
                if (lstSheets[i].HRS_IsClosedCancelledLoansSheet == true)
                {
                    sheet.IsClosed = true;
                }
                defaultDataObj.Sheets.Add(sheet);
            }


            return defaultDataObj;
        }

        public List<DataObjects.Internal.HR_HRSheetModification_CancelledLoans.Employee> GetSheetRequests(int sheetID)
        {

            var resultDataObj = new List<DataObjects.Internal.HR_HRSheetModification_CancelledLoans.Employee>();


            //Get CancelledLoans requests related to this sheet
            var requestsQuery = from request in tpDB.HRSheetData_New select request;

            if (tpDB.HRSheets.First(h => h.HRS_ID == sheetID).HRS_IsClosedCancelledLoansSheet == true)
            {
                requestsQuery = requestsQuery.Where(h => h.HRS_ID == sheetID && h.SuT_SubscriptionType == 6 && h.HRSD_IsIncluded == true);
            }
            else
            {
                requestsQuery = requestsQuery.Where(h => h.HRS_ID == sheetID && h.SuT_SubscriptionType == 6);
            }

            var lstRequests = requestsQuery.OrderByDescending(h => h.HRSD_TransactionApprovalDate).ThenBy(h => h.Emp_ID).ToList();

            //var lstRequests = tpDB.HRSheetData_New.Where(h => h.HRS_ID == sheetID && h.SuT_SubscriptionType == 6).OrderByDescending(h => h.HRSD_TransactionApprovalDate).ThenBy(h => h.Emp_ID).ToList();

            for (int i = 0; i < lstRequests.Count; i++)
            {
                var temp = new DataObjects.Internal.HR_HRSheetModification_CancelledLoans.Employee();
                long empID = lstRequests[i].Emp_ID;
                var employee = tpDB.Employees.First(em => em.Emp_ID == empID);  //Get employee
                temp.ID = lstRequests[i].HRSD_ID;
                temp.EmployeeNumber = employee.Emp_ID;
                temp.Name = employee.Emp_FullName;
                temp.Department = employee.Emp_Department;
                temp.Position = employee.Emp_Position;
                temp.LoanAmount = lstRequests[i].SubscriptionTransaction.LoanAmount.LAm_LoanAmount.Value;
                temp.RequestDate = lstRequests[i].HRSD_TransactionApprovalDate;
                temp.IsIncluded = lstRequests[i].HRSD_IsIncluded;
                resultDataObj.Add(temp);
            }


            return resultDataObj;
        }

        public string Save(int sheetID, string selectedIDs)
        {

            List<SqlParameter> parameterList;
            SqlParameter[] parameters;
            int result;

            if (tpDB.HRSheets.First(s => s.HRS_ID == sheetID).HRS_IsClosedCancelledLoansSheet == true)
            {
                return "AlreadyApproved";
            }

            //Begin the saving operation in transaction scope
            using (var dbContextTransaction = tpDB.Database.BeginTransaction())
            {
                try
                {
                    //If no data selected, remove any existing selections
                    if (selectedIDs.Trim() == "")
                    {
                        parameterList = new List<SqlParameter>();
                        parameterList.Add(new SqlParameter("@HRS_ID", sheetID));
                        parameters = parameterList.ToArray();
                        result = tpDB.Database.ExecuteSqlCommand("UPDATE HRSheetData_New SET HRSD_IsIncluded = 'False' WHERE HRS_ID = @HRS_ID AND SuT_SubscriptionType = 6;", parameters);
                    }
                    else
                    {
                        //Update selections for selected IDs & remove selection from unselected IDs
                        parameterList = new List<SqlParameter>();
                        parameterList.Add(new SqlParameter("@HRS_ID", sheetID));
                        parameters = parameterList.ToArray();
                        result = tpDB.Database.ExecuteSqlCommand("UPDATE HRSheetData_New SET HRSD_IsIncluded = 'True' WHERE HRSD_ID IN (" + selectedIDs + "); UPDATE HRSheetData_New SET HRSD_IsIncluded = 'False' WHERE HRS_ID = @HRS_ID AND HRSD_ID NOT IN (" + selectedIDs + ") AND SuT_SubscriptionType = 6;", parameters);
                    }


                    //All operations completed, commit...
                    dbContextTransaction.Commit();

                }
                catch (Exception ex)
                {
                    //Rollback...
                    dbContextTransaction.Rollback();
                    throw;
                }
            }


            return "True";
        }

        public string Approve(int sheetID, string selectedIDs)
        {

            string result = this.Save(sheetID, selectedIDs);
            if (result != "True")
            {
                return result;
            }

            var sheet = tpDB.HRSheets.FirstOrDefault(s => s.HRS_ID == sheetID);
            sheet.HRS_IsClosedCancelledLoansSheet = true;
            tpDB.Entry(sheet).State = EntityState.Modified;
            tpDB.SaveChanges();


            return "True";
        }

        public string ExportDataToExcel(List<List<string>> data, string path)
        {

            string fileName = "HRSheet_CancelledLoans";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }

    }
}
