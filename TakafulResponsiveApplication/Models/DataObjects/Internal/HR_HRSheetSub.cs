using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class HR_HRSheetSub
    {
        public class MainObject
        {
            public MainObject()
            {
                this.Sheets = new List<Sheet>();
            }

            public int NewSerial { get; set; }
            public DateTime Date { get; set; }
            public string Month { get; set; }
            public List<Sheet> Sheets { get; set; }

        }

        public class Sheet
        {

            public int ID { get; set; }
            public int Serial { get; set; }
            public DateTime Date { get; set; }
            public string Month { get; set; }
            public string Notes { get; set; }

        }
    }

}
