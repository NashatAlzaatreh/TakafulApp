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
    
    public partial class CostingBreakdownDetail
    {
        public long Emp_ID { get; set; }
        public System.DateTime CBD_Date { get; set; }
        public int CBD_Details { get; set; }
        public Nullable<int> CBD_PaidAmount { get; set; }
        public Nullable<int> LAm_ID { get; set; }
        public Nullable<int> FSu_ID { get; set; }
    
        public virtual FundSubscription FundSubscription { get; set; }
        public virtual LoanAmount LoanAmount { get; set; }
        public virtual Employee Employee { get; set; }
    }
}