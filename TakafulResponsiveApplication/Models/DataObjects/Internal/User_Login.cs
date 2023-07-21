using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class User_Login
    {
        public class LoggedUser
        {
            public long EmployeeID { get; set; }
            public string FullName { get; set; }
            public int RoleID { get; set; }
            //public string MyPageURL { get; set; }
            public bool IsAdmin { get; set; }
            public bool IsCommitteeMember { get; set; }
            public bool IsHelpDesk { get; set; }
            public bool IsEmployee { get; set; }
            public bool IsAuditor { get; set; }

        }
    }

}
