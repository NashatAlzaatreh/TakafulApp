﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Request_AdminCommitteeNewLoan_Approve
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_AdminCommitteeNewLoan_Approve.MainObject GetInitialData(long empID, int year, int serial)
        {

            var defaultDataObj = new DataObjects.Internal.Request_AdminCommitteeNewLoan_Approve.MainObject();
            var bus = new Common.Common.Business();

            var employee = bus.GetEmployee(empID);

            if (employee != null)
            {
                defaultDataObj.EmployeeNumber = employee.EmpID;
                defaultDataObj.Name = employee.FullName;
                defaultDataObj.Department = employee.Department;
                defaultDataObj.Position = employee.Position;
                defaultDataObj.JoinDate = employee.JoiningDate;
                if (employee.ServiceData != null)
                {
                    defaultDataObj.Salary = employee.ServiceData.TotalSalary;
                }

                if (employee.SubscriptionData == null)
                {
                    return null;
                }

                defaultDataObj.CurrentSubscriptionAmount = employee.SubscriptionData.Amount;
                defaultDataObj.TotalSubscriptionAmount = employee.SubscriptionData.TotalSubscription;
                defaultDataObj.LoanInstallmentsCount = employee.SubscriptionInformation.NumberOfInstallments;
                defaultDataObj.MinimumLoanInstallmentAmount = employee.SubscriptionInformation.MinimumAmount;

                //Get the submitted request
                var request = tpDB.SubscriptionTransactions.Include("LoanAmount").FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial && s.SuT_SubscriptionType == 4 && (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5));

                if (request == null || request.LoanAmount == null)    //No submitted request with the provided parameters
                {
                    return null;
                }


                if (request.SuT_ApprovalStatus == 4)
                {
                    defaultDataObj.IsTransferredToCommittee = true;
                }

                defaultDataObj.RequestedLoanAmount = request.LoanAmount.LAm_LoanAmount.Value;   //Requested loan amount
                int prevLoan = 0;
                if (employee.LoanData != null)
                {
                    prevLoan = employee.LoanData.RemainingAmount;
                }
                defaultDataObj.PreviousLoanAmount = prevLoan;
                if (defaultDataObj.PreviousLoanAmount > 0)
                {
                    defaultDataObj.TotalLoanAmount = defaultDataObj.RequestedLoanAmount + defaultDataObj.PreviousLoanAmount;
                }
                else
                {
                    defaultDataObj.TotalLoanAmount = defaultDataObj.RequestedLoanAmount;
                }


                if (request.LoanAmount.LAm_SuggestedLoanAmount != null) //Suggested loan amount
                {
                    defaultDataObj.SuggestedLoanAmount = request.LoanAmount.LAm_SuggestedLoanAmount.Value;
                }


                defaultDataObj.TotalDeductedAmount = employee.SubscriptionData.Amount + request.SuT_Amount.Value;  //Total deduction amount
                defaultDataObj.MaxDeductedAmount = (int)(defaultDataObj.Salary / 2);

                defaultDataObj.EndServiceBenefitAmount = employee.ServiceData.EndOfServiceBenefit.Value;    //End of service benefits
                defaultDataObj.EndServiceBenefitAmountAndTotalSubscription = defaultDataObj.EndServiceBenefitAmount + defaultDataObj.TotalSubscriptionAmount.Value; //End of service benefits + Total subscriptions
            }


            return defaultDataObj;
        }

        public string TakeAction(long empID, int year, int serial, long committeeMemberID, int action)
        {

            var adminID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());

            var aStatus = 0;

            if (action == 1)
            {
                aStatus = 2;
            }
            else if (action == 3)
            {
                aStatus = 3;
            }

            //Add the decision to the decision table
            TransactionCommitteeDecision tcd = tpDB.TransactionCommitteeDecisions.FirstOrDefault(t => t.Emp_ID == empID && t.SuT_Year == year && t.SuT_Serial == serial && t.SuT_SubscriptionType == 4 && t.TCD_CommitteeMemberID == committeeMemberID);

            if (tcd == null)
            {
                tcd = new TransactionCommitteeDecision();
                tcd.Emp_ID = empID;
                tcd.SuT_Year = year;
                tcd.SuT_Serial = serial;
                tcd.SuT_SubscriptionType = 4;
                tcd.TCD_CommitteeMemberID = committeeMemberID;
                tcd.TCD_Date = DateTime.UtcNow.Date;
                tcd.TCD_CommitteeApprovalStatus = aStatus;
                tcd.TCD_AdminID = adminID;
                tpDB.TransactionCommitteeDecisions.Add(tcd);
            }
            else
            {
                tcd.TCD_Date = DateTime.UtcNow.Date;
                tcd.TCD_CommitteeApprovalStatus = aStatus;
                tcd.TCD_AdminID = adminID;
                tpDB.Entry(tcd).State = EntityState.Modified;
            }

            tpDB.SaveChanges();


            return "True";
        }

    }
}
