using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{
    public class User_SubscriptionRulesAcceptance
    {
        public int ID { get; set; }
        public int Emp_ID { get; set; }
        public Nullable<System.DateTime> AcceptanceDate { get; set; }
        public Nullable<bool> Acceptance { get; set; }
        public string Source { get; set; }

    }
}