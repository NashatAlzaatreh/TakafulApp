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
    
    public partial class HRSheetData_New
    {
        public long HRSD_ID { get; set; }
        public int HRS_ID { get; set; }
        public long Emp_ID { get; set; }
        public int SuT_Year { get; set; }
        public int SuT_Serial { get; set; }
        public int SuT_SubscriptionType { get; set; }
        public bool HRSD_IsIncluded { get; set; }
        public System.DateTime HRSD_TransactionApprovalDate { get; set; }
    
        public virtual HRSheet HRSheet { get; set; }
        public virtual SubscriptionTransaction SubscriptionTransaction { get; set; }
    }
}
