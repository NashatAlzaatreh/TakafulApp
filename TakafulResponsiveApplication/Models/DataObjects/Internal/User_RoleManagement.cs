using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class User_RoleManagement
    {
        public class MainObject
        {
            public long EmployeeNumber { get; set; }
            public string Name { get; set; }
            public string Department { get; set; }
            public bool IsAdmin { get; set; }
            public bool IsCommitteeMember { get; set; }
            public bool IsHelpDesk { get; set; }
        }

    }

}
