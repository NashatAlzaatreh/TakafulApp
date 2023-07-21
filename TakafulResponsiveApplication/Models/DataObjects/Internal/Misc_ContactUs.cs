using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Misc_ContactUs
    {
        public class Inquiry
        {
            public int ID { get; set; }
            public string Name { get; set; }
            public string Mobile { get; set; }
            public string Email { get; set; }
            public string Message { get; set; }
            public DateTime CreatedDateTime { get; set; }
        }
    }

}
