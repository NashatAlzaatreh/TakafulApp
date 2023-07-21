using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class HR_HRSheetSub
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.HR_HRSheetSub.MainObject GetInitialData(DateTime fromDate, DateTime toDate)
        {

            var defaultDataObj = new DataObjects.Internal.HR_HRSheetSub.MainObject();
            int newSerial = 1;

            //Get all sheets
            var lstSheets = tpDB.HRSheets.Where(s => s.HRS_Date >= fromDate && s.HRS_Date <= toDate && s.HRS_IsSubsequentSheet == true).OrderBy(s => s.HRS_Date).ToList();

            for (int i = 0; i < lstSheets.Count; i++)
            {
                var sheet = new DataObjects.Internal.HR_HRSheetSub.Sheet();
                sheet.ID = lstSheets[i].HRS_ID;
                sheet.Serial = lstSheets[i].HRS_Serial;
                sheet.Date = lstSheets[i].HRS_Date;
                sheet.Notes = lstSheets[i].HRS_Notes;
                //sheet.Month = this.GetArabicMonthName(lstSheets[i].HRS_Date.Month);
                sheet.Month = Common.Common.Helper.GetArabicMonthName(lstSheets[i].HRS_Date.Month);
                defaultDataObj.Sheets.Add(sheet);
            }

            //Get the new sheet serial
            if (lstSheets.Count > 0)
            {
                newSerial = lstSheets[lstSheets.Count - 1].HRS_Serial + 1;
            }

            defaultDataObj.NewSerial = newSerial;
            defaultDataObj.Date = DateTime.UtcNow;
            //defaultDataObj.Month = this.GetArabicMonthName(DateTime.UtcNow.Month);
            defaultDataObj.Month = Common.Common.Helper.GetArabicMonthName(DateTime.UtcNow.Month);

            return defaultDataObj;

        }

        public DataObjects.Internal.HR_HRSheetSub.MainObject Save(int sheetID, string notes, DateTime sheetMonth, out string resultMessage)
        {

            var bus = new Common.Common.Business();
            var defaultDataObj = new DataObjects.Internal.HR_HRSheetSub.MainObject();
            var sheet = new HRSheet();


            //Check whether new or modified data
            if (sheetID == 0)   //New item
            {
                int newSerial = 1;
                //Get all sheets
                var lstSheets = tpDB.HRSheets.Where(s => s.HRS_IsSubsequentSheet == true).OrderBy(s => s.HRS_Date).ToList();

                //Get the new sheet serial
                if (lstSheets.Count > 0)
                {
                    newSerial = lstSheets[lstSheets.Count - 1].HRS_Serial + 1;
                }

                //Insert the data to db
                sheet.HRS_Serial = newSerial;
                sheet.HRS_Date = DateTime.UtcNow;
                sheet.HRS_Notes = notes.Trim();
                sheet.HRS_IsSubsequentSheet = true;
                tpDB.HRSheets.Add(sheet);

                //Get all the ignored sheetdata from the closed sheets
                //Normal sheetdata
                var lstSheetData_Normal = tpDB.HRSheetDatas.Where(s =>
                    s.HRSD_IsNewSubscription == false &&
                    s.HRSD_IsCancelledSubscription == false &&
                    s.HRSD_IsModifiedSubscription == false &&
                    s.HRSD_IsNewLoan == false &&
                    s.HRSD_IsCancelledLoan == false &&
                    s.HRSD_IsModifiedLoan == false &&
                    s.HRSD_IsIncludedInNormalSheet == false &&
                    s.HRSheet.HRS_IsClosedNormalSheet == true /*&&
                    s.HRSD_NewSheetID_Normal == null*/
                    ).ToList();

                //New subscriptions sheetdata
                var lstSheetData_NS = tpDB.HRSheetDatas.Where(s =>
                    s.HRSD_IsNewSubscription == true &&
                    s.HRSD_IsIncludedInNewSubsSheet == false &&
                    s.HRSheet.HRS_IsClosedNewSubsSheet == true /*&&
                    s.HRSD_NewSheetID_NS == null*/
                    ).ToList();

                //modified subscriptions sheetdata
                var lstSheetData_MS = tpDB.HRSheetDatas.Where(s =>
                    s.HRSD_IsModifiedSubscription == true &&
                    s.HRSD_IsIncludedInModificationSheet == false &&
                    s.HRSheet.HRS_IsClosedModificationSheet == true /*&&
                    s.HRSD_NewSheetID_MS == null*/
                    ).ToList();

                //Cancelled subscriptions sheetdata
                var lstSheetData_CS = tpDB.HRSheetDatas.Where(s =>
                    s.HRSD_IsCancelledSubscription == true &&
                    s.HRSD_IsIncludedInCancelledSubsSheet == false &&
                    s.HRSheet.HRS_IsClosedCancelledSubsSheet == true /*&&
                    s.HRSD_NewSheetID_CS == null*/
                    ).ToList();

                //New loans sheetdata
                var lstSheetData_NL = tpDB.HRSheetDatas.Where(s =>
                    s.HRSD_IsNewLoan == true &&
                    s.HRSD_IsIncludedInNewLoansSheet == false &&
                    s.HRSheet.HRS_IsClosedNewLoansSheet == true /*&&
                    s.HRSD_NewSheetID_NL == null*/
                    ).ToList();

                //modified loan installments sheetdata
                var lstSheetData_ML = tpDB.HRSheetDatas.Where(s =>
                    s.HRSD_IsModifiedLoan == true &&
                    s.HRSD_IsIncludedInModificationSheet == false &&
                    s.HRSheet.HRS_IsClosedModificationSheet == true /*&&
                    s.HRSD_NewSheetID_ML == null*/
                    ).ToList();

                //Cancelled loans sheetdata
                var lstSheetData_CL = tpDB.HRSheetDatas.Where(s =>
                    s.HRSD_IsCancelledLoan == true &&
                    s.HRSD_IsIncludedInCancelledLoansSheet == false &&
                    s.HRSheet.HRS_IsClosedCancelledLoansSheet == true /*&&
                    s.HRSD_NewSheetID_CL == null*/
                    ).ToList();

                //Begin the saving operation in transaction scope
                using (var dbContextTransaction = tpDB.Database.BeginTransaction())
                {
                    try
                    {
                        //Get the new sheet id
                        //Save to db
                        tpDB.SaveChanges();

                        int newID = sheet.HRS_ID;

                        //Update the id in every collection
                        //Normal sheet data
                        for (int i = 0; i < lstSheetData_Normal.Count; i++)
                        {
                            lstSheetData_Normal[i].HRSD_NewSheetID_Normal = newID;
                            tpDB.Entry(lstSheetData_Normal[i]).State = EntityState.Modified;
                        }

                        //New subs sheet data
                        for (int i = 0; i < lstSheetData_NS.Count; i++)
                        {
                            lstSheetData_NS[i].HRSD_NewSheetID_NS = newID;
                            tpDB.Entry(lstSheetData_NS[i]).State = EntityState.Modified;
                        }

                        //Modified subs sheet data
                        for (int i = 0; i < lstSheetData_MS.Count; i++)
                        {
                            lstSheetData_MS[i].HRSD_NewSheetID_MS = newID;
                            tpDB.Entry(lstSheetData_MS[i]).State = EntityState.Modified;
                        }

                        //Cancelled subs sheet data
                        for (int i = 0; i < lstSheetData_CS.Count; i++)
                        {
                            lstSheetData_CS[i].HRSD_NewSheetID_CS = newID;
                            tpDB.Entry(lstSheetData_CS[i]).State = EntityState.Modified;
                        }

                        //New loans sheet data
                        for (int i = 0; i < lstSheetData_NL.Count; i++)
                        {
                            lstSheetData_NL[i].HRSD_NewSheetID_NL = newID;
                            tpDB.Entry(lstSheetData_NL[i]).State = EntityState.Modified;
                        }

                        //Modified loans sheet data
                        for (int i = 0; i < lstSheetData_ML.Count; i++)
                        {
                            lstSheetData_ML[i].HRSD_NewSheetID_ML = newID;
                            tpDB.Entry(lstSheetData_ML[i]).State = EntityState.Modified;
                        }

                        //Cancelled loans sheet data
                        for (int i = 0; i < lstSheetData_CL.Count; i++)
                        {
                            lstSheetData_CL[i].HRSD_NewSheetID_CL = newID;
                            tpDB.Entry(lstSheetData_CL[i]).State = EntityState.Modified;
                        }

                        //Save to db
                        tpDB.SaveChanges();


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

            }
            else    //Modified item
            {
                //Get the selected item
                sheet = tpDB.HRSheets.Find(sheetID);
                sheet.HRS_Notes = notes.Trim();

                //Save to db
                tpDB.Entry(sheet).State = EntityState.Modified;
                //Save to db
                tpDB.SaveChanges();
            }

            ////Save to db
            //tpDB.SaveChanges();




            resultMessage = "True";
            DateTime from = new DateTime(1900, 01, 01);
            DateTime to = new DateTime(2099, 12, 31);
            return this.GetInitialData(from, to);
        }

        public DataObjects.Internal.HR_HRSheetSub.MainObject Delete(int sheetID, out string resultMessage)
        {

            List<SqlParameter> parameterList;
            SqlParameter[] parameters;
            int result;
            var bus = new Common.Common.Business();
            DateTime from = new DateTime(1900, 01, 01);
            DateTime to = new DateTime(2099, 12, 31);

            var sheet = tpDB.HRSheets.Find(sheetID);

            //Begin the saving operation in transaction scope
            using (var dbContextTransaction = tpDB.Database.BeginTransaction())
            {
                try
                {
                    //Remove the link to the current sheet to be restored in the original sheet
                    parameterList = new List<SqlParameter>();
                    parameterList.Add(new SqlParameter("@HRS_ID", sheet.HRS_ID));
                    parameters = parameterList.ToArray();
                    result = tpDB.Database.ExecuteSqlCommand(
                        "UPDATE HRSheetData SET HRSD_NewSheetID_Normal = NULL, HRSD_IsIncludedInNormalSheet = 'False' WHERE HRSD_NewSheetID_Normal = @HRS_ID;" +
                        "UPDATE HRSheetData SET HRSD_NewSheetID_NS = NULL, HRSD_IsIncludedInNewSubsSheet = 'False' WHERE HRSD_NewSheetID_NS = @HRS_ID;" +
                        "UPDATE HRSheetData SET HRSD_NewSheetID_MS = NULL, HRSD_IsIncludedInModificationSheet = 'False' WHERE HRSD_NewSheetID_MS = @HRS_ID;" +
                        "UPDATE HRSheetData SET HRSD_NewSheetID_CS = NULL, HRSD_IsIncludedInCancelledSubsSheet = 'False' WHERE HRSD_NewSheetID_CS = @HRS_ID;" +
                        "UPDATE HRSheetData SET HRSD_NewSheetID_NL = NULL, HRSD_IsIncludedInNewLoansSheet = 'False' WHERE HRSD_NewSheetID_NL = @HRS_ID;" +
                        "UPDATE HRSheetData SET HRSD_NewSheetID_ML = NULL, HRSD_IsIncludedInModificationSheet = 'False' WHERE HRSD_NewSheetID_ML = @HRS_ID;" +
                        "UPDATE HRSheetData SET HRSD_NewSheetID_CL = NULL, HRSD_IsIncludedInCancelledLoansSheet = 'False' WHERE HRSD_NewSheetID_CL = @HRS_ID;"
                        , parameters);

                    //Delete sheet
                    tpDB.Entry(sheet).State = EntityState.Deleted;
                    tpDB.SaveChanges();

                    //All operations completed, commit...
                    dbContextTransaction.Commit();
                    resultMessage = "True";

                }
                catch (Exception ex)
                {
                    resultMessage = "False";
                    //Rollback...
                    dbContextTransaction.Rollback();

                }
            }


            return this.GetInitialData(from, to);
        }

        public string ExportDataToExcel(List<List<string>> data, string path)
        {

            string fileName = "HRSheets_IgnoredRequests";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }


    }
}
