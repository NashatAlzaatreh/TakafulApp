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
    
    public partial class Meeting
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Meeting()
        {
            this.MeetingTransactions = new HashSet<MeetingTransaction>();
        }
    
        public int Mee_ID { get; set; }
        public int Mee_Serial { get; set; }
        public int Mee_Year { get; set; }
        public Nullable<System.DateTime> Mee_Date { get; set; }
        public string Mee_Notes { get; set; }
        public Nullable<bool> Mee_IsActive { get; set; }
        public Nullable<bool> Mee_IsOpenForEvaluation { get; set; }
        public Nullable<bool> Mee_IsNotificationSent { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MeetingTransaction> MeetingTransactions { get; set; }
    }
}