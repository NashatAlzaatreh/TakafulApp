using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Employee_FinancialTransactionsManagement
    {

        TakafulEntities tpDB = new TakafulEntities();

        public List<DataObjects.Internal.Employee_FinancialTransactionsManagement.MainObject> GetInitialData()
        {

            var defaultDataObj = new List<DataObjects.Internal.Employee_FinancialTransactionsManagement.MainObject>();
            var bus = new Common.Common.Business();

            //Get all the employees that have a valid subscription only
            var lstEmployees = tpDB.Employees
                //.Include(e => e.EmployeeServices)
                .Where(em => em.Emp_AccountStatus == true)
                .OrderBy(e => e.Emp_ID).ToList();
            
            for (int i = 0; i < lstEmployees.Count; i++)
            {
                var temp = new DataObjects.Internal.Employee_FinancialTransactionsManagement.MainObject();
                long empID = lstEmployees[i].Emp_ID;
                temp.EmployeeNumber = lstEmployees[i].Emp_ID;
                temp.Name = lstEmployees[i].Emp_FullName;
                temp.Department = lstEmployees[i].Emp_Department;
                temp.Position = lstEmployees[i].Emp_Position;
                //Subscription Data
                //var subscriptionData = bus.GetSubscriptionData(empID);
                //if (subscriptionData != null)
                //{
                //    temp.CurrentSubscriptionAmount = subscriptionData.Amount;
                //    temp.TotalSubscriptionAmount = subscriptionData.TotalSubscription;
                //}
                //Loan Data
                //var loanData = bus.GetLoanData(empID);
                //if (loanData != null)
                //{
                //    temp.LoanAmount = loanData.LoanAmount;
                //    temp.LoanInstallmentAmount = loanData.LoanInstallment;
                //    temp.PaidLoanAmount = loanData.PaidAmount;
                //    temp.RemainingLoanAmount = loanData.RemainingAmount;
                //}
                //else
                //{
                //    temp.LoanAmount = 0;
                //    temp.LoanInstallmentAmount = 0;
                //    temp.PaidLoanAmount = 0;
                //    temp.RemainingLoanAmount = 0;
                //}

                ////Get last recorded financial transaction
                //Subscription amount
                //var fs = tpDB.FundSubscriptions.FirstOrDefault(f => f.Emp_ID == empID && f.FSu_Status == 1);

                //if (fs != null)
                //{
                //    var lastRecordedTransaction_Sub = tpDB.CostingBreakdownDetails.Where(cbd => cbd.FSu_ID == fs.FSu_ID).OrderByDescending(cbd => cbd.CBD_Date).FirstOrDefault();

                //    if (lastRecordedTransaction_Sub != null && lastRecordedTransaction_Sub.CBD_PaidAmount.HasValue)
                //    {
                //        temp.LastSubscriptionTransaction = new DataObjects.Internal.Employee_FinancialTransactionsManagement.LastSubscriptionTransaction();
                //        temp.LastSubscriptionTransaction.Date = lastRecordedTransaction_Sub.CBD_Date;
                //        if (lastRecordedTransaction_Sub.CBD_PaidAmount.Value > 0)   //Credit value (on behalf of the employee)
                //        {
                //            temp.LastSubscriptionTransaction.Type = "دائن";
                //            temp.LastSubscriptionTransaction.Amount = lastRecordedTransaction_Sub.CBD_PaidAmount.Value;
                //        }
                //        else if (lastRecordedTransaction_Sub.CBD_PaidAmount.Value < 0)  //Debit value
                //        {
                //            temp.LastSubscriptionTransaction.Type = "مدين";
                //            temp.LastSubscriptionTransaction.Amount = lastRecordedTransaction_Sub.CBD_PaidAmount.Value * -1;
                //        }
                //        else
                //        {
                //            temp.LastSubscriptionTransaction.Type = "";
                //        }
                //    }

                //    //Loan installment
                //    var la = tpDB.LoanAmounts.FirstOrDefault(l => l.Emp_ID == empID && l.LAm_Status == 1);

                //    if (la != null)
                //    {
                //        var lastRecordedTransaction_Loan = tpDB.CostingBreakdownDetails.Where(cbd => cbd.LAm_ID == la.LAm_ID).OrderByDescending(cbd => cbd.CBD_Date).FirstOrDefault();

                //        if (lastRecordedTransaction_Loan != null && lastRecordedTransaction_Loan.CBD_PaidAmount.HasValue)
                //        {
                //            temp.LastLoanTransaction = new DataObjects.Internal.Employee_FinancialTransactionsManagement.LastLoanTransaction();
                //            temp.LastLoanTransaction.Date = lastRecordedTransaction_Loan.CBD_Date;
                //            if (lastRecordedTransaction_Loan.CBD_PaidAmount.Value > 0)   //Credit value (on behalf of the employee)
                //            {
                //                temp.LastLoanTransaction.Type = "دائن";
                //                temp.LastLoanTransaction.Amount = lastRecordedTransaction_Loan.CBD_PaidAmount.Value;
                //            }
                //            else if (lastRecordedTransaction_Loan.CBD_PaidAmount.Value < 0) //Debit value
                //            {
                //                temp.LastLoanTransaction.Type = "مدين";
                //                temp.LastLoanTransaction.Amount = lastRecordedTransaction_Loan.CBD_PaidAmount.Value * -1;
                //            }
                //            else
                //            {
                //                temp.LastLoanTransaction.Type = "";
                //            }
                //        }
                //    }
                //}

                defaultDataObj.Add(temp);
            }
            


            return defaultDataObj;
        }


        public List<DataObjects.Internal.Employee_FinancialTransactionsManagement.MainObject> GetEmployeeFinancialData(int employeeID)
        {

            var defaultDataObj = new List<DataObjects.Internal.Employee_FinancialTransactionsManagement.MainObject>();
            var bus = new Common.Common.Business();

            //Get all the employees that have a valid subscription only
            var lstEmployees = tpDB.Employees
                //.Include(e => e.EmployeeServices)
                .Where(em => em.Emp_AccountStatus == true && em.Emp_ID == employeeID)
                .OrderBy(e => e.Emp_ID).ToList();

            for (int i = 0; i < lstEmployees.Count; i++)
            {
                var temp = new DataObjects.Internal.Employee_FinancialTransactionsManagement.MainObject();
                long empID = lstEmployees[i].Emp_ID;
                temp.EmployeeNumber = lstEmployees[i].Emp_ID;
                temp.Name = lstEmployees[i].Emp_FullName;
                temp.Department = lstEmployees[i].Emp_Department;
                temp.Position = lstEmployees[i].Emp_Position;
                //Subscription Data
                var subscriptionData = bus.GetSubscriptionData(empID);
                if (subscriptionData != null)
                {
                    temp.CurrentSubscriptionAmount = subscriptionData.Amount;
                    temp.TotalSubscriptionAmount = subscriptionData.TotalSubscription;
                }
                //Loan Data
                var loanData = bus.GetLoanData(empID);
                if (loanData != null)
                {
                    temp.LoanAmount = loanData.LoanAmount;
                    temp.LoanInstallmentAmount = loanData.LoanInstallment;
                    temp.PaidLoanAmount = loanData.PaidAmount;
                    temp.RemainingLoanAmount = loanData.RemainingAmount;
                }
                else
                {
                    temp.LoanAmount = 0;
                    temp.LoanInstallmentAmount = 0;
                    temp.PaidLoanAmount = 0;
                    temp.RemainingLoanAmount = 0;
                }

                //Get last recorded financial transaction
                //Subscription amount
                var fs = tpDB.FundSubscriptions.FirstOrDefault(f => f.Emp_ID == empID && f.FSu_Status == 1);

                if (fs != null)
                {
                    var lastRecordedTransaction_Sub = tpDB.CostingBreakdownDetails.Where(cbd => cbd.FSu_ID == fs.FSu_ID).OrderByDescending(cbd => cbd.CBD_Date).FirstOrDefault();

                    if (lastRecordedTransaction_Sub != null && lastRecordedTransaction_Sub.CBD_PaidAmount.HasValue)
                    {
                        temp.LastSubscriptionTransaction = new DataObjects.Internal.Employee_FinancialTransactionsManagement.LastSubscriptionTransaction();
                        temp.LastSubscriptionTransaction.Date = lastRecordedTransaction_Sub.CBD_Date;
                        if (lastRecordedTransaction_Sub.CBD_PaidAmount.Value > 0)   //Credit value (on behalf of the employee)
                        {
                            temp.LastSubscriptionTransaction.Type = "دائن";
                            temp.LastSubscriptionTransaction.Amount = lastRecordedTransaction_Sub.CBD_PaidAmount.Value;
                        }
                        else if (lastRecordedTransaction_Sub.CBD_PaidAmount.Value < 0)  //Debit value
                        {
                            temp.LastSubscriptionTransaction.Type = "مدين";
                            temp.LastSubscriptionTransaction.Amount = lastRecordedTransaction_Sub.CBD_PaidAmount.Value * -1;
                        }
                        else
                        {
                            temp.LastSubscriptionTransaction.Type = "";
                        }
                    }

                    //Loan installment
                    var la = tpDB.LoanAmounts.FirstOrDefault(l => l.Emp_ID == empID && l.LAm_Status == 1);

                    if (la != null)
                    {
                        var lastRecordedTransaction_Loan = tpDB.CostingBreakdownDetails.Where(cbd => cbd.LAm_ID == la.LAm_ID).OrderByDescending(cbd => cbd.CBD_Date).FirstOrDefault();

                        if (lastRecordedTransaction_Loan != null && lastRecordedTransaction_Loan.CBD_PaidAmount.HasValue)
                        {
                            temp.LastLoanTransaction = new DataObjects.Internal.Employee_FinancialTransactionsManagement.LastLoanTransaction();
                            temp.LastLoanTransaction.Date = lastRecordedTransaction_Loan.CBD_Date;
                            if (lastRecordedTransaction_Loan.CBD_PaidAmount.Value > 0)   //Credit value (on behalf of the employee)
                            {
                                temp.LastLoanTransaction.Type = "دائن";
                                temp.LastLoanTransaction.Amount = lastRecordedTransaction_Loan.CBD_PaidAmount.Value;
                            }
                            else if (lastRecordedTransaction_Loan.CBD_PaidAmount.Value < 0) //Debit value
                            {
                                temp.LastLoanTransaction.Type = "مدين";
                                temp.LastLoanTransaction.Amount = lastRecordedTransaction_Loan.CBD_PaidAmount.Value * -1;
                            }
                            else
                            {
                                temp.LastLoanTransaction.Type = "";
                            }
                        }
                    }
                }

                defaultDataObj.Add(temp);
            }



            return defaultDataObj;
        }

        public string Save(long empID, int type, int category, int amount)
        {

            DateTime date = DateTime.UtcNow;

            if (empID < 1 || (type != 1 && type != 2) || (category != 1 && category != 2) || amount < 1)
            {
                return "NotValidData";
            }

            //Get employee
            var employee = tpDB.Employees.FirstOrDefault(emp => emp.Emp_ID == empID && emp.Emp_AccountStatus == true);

            if (employee == null)
            {
                return "EmployeeNotFound";
            }

            var cbd = new CostingBreakdownDetail();
            cbd.Emp_ID = empID;
            cbd.CBD_Date = date;

            //Check amount type
            if (type == 2)  //Debit
            {
                amount *= -1;
            }

            cbd.CBD_PaidAmount = amount;

            //Category
            if (category == 1)  //Subscription
            {
                var fs = tpDB.FundSubscriptions.FirstOrDefault(f => f.Emp_ID == empID && f.FSu_Status == 1);
                if (fs == null)
                {
                    return "NotValidSubscription";
                }

                //if (tpDB.CostingBreakdownDetails.Count(c => c.Emp_ID == empID && c.CBD_Date == date && c.CBD_Details == 1) > 0)
                //{
                //    return "DuplicatedTransaction";
                //}

                cbd.CBD_Details = 1;
                cbd.FSu_ID = fs.FSu_ID;
            }
            else    //Loan
            {
                var la = tpDB.LoanAmounts.FirstOrDefault(l => l.Emp_ID == empID && l.LAm_Status == 1);
                if (la == null)
                {
                    return "NotValidLoan";
                }

                //if (tpDB.CostingBreakdownDetails.Count(c => c.Emp_ID == empID && c.CBD_Date == date && c.CBD_Details == 2) > 0)
                //{
                //    return "DuplicatedTransaction";
                //}

                cbd.CBD_Details = 2;
                cbd.LAm_ID = la.LAm_ID;
            }

            tpDB.CostingBreakdownDetails.Add(cbd);
            tpDB.SaveChanges();

            return "True";
        }


    }
}
