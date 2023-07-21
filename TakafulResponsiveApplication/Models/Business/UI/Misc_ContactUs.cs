using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Misc_ContactUs
    {

        TakafulEntities tpDB = new TakafulEntities();

        public async Task<bool> PostInquiry(DataObjects.Internal.Misc_ContactUs.Inquiry inquiry)
        {

            //var inq = new ContactUs();

            //inq.CU_ID = inquiry.ID;
            //inq.CU_Name = inquiry.Name;
            //inq.CU_Mobile = inquiry.Mobile;
            //inq.CU_Email = inquiry.Email;
            //inq.CU_Message = inquiry.Message;
            //inq.CreatedDateTime = DateTime.UtcNow;

            //tpDB.ContactUs.Add(inq);
            //await tpDB.SaveChangesAsync();

            string email = tpDB.SolidarityFundInformations.First().SFI_GeneralEmail;

            var sm = new Common.Common.SendEmail();
            sm.ContactNotification(email, inquiry.Name, inquiry.Mobile, inquiry.Email, inquiry.Message);

            return true;

        }



    }
}
