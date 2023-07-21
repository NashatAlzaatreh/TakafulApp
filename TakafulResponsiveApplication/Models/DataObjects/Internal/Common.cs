using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Common
    {
        public class EmployeeData
        {
            public EmployeeData()
            {
                //this.CostingBreakdownDetails = new HashSet<CostingBreakdownDetail>();
                //this.EmployeeServices = new HashSet<EmployeeService>();
                //this.HRSheetDatas = new HashSet<HRSheetData>();
                //this.LoanAmounts = new HashSet<LoanAmount>();
                //this.SubscriptionTransactions = new HashSet<SubscriptionTransaction>();
                //this.TransactionCommitteeDecisions = new HashSet<TransactionCommitteeDecision>();
            }
            public long EmpID { get; set; }
            //public string Password { get; set; }
            public bool? AccountStatus { get; set; }
            public string FullName { get; set; }
            public string Position { get; set; }
            public string Department { get; set; }
            public string Nationality { get; set; }
            public DateTime? JoiningDate { get; set; }
            public int Gender { get; set; }
            public string Email { get; set; }
            public string MobileNumber { get; set; }
            public DateTime? DateOfBirth { get; set; }
            public string JobDegree { get; set; }
            public bool? Emp_IsLocalCitizen { get; set; }
            public bool? IsAdmin { get; set; }
            public bool? IsCommitteeMember { get; set; }
            public bool? IsHelpDesk { get; set; }
            public EmployeeServiceData ServiceData { get; set; }
            public SubscriptionData SubscriptionData { get; set; }
            public LoanData LoanData { get; set; }
            public LoanBasicInfo LoanBasicInfo { get; set; }
            public GeneralSubscriptionInformation SubscriptionInformation { get; set; }

            //public virtual CommitteeMember CommitteeMember { get; set; }
            //public virtual ICollection<CostingBreakdownDetail> CostingBreakdownDetails { get; set; }
            //public virtual ICollection<EmployeeService> EmployeeServices { get; set; }
            //public virtual ExceptionAmount ExceptionAmount { get; set; }
            //public virtual ICollection<HRSheetData> HRSheetDatas { get; set; }
            //public virtual ICollection<LoanAmount> LoanAmounts { get; set; }
            //public virtual LoanException LoanException { get; set; }
            //public virtual ICollection<SubscriptionTransaction> SubscriptionTransactions { get; set; }
            //public virtual ICollection<TransactionCommitteeDecision> TransactionCommitteeDecisions { get; set; }

        }

        public class EmployeeServiceData
        {
            public DateTime Date { get; set; }
            public int? TotalSalary { get; set; }
            public int? EndOfServiceBenefit { get; set; }
        }

        public class SubscriptionBoundaries
        {
            public int MinimumAmount { get; set; }
            public int MaximumAmount { get; set; }
            public int MaximumAmount_Normal { get; set; }
        }

        public class SubscriptionData
        {
            public DateTime SubscriptionDate { get; set; }
            public int Amount { get; set; }
            public int TotalSubscription { get; set; }
            public DateTime? PreviousCancellationDate { get; set; }
        }

        public class LoanData
        {
            public DateTime LoanDate { get; set; }
            public int LoanAmount { get; set; }
            public int LoanInstallment { get; set; }
            public int PaidAmount { get; set; }
            public int RemainingAmount { get; set; }

        }

        public class LoanBasicInfo
        {
            public int MaximumLoanAmount_Normal { get; set; }
            public int MaximumLoanAmount_Exception { get; set; }
        }

        public class GeneralSubscriptionInformation
        {
            public int MinimumSubscription { get; set; }
            public int MinimumAmount { get; set; }
            public int MaximumAmount { get; set; }
            public int NumberOfInstallments { get; set; }
            public int LessSubscriptionPeriodForLoan { get; set; }
            public int SubscriptionAmount { get; set; }
            public int LoanFirstAmount { get; set; }
            public int LoanMaximumAmount { get; set; }
            public int PeriodBetweenLoans { get; set; }
            public int MaxDeductionPercentage { get; set; }

            public int SuI_LessPeriodForReSbubscrition { get; set; }
            public int SuI_LessPeriodForLoan4ReSubscriber { get; set; }

            public int SuI_LessPeriodForLoanNewEmployee { get; set; }
            //public int SuI_LessPeriodForLoanNewEmployee { get; set; }
            //public int SuI_LessPeriodForLoanNewEmployee { get; set; }
    }

        public class SubscriptionException
        {
            public long EmpID { get; set; }
            public string Name { get; set; }
            public string Department { get; set; }
            public int Amount { get; set; }
            public string Notes { get; set; }
            public bool IsUsed { get; set; }
        }

        public class LoanException
        {
            public long EmpID { get; set; }
            public string Name { get; set; }
            public string Department { get; set; }
            public int Amount { get; set; }
            public bool MinimumSubscriptionPeriod { get; set; }
            public bool LoanRequestWithActiveLoan { get; set; }
            public string Notes { get; set; }
            public bool IsUsed { get; set; }
        }

    }

}
