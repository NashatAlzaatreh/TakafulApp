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
    public class HR_HRSheetModification_ModifiedSubscriptionsSub
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.HR_HRSheetModification_ModifiedSubscriptionsSub.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.HR_HRSheetModification_ModifiedSubscriptionsSub.MainObject();


            //Get all sheets
            var lstSheets = tpDB.HRSheets.Where(s => s.HRS_IsSubsequentSheet == true).OrderByDescending(s => s.HRS_Serial).ToList();

            for (int i = 0; i < lstSheets.Count; i++)
            {
                var sheet = new DataObjects.Internal.HR_HRSheetModification_ModifiedSubscriptionsSub.Sheet();
                sheet.ID = lstSheets[i].HRS_ID;
                sheet.Serial = lstSheets[i].HRS_Serial;
                sheet.Date = lstSheets[i].HRS_Date;
                sheet.Month = Common.Common.Helper.GetArabicMonthName(lstSheets[i].HRS_Date.Month);
                sheet.Notes = lstSheets[i].HRS_Notes;
                if (lstSheets[i].HRS_IsClosedModificationSheet == true)
                {
                    sheet.IsClosed = true;
                }
                defaultDataObj.Sheets.Add(sheet);
            }


            return defaultDataObj;
        }

        public List<DataObjects.Internal.HR_HRSheetModification_ModifiedSubscriptionsSub.Employee> GetSheetEmployees(int sheetID)
        {

            var resultDataObj = new List<DataObjects.Internal.HR_HRSheetModification_ModifiedSubscriptionsSub.Employee>();

            //Get employees data from the sheet data
            var sheetDataList = tpDB.HRSheetDatas
                .Where(h => (h.HRSD_NewSheetID_MS == sheetID && h.HRSD_IsModifiedSubscription == true) || (h.HRSD_NewSheetID_ML == sheetID && h.HRSD_IsModifiedLoan == true))
                .OrderBy(h => h.HRSheet.HRS_Date)
                .ThenBy(h => h.Emp_ID)
                .ToList();

            for (int i = 0; i < sheetDataList.Count; i++)
            {
                var temp = new DataObjects.Internal.HR_HRSheetModification_ModifiedSubscriptionsSub.Employee();
                temp.ID = sheetDataList[i].HRSD_ID;
                temp.EmployeeNumber = sheetDataList[i].Emp_ID;
                temp.Name = sheetDataList[i].HRSD_FullName;
                temp.Department = sheetDataList[i].HRSD_Department;
                temp.Position = sheetDataList[i].HRSD_Position;
                temp.SubscriptionAmount = sheetDataList[i].HRSD_SubsAmount;
                temp.LoanAmount = sheetDataList[i].HRSD_LoanAmount;
                temp.LoanInstallment = sheetDataList[i].HRSD_LoanInstallment;
                if (sheetDataList[i].HRSD_IsModifiedSubscription == true && sheetDataList[i].HRSD_IsModifiedLoan == true)
                {
                    temp.ModificationType = "اشتراك - قسط القرض";
                }
                else if (sheetDataList[i].HRSD_IsModifiedSubscription == true)
                {
                    temp.ModificationType = "اشتراك";
                }
                else if (sheetDataList[i].HRSD_IsModifiedLoan == true)
                {
                    temp.ModificationType = "قسط القرض";
                }

                temp.IsIncluded = sheetDataList[i].HRSD_IsIncludedInModificationSheet;
                temp.OriginalSheetSerial = sheetDataList[i].HRSheet.HRS_Serial;
                temp.OriginalSheetDate = sheetDataList[i].HRSheet.HRS_Date;
                resultDataObj.Add(temp);
            }


            return resultDataObj;
        }

        public string Save(int sheetID, string selectedIDs)
        {

            List<SqlParameter> parameterList;
            SqlParameter[] parameters;
            int result;

            if (tpDB.HRSheets.FirstOrDefault(s => s.HRS_ID == sheetID).HRS_IsClosedModificationSheet == true)
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
                        result =
                            tpDB.Database.ExecuteSqlCommand(
                                "UPDATE HRSheetData SET HRSD_IsIncludedInModificationSheet = 'False' WHERE HRSD_NewSheetID_MS = @HRS_ID OR HRSD_NewSheetID_ML = @HRS_ID ;",
                                parameters);
                    }
                    else
                    {
                        //Update selections for selected IDs & remove selection from unselected IDs
                        parameterList = new List<SqlParameter>();
                        parameterList.Add(new SqlParameter("@HRS_ID", sheetID));
                        parameters = parameterList.ToArray();
                        result = tpDB.Database.ExecuteSqlCommand("UPDATE HRSheetData SET HRSD_IsIncludedInModificationSheet = 'True' WHERE HRSD_ID IN (" + selectedIDs + "); UPDATE HRSheetData SET HRSD_IsIncludedInModificationSheet = 'False' WHERE (HRSD_NewSheetID_MS = @HRS_ID OR HRSD_NewSheetID_ML = @HRS_ID) AND HRSD_ID NOT IN (" + selectedIDs + ");", parameters);
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
            sheet.HRS_IsClosedModificationSheet = true;
            tpDB.Entry(sheet).State = EntityState.Modified;
            tpDB.SaveChanges();


            return "True";
        }

        public string ExportDataToExcel(List<List<string>> data, string path)
        {

            string fileName = "HRSheet_ModifiedSubscriptionsAndInstallments_IgnoredRequests";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }

    }
}
