using System;
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
    public class Employee_FinancialStatus
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Employee_FinancialStatus.MainObject GetInitialData(long empID)
        {

            var defaultDataObj = new DataObjects.Internal.Employee_FinancialStatus.MainObject();
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
                    defaultDataObj.Salary = employee.ServiceData.TotalSalary.Value;
                }

                if (employee.SubscriptionData != null)
                {
                    defaultDataObj.CurrentSubscriptionAmount = employee.SubscriptionData.Amount;
                    defaultDataObj.TotalSubscriptionAmount = employee.SubscriptionData.TotalSubscription;
                    //Check if subscribed since one year at least
                    DateTime date = employee.SubscriptionData.SubscriptionDate.Date.AddYears(1);
                    if (date <= DateTime.UtcNow.Date && employee.SubscriptionData.TotalSubscription >= 11000)
                    {
                        defaultDataObj.ZakahAmount = (int)Math.Ceiling((double)employee.SubscriptionData.TotalSubscription / 40);
                    }
                }

                if (employee.LoanData != null)
                {
                    defaultDataObj.LoanAmount = employee.LoanData.LoanAmount;
                    defaultDataObj.LoanInstallmentAmount = employee.LoanData.LoanInstallment;
                    defaultDataObj.PaidLoanAmount = employee.LoanData.PaidAmount;
                    defaultDataObj.RemainingLoanAmount = employee.LoanData.RemainingAmount;
                }
                else
                {
                    defaultDataObj.LoanAmount = 0;
                    defaultDataObj.LoanInstallmentAmount = 0;
                    defaultDataObj.PaidLoanAmount = 0;
                    defaultDataObj.RemainingLoanAmount = 0;
                }

            }


            return defaultDataObj;
        }


    }
}
