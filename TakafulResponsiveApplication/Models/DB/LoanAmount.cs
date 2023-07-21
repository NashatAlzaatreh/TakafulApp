//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TakafulResponsiveApplication.Models.DB
{
    using System;
    using System.Collections.Generic;
    
    public partial class LoanAmount
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public LoanAmount()
        {
            this.CostingBreakdownDetails = new HashSet<CostingBreakdownDetail>();
            this.SubscriptionTransaction = new HashSet<SubscriptionTransaction>();
        }
    
        public int LAm_ID { get; set; }
        public long Emp_ID { get; set; }
        public System.DateTime LAm_Date { get; set; }
        public Nullable<int> LAm_LoanAmount { get; set; }
        public Nullable<int> LAm_Status { get; set; }
        public Nullable<int> LAm_SuggestedLoanAmount { get; set; }
        public Nullable<int> LAm_OriginalLoanAmount { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CostingBreakdownDetail> CostingBreakdownDetails { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SubscriptionTransaction> SubscriptionTransaction { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
