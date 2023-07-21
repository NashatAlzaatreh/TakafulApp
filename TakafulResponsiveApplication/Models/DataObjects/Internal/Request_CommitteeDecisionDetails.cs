using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{
    public class Request_CommitteeDecisionDetails
    {

        public class MainObject
        {
            public string FullName { get; set; }
            public string OrganizationalStructure { get; set; }
            public string Decision { get; set; }
            public string DecisionEntry { get; set; }

        }

    }
}
