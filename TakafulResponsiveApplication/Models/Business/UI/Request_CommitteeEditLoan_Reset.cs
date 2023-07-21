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
    public class Request_CommitteeEditLoan_Reset
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_CommitteeEditLoan_Reset.MainObject GetInitialData(long empID, int year, int serial)
        {

            var defaultDataObj = new DataObjects.Internal.Request_CommitteeEditLoan_Reset.MainObject();
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


                //Get the submitted request
                var request = tpDB.SubscriptionTransactions.FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial && s.SuT_SubscriptionType == 5 && (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5));

                if (request == null)    //No submitted request with the provided parameters
                {
                    return null;
                }

                defaultDataObj.UserNotes = request.SuT_Notes;

                defaultDataObj.NewInstallmentAmount = request.SuT_Amount.Value; //New installment amount

                if (request.SuT_ApprovalStatus == 4)
                {
                    defaultDataObj.IsTransferredToCommittee = true;
                }

                //Loan data
                defaultDataObj.LoanAmount = employee.LoanData.LoanAmount;
                defaultDataObj.PaidLoanAmount = employee.LoanData.PaidAmount;
                defaultDataObj.RemainingLoanAmount = employee.LoanData.RemainingAmount;
                defaultDataObj.CurrentInstallmentAmount = employee.LoanData.LoanInstallment;    //Current installment amount

            }


            return defaultDataObj;
        }

        public string Reset(long empID, int year, int serial)
        {

            //Delete all the committee members decisions regarding this user request
            using (var Context = new TakafulEntities())
            {
                Context.Database.ExecuteSqlCommand("DELETE FROM TransactionCommitteeDecision WHERE Emp_ID = {0} AND SuT_Year = {1} AND SuT_Serial = {2} AND SuT_SubscriptionType = {3}; ", new object[] { empID, year, serial, 5 });
            }



            return "True";
        }

    }
}
