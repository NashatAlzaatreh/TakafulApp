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
    public class HR_HRSheet
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.HR_HRSheet.MainObject GetInitialData(DateTime fromDate, DateTime toDate)
        {

            var defaultDataObj = new DataObjects.Internal.HR_HRSheet.MainObject();
            int newSerial = 1;

            //Get all sheets
            var lstSheets = tpDB.HRSheets.Where(s => s.HRS_Date >= fromDate && s.HRS_Date <= toDate && s.HRS_IsSubsequentSheet != true).OrderBy(s => s.HRS_Date).ToList();

            for (int i = 0; i < lstSheets.Count; i++)
            {
                var sheet = new DataObjects.Internal.HR_HRSheet.Sheet();
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

        public DataObjects.Internal.HR_HRSheet.MainObject Save_OLD(int sheetID, string notes, out string resultMessage)
        {

            var bus = new Common.Common.Business();
            var defaultDataObj = new DataObjects.Internal.HR_HRSheet.MainObject();
            var sheet = new HRSheet();

            //try
            //{

            //Check whether new or modified data
            if (sheetID == 0)   //New item
            {

                //int i = 0;

                //try
                //{


                int newSerial = 1;
                //Get all sheets
                var lstSheets = tpDB.HRSheets.Where(s => s.HRS_IsSubsequentSheet != true).OrderBy(s => s.HRS_Date).ToList();

                //Get the new sheet serial
                if (lstSheets.Count > 0)
                {
                    newSerial = lstSheets[lstSheets.Count - 1].HRS_Serial + 1;
                }

                //Insert the data to db
                sheet.HRS_Serial = newSerial;
                sheet.HRS_Date = DateTime.UtcNow;
                sheet.HRS_Notes = notes.Trim();
                tpDB.HRSheets.Add(sheet);

                //Prepare the sheet data to be saved with the sheet
                var lstSheetData = new List<HRSheetData>();

                var employees = tpDB.Employees.Where(em => em.FundSubscriptions.Count > 0).ToList();

                for (int i = 0; i < employees.Count; i++)
                {
                    var empNum = employees[i].Emp_ID;
                    var tempSheetData = new HRSheetData();
                    tempSheetData.Emp_ID = employees[i].Emp_ID;
                    tempSheetData.HRSD_FullName = employees[i].Emp_FullName;
                    tempSheetData.HRSD_Department = employees[i].Emp_Department;
                    tempSheetData.HRSD_Position = employees[i].Emp_Position;
                    tempSheetData.HRSD_JoiningDate = employees[i].Emp_JoiningDate;

                    //Check if subscribed or was subscribed
                    if (tpDB.CostingBreakdownDetails.Count(c => c.Emp_ID == empNum) == 0)
                    {
                        continue;
                    }

                    //Salary
                    var empSer = tpDB.EmployeeServices.Where(es => es.Emp_ID == empNum).OrderByDescending(es => es.EmS_OnDate).FirstOrDefault();

                    if (empSer != null)
                    {
                        tempSheetData.HRSD_Salary = empSer.EmS_TotalSalary;
                    }
                    else
                    {
                        tempSheetData.HRSD_Salary = 0;
                    }

                    //Current subscription amount
                    List<SubscriptionTransaction> subT = tpDB.SubscriptionTransactions.SqlQuery("SELECT SubscriptionTransaction.* FROM SubscriptionTransaction WHERE (Emp_ID =" + empNum + ") AND (SuT_ApprovalStatus = 2) AND ((SuT_SubscriptionType = 1) OR (SuT_SubscriptionType = 2)) ORDER BY SortIndex DESC").ToList();
                    if (subT.Count > 0)
                    {
                        tempSheetData.HRSD_SubsAmount = subT[0].SuT_Amount;
                    }
                    else
                    {
                        tempSheetData.HRSD_SubsAmount = 0;
                    }

                    //Total fund amount
                    FundSubscription fus = tpDB.FundSubscriptions.FirstOrDefault(f => f.Emp_ID == empNum && f.FSu_Status == 1);

                    if (fus != null)
                    {
                        List<SqlParameter> parameterList_;
                        SqlParameter[] parameters_;

                        parameterList_ = new List<SqlParameter>();
                        parameterList_.Add(new SqlParameter("@FusID", fus.FSu_ID));
                        parameters_ = parameterList_.ToArray();
                        List<int> resSub = tpDB.Database.SqlQuery<int>("SELECT SUM(CBD_PaidAmount) AS Total FROM CostingBreakdownDetail GROUP BY FSu_ID HAVING (FSu_ID = @FusID)", parameters_).ToList();

                        if (resSub.Count > 0)
                        {
                            tempSheetData.HRSD_FundAmount = resSub[0];
                        }
                        else
                        {
                            tempSheetData.HRSD_FundAmount = 0;
                        }
                    }
                    else
                    {
                        tempSheetData.HRSD_FundAmount = 0;
                    }

                    //Loan details
                    LoanAmount lA = tpDB.LoanAmounts.FirstOrDefault(l => l.Emp_ID == empNum && l.LAm_Status == 1);

                    if (lA != null)
                    {
                        tempSheetData.HRSD_LoanAmount = lA.LAm_LoanAmount;

                        List<SqlParameter> parameterList;
                        SqlParameter[] parameters;

                        parameterList = new List<SqlParameter>();
                        parameterList.Add(new SqlParameter("@LoanID", lA.LAm_ID));
                        parameters = parameterList.ToArray();
                        List<int> resLoan = tpDB.Database.SqlQuery<int>("SELECT SUM(CBD_PaidAmount) AS Total FROM CostingBreakdownDetail GROUP BY LAm_ID HAVING (LAm_ID = @LoanID)", parameters).ToList();

                        if (resLoan.Count > 0)
                        {
                            tempSheetData.HRSD_LoanPaidAmount = resLoan[0];
                        }
                        else
                        {
                            tempSheetData.HRSD_LoanPaidAmount = 0;
                        }

                        tempSheetData.HRSD_LoanRemainingAmount = tempSheetData.HRSD_LoanAmount - tempSheetData.HRSD_LoanPaidAmount;

                        //Current loan installment
                        var subTran = tpDB.SubscriptionTransactions.Where(st => st.Emp_ID == empNum && (st.SuT_SubscriptionType == 4 || st.SuT_SubscriptionType == 5) && st.SuT_ApprovalStatus == 2).OrderByDescending(st => st.SortIndex).FirstOrDefault();

                        if (subTran != null)
                        {
                            tempSheetData.HRSD_LoanInstallment = subTran.SuT_Amount;
                        }
                        else
                        {
                            tempSheetData.HRSD_LoanInstallment = 0;
                        }
                    }
                    else
                    {
                        tempSheetData.HRSD_LoanAmount = 0;
                        tempSheetData.HRSD_LoanInstallment = 0;
                        tempSheetData.HRSD_LoanPaidAmount = 0;
                        tempSheetData.HRSD_LoanRemainingAmount = 0;
                    }

                    //Check if has approved transaction(s) on the the selected month & year
                    DateTime currentDate = DateTime.UtcNow;
                    var lastApprovedTransactions = tpDB.SubscriptionTransactions.Where(st => st.Emp_ID == empNum && st.SuT_ApprovalStatus == 2 && st.SuT_ApprovalDate != null && st.SuT_ApprovalDate.Value.Month == currentDate.Month && st.SuT_ApprovalDate.Value.Year == currentDate.Year).OrderBy(st => st.SortIndex).ToList();
                    bool includeToSheet = false;

                    if (lastApprovedTransactions.Count > 0)
                    {
                        for (int j = 0; j < lastApprovedTransactions.Count; j++)
                        {
                            switch (lastApprovedTransactions[j].SuT_SubscriptionType)
                            {
                                case 1:
                                    if (fus != null)    //If has a valid subscription
                                    {
                                        tempSheetData.HRSD_IsNewSubscription = true;
                                        includeToSheet = true;
                                    }
                                    break;
                                case 2:
                                    if (fus != null) //If has a valid subscription
                                    {
                                        tempSheetData.HRSD_IsModifiedSubscription = true;
                                        includeToSheet = true;
                                    }
                                    break;
                                case 3:
                                    tempSheetData.HRSD_IsCancelledSubscription = true;
                                    break;
                                case 4:
                                    if (lA != null) //If has a valid loan
                                    {
                                        tempSheetData.HRSD_IsNewLoan = true;
                                        includeToSheet = true;
                                    }
                                    break;
                                case 5:
                                    if (lA != null) //If has a valid loan
                                    {
                                        tempSheetData.HRSD_IsModifiedLoan = true;
                                        includeToSheet = true;
                                    }
                                    break;
                                case 6:
                                    if (fus != null) //If has a valid subscription
                                    {
                                        tempSheetData.HRSD_IsCancelledLoan = true;
                                        includeToSheet = true;
                                    }
                                    break;
                            }
                        }
                    }

                    //If the employee has a valid subscription
                    if (fus != null)
                    {
                        includeToSheet = true;
                    }

                    if (includeToSheet != true) //Ignore this employee
                    {
                        continue;
                    }

                    //Add to sheet object data collection
                    sheet.HRSheetDatas.Add(tempSheetData);
                }

            }
            else    //Modified item
            {
                //Get the selected item
                sheet = tpDB.HRSheets.Find(sheetID);
                sheet.HRS_Notes = notes.Trim();

                //Save to db
                tpDB.Entry(sheet).State = EntityState.Modified;
            }

            //Save to db
            tpDB.SaveChanges();


            //}
            //catch (DbEntityValidationException dbEx)
            //{
            //    string result = "";
            //    foreach (var validationErrors in dbEx.EntityValidationErrors)
            //    {
            //        foreach (var validationError in validationErrors.ValidationErrors)
            //        {
            //            //Trace.TraceInformation("Property: {0} Error: {1}",
            //            //                        validationError.PropertyName,
            //            //                        validationError.ErrorMessage);
            //            result += Environment.NewLine + "PropertyName : " + validationError.PropertyName + " - ErrorMessage : " + validationError.ErrorMessage;
            //        }
            //    }
            //}


            resultMessage = "True";
            DateTime from = new DateTime(1900, 01, 01);
            DateTime to = new DateTime(2099, 12, 31);
            return this.GetInitialData(from, to);
        }

        public DataObjects.Internal.HR_HRSheet.MainObject Save(int sheetID, string notes, out string resultMessage)
        {

            var sheet = new HRSheet();
            var lstSheetData_New = new List<HRSheetData_New>();
            var lstSheetData_OLD = new List<HRSheetData_New>();
            var lstTransactions_NS_New = new List<SubscriptionTransaction>();
            var lstTransactions_MS_New = new List<SubscriptionTransaction>();
            var lstTransactions_CS_New = new List<SubscriptionTransaction>();
            var lstTransactions_NL_New = new List<SubscriptionTransaction>();
            var lstTransactions_ML_New = new List<SubscriptionTransaction>();
            var lstTransactions_CL_New = new List<SubscriptionTransaction>();
            var lstTransactions_NS_Old = new List<HRSheetData_New>();
            var lstTransactions_MS_Old = new List<HRSheetData_New>();
            var lstTransactions_CS_Old = new List<HRSheetData_New>();
            var lstTransactions_NL_Old = new List<HRSheetData_New>();
            var lstTransactions_ML_Old = new List<HRSheetData_New>();
            var lstTransactions_CL_Old = new List<HRSheetData_New>();
            string oldTransactionsIDs = "";

            //Check whether new or modified data
            if (sheetID == 0)   //New item
            {
                int newSerial = 1;
                //Get all sheets
                var lstSheets = tpDB.HRSheets.Where(s => s.HRS_IsSubsequentSheet != true).OrderBy(s => s.HRS_Date).ToList();

                //Get the new sheet serial
                if (lstSheets.Count > 0)
                {
                    newSerial = lstSheets[lstSheets.Count - 1].HRS_Serial + 1;
                }

                //Insert the sheet into db
                sheet.HRS_Serial = newSerial;
                sheet.HRS_Date = DateTime.UtcNow;
                sheet.HRS_Notes = notes.Trim();


                //Prepare the sheet data to be saved with the sheet
                DateTime nSubsStartDate = new DateTime(2016, 04, 01);
                DateTime mSubsStartDate = new DateTime(2016, 04, 01);
                DateTime cSubsStartDate = new DateTime(2016, 04, 01);
                DateTime nLoansStartDate = new DateTime(2016, 04, 01);
                DateTime mLoansStartDate = new DateTime(2016, 04, 01);
                DateTime cLoansStartDate = new DateTime(2016, 04, 01);
                DateTime endDate = DateTime.UtcNow.Date.AddDays(-1);    //The day before today


                //Get the starting date based on the last approved sheet (for each transaction type)
                //New subs
                var nSubsSheet = tpDB.HRSheets.Where(h => h.HRS_IsSubsequentSheet != true /*&& h.HRS_IsClosedNewSubsSheet == true*/).OrderByDescending(h => h.HRS_Date).ThenByDescending(h => h.HRS_Serial).FirstOrDefault();
                if (nSubsSheet != null)
                {
                    nSubsStartDate = nSubsSheet.HRS_Date;   //Get starting date
                    lstTransactions_NS_Old = nSubsSheet.HRSheetData_New.Where(h => h.SuT_SubscriptionType == 1 && h.HRSD_IsIncluded != true).ToList();  //Get the ignored transactions to be transferred to the new sheet
                    lstSheetData_OLD.AddRange(lstTransactions_NS_Old);
                }

                //Modified subs
                var mSubsSheet = tpDB.HRSheets.Where(h => h.HRS_IsSubsequentSheet != true /*&& h.HRS_IsClosedModificationSheet == true*/).OrderByDescending(h => h.HRS_Date).ThenByDescending(h => h.HRS_Serial).FirstOrDefault();
                if (mSubsSheet != null)
                {
                    mSubsStartDate = mSubsSheet.HRS_Date;   //Get starting date
                    lstTransactions_MS_Old = mSubsSheet.HRSheetData_New.Where(h => h.SuT_SubscriptionType == 2 && h.HRSD_IsIncluded != true).ToList();  //Get the ignored transactions to be transferred to the new sheet
                    lstSheetData_OLD.AddRange(lstTransactions_MS_Old);
                }

                //Cancelled subs
                var cSubsSheet = tpDB.HRSheets.Where(h => h.HRS_IsSubsequentSheet != true /*&& h.HRS_IsClosedCancelledSubsSheet == true*/).OrderByDescending(h => h.HRS_Date).ThenByDescending(h => h.HRS_Serial).FirstOrDefault();
                if (cSubsSheet != null)
                {
                    cSubsStartDate = cSubsSheet.HRS_Date;   //Get starting date
                    lstTransactions_CS_Old = cSubsSheet.HRSheetData_New.Where(h => h.SuT_SubscriptionType == 3 && h.HRSD_IsIncluded != true).ToList();  //Get the ignored transactions to be transferred to the new sheet
                    lstSheetData_OLD.AddRange(lstTransactions_CS_Old);
                }

                //New loans
                var nLoansSheet = tpDB.HRSheets.Where(h => h.HRS_IsSubsequentSheet != true /*&& h.HRS_IsClosedNewLoansSheet == true*/).OrderByDescending(h => h.HRS_Date).ThenByDescending(h => h.HRS_Serial).FirstOrDefault();
                if (nLoansSheet != null)
                {
                    nLoansStartDate = nLoansSheet.HRS_Date; //Get starting date
                    lstTransactions_NL_Old = nLoansSheet.HRSheetData_New.Where(h => h.SuT_SubscriptionType == 4 && h.HRSD_IsIncluded != true).ToList();  //Get the ignored transactions to be transferred to the new sheet
                    lstSheetData_OLD.AddRange(lstTransactions_NL_Old);
                }

                //Modified loans
                var mLoansSheet = tpDB.HRSheets.Where(h => h.HRS_IsSubsequentSheet != true /*&& h.HRS_IsClosedInstallmentModificationSheet == true*/).OrderByDescending(h => h.HRS_Date).ThenByDescending(h => h.HRS_Serial).FirstOrDefault();
                if (mLoansSheet != null)
                {
                    mLoansStartDate = mLoansSheet.HRS_Date; //Get starting date
                    lstTransactions_ML_Old = mLoansSheet.HRSheetData_New.Where(h => h.SuT_SubscriptionType == 5 && h.HRSD_IsIncluded != true).ToList();  //Get the ignored transactions to be transferred to the new sheet
                    lstSheetData_OLD.AddRange(lstTransactions_ML_Old);
                }

                //Cancelled loans
                var cLoansSheet = tpDB.HRSheets.Where(h => h.HRS_IsSubsequentSheet != true /*&& h.HRS_IsClosedCancelledLoansSheet == true*/).OrderByDescending(h => h.HRS_Date).ThenByDescending(h => h.HRS_Serial).FirstOrDefault();
                if (cLoansSheet != null)
                {
                    cLoansStartDate = cLoansSheet.HRS_Date; //Get starting date
                    lstTransactions_CL_Old = cLoansSheet.HRSheetData_New.Where(h => h.SuT_SubscriptionType == 6 && h.HRSD_IsIncluded != true).ToList();  //Get the ignored transactions to be transferred to the new sheet
                    lstSheetData_OLD.AddRange(lstTransactions_CL_Old);
                }

                //Get the approved transactions
                //New subs
                lstTransactions_NS_New = tpDB.SubscriptionTransactions.Where(s => s.SuT_SubscriptionType == 1 && s.SuT_ApprovalStatus == 2 && s.SuT_ApprovalDate >= nSubsStartDate && s.SuT_ApprovalDate <= endDate).ToList();

                for (int i = 0; i < lstTransactions_NS_New.Count; i++)
                {
                    var temp = new HRSheetData_New();
                    temp.Emp_ID = lstTransactions_NS_New[i].Emp_ID;
                    temp.SuT_Year = lstTransactions_NS_New[i].SuT_Year;
                    temp.SuT_Serial = lstTransactions_NS_New[i].SuT_Serial;
                    temp.SuT_SubscriptionType = lstTransactions_NS_New[i].SuT_SubscriptionType;
                    temp.HRSD_TransactionApprovalDate = lstTransactions_NS_New[i].SuT_ApprovalDate.Value;
                    lstSheetData_New.Add(temp);
                }

                //Modified subs
                lstTransactions_MS_New = tpDB.SubscriptionTransactions.Where(s => s.SuT_SubscriptionType == 2 && s.SuT_ApprovalStatus == 2 && s.SuT_ApprovalDate >= mSubsStartDate && s.SuT_ApprovalDate <= endDate).ToList();

                for (int i = 0; i < lstTransactions_MS_New.Count; i++)
                {
                    var temp = new HRSheetData_New();
                    temp.Emp_ID = lstTransactions_MS_New[i].Emp_ID;
                    temp.SuT_Year = lstTransactions_MS_New[i].SuT_Year;
                    temp.SuT_Serial = lstTransactions_MS_New[i].SuT_Serial;
                    temp.SuT_SubscriptionType = lstTransactions_MS_New[i].SuT_SubscriptionType;
                    temp.HRSD_TransactionApprovalDate = lstTransactions_MS_New[i].SuT_ApprovalDate.Value;
                    lstSheetData_New.Add(temp);
                }

                //Cancelled subs
                lstTransactions_CS_New = tpDB.SubscriptionTransactions.Where(s => s.SuT_SubscriptionType == 3 && s.SuT_ApprovalStatus == 2 && s.SuT_ApprovalDate >= cSubsStartDate && s.SuT_ApprovalDate <= endDate).ToList();

                for (int i = 0; i < lstTransactions_CS_New.Count; i++)
                {
                    var temp = new HRSheetData_New();
                    temp.Emp_ID = lstTransactions_CS_New[i].Emp_ID;
                    temp.SuT_Year = lstTransactions_CS_New[i].SuT_Year;
                    temp.SuT_Serial = lstTransactions_CS_New[i].SuT_Serial;
                    temp.SuT_SubscriptionType = lstTransactions_CS_New[i].SuT_SubscriptionType;
                    temp.HRSD_TransactionApprovalDate = lstTransactions_CS_New[i].SuT_ApprovalDate.Value;
                    lstSheetData_New.Add(temp);
                }

                //New loans
                lstTransactions_NL_New = tpDB.SubscriptionTransactions.Where(s => s.SuT_SubscriptionType == 4 && s.SuT_ApprovalStatus == 2 && s.SuT_ApprovalDate >= nLoansStartDate && s.SuT_ApprovalDate <= endDate).ToList();

                for (int i = 0; i < lstTransactions_NL_New.Count; i++)
                {
                    var temp = new HRSheetData_New();
                    temp.Emp_ID = lstTransactions_NL_New[i].Emp_ID;
                    temp.SuT_Year = lstTransactions_NL_New[i].SuT_Year;
                    temp.SuT_Serial = lstTransactions_NL_New[i].SuT_Serial;
                    temp.SuT_SubscriptionType = lstTransactions_NL_New[i].SuT_SubscriptionType;
                    temp.HRSD_TransactionApprovalDate = lstTransactions_NL_New[i].SuT_ApprovalDate.Value;
                    lstSheetData_New.Add(temp);
                }

                //Modified loans
                lstTransactions_ML_New = tpDB.SubscriptionTransactions.Where(s => s.SuT_SubscriptionType == 5 && s.SuT_ApprovalStatus == 2 && s.SuT_ApprovalDate >= mLoansStartDate && s.SuT_ApprovalDate <= endDate).ToList();

                for (int i = 0; i < lstTransactions_ML_New.Count; i++)
                {
                    var temp = new HRSheetData_New();
                    temp.Emp_ID = lstTransactions_ML_New[i].Emp_ID;
                    temp.SuT_Year = lstTransactions_ML_New[i].SuT_Year;
                    temp.SuT_Serial = lstTransactions_ML_New[i].SuT_Serial;
                    temp.SuT_SubscriptionType = lstTransactions_ML_New[i].SuT_SubscriptionType;
                    temp.HRSD_TransactionApprovalDate = lstTransactions_ML_New[i].SuT_ApprovalDate.Value;
                    lstSheetData_New.Add(temp);
                }

                //Cancelled loans
                lstTransactions_CL_New = tpDB.SubscriptionTransactions.Where(s => s.SuT_SubscriptionType == 6 && s.SuT_ApprovalStatus == 2 && s.SuT_ApprovalDate >= cLoansStartDate && s.SuT_ApprovalDate <= endDate).ToList();

                for (int i = 0; i < lstTransactions_CL_New.Count; i++)
                {
                    var temp = new HRSheetData_New();
                    temp.Emp_ID = lstTransactions_CL_New[i].Emp_ID;
                    temp.SuT_Year = lstTransactions_CL_New[i].SuT_Year;
                    temp.SuT_Serial = lstTransactions_CL_New[i].SuT_Serial;
                    temp.SuT_SubscriptionType = lstTransactions_CL_New[i].SuT_SubscriptionType;
                    temp.HRSD_TransactionApprovalDate = lstTransactions_CL_New[i].SuT_ApprovalDate.Value;
                    lstSheetData_New.Add(temp);
                }

                //Add the transactions to the sheet element
                sheet.HRSheetData_New = lstSheetData_New;

                //Copy the old transactions to the new sheet
                for (int i = 0; i < lstSheetData_OLD.Count; i++)
                {
                    //if (oldTransactionsIDs == "")
                    //{
                    //    oldTransactionsIDs = lstSheetData_OLD[i].HRSD_ID.ToString();
                    //}
                    //else
                    //{
                    //    oldTransactionsIDs += ", " + lstSheetData_OLD[i].HRSD_ID.ToString();
                    //}

                    var temp = new HRSheetData_New();
                    temp.Emp_ID = lstSheetData_OLD[i].Emp_ID;
                    temp.SuT_Year = lstSheetData_OLD[i].SuT_Year;
                    temp.SuT_Serial = lstSheetData_OLD[i].SuT_Serial;
                    temp.SuT_SubscriptionType = lstSheetData_OLD[i].SuT_SubscriptionType;
                    temp.HRSD_TransactionApprovalDate = lstSheetData_OLD[i].HRSD_TransactionApprovalDate;
                    lstSheetData_New.Add(temp);
                }

                //Start a transaction to save the new sheet with the new data, then transfer the ignored data from the previous approved sheet
                //Begin the saving operation in transaction scope
                using (var dbContextTransaction = tpDB.Database.BeginTransaction())
                {
                    try
                    {
                        tpDB.HRSheets.Add(sheet);
                        tpDB.SaveChanges();

                        ////Transfer the old transactions to the new sheet (if exists)
                        //if (oldTransactionsIDs != "")
                        //{
                        //    var parameterList = new List<SqlParameter>();
                        //    parameterList.Add(new SqlParameter("@HRS_ID", sheet.HRS_ID));
                        //    SqlParameter[] parameters = parameterList.ToArray();
                        //    int result = tpDB.Database.ExecuteSqlCommand("UPDATE HRSheetData_New SET HRS_ID =  @HRS_ID WHERE HRSD_ID IN (" + oldTransactionsIDs + ");", parameters);
                        //}

                        ////Save changes
                        //tpDB.SaveChanges();

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


            resultMessage = "True";
            DateTime from = new DateTime(1900, 01, 01);
            DateTime to = new DateTime(2099, 12, 31);
            return this.GetInitialData(from, to);
        }

        public DataObjects.Internal.HR_HRSheet.MainObject Delete_OLD(int sheetID, out string resultMessage)
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
                    //Delete related sheet data
                    parameterList = new List<SqlParameter>();
                    parameterList.Add(new SqlParameter("@HRS_ID", sheet.HRS_ID));
                    parameters = parameterList.ToArray();
                    result = tpDB.Database.ExecuteSqlCommand("DELETE FROM HRSheetData WHERE HRS_ID = @HRS_ID;", parameters);

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

        public DataObjects.Internal.HR_HRSheet.MainObject Delete(int sheetID, out string resultMessage)
        {

            List<SqlParameter> parameterList;
            SqlParameter[] parameters;
            int result;
            var bus = new Common.Common.Business();
            DateTime from = new DateTime(1900, 01, 01);
            DateTime to = new DateTime(2099, 12, 31);

            var sheet = tpDB.HRSheets.Find(sheetID);

            if (sheet.HRS_IsClosedNewSubsSheet == true || sheet.HRS_IsClosedModificationSheet == true || sheet.HRS_IsClosedCancelledSubsSheet == true || sheet.HRS_IsClosedNewLoansSheet == true || sheet.HRS_IsClosedInstallmentModificationSheet == true || sheet.HRS_IsClosedCancelledLoansSheet == true)
            {
                resultMessage = "ApprovedSheet";
                return new DataObjects.Internal.HR_HRSheet.MainObject();
            }

            //Begin the saving operation in transaction scope
            using (var dbContextTransaction = tpDB.Database.BeginTransaction())
            {
                try
                {
                    //Delete related sheet data
                    parameterList = new List<SqlParameter>();
                    parameterList.Add(new SqlParameter("@HRS_ID", sheet.HRS_ID));
                    parameters = parameterList.ToArray();
                    result = tpDB.Database.ExecuteSqlCommand("DELETE FROM HRSheetData_New WHERE HRS_ID = @HRS_ID;", parameters);

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

            string fileName = "HRSheets";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }


    }
}
