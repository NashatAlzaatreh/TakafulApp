using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Home_Start
    {
        public class MainObject
        {

            public bool IsAdmin { get; set; }
            public bool IsCommitteeMember { get; set; }
            public bool IsHelpDesk { get; set; }
            public bool IsEmployee { get; set; }
            public bool IsAuditor { get; set; }

        }
    }

}
