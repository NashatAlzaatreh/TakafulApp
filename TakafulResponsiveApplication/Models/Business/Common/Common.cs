using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Drawing.Diagrams;
using DocumentFormat.OpenXml.Office.CustomUI;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System.IO.Packaging;
using TakafulResponsiveApplication.Models.DB;
using System.Configuration;
using System.Net.Configuration;
using System.Linq;
using TakafulResponsiveApplication.HelperExt;

namespace TakafulResponsiveApplication.Models.Business.Common
{

    public enum UserRole
    {
        Admin = 1,
        CommitteeMember = 2,
        HelpDesk = 3,
        Employee = 4,
        Auditor = 5
    }


    public class Common
    {

        public static class CurrentHostingServer
        {
            public static string Host = "";
        }

        public static class PathConfig
        {
            public const string LogPath = "Log";
            public const string UploadPath_Temp = "Uploads/Temp";
            public const string UploadPath_Committee = "Uploads/CommitteeMembers";
            public const string UploadPath_HomePageBanner = "Uploads/IndexBanner";
            public const string UploadPath_HomePageFile = "Uploads/IndexFile";

            //public const string UploadPath_EventAgenda = "Uploads/Event_Agenda";
            //public const string UploadPath_MaterialBooklet = "Uploads/Material_Booklet";
            //public const string UploadPath_TrainerPicture = "Uploads/Trainer/Picture";
            //public const string UploadPath_TrainerCV = "Uploads/Trainer/CV";
            //public const string UploadPath_EventInstance_EnrollmentTerm = "Uploads/EventInstance/EnrollmentTerm";
            //public const string UploadPath_EventInstance_Attachments = "Uploads/EventInstance/Attachments";
            //public const string UploadPath_RegistrationRequest_External = "Uploads/RegistrationRequest/External";
            //public const string UploadPath_RegistrationRequest_Internal = "Uploads/RegistrationRequest/Internal";
            //public const string UploadPath_Student_Event = "Uploads/Student/Event";
            //public const string EmailTemplates = "Templates/EmailTemplates";
            //public const string UploadPath_HomePageGallery = "Uploads/HomePageGallery";
            //public const string UploadPath_EventTask = "Uploads/EventTask";
            //public const string UploadPath_CertificateType_Template = "Uploads/CertificateType/Template";
            //public const string UploadPath_CertificateType_Signature1 = "Uploads/CertificateType/Signature1";
            //public const string UploadPath_CertificateType_Signature2 = "Uploads/CertificateType/Signature2";
            //public const string UploadPath_UserAttachment = "Uploads/UserAttachment";

        }

        public static class Helper
        {

            public static string GetArabicMonthName(int month)
            {

                string monthName = "";

                switch (month)
                {
                    case 1:
                        monthName = "يناير";
                        break;
                    case 2:
                        monthName = "فبراير";
                        break;
                    case 3:
                        monthName = "مارس";
                        break;
                    case 4:
                        monthName = "إبريل";
                        break;
                    case 5:
                        monthName = "مايو";
                        break;
                    case 6:
                        monthName = "يونيو";
                        break;
                    case 7:
                        monthName = "يوليو";
                        break;
                    case 8:
                        monthName = "أغسطس";
                        break;
                    case 9:
                        monthName = "سبتمبر";
                        break;
                    case 10:
                        monthName = "أكتوبر";
                        break;
                    case 11:
                        monthName = "نوفمبر";
                        break;
                    case 12:
                        monthName = "ديسمبر";
                        break;
                }

                return monthName;

            }

            public static class EncyptDecrypt
            {
                public static string GenerateEncryptionKey()
                {
                    //string EncryptionKey = string.Empty;

                    //Random Robj = new Random();
                    //int Rnumber = Robj.Next();
                    //EncryptionKey = "IACAD" + Convert.ToString(Rnumber);

                    //return EncryptionKey;
                    return Guid.NewGuid().ToString();
                }

                public static string Encrypt(string clearText, string EncryptionKey)
                {
                    byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
                    using (Aes encryptor = Aes.Create())
                    {
                        Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                        encryptor.Key = pdb.GetBytes(32);
                        encryptor.IV = pdb.GetBytes(16);
                        using (MemoryStream ms = new MemoryStream())
                        {
                            using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                            {
                                cs.Write(clearBytes, 0, clearBytes.Length);
                                cs.Close();
                            }
                            clearText = Convert.ToBase64String(ms.ToArray());
                        }
                    }
                    return clearText;
                }

                public static string Decrypt(string cipherText, string EncryptionKey)
                {
                    byte[] cipherBytes = Convert.FromBase64String(cipherText);
                    using (Aes encryptor = Aes.Create())
                    {
                        Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                        encryptor.Key = pdb.GetBytes(32);
                        encryptor.IV = pdb.GetBytes(16);
                        using (MemoryStream ms = new MemoryStream())
                        {
                            using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                            {
                                cs.Write(cipherBytes, 0, cipherBytes.Length);
                                cs.Close();
                            }
                            cipherText = Encoding.Unicode.GetString(ms.ToArray());
                        }
                    }
                    return cipherText;
                }
            }
        }

        public class Utility
        {

            // Hash data to a string
            public string GetMd5Hash(string input)
            {

                string result = "";

                using (MD5 md5Hash = MD5.Create())
                {
                    // Convert the input string to a byte array and compute the hash. 
                    byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

                    // Create a new Stringbuilder to collect the bytes 
                    // and create a string.
                    var sBuilder = new StringBuilder();

                    // Loop through each byte of the hashed data  
                    // and format each one as a hexadecimal string. 
                    for (int i = 0; i < data.Length; i++)
                    {
                        sBuilder.Append(data[i].ToString("x2"));
                    }

                    result = sBuilder.ToString();

                }

                // Return the hexadecimal string. 
                return result;
            }

            // Verify a hash against a string
            public bool VerifyMd5Hash(string input, string hash)
            {
                bool result = false;

                using (MD5 md5Hash = MD5.Create())
                {
                    // Hash the input. 
                    string hashOfInput = GetMd5Hash(input);

                    // Create a StringComparer an compare the hashes.
                    StringComparer comparer = StringComparer.OrdinalIgnoreCase;

                    if (0 == comparer.Compare(hashOfInput, hash))
                    {
                        result = true;
                    }
                    else
                    {
                        result = false;
                    }
                }


                return result;

            }

            //Convert object to json string
            public string ConvertObjectToJson(object obj)
            {

                string json = new JavaScriptSerializer().Serialize(obj);

                return json;

            }

            //Convert date to arabic string
            public string GetArabicDateString(DateTime date, bool withWeekDay)
            {

                string result = "";

                var lstMonth = new List<string>(new string[] { "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيه", "يوليه", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر" });

                try
                {
                    if (withWeekDay)
                    {
                        switch (date.DayOfWeek)
                        {
                            case DayOfWeek.Saturday:
                                result = "السبت";
                                break;
                            case DayOfWeek.Sunday:
                                result = "الأحد";
                                break;
                            case DayOfWeek.Monday:
                                result = "الإثنين";
                                break;
                            case DayOfWeek.Tuesday:
                                result = "الثلاثاء";
                                break;
                            case DayOfWeek.Wednesday:
                                result = "الأربعاء";
                                break;
                            case DayOfWeek.Thursday:
                                result = "الخميس";
                                break;
                            case DayOfWeek.Friday:
                                result = "الجمعة";
                                break;
                        }
                    }

                    result += " " + date.ToString("dd") + "-" + lstMonth[date.Month - 1] + "-" + date.ToString("yyyy");

                }
                catch (Exception ex)
                {
                    return "";
                }

                return result;

            }

            //Check if a user is currently logged in
            public bool IsLoggedin()
            {

                var session = HttpContext.Current.Session;
                long s;

                if (session == null)
                {
                    return false;
                }

                if (session["EmployeeID"] == null || long.TryParse(session["EmployeeID"].ToString(), out s) == false)
                {
                    return false;
                }

                //if (session["EmployeeRole"] == null || long.TryParse(session["EmployeeRole"].ToString(), out s) == false)
                //{
                //    return false;
                //}

                if (session["LoggedUser"] == null)
                {
                    return false;
                }


                return true;

            }

            //Check if a user has a specific role
            public bool IsAuthorizedUser(Models.Business.Common.UserRole userRole)
            {

                //Check if loggedin user
                if (this.IsLoggedin() == false)
                {
                    return false;
                }

                var role = (Models.DataObjects.Internal.User_Login.LoggedUser)HttpContext.Current.Session["LoggedUser"];

                switch (userRole)
                {
                    case UserRole.Admin:
                        if (role.IsAdmin)
                        {
                            return true;
                        }
                        break;
                    case UserRole.CommitteeMember:
                        if (role.IsCommitteeMember)
                        {
                            return true;
                        }
                        break;
                    case UserRole.HelpDesk:
                        if (role.IsHelpDesk)
                        {
                            return true;
                        }
                        break;
                    case UserRole.Employee:
                        if (role.IsEmployee)
                        {
                            return true;
                        }
                        break;
                    case UserRole.Auditor:
                        if (role.IsAuditor)
                        {
                            return true;
                        }
                        break;
                }


                return false;

            }

            //Log the exception
            public async Task LogException(Exception exception)
            {

                DateTime exceptionDateTime = DateTime.UtcNow;

                //Try to log the exception to DB
                try
                {
                    var tpDB = new TakafulEntities();
                    var sel = new SystemExceptionLog();
                    sel.ExceptionData = exception.ToString();
                    sel.CreatedDateTime = exceptionDateTime;
                    tpDB.SystemExceptionLog.Add(sel);
                    await tpDB.SaveChangesAsync();
                }
                catch (Exception exp)   //Another exception raised when saving to DB (log both exceptions to local text file)
                {
                    //Log to local file
                    //Log the first exception
                    string exceptionData1 = Environment.NewLine +
                                           "DateTime : " + exceptionDateTime +
                                           Environment.NewLine +
                                           Environment.NewLine +
                                           "Exception Data : " +
                                           Environment.NewLine +
                                           "--------------" +
                                           Environment.NewLine +
                                           exception.ToString() +
                                           Environment.NewLine +
                                           Environment.NewLine +
                                           "=======================================================================================================================" +
                                           Environment.NewLine;

                    string exceptionData2 = Environment.NewLine +
                                           "DateTime : " + exceptionDateTime +
                                           Environment.NewLine +
                                           Environment.NewLine +
                                           "Exception Data : " +
                                           Environment.NewLine +
                                           "--------------" +
                                           Environment.NewLine +
                                           exp.ToString() +
                                           Environment.NewLine +
                                           Environment.NewLine +
                                           "===================================================================================================" +
                                           Environment.NewLine;

                    try
                    {
                        File.AppendAllText(HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.LogPath) + "/ExceptionLog.txt", exceptionData1 + exceptionData2, Encoding.UTF8);
                    }
                    catch (Exception ex)    //Exception when writing to local file (try to log the three exceptions to the windows event log)
                    {

                        string exceptionData3 = Environment.NewLine +
                                           "DateTime : " + exceptionDateTime +
                                           Environment.NewLine +
                                           Environment.NewLine +
                                           "Exception Data : " +
                                           Environment.NewLine +
                                           "--------------" +
                                           Environment.NewLine +
                                           ex.ToString() +
                                           Environment.NewLine +
                                           Environment.NewLine +
                                           "===================================================================================================" +
                                           Environment.NewLine;


                        try
                        {
                            if (!EventLog.SourceExists("Takaful_System"))
                            {
                                EventLog.CreateEventSource("Takaful_System", "TakafulLog");
                            }

                            var appLog = new System.Diagnostics.EventLog();
                            appLog.Source = "Takaful_System";
                            appLog.WriteEntry(exceptionData1, EventLogEntryType.Error);
                            appLog.WriteEntry(exceptionData2, EventLogEntryType.Error);
                            appLog.WriteEntry(exceptionData3, EventLogEntryType.Error);
                        }
                        catch (Exception e)
                        {


                        }
                    }
                }

            }

            public class GenericExpressionBuilder
            {

                public enum InnerOperator
                {
                    Equal,
                    NotEqual,
                    GreaterThan,
                    GreaterThanOrEqual,
                    LessThan,
                    LessThanOrEqual,
                    Contains,
                    StartsWith,
                    EndsWith
                }

                public enum OuterOperator
                {
                    AndAlso,
                    OrElse
                }

                private static MethodInfo containsMethod = typeof(string).GetMethod("Contains");
                private static MethodInfo startsWithMethod = typeof(string).GetMethod("StartsWith", new Type[] { typeof(string) });
                private static MethodInfo endsWithMethod = typeof(string).GetMethod("EndsWith", new Type[] { typeof(string) });

                public class ExpressionInfoProvider
                {
                    public ExpressionInfoProvider()
                    {
                        this.SubExpressions = new List<ExpressionInfoProvider>();
                    }

                    public string PropertyName { get; set; }
                    public object Value { get; set; }
                    public InnerOperator InnerOperator { get; set; }
                    public OuterOperator OuterOperator { get; set; }
                    public List<ExpressionInfoProvider> SubExpressions { get; set; }

                }


                private static Expression GetSingleExpression<T>(ParameterExpression param, ExpressionInfoProvider expressionInfoProvider)
                {

                    MemberExpression member = Expression.Property(param, expressionInfoProvider.PropertyName);
                    //MemberExpression member = Expression.PropertyOrField(param, expressionInfoProvider.PropertyName);
                    ConstantExpression constant = Expression.Constant(expressionInfoProvider.Value);
                    //ConstantExpression constant = Expression.Convert(Expression.Constant(expressionInfoProvider.Value), column.Type);

                    switch (expressionInfoProvider.InnerOperator)
                    {
                        case InnerOperator.Equal:
                            return Expression.Equal(member, Expression.Convert(constant, member.Type));
                            break;
                        case InnerOperator.NotEqual:
                            return Expression.NotEqual(member, Expression.Convert(constant, member.Type));
                            break;
                        case InnerOperator.GreaterThan:
                            return Expression.GreaterThan(member, Expression.Convert(constant, member.Type));
                            break;
                        case InnerOperator.GreaterThanOrEqual:
                            return Expression.GreaterThanOrEqual(member, Expression.Convert(constant, member.Type));
                            break;
                        case InnerOperator.LessThan:
                            return Expression.LessThan(member, Expression.Convert(constant, member.Type));
                            break;
                        case InnerOperator.LessThanOrEqual:
                            return Expression.LessThanOrEqual(member, Expression.Convert(constant, member.Type));
                            break;
                        case InnerOperator.Contains:
                            return Expression.Call(member, containsMethod, Expression.Convert(constant, member.Type));
                            break;
                        case InnerOperator.StartsWith:
                            return Expression.Call(member, startsWithMethod, Expression.Convert(constant, member.Type));
                            break;
                        case InnerOperator.EndsWith:
                            return Expression.Call(member, endsWithMethod, Expression.Convert(constant, member.Type));
                            break;
                    }

                    return null;
                }

                public static Expression<Func<T, bool>> GetExpressionTree<T>(IList<Utility.GenericExpressionBuilder.ExpressionInfoProvider> filters)
                {

                    if (filters.Count == 0)
                        return null;

                    ParameterExpression param = Expression.Parameter(typeof(T), "t");
                    Expression exp = null;


                    for (int i = 0; i < filters.Count; i++)
                    {
                        if (i == 0)
                        {
                            if (filters[i].SubExpressions.Count > 0)
                            {
                                exp = Expression.Invoke(GetExpressionTree<T>(filters[i].SubExpressions), param);
                            }
                            else
                            {
                                exp = GetSingleExpression<T>(param, filters[i]);
                            }

                        }
                        else
                        {
                            if (filters[i].OuterOperator == OuterOperator.OrElse)
                            {
                                if (filters[i].SubExpressions.Count > 0)
                                {
                                    var subExp = Expression.Invoke(GetExpressionTree<T>(filters[i].SubExpressions), param);
                                    exp = Expression.OrElse(exp, subExp);
                                }
                                else
                                {
                                    exp = Expression.OrElse(exp, GetSingleExpression<T>(param, filters[i]));
                                }

                            }
                            else
                            {
                                if (filters[i].SubExpressions.Count > 0)
                                {
                                    var subExp = Expression.Invoke(GetExpressionTree<T>(filters[i].SubExpressions), param);
                                    exp = Expression.AndAlso(exp, subExp);
                                }
                                else
                                {
                                    exp = Expression.AndAlso(exp, GetSingleExpression<T>(param, filters[i]));
                                }
                            }
                        }
                    }

                    return Expression.Lambda<Func<T, bool>>(exp, param);

                }

            }

            public string ExportToExcelFile(List<List<string>> data, string fileName, string path)
            {

                fileName += "_"
                + DateTime.UtcNow.Year.ToString()
                + DateTime.UtcNow.Month.ToString()
                + DateTime.UtcNow.Day.ToString()
                + DateTime.UtcNow.Hour.ToString()
                + DateTime.UtcNow.Minute.ToString()
                + DateTime.UtcNow.Second.ToString()
                + DateTime.UtcNow.Millisecond.ToString() + ".xlsx";

                string filepath = path + @"\" + fileName;

                // Create a spreadsheet document by supplying the filepath.
                // By default, AutoSave = true, Editable = true, and Type = xlsx.
                SpreadsheetDocument spreadsheetDocument = SpreadsheetDocument.Create(filepath, SpreadsheetDocumentType.Workbook);

                // Add a WorkbookPart to the document.
                WorkbookPart workbookpart = spreadsheetDocument.AddWorkbookPart();
                workbookpart.Workbook = new Workbook();

                // Add a WorksheetPart to the WorkbookPart.
                WorksheetPart worksheetPart = workbookpart.AddNewPart<WorksheetPart>();
                worksheetPart.Worksheet = new Worksheet(new SheetData());

                // Add Sheets to the Workbook.
                Sheets sheets = spreadsheetDocument.WorkbookPart.Workbook.AppendChild<Sheets>(new Sheets());

                // Append a new worksheet and associate it with the workbook.
                Sheet sheet = new Sheet() { Id = spreadsheetDocument.WorkbookPart.GetIdOfPart(worksheetPart), SheetId = 1, Name = "Sheet1" };
                sheets.Append(sheet);

                // Get the sheetData cell table.
                SheetData sheetData = worksheetPart.Worksheet.GetFirstChild<SheetData>();

                //Add the data to the sheet
                for (int i = 0; i < data.Count; i++)
                {
                    // Add a row to the sheet
                    Row row;
                    row = new Row() { RowIndex = (UInt32)(i + 1) };
                    sheetData.Append(row);
                    for (int j = 0; j < data[i].Count; j++)
                    {
                        //Add cells to the new row
                        Cell cell = new Cell();
                        cell.DataType = CellValues.String;
                        cell.CellValue = new CellValue(data[i][j]);
                        row.Append(cell);
                    }
                }

                ////Add cells to the new row
                //Cell c1 = new Cell();
                //c1.DataType = CellValues.String;
                //c1.CellValue = new CellValue("value 1");
                //row.Append(c1);

                //Cell c2 = new Cell();
                //c2.DataType = CellValues.String;
                //c2.CellValue = new CellValue("value 2");
                //row.Append(c2);


                // Close the document (no need to save because [AutoSave] is enabled by default)
                spreadsheetDocument.Close();


                return fileName;
            }



        }

        public class SendEmail
        {
            private void Send(SmtpClient smtpClient, MailMessage mailMessage)
            {

                try
                {
                    var RerouteSendingTo = ConfigurationManager.AppSettings["RerouteSendingEmailsTo"].ToString();
                    if (!string.IsNullOrEmpty(RerouteSendingTo))
                    {
                        var emailBundle = RerouteSendingTo.Split(';');
                        mailMessage.Body = mailMessage.Body + "<br/> Origianl Email was dedicated to : " + string.Join(";", mailMessage.To);
                        mailMessage.Body = mailMessage.Body + "<br/> Origianl Email was dedicated CC : " + string.Join(";", mailMessage.CC);
                        mailMessage.Body = mailMessage.Body + "<br/> Origianl Email was dedicated Bcc : " + string.Join(";", mailMessage.Bcc);

                        mailMessage.To.Clear();
                        mailMessage.CC.Clear();
                        mailMessage.Bcc.Clear();

                        foreach (var emailId in emailBundle.Where(emailId => !string.IsNullOrEmpty(emailId)))
                        {
                            mailMessage.To.Add(emailId);
                        }

                        if (mailMessage.AlternateViews.Count > 0)
                        {
                            AlternateView altView = AlternateView.CreateAlternateViewFromString(mailMessage.Body, null, MediaTypeNames.Text.Html);
                            mailMessage.AlternateViews.Clear();
                            mailMessage.AlternateViews.Add(altView);
                        }
                    }
                    smtpClient.Send(mailMessage);
                }
                catch (Exception ex)
                {
                    var utl = new Common.Utility();
                    utl.LogException(ex);
                }


            }

           
            private bool SendMessage(string subject, string content, IList<string> mailTo, bool IsAlternateView)
            {

                //var db = new TakafulEntities();
                var email = new MailMessage();
                //var smtp = new SmtpClient();
                var config = ConfigurationManager.GetSection("system.net/mailSettings/smtp") as SmtpSection;
                var smtp = new SmtpClient()
                {
                    Host = config.Network.Host,
                    Port = Convert.ToInt32(config.Network.Port),
                    EnableSsl = false,
                    Credentials = new System.Net.NetworkCredential(config.Network.UserName, config.Network.Password),

                };

                //Get the smtp settings from the database
                //List<EmailConfiguration> lstSmtp = db.EmailConfigurations.ToList();

                //if (lstSmtp.Count < 1)
                if(config == null)
                {
                    return false;
                }

                //smtp.EnableSsl = false;
                //smtp.EnableSsl = lstSmtp[0].SSLEnabled;
                //smtp.Port = (int)lstSmtp[0].SMTPPort;
                //smtp.Host = lstSmtp[0].SMTPHost;
                //smtp.Credentials = new NetworkCredential(lstSmtp[0].SignInName, lstSmtp[0].Password);
                //mailFrom = lstSmtp[0].SmS_MailFrom;

                //email.From = new MailAddress(lstSmtp[0].MailFrom, lstSmtp[0].DisplayName);
                email.From = new MailAddress(config.From);
                email.Subject = subject;
                email.IsBodyHtml = true;
                email.Body = content;

                if (IsAlternateView)
                {
                    AlternateView altView = AlternateView.CreateAlternateViewFromString(content, null, MediaTypeNames.Text.Html);
                    email.AlternateViews.Add(altView);
                }


                for (int i = 0; i < mailTo.Count; i++)
                {
                    email.To.Add(mailTo[i]);
                }

                var RerouteSendingTo = ConfigurationManager.AppSettings["RerouteSendingEmailsTo"].ToString();
                if (!string.IsNullOrEmpty(RerouteSendingTo))
                {
                    var emailBundle = RerouteSendingTo.Split(';');
                    email.Body = email.Body + "<br/> Origianl Email was dedicated to : " + string.Join(";", email.To);
                    email.Body = email.Body + "<br/> Origianl Email was dedicated CC : " + string.Join(";", email.CC);
                    email.Body = email.Body + "<br/> Origianl Email was dedicated Bcc : " + string.Join(";", email.Bcc);

                    email.To.Clear();
                    email.CC.Clear();
                    email.Bcc.Clear();
                    foreach (var emailId in emailBundle.Where(emailId => !string.IsNullOrEmpty(emailId)))
                    {
                        email.To.Add(emailId);
                    }


                    if (email.AlternateViews.Count > 0)
                    {
                        AlternateView altView = AlternateView.CreateAlternateViewFromString(email.Body, null, MediaTypeNames.Text.Html);
                        email.AlternateViews.Clear();
                        email.AlternateViews.Add(altView);
                    }
                }

                //Send the mail
                smtp.Send(email);

                return true;

            }

            private void SendMessageAsync(string subject, string content, IList<string> mailTo, bool IsAlternateView)
            {

                //var db = new TakafulEntities();
                var email = new MailMessage();
                //var smtp = new SmtpClient();
                var config = ConfigurationManager.GetSection("system.net/mailSettings/smtp") as SmtpSection;
                var smtp = new SmtpClient()
                {
                    Host = config.Network.Host,
                    Port = Convert.ToInt32(config.Network.Port),
                    EnableSsl = false,
                    Credentials = new System.Net.NetworkCredential(config.Network.UserName, config.Network.Password),
                   
                };

                try
                {
                    //Get the smtp settings from the database
                    //List<EmailConfiguration> lstSmtp = db.EmailConfigurations.ToList();

                    //if (lstSmtp.Count < 1)
                    if(config == null)
                    {
                        return;
                    }

                    //smtp.EnableSsl = false;
                    //smtp.EnableSsl = lstSmtp[0].SSLEnabled;
                    //smtp.Port = (int)lstSmtp[0].SMTPPort;
                    //smtp.Host = lstSmtp[0].SMTPHost;
                    //smtp.Credentials = new NetworkCredential(lstSmtp[0].SignInName, lstSmtp[0].Password);
                    //mailFrom = lstSmtp[0].SmS_MailFrom;

                    //email.From = new MailAddress(lstSmtp[0].MailFrom, lstSmtp[0].DisplayName);
                    email.From = new MailAddress(config.From);
                    email.Subject = subject;
                    email.IsBodyHtml = true;
                    email.Body = content;

                    if (IsAlternateView)
                    {
                        AlternateView altView = AlternateView.CreateAlternateViewFromString(content, null, MediaTypeNames.Text.Html);
                        email.AlternateViews.Add(altView);
                    }


                    for (int i = 0; i < mailTo.Count; i++)
                    {
                        email.To.Add(mailTo[i]);
                    }


                    //smtp.Send(email);

                    //Send the mail async
                    //Task.Factory.StartNew(() =>
                    //{
                    //    smtp.SendMailAsync(email);
                    //});

                    Task.Factory.StartNew(() =>
                    {
                        Send(smtp, email);
                    });



                }
                catch (Exception e)
                {
                    //System.Diagnostics.EventLog.WriteEntry("DGEP_TMS", e.ToString() + Environment.NewLine + e.StackTrace, System.Diagnostics.EventLogEntryType.Error);
                }

            }

            public int ContinueRegistration(long employeeID, string mailAddress)
            {

                var tpDB = new TakafulEntities();
                var mailList = new[] { mailAddress };
                //string html = string.Empty;


                Employee emp = tpDB.Employees.SingleOrDefault(i => i.Emp_ID == employeeID && (i.Emp_AccountStatus == false || i.Emp_AccountStatus == null));

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                "<tr>" +
                "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                "<h2>مرحبا بك ... " + emp.Emp_FullName + "</h2>" +
                "<h2>الرقم الوظيفى ... " + emp.Emp_ID + "</h2>" +
                "<h3>لاستكمال اجراءات التسجيل فى صندوق التكافل يرجى الضغط على</h3>" +
                "<a href='" + Common.CurrentHostingServer.Host + "/UI/Request/NewSubscription_Submit.html?EmpID=" + emp.Emp_ID + "'style='width: 100px; margin: 0px 400px 0px 0px; cursor: pointer; color: #FFF; background-color: #9a060f; padding: 10px; border-radius: 10px;'>متابعة الاجراءات</a>" +
                "</td></tr></table>" +
                "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                "</td></tr></table>";

                this.SendMessageAsync("إستكمال اجراءات التسجيل", emailContent, mailList, true);

                //Send SMS to the employee
                if (!string.IsNullOrEmpty(emp.Emp_MobileNumber))
                {
                    var smsMsg = new SMSToUsers();
                    smsMsg.SendSMSToUser(emp.Emp_MobileNumber, "لاستكمال اجراءات التسجيل فى صندوق التكافل يرجى الضغط على ... " + Common.CurrentHostingServer.Host + "/UI/Request/NewSubscription_Submit.html?EmpID=" + emp.Emp_ID);
                    return 2;   //SMS has been sent
                }


                return 1;   //No sms sent (only email)

            }

            public void EmployeeNotFound(long employeeID, string mailAddress)
            {

                var tpDB = new TakafulEntities();
                var mailList = new[] { mailAddress };
                //string html = string.Empty;


                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                "<tr>" +
                "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                "<h2>مرحبا بك ... السيد مدير الموقع</h2>" +
                "<h2>الرقم الوظيفى ... " + employeeID + "</h2>" +
                "<h3>هذا الرقم الوظيفى غير موجود فى قواعد البيانات، يرجى تحميل البيانات الخاصة به</h3>" +
                "</td></tr></table>" +
                "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                "</td></tr></table>";

                this.SendMessageAsync("رقم وظيفى غير موجود", emailContent, mailList, true);

            }

            public void SubscriptionRequestApproved(long employeeID)
            {

                var tpDB = new TakafulEntities();
                Employee emp = tpDB.Employees.FirstOrDefault(i => i.Emp_ID == employeeID);
                var mailList = new[] { emp.Emp_Email };

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                            "<tr>" +
                            "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                            "<h2>مرحبا بك " + emp.Emp_FullName + "</h2>" +
                            "<h3>           تم اعتماد طلب الاشتراك بالصندوق</h3>" +
                            "<h4>                  للدخول على النظام يرجى استخدام</h4>" +
                            "<h5>                  رقمك الوظيفى ... " + emp.Emp_ID.ToString() + "</h5>" +
                             //"<h5>                  وكلمة المرور ... " + emp.Emp_Password + "</h5>" +
                             "<h5>                  وكلمة المرور ... " +Helper.EncyptDecrypt.Decrypt(emp.Emp_Password_Enc,emp.SecurityStamp) + "</h5>" +
                            "<h3>                           مع تحيات دائرة الشؤون الإسلامية والعمل الخيري ـ لجنة صندوق تكافل العاملين .</h3>" +
                            "</td></tr></table>" +
                            "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                            "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                            "</td></tr></table>";

                this.SendMessageAsync("اعتماد طلب الاشتراك بالصندوق", emailContent, mailList, true);

            }

            public void SubscriptionRequestRejected(long employeeID)
            {

                var tpDB = new TakafulEntities();
                Employee emp = tpDB.Employees.FirstOrDefault(i => i.Emp_ID == employeeID);
                var mailList = new[] { emp.Emp_Email };

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                            "<tr>" +
                            "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                            "<h2>مرحبا بك ... " + emp.Emp_FullName + "</h2>" +
                            "<br /><br /><br />" +
                            "<h2>                  نعتذر عن عدم قبول طلب الاشتراك بالصندوق</h2>" +
                            "<br /><br /><br />" +
                            "<h3>                           مع تحيات دائرة الشؤون الإسلامية والعمل الخيرى</h3>" +
                            "</td></tr></table>" +
                            "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                            "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                            "</td></tr></table>";

                this.SendMessageAsync("رفض طلب الاشتراك بالصندوق", emailContent, mailList, true);

            }

            public void EditSubscriptionRequestApproved(long employeeID)
            {

                var tpDB = new TakafulEntities();
                Employee emp = tpDB.Employees.FirstOrDefault(i => i.Emp_ID == employeeID);
                var mailList = new[] { emp.Emp_Email };

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                            "<tr>" +
                            "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                            "<h2>مرحبا بك " + emp.Emp_FullName + "</h2>" +
                            "<h3>           تم اعتماد طلب تعديل الاشتراك بالصندوق</h3>" +
                            //"<h4>                  للدخول على النظام يرجى استخدام</h4>" +
                            //"<h5>                  رقمك الوظيفى ... " + emp.Emp_ID.ToString() + "</h5>" +
                            //"<h5>                  وكلمة المرور ... " + emp.Emp_Password + "</h5>" +
                            "<h3>                           مع تحيات دائرة الشؤون الإسلامية والعمل الخيري ـ لجنة صندوق تكافل العاملين .</h3>" +
                            "</td></tr></table>" +
                            "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                            "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                            "</td></tr></table>";

                this.SendMessageAsync("اعتماد طلب تعديل الاشتراك بالصندوق", emailContent, mailList, true);

            }

            public void EditSubscriptionRequestRejected(long employeeID)
            {

                var tpDB = new TakafulEntities();
                Employee emp = tpDB.Employees.FirstOrDefault(i => i.Emp_ID == employeeID);
                var mailList = new[] { emp.Emp_Email };

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                            "<tr>" +
                            "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                            "<h2>مرحبا بك ... " + emp.Emp_FullName + "</h2>" +
                            "<br /><br /><br />" +
                            "<h2>                  نعتذر عن عدم قبول طلب تعديل الاشتراك بالصندوق</h2>" +
                            "<br /><br /><br />" +
                            "<h3>                           مع تحيات دائرة الشؤون الإسلامية والعمل الخيرى</h3>" +
                            "</td></tr></table>" +
                            "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                            "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                            "</td></tr></table>";

                this.SendMessageAsync("رفض طلب تعديل الاشتراك بالصندوق", emailContent, mailList, true);

            }

            public void CancelSubscriptionRequestApproved(long employeeID)
            {

                var tpDB = new TakafulEntities();
                Employee emp = tpDB.Employees.FirstOrDefault(i => i.Emp_ID == employeeID);
                var mailList = new[] { emp.Emp_Email };

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                            "<tr>" +
                            "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                            "<h2>مرحبا بك " + emp.Emp_FullName + "</h2>" +
                            "<h3>           تم اعتماد طلب الانسحاب من الصندوق</h3>" +
                            //"<h4>                  تم إغلاق الحساب الخاص بك</h4>" +
                            "<h3>                           مع تحيات دائرة الشؤون الإسلامية والعمل الخيري ـ لجنة صندوق تكافل العاملين .</h3>" +
                            "</td></tr></table>" +
                            "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                            "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                            "</td></tr></table>";

                this.SendMessageAsync("اعتماد طلب الانسحاب من الصندوق", emailContent, mailList, true);

            }

            public void CancelSubscriptionRequestRejected(long employeeID)
            {

                var tpDB = new TakafulEntities();
                Employee emp = tpDB.Employees.FirstOrDefault(i => i.Emp_ID == employeeID);
                var mailList = new[] { emp.Emp_Email };

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                            "<tr>" +
                            "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                            "<h2>مرحبا بك ... " + emp.Emp_FullName + "</h2>" +
                            "<br /><br /><br />" +
                            "<h2>                  نعتذر عن عدم قبول طلب الانسحاب من الصندوق</h2>" +
                            "<br /><br /><br />" +
                            "<h3>                           مع تحيات دائرة الشؤون الإسلامية والعمل الخيرى</h3>" +
                            "</td></tr></table>" +
                            "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                            "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                            "</td></tr></table>";

                this.SendMessageAsync("رفض طلب الانسحاب من الصندوق", emailContent, mailList, true);

            }

            public void NewLoanRequestApproved(long employeeID)
            {

                var tpDB = new TakafulEntities();
                Employee emp = tpDB.Employees.FirstOrDefault(i => i.Emp_ID == employeeID);
                var mailList = new[] { emp.Emp_Email };

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                            "<tr>" +
                            "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                            "<h2>مرحبا بك " + emp.Emp_FullName + "</h2>" +
                            "<h3>           تم اعتماد طلب القرض</h3>" +
                            //"<h4>                  للدخول على النظام يرجى استخدام</h4>" +
                            //"<h5>                  رقمك الوظيفى ... " + emp.Emp_ID.ToString() + "</h5>" +
                            //"<h5>                  وكلمة المرور ... " + emp.Emp_Password + "</h5>" +
                            "<h3>                           مع تحيات دائرة الشؤون الإسلامية والعمل الخيري ـ لجنة صندوق تكافل العاملين .</h3>" +
                            "</td></tr></table>" +
                            "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                            "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                            "</td></tr></table>";

                this.SendMessageAsync("اعتماد طلب القرض", emailContent, mailList, true);

            }

            public void NewLoanRequestRejected(long employeeID)
            {

                var tpDB = new TakafulEntities();
                Employee emp = tpDB.Employees.FirstOrDefault(i => i.Emp_ID == employeeID);
                var mailList = new[] { emp.Emp_Email };

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                            "<tr>" +
                            "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                            "<h2>مرحبا بك ... " + emp.Emp_FullName + "</h2>" +
                            "<br /><br /><br />" +
                            "<h2>                  نعتذر عن عدم قبول طلب القرض</h2>" +
                            "<br /><br /><br />" +
                            "<h3>                           مع تحيات دائرة الشؤون الإسلامية والعمل الخيرى</h3>" +
                            "</td></tr></table>" +
                            "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                            "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                            "</td></tr></table>";

                this.SendMessageAsync("رفض طلب القرض", emailContent, mailList, true);

            }

            public void EditLoanRequestApproved(long employeeID)
            {

                var tpDB = new TakafulEntities();
                Employee emp = tpDB.Employees.FirstOrDefault(i => i.Emp_ID == employeeID);
                var mailList = new[] { emp.Emp_Email };

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                            "<tr>" +
                            "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                            "<h2>مرحبا بك " + emp.Emp_FullName + "</h2>" +
                            "<h3>           تم اعتماد طلب تعديل قسط القرض</h3>" +
                            //"<h4>                  للدخول على النظام يرجى استخدام</h4>" +
                            //"<h5>                  رقمك الوظيفى ... " + emp.Emp_ID.ToString() + "</h5>" +
                            //"<h5>                  وكلمة المرور ... " + emp.Emp_Password + "</h5>" +
                            "<h3>                           مع تحيات دائرة الشؤون الإسلامية والعمل الخيري ـ لجنة صندوق تكافل العاملين .</h3>" +
                            "</td></tr></table>" +
                            "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                            "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                            "</td></tr></table>";

                this.SendMessageAsync("اعتماد طلب تعديل قسط القرض", emailContent, mailList, true);

            }

            public void EditLoanRequestRejected(long employeeID)
            {

                var tpDB = new TakafulEntities();
                Employee emp = tpDB.Employees.FirstOrDefault(i => i.Emp_ID == employeeID);
                var mailList = new[] { emp.Emp_Email };

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                            "<tr>" +
                            "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                            "<h2>مرحبا بك ... " + emp.Emp_FullName + "</h2>" +
                            "<br /><br /><br />" +
                            "<h2>                  نعتذر عن عدم قبول طلب تعديل قسط القرض</h2>" +
                            "<br /><br /><br />" +
                            "<h3>                           مع تحيات دائرة الشؤون الإسلامية والعمل الخيرى</h3>" +
                            "</td></tr></table>" +
                            "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                            "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                            "</td></tr></table>";

                this.SendMessageAsync("رفض طلب تعديل قسط القرض", emailContent, mailList, true);

            }

            public void CancelLoanRequestApproved(long employeeID)
            {

                var tpDB = new TakafulEntities();
                Employee emp = tpDB.Employees.FirstOrDefault(i => i.Emp_ID == employeeID);
                var mailList = new[] { emp.Emp_Email };

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                            "<tr>" +
                            "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                            "<h2>مرحبا بك " + emp.Emp_FullName + "</h2>" +
                            "<h3>           تم اعتماد طلب سداد القرض</h3>" +
                            //"<h4>                  للدخول على النظام يرجى استخدام</h4>" +
                            //"<h5>                  رقمك الوظيفى ... " + emp.Emp_ID.ToString() + "</h5>" +
                            //"<h5>                  وكلمة المرور ... " + emp.Emp_Password + "</h5>" +
                            "<h3>                           مع تحيات دائرة الشؤون الإسلامية والعمل الخيري ـ لجنة صندوق تكافل العاملين .</h3>" +
                            "</td></tr></table>" +
                            "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                            "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                            "</td></tr></table>";

                this.SendMessageAsync("اعتماد طلب سداد القرض", emailContent, mailList, true);

            }

            public void CancelLoanRequestRejected(long employeeID)
            {

                var tpDB = new TakafulEntities();
                Employee emp = tpDB.Employees.FirstOrDefault(i => i.Emp_ID == employeeID);
                var mailList = new[] { emp.Emp_Email };

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                            "<tr>" +
                            "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                            "<h2>مرحبا بك ... " + emp.Emp_FullName + "</h2>" +
                            "<br /><br /><br />" +
                            "<h2>                  نعتذر عن عدم قبول طلب سداد القرض</h2>" +
                            "<br /><br /><br />" +
                            "<h3>                           مع تحيات دائرة الشؤون الإسلامية والعمل الخيرى</h3>" +
                            "</td></tr></table>" +
                            "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                            "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                            "</td></tr></table>";

                this.SendMessageAsync("رفض طلب سداد القرض", emailContent, mailList, true);

            }

            public void RestorePassword(string employeeID, string password, string name, string mailAddress)
            {

                var mailList = new[] { mailAddress };

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                            "<tr>" +
                            "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                            "<h2>مرحبا بك ... " + name + "</h2>" +
                            "<h4>                  للدخول على النظام يرجى استخدام</h4>" +
                            "<h5>                  رقمك الوظيفى ... " + employeeID + "</h5>" +
                            "<h5>                  وكلمة المرور ... " + password + "</h5>" +
                            "<h3>                           مع تحيات دائرة الشؤون الإسلامية والعمل الخيرى</h3>" +
                            "</td></tr></table>" +
                            "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                            "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                            "</td></tr></table>";

                this.SendMessageAsync("بيانات الدخول", emailContent, mailList, true);

            }

            public void ContactNotification(string adminEmail, string name, string mobile, string email, string message)
            {

                var tpDB = new TakafulEntities();
                var mailList = new[] { adminEmail };

                message = message.Replace("\n", "<br />");

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                            "<tr>" +
                            "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                            "<h2>مرحبا بك ... </h2>" +
                            "<h3>           تم إرسال طلب إستعلام وتواصل بالبيانات الأتية :</h3>" +
                            "<h5>                  الاسم : " + name + "</h5>" +
                            "<h5>                  رقم الهاتف : " + mobile + "</h5>" +
                            "<h5>                  البريد الإلكترونى : " + email + "</h5>" +
                            "<h5>                  الرسالة : " + message + "</h5>" +
                            "</td></tr></table>" +
                            "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                            "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                            "</td></tr></table>";

                this.SendMessageAsync("طلب إستعلام وتواصل", emailContent, mailList, true);

            }

            public bool SendRequestNotificationToCommittee(string meetingSerial, string meetingDate, List<string> mailTo)
            {
                var tpDB = new TakafulEntities();

                string emailContent = "<img src='" + Common.CurrentHostingServer.Host + "/Content/Images/logo.png' /></div><table align='center' dir='rtl' style='width: 77%;'>" +
                            "<tr>" +
                            "<td style='padding: 30px; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgrectangel.jpg); border-radius: 20px;'>" +
                            "<h2>مرحبا بك ... </h2>" +
                            "<h3>           تم تحويل بعض الطلبات المقدمة من الأعضاء الى اللجنة لإعتمادها والخاصة بالإجتماع :</h3>" +
                            "<h5>                  رقم الإجتماع : " + meetingSerial + "</h5>" +
                            "<h5>                  تاريخ الإجتماع : " + meetingDate + "</h5>" +
                            "<h5>                   يرجى اتخاذ اللازم</h5>" +
                            "</td></tr></table>" +
                            "<table align='center' dir='rtl' style='width: 77%;'><tr><td>" +
                            "<h1 style='text-align: center; background-image: url(" + Common.CurrentHostingServer.Host + "/Content/Images/bgfooter.jpg); vertical-align: middle; padding-top: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px; margin: 25px 0px 0px; height: 30px; width: 100%; color: rgb(255, 255, 255); font-size: 15px; font-family: MYFONTINPUT; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;'>جميع الحقوق محفوظة 2015</h1>" +
                            "</td></tr></table>";

                return SendMessage("طلب اعتماد لطلبات الأعضاء", emailContent, mailTo, true);

            }

        }

        public class SMSToUsers
        {
            public void SendSMSToUser(string phoneNumber, string messageBody)
            {
                Logging.LogInfo($"Starting  SendSMSToUser, phoneNumber: {phoneNumber} | messageBody:{messageBody}");

                string sMsgBody = messageBody;
                //string strUserName = "dicd";
                string strUserName = (string.IsNullOrEmpty(ConfigurationManager.AppSettings["SMS_UserName"]) == false ? ConfigurationManager.AppSettings["SMS_UserName"].ToString() : string.Empty);
                //string strPassword = "it$iacadte";
                //string strPassword = "du#4SYSw";
                string strPassword = (string.IsNullOrEmpty(ConfigurationManager.AppSettings["SMS_Password"]) == false ? ConfigurationManager.AppSettings["SMS_Password"].ToString() : string.Empty);

                var SMS_RerouteTo = (string.IsNullOrEmpty(ConfigurationManager.AppSettings["SMS_RerouteTo"]) == false ? ConfigurationManager.AppSettings["SMS_RerouteTo"].ToString() : string.Empty);
                string strMobile = phoneNumber;
                if (!string.IsNullOrEmpty(SMS_RerouteTo))
                {
                    strMobile = SMS_RerouteTo;
                }

                string strMsgBody = EncodeMsg(sMsgBody);
                string strXMLMsg =
                        "http://www.ducont.ae/smscompanion/smsadmin/RapidEgovXmlSmsSubmit_Sub.asp?msg=" +

                                  "<?xml version='1.0' encoding='UTF-8'?>" +
                                 "<Request>" +
                                     "<Body>" +
                                         "<bulk_msg>" +
                                             "<user_id>" + strUserName + "</user_id>" +
                                             "<password>" + strPassword + "</password>" +
                                             "<dept_id>448</dept_id>" +
                                             "<message>" +
                                                 "<title>448</title>" +
                                                 "<count>1</count>" +
                                                 "<body1>" + strMsgBody + "</body1>" +
                                                 "<values>" +
                                                     "<msg_id>1</msg_id>" +
                                                     "<mobile_no>" + strMobile + "</mobile_no>" +
                                                     "<drmsgid>DR1</drmsgid>" +
                                                 "</values>" +
                                             "</message>" +
                                         "</bulk_msg>" +
                                     "</Body>" +
                                 "</Request>";

                try
                {
                    WebRequest request = WebRequest.Create(strXMLMsg);
                    WebResponse response = request.GetResponse();
                    StreamReader mySR = new StreamReader(response.GetResponseStream());
                    sReadStream = mySR.ReadToEnd();// Read the stream upto the end of stream. 

                    Logging.LogInfo($"Sending SMS to: {strMobile} | output:{sReadStream}");
                }
                catch (Exception ex) {

                    ex.Message.ToString();
                    Logging.LogError(ex, $"Sending SMS to: {strMobile}");
                }

                Logging.LogInfo($"Ending  SendSMSToUser, phoneNumber: {phoneNumber} | messageBody:{messageBody}");
            }

            public string EncodeMsg(string asciiString)//to hex
            {
                string hex = "|*UCS2|";
                foreach (char c in asciiString)
                {
                    int tmp = c;
                    hex += String.Format("{0:x4}", (uint)System.Convert.ToUInt32(tmp.ToString()));
                }
                return hex;
            }

            public string sReadStream { get; set; }

            public void SubscriptionRequestApproved(string name, string userName, string password, string phoneNumber)
            {

                string messageBody = "مرحباً بك " + name + Environment.NewLine +
                                     "تم اعتماد طلب الاشتراك بالصندوق" + Environment.NewLine +
                                     "للدخول على النظام يرجى استخدام" + Environment.NewLine +
                                     "رقمك الوظيفى " + userName + Environment.NewLine +
                                     "وكلمة المرور " + password + Environment.NewLine +
                                     "مع تحيات دائرة الشؤون الإسلامية والعمل الخيري ـ لجنة صندوق تكافل العاملين .";

                this.SendSMSToUser(phoneNumber, messageBody);

            }

            public void SubscriptionRequestRejected(string name, string phoneNumber)
            {

                string messageBody = "تم رفض طلب الاشتراك بالصندوق ... ";
                this.SendSMSToUser(phoneNumber, messageBody);

            }

            public void EditSubscriptionRequestApproved(string name, string phoneNumber)
            {

                string messageBody = "مرحباً بك " + name + Environment.NewLine +
                                     "تم اعتماد طلب تعديل الاشتراك بالصندوق" + Environment.NewLine +
                                     "مع تحيات دائرة الشؤون الإسلامية والعمل الخيري ـ لجنة صندوق تكافل العاملين .";

                this.SendSMSToUser(phoneNumber, messageBody);

            }

            public void EditSubscriptionRequestRejected(string name, string phoneNumber)
            {

                string messageBody = "تم رفض طلب تعديل الاشتراك بالصندوق ... ";
                this.SendSMSToUser(phoneNumber, messageBody);

            }

            public void CancelSubscriptionRequestApproved(string name, string phoneNumber)
            {

                string messageBody = "مرحباً بك " + name + Environment.NewLine +
                                     "تم اعتماد طلب الانسحاب من الصندوق" + Environment.NewLine +
                                     "مع تحيات دائرة الشؤون الإسلامية والعمل الخيري ـ لجنة صندوق تكافل العاملين .";

                this.SendSMSToUser(phoneNumber, messageBody);

            }

            public void CancelSubscriptionRequestRejected(string name, string phoneNumber)
            {

                string messageBody = "تم رفض طلب الانسحاب من الصندوق ... ";
                this.SendSMSToUser(phoneNumber, messageBody);

            }

            public void NewLoanRequestApproved(string name, string amount, string phoneNumber)
            {

                string messageBody = "مرحباً بك " + name + Environment.NewLine +
                                     "تم اعتماد طلب طلب القرض بمبلغ " + amount + Environment.NewLine +
                                     "مع تحيات دائرة الشؤون الإسلامية والعمل الخيري ـ لجنة صندوق تكافل العاملين .";

                this.SendSMSToUser(phoneNumber, messageBody);

            }

            public void NewLoanRequestRejected(string name, string phoneNumber)
            {

                string messageBody = "تم رفض طلب قرض ... ";
                this.SendSMSToUser(phoneNumber, messageBody);

            }

            public void EditLoanRequestApproved(string name, string phoneNumber)
            {

                string messageBody = "مرحباً بك " + name + Environment.NewLine +
                                     "تم اعتماد طلب تعديل قسط القرض" + Environment.NewLine +
                                     "مع تحيات دائرة الشؤون الإسلامية والعمل الخيري ـ لجنة صندوق تكافل العاملين .";

                this.SendSMSToUser(phoneNumber, messageBody);

            }

            public void EditLoanRequestRejected(string name, string phoneNumber)
            {

                string messageBody = "تم رفض طلب تعديل قسط القرض ... ";
                this.SendSMSToUser(phoneNumber, messageBody);

            }

            public void CancelLoanRequestApproved(string name, string phoneNumber)
            {

                string messageBody = "مرحباً بك " + name + Environment.NewLine +
                                     "تم اعتماد طلب سداد القرض" + Environment.NewLine +
                                     "مع تحيات دائرة الشؤون الإسلامية والعمل الخيري ـ لجنة صندوق تكافل العاملين .";
                this.SendSMSToUser(phoneNumber, messageBody);

            }

            public void CancelLoanRequestRejected(string name, string phoneNumber)
            {

                string messageBody = "تم رفض طلب سداد القرض ... ";
                this.SendSMSToUser(phoneNumber, messageBody);

            }

        }

        public class Business
        {

            public enum RequestType
            {
                NewSubscription,
                EditSubscription,
                CancelSubscription,
                NewLoan,
                EditLoanInstallment,
                CancelLoan
            }
            public enum RequestAction
            {
                Approve,
                Reject,
                TransferToCommittee
            }

            TakafulEntities tpDB = new TakafulEntities();

            public SolidarityFundInformation GetSolidarityFundInformation()
            {

                return tpDB.SolidarityFundInformations.AsNoTracking().FirstOrDefault(i => i.SFI_ID == 1);

            }

            public SubscriptionInformation GetSubscriptionInformation()
            {

                return tpDB.SubscriptionInformations.First(j => j.SuI_IsActive == true);

            }

            public IEnumerable<SubscriptionTransaction> GetSubscriptionTransactions(IList<Utility.GenericExpressionBuilder.ExpressionInfoProvider> filters)
            {
                var deleg = Utility.GenericExpressionBuilder.GetExpressionTree<SubscriptionTransaction>(filters).Compile();
                var filteredCollection = tpDB.SubscriptionTransactions
                    .Include("ApprovalStatu").Include("Employee")
                    .Where(deleg);

                return filteredCollection;
            }

            public IEnumerable<FundSubscription> GetFundSubscriptions(IList<Utility.GenericExpressionBuilder.ExpressionInfoProvider> filters)
            {
                var deleg = Utility.GenericExpressionBuilder.GetExpressionTree<FundSubscription>(filters).Compile();
                var filteredCollection = tpDB.FundSubscriptions.Where(deleg);

                return filteredCollection;
            }

            public int? GetTotalSubscriptionsForFundSubscription(int fundSubscriptionID)
            {
                List<SqlParameter> parameterList;
                SqlParameter[] parameters;

                parameterList = new List<SqlParameter>();
                parameterList.Add(new SqlParameter("@FusID", fundSubscriptionID));
                parameters = parameterList.ToArray();
                List<int> resSub = tpDB.Database.SqlQuery<int>("SELECT SUM(CBD_PaidAmount) AS Total FROM CostingBreakdownDetail GROUP BY FSu_ID HAVING (FSu_ID = @FusID)", parameters).ToList();

                if (resSub.Count > 0)
                {
                    return resSub[0];
                }

                return null;
            }

            public IEnumerable<LoanAmount> GetLoanAmounts(IList<Utility.GenericExpressionBuilder.ExpressionInfoProvider> filters)
            {
                var deleg = Utility.GenericExpressionBuilder.GetExpressionTree<LoanAmount>(filters).Compile();
                var filteredCollection = tpDB.LoanAmounts.Where(deleg);

                return filteredCollection;
            }

            public int? GetLoanInstallment(int loanID)
            {

                //var bus = new Business();

                var filter = new List<Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider>()
                {
                    new Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                    {
                        PropertyName = "",
                        InnerOperator = Common.Utility.GenericExpressionBuilder.InnerOperator.Equal,
                        Value = null,
                        OuterOperator = Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso,
                        SubExpressions = new List<Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider>()
                        {
                            new Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                            {
                                PropertyName = "SuT_SubscriptionType",
                                InnerOperator = Common.Utility.GenericExpressionBuilder.InnerOperator.Equal,
                                Value = 4,
                                OuterOperator = Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                            },
                            new Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                            {
                                PropertyName = "SuT_SubscriptionType",
                                InnerOperator = Common.Utility.GenericExpressionBuilder.InnerOperator.Equal,
                                Value = 5,
                                OuterOperator = Common.Utility.GenericExpressionBuilder.OuterOperator.OrElse
                            }
                        }
                    },
                    new Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                    {
                        PropertyName = "SuT_ApprovalStatus",
                        InnerOperator = Common.Utility.GenericExpressionBuilder.InnerOperator.Equal,
                        Value = 2,
                        OuterOperator = Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                    },
                    new Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                    {
                        PropertyName = "LAm_ID",
                        InnerOperator = Common.Utility.GenericExpressionBuilder.InnerOperator.Equal,
                        Value = loanID,
                        OuterOperator = Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                    }
                };

                var subT = this.GetSubscriptionTransactions(filter).OrderByDescending(s => s.SortIndex).Take(1).FirstOrDefault();
                if (subT != null)
                {
                    return subT.SuT_Amount;
                }

                return null;

            }

            public int? GetPaidAmountOfLoan(int loanID)
            {

                List<SqlParameter> parameterList;
                SqlParameter[] parameters;

                parameterList = new List<SqlParameter>();
                parameterList.Add(new SqlParameter("@LoanID", loanID));
                parameters = parameterList.ToArray();
                List<int> resLoan = tpDB.Database.SqlQuery<int>("SELECT SUM(CBD_PaidAmount) AS Total FROM CostingBreakdownDetail GROUP BY LAm_ID HAVING (LAm_ID = @LoanID)", parameters).ToList();

                if (resLoan.Count > 0)
                {
                    return resLoan[0];
                }

                return null;

            }

            public IEnumerable<SubscriptionTransaction> GetUnfulfilledRequests(RequestType requestType, DateTime fromDate, DateTime toDate)
            {

                int value = 0;

                switch (requestType)
                {
                    case RequestType.NewSubscription:
                        value = 1;
                        break;
                    case RequestType.EditSubscription:
                        value = 2;
                        break;
                    case RequestType.CancelSubscription:
                        value = 3;
                        break;
                    case RequestType.NewLoan:
                        value = 4;
                        break;
                    case RequestType.EditLoanInstallment:
                        value = 5;
                        break;
                    case RequestType.CancelLoan:
                        value = 6;
                        break;
                }

                var filter = new List<Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider>()
                {
                    new Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                    {
                        PropertyName = "SuT_SubscriptionType",
                        InnerOperator = Common.Utility.GenericExpressionBuilder.InnerOperator.Equal,
                        Value = value,
                        OuterOperator = Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                    },
                    new Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                    {
                        PropertyName = "SuT_ApprovalStatus",
                        InnerOperator = Common.Utility.GenericExpressionBuilder.InnerOperator.NotEqual,
                        Value = 2,
                        OuterOperator = Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                    },
                    new Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                    {
                        PropertyName = "SuT_ApprovalStatus",
                        InnerOperator = Common.Utility.GenericExpressionBuilder.InnerOperator.NotEqual,
                        Value = 3,
                        OuterOperator = Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                    },
                    new Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                    {
                        PropertyName = "SuT_Date",
                        InnerOperator = Common.Utility.GenericExpressionBuilder.InnerOperator.GreaterThanOrEqual,
                        Value = fromDate,
                        OuterOperator = Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                    },
                    new Common.Utility.GenericExpressionBuilder.ExpressionInfoProvider
                    {
                        PropertyName = "SuT_Date",
                        InnerOperator = Common.Utility.GenericExpressionBuilder.InnerOperator.LessThanOrEqual,
                        Value = toDate,
                        OuterOperator = Common.Utility.GenericExpressionBuilder.OuterOperator.AndAlso
                    }
                };


                var requests = this.GetSubscriptionTransactions(filter).OrderByDescending(l => l.SortIndex);

                return requests;

            }

            public DataObjects.Internal.Common.EmployeeData GetEmployee(long empID)
            {

                DataObjects.Internal.Common.EmployeeData employee = null;

                var emp = tpDB.Employees.Include("EmployeeServices").FirstOrDefault(em => em.Emp_ID == empID);

                if (emp != null)
                {
                    employee = new DataObjects.Internal.Common.EmployeeData();
                    employee.EmpID = emp.Emp_ID;
                    //employee.Password = emp.Emp_Password;
                    employee.AccountStatus = emp.Emp_AccountStatus;
                    employee.FullName = emp.Emp_FullName;
                    employee.Position = emp.Emp_Position;
                    employee.Department = emp.Emp_Department;
                    employee.Nationality = emp.Emp_Nationality;
                    employee.JoiningDate = emp.Emp_JoiningDate;
                    employee.Gender = emp.Emp_Gender.Value;
                    employee.Email = emp.Emp_Email;
                    employee.MobileNumber = emp.Emp_MobileNumber;
                    employee.DateOfBirth = emp.Emp_DateOfBirth;
                    employee.JobDegree = emp.Emp_JobDegree;
                    employee.Emp_IsLocalCitizen = emp.Emp_IsLocalCitizen;
                    employee.IsAdmin = emp.Emp_IsAdmin;
                    employee.IsHelpDesk = emp.Emp_IsHelpDesk;
                    if (tpDB.CommitteeMembers.Count(c => c.Emp_ID == emp.Emp_ID) > 0)
                    {
                        employee.IsCommitteeMember = true;
                    }

                    //Service Data
                    //var es = emp.EmployeeServices.OrderByDescending(d => d.EmS_OnDate).ToList();
                    var es = emp.EmployeeServices.OrderByDescending(d => d.EmS_OnDate).Take(1).ToList();
                    if (es.Count > 0)
                    {
                        employee.ServiceData = new DataObjects.Internal.Common.EmployeeServiceData();
                        employee.ServiceData.Date = es[0].EmS_OnDate;
                        employee.ServiceData.TotalSalary = es[0].EmS_TotalSalary;
                        employee.ServiceData.EndOfServiceBenefit = es[0].EmS_EndOfServiceBenefit;
                    }

                    //Subscription Data
                    employee.SubscriptionData = this.GetSubscriptionData(empID);

                    //Loan Data
                    employee.LoanData = this.GetLoanData(empID);

                    //Get the maximum allowed loan amount
                    employee.LoanBasicInfo = this.GetLoanBasicInfo(empID);

                    //General subscription information
                    var si = this.GetSubscriptionInformation();
                    employee.SubscriptionInformation = new DataObjects.Internal.Common.GeneralSubscriptionInformation();
                    employee.SubscriptionInformation.LessSubscriptionPeriodForLoan = si.SuI_LessSubscriptionPeriodForLoan.Value;
                    employee.SubscriptionInformation.LoanFirstAmount = si.SuI_LoanFirstAmount.Value;
                    employee.SubscriptionInformation.LoanMaximumAmount = si.SuI_LoanMaximumAmount.Value;
                    employee.SubscriptionInformation.MaximumAmount = si.SuI_MaximumAmount.Value;
                    employee.SubscriptionInformation.MinimumAmount = si.SuI_MinimumAmount.Value;
                    employee.SubscriptionInformation.MinimumSubscription = si.SuI_MinimumSubscription.Value;
                    employee.SubscriptionInformation.NumberOfInstallments = si.SuI_NumberOfInstallments.Value;
                    employee.SubscriptionInformation.PeriodBetweenLoans = si.SuI_PeriodBetweenLoans.Value;
                    employee.SubscriptionInformation.SubscriptionAmount = si.SuI_SubscriptionAmount.Value;
                    employee.SubscriptionInformation.MaxDeductionPercentage = si.SuI_MaxDeductionPercentage.Value;

                    employee.SubscriptionInformation.SuI_LessPeriodForReSbubscrition = si.SuI_LessPeriodForReSbubscrition.Value;
                    employee.SubscriptionInformation.SuI_LessPeriodForLoan4ReSubscriber = si.SuI_LessPeriodForLoan4ReSubscriber.Value;
                    employee.SubscriptionInformation.SuI_LessPeriodForLoanNewEmployee = si.SuI_LessPeriodForLoanNewEmployee.Value;

                }


                return employee;
            }

            public EmployeeService GetEmployeeService(long empID)
            {

                var es = new EmployeeService();


                var lst = tpDB.EmployeeServices.SqlQuery("SELECT EmployeeService.* FROM EmployeeService WHERE (Emp_ID = " + empID + ") ORDER BY EmS_OnDate DESC").ToList();

                if (lst.Count > 0)
                {
                    es = lst[0];
                }

                return es;

            }

            public DataObjects.Internal.Common.SubscriptionBoundaries GetSubscriptionBoundaries(long empID)
            {

                var bounds = new DataObjects.Internal.Common.SubscriptionBoundaries();

                var subInfo = this.GetSubscriptionInformation();
                var employee = this.GetEmployee(empID);
                ExceptionAmount exAmount = tpDB.ExceptionAmounts.FirstOrDefault(i => i.Emp_ID == empID && i.Exc_IsUsed == false && (i.FundSubscription == null || i.FundSubscription.FSu_Status == 1));

                //Get maximum allowed amount (with the exception if available)
                bounds.MaximumAmount_Normal = subInfo.SuI_MaximumAmount.Value;
                bounds.MaximumAmount = subInfo.SuI_MaximumAmount.Value;

                if (exAmount != null && exAmount.Exc_Amount.HasValue)
                {
                    if (bounds.MaximumAmount < exAmount.Exc_Amount.Value)
                    {
                        bounds.MaximumAmount = exAmount.Exc_Amount.Value;
                    }
                }

                //Get minimum allowed amount
                //bounds.MinimumAmount = subInfo.SuI_MinimumAmount.Value;

                //Get calculated amount
                var calculatedAmount = (int)employee.ServiceData.TotalSalary * (int)subInfo.SuI_MinimumSubscription / 100;

                if (calculatedAmount > subInfo.SuI_MaximumAmount)
                {
                    calculatedAmount = subInfo.SuI_MaximumAmount.Value;
                }
                else if (calculatedAmount < subInfo.SuI_MinimumAmount)
                {
                    calculatedAmount = subInfo.SuI_MinimumAmount.Value;
                }

                bounds.MinimumAmount = calculatedAmount;


                return bounds;


            }

            public DataObjects.Internal.Common.SubscriptionBoundaries GetSubscriptionBoundaries(Employee employee, SubscriptionInformation subscriptionInfo)
            {

                var bounds = new DataObjects.Internal.Common.SubscriptionBoundaries();

                //var subInfo = this.GetSubscriptionInformation();
                //var employee = this.GetEmployee(empID);
                long empID = employee.Emp_ID;
                ExceptionAmount exAmount = tpDB.ExceptionAmounts.FirstOrDefault(i => i.Emp_ID == empID && i.Exc_IsUsed == false && (i.FundSubscription == null || i.FundSubscription.FSu_Status == 1));

                //Get maximum allowed amount (with the exception if available)
                bounds.MaximumAmount_Normal = subscriptionInfo.SuI_MaximumAmount.Value;
                bounds.MaximumAmount = subscriptionInfo.SuI_MaximumAmount.Value;

                if (exAmount != null && exAmount.Exc_Amount.HasValue)
                {
                    if (bounds.MaximumAmount < exAmount.Exc_Amount.Value)
                    {
                        bounds.MaximumAmount = exAmount.Exc_Amount.Value;
                    }
                }

                //Get employee service data
                var es = employee.EmployeeServices.OrderByDescending(d => d.EmS_OnDate).Take(1).ToList();
                var serviceData = new DataObjects.Internal.Common.EmployeeServiceData();
                if (es.Count > 0)
                {
                    serviceData.Date = es[0].EmS_OnDate;
                    serviceData.TotalSalary = es[0].EmS_TotalSalary;
                    serviceData.EndOfServiceBenefit = es[0].EmS_EndOfServiceBenefit;
                }

                //Get calculated amount
                var calculatedAmount = (int)serviceData.TotalSalary * (int)subscriptionInfo.SuI_MinimumSubscription / 100;

                if (calculatedAmount > subscriptionInfo.SuI_MaximumAmount)
                {
                    calculatedAmount = subscriptionInfo.SuI_MaximumAmount.Value;
                }
                else if (calculatedAmount < subscriptionInfo.SuI_MinimumAmount)
                {
                    calculatedAmount = subscriptionInfo.SuI_MinimumAmount.Value;
                }

                bounds.MinimumAmount = calculatedAmount;


                return bounds;


            }

            public int GetMaxAllowedDeduction(long empID)
            {
                int result = 0;
                var subInfo = this.GetSubscriptionInformation();

                //Get employee service data
                var es = tpDB.EmployeeServices.Where(em => em.Emp_ID == empID).OrderByDescending(d => d.EmS_OnDate).Take(1).ToList();
                result = (int)(es[0].EmS_TotalSalary * subInfo.SuI_MaxDeductionPercentage / 100);

                return result;
            }

            public int GetMaxAllowedDeduction(long empID, SubscriptionInformation subscriptionInfo)
            {
                int result = 0;

                //Get employee service data
                var es = tpDB.EmployeeServices.Where(em => em.Emp_ID == empID).OrderByDescending(d => d.EmS_OnDate).Take(1).ToList();
                result = (int)(es[0].EmS_TotalSalary * subscriptionInfo.SuI_MaxDeductionPercentage / 100);

                return result;
            }

            public string IsEligibleToRegister(long empID)
            {
                SubscriptionInformation infom = null; 
                SubscriptionTransaction subTrans = null;
                int LessPeriodForReSbubscrition=0;

                try
                {
                    infom = tpDB.SubscriptionInformations.FirstOrDefault();
                    subTrans = tpDB.SubscriptionTransactions.Where(x => x.Emp_ID == empID && x.SuT_SubscriptionType==3).OrderByDescending(y=>y.SuT_Date).FirstOrDefault();
                }catch(Exception ex)
                {
                    
                }

                if(infom!=null)
                {
                    LessPeriodForReSbubscrition = infom.SuI_LessPeriodForReSbubscrition.HasValue? infom.SuI_LessPeriodForReSbubscrition.Value:0;
                }

                Employee emp = tpDB.Employees.SingleOrDefault(i => i.Emp_ID == empID);

                if (emp == null)
                {
                    return "EmployeeNotFound";
                }

                if (emp.Emp_AccountStatus == true)
                {
                    return "AlreadyRegistered";
                }

                if (string.IsNullOrEmpty(emp.Emp_Email))
                {
                    return "NoEmail";
                }

                if(subTrans!=null)
                {
                    if(emp.Emp_AccountStatus.HasValue && emp.Emp_AccountStatus.Value==false)
                    {
                        DateTime submitCancelDate=new DateTime();
                        DateTime approvalCancelDate = new DateTime();
                        if (subTrans.SuT_Date.HasValue)
                        {
                            submitCancelDate = subTrans.SuT_Date.Value;
                        }
                        if (subTrans.SuT_ApprovalDate.HasValue)
                        {
                            approvalCancelDate = subTrans.SuT_ApprovalDate.Value;
                        }

                        if(submitCancelDate <= approvalCancelDate && LessPeriodForReSbubscrition>0)
                        {
                            if(approvalCancelDate.AddMonths(LessPeriodForReSbubscrition)>DateTime.Today)
                            {
                                return "LessPeriodForReSbubscrition";
                            }
                        }
                    }
                    //DateTime ddds= subTrans.app
                }


                return "True";

            }

            public DataObjects.Internal.Common.SubscriptionData GetSubscriptionData(long empID)
            {

                var result = new DataObjects.Internal.Common.SubscriptionData();

                var fs = tpDB.FundSubscriptions.Include("SubscriptionTransaction").FirstOrDefault(f => f.Emp_ID == empID && f.FSu_Status == 1);

                if (fs == null || fs.SubscriptionTransaction.Count == 0)
                {
                    return null;
                }

                var st = fs.SubscriptionTransaction.Where(s => s.SuT_ApprovalStatus == 2 && (s.SuT_SubscriptionType == 1 || s.SuT_SubscriptionType == 2)).OrderByDescending(s => s.SortIndex).ToList()[0];

                if (!st.SuT_Amount.HasValue)
                {
                    return null;
                }

                result.Amount = st.SuT_Amount.Value;
                result.SubscriptionDate = fs.FSu_Date;

                //Get total subscription
                List<SqlParameter> parameterList;
                SqlParameter[] parameters;

                parameterList = new List<SqlParameter>();
                parameterList.Add(new SqlParameter("@FusID", fs.FSu_ID));
                parameters = parameterList.ToArray();
                List<int> resSub = tpDB.Database.SqlQuery<int>("SELECT SUM(CBD_PaidAmount) AS Total FROM CostingBreakdownDetail GROUP BY FSu_ID HAVING (FSu_ID = @FusID)", parameters).ToList();

                if (resSub.Count > 0)
                {
                    result.TotalSubscription = resSub[0];
                }

                //Previous cancellation date
                var st2 = tpDB.SubscriptionTransactions.Where(s => s.SuT_ApprovalStatus == 2 && s.SuT_SubscriptionType == 3).OrderByDescending(s => s.SortIndex).ToList();

                if (st2.Count > 0)
                {
                    result.PreviousCancellationDate = st2[0].SuT_Date;
                }


                return result;
            }

            public string IsEligibleToEditSubscription(long empID)
            {

                var emp = this.GetEmployee(empID);

                if (emp == null)
                {
                    return "EmployeeNotFound";
                }

                //Check if has a valid subscription
                if (emp.SubscriptionData == null)
                {
                    return "NoValidSubscription";
                }

                //Check if has a subscription cancellation request
                if (tpDB.SubscriptionTransactions.Count(st => st.Emp_ID == empID && st.SuT_SubscriptionType == 3 && st.SuT_ApprovalStatus != 2 && st.SuT_ApprovalStatus != 3) > 0)
                {
                    return "SubscriptionCancellationSubmitted";
                }


                //Check if already has a previous subscription edit request
                if (tpDB.SubscriptionTransactions.Count(st => st.Emp_ID == empID && st.SuT_SubscriptionType == 2 && st.SuT_ApprovalStatus != 2 && st.SuT_ApprovalStatus != 3) > 0)
                {
                    return "AlreadySubmittedRequest";
                }


                //All good
                return "True";
            }

            public DataObjects.Internal.Common.LoanData GetLoanData(long empID)
            {

                var result = new DataObjects.Internal.Common.LoanData();

                var la = tpDB.LoanAmounts.Include("SubscriptionTransaction").FirstOrDefault(l => l.Emp_ID == empID && l.LAm_Status == 1);

                if (la == null || la.LAm_LoanAmount == null || la.SubscriptionTransaction.Count == 0)
                {
                    return null;
                }

                result.LoanDate = la.LAm_Date;
                result.LoanAmount = la.LAm_LoanAmount.Value;

                //Installment
                var st = la.SubscriptionTransaction.Where(s => s.SuT_ApprovalStatus == 2 && (s.SuT_SubscriptionType == 4 || s.SuT_SubscriptionType == 5)).OrderByDescending(s => s.SortIndex).ToList()[0];

                if (!st.SuT_Amount.HasValue)
                {
                    return null;
                }

                result.LoanInstallment = st.SuT_Amount.Value;

                //Paid amount
                List<SqlParameter> parameterList;
                SqlParameter[] parameters;

                parameterList = new List<SqlParameter>();
                parameterList.Add(new SqlParameter("@LoanID", la.LAm_ID));
                parameters = parameterList.ToArray();
                List<int> resLoan = tpDB.Database.SqlQuery<int>("SELECT SUM(CBD_PaidAmount) AS Total FROM CostingBreakdownDetail GROUP BY LAm_ID HAVING (LAm_ID = @LoanID)", parameters).ToList();

                if (resLoan.Count > 0)
                {
                    result.PaidAmount = resLoan[0];
                }

                //Remaining amount
                result.RemainingAmount = result.LoanAmount - result.PaidAmount;


                return result;
            }

            public DataObjects.Internal.Common.LoanBasicInfo GetLoanBasicInfo(long empID)
            {

                var loanInfo = new DataObjects.Internal.Common.LoanBasicInfo();
                var subInfo = tpDB.SubscriptionInformations.First(j => j.SuI_IsActive == true);
                EmployeeService empSer = tpDB.EmployeeServices.SqlQuery("SELECT EmployeeService.* FROM EmployeeService WHERE (Emp_ID = " + empID + ") ORDER BY EmS_OnDate DESC").Take(1).ToList()[0];
                LoanException loanExc = tpDB.LoanExceptions.FirstOrDefault(a => a.Emp_ID == empID && a.LEx_MaxAmount_IsUsed == false && a.FundSubscription.FSu_Status == 1);
                FundSubscription fus = tpDB.FundSubscriptions.FirstOrDefault(i => i.Emp_ID == empID && i.FSu_Status == 1);

                //Check if has a valid subscription
                if (fus == null)
                {
                    return null;
                }

                List<SqlParameter> parameterList;
                SqlParameter[] parameters;
                parameterList = new List<SqlParameter>();
                parameterList.Add(new SqlParameter("@FusID", fus.FSu_ID));
                parameters = parameterList.ToArray();
                int resFund = tpDB.Database.SqlQuery<int>("SELECT SUM(CBD_PaidAmount) AS Total FROM CostingBreakdownDetail GROUP BY FSu_ID HAVING (FSu_ID = @FusID)", parameters).ToList()[0];

                int totalAmount = (int)(empSer.EmS_EndOfServiceBenefit) + resFund;

                int maxAmount = 0;
                int maxAmount_Normal = 0;
                int maxAmount_Exception = 0;

                if (resFund >= (int)(subInfo.SuI_SubscriptionAmount))   //Check if total subscription reached the limit to unlock the high loan limit
                {
                    maxAmount = (int)(subInfo.SuI_LoanMaximumAmount);
                    maxAmount_Normal = maxAmount;
                }
                else
                {
                    maxAmount = (int)(subInfo.SuI_LoanFirstAmount);
                    maxAmount_Normal = maxAmount;
                }

                if (loanExc != null && loanExc.LEx_MaxAmount != null)   //Check if exception available
                {
                    maxAmount = (int)(loanExc.LEx_MaxAmount);
                }

                //In all cases the loan never exceeds the (end of service benefit + total subscription)
                if (maxAmount > totalAmount)
                {
                    maxAmount = totalAmount;
                }

                if (maxAmount_Normal > totalAmount)
                {
                    maxAmount_Normal = totalAmount;
                }

                //If the exception amount is smaller thanthenormal amount, we modify the max amount to be the same as normal amount
                if (maxAmount < maxAmount_Normal)
                {
                    maxAmount = maxAmount_Normal;
                }

                loanInfo.MaximumLoanAmount_Normal = maxAmount_Normal;
                loanInfo.MaximumLoanAmount_Exception = maxAmount;


                return loanInfo;
            }

            public string IsEligibleToCancelSubscription(long empID)
            {

                var emp = this.GetEmployee(empID);

                if (emp == null)
                {
                    return "EmployeeNotFound";
                }

                //Check if has a valid subscription
                if (emp.SubscriptionData == null)
                {
                    return "NoValidSubscription";
                }

                //Check if has open loan
                if (emp.LoanData != null)
                {
                    return "LoanExists";
                }

                //Check if has a subscription cancellation request
                if (tpDB.SubscriptionTransactions.Count(st => st.Emp_ID == empID && st.SuT_SubscriptionType == 3 && st.SuT_ApprovalStatus != 2 && st.SuT_ApprovalStatus != 3) > 0)
                {
                    return "AlreadySubmittedRequest";
                }


                //All good
                return "True";
            }

            public string TakeActionToNewSubscriptionRequest(long empID, int year, int serial, string notes, RequestAction action, Nullable<long> adminID)
            {

                var request = tpDB.SubscriptionTransactions.Include("Employee").Include("FundSubscription").FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial && s.SuT_SubscriptionType == 1 && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4));

                if (request == null || request.FundSubscription == null || request.Employee == null)
                {
                    return "NotFound";
                }

                request.SuT_ApprovalDate = DateTime.UtcNow;
                request.SuT_ApprovalNotes = notes;
                request.SuT_AdminID = adminID;

                switch (action)
                {
                    case RequestAction.Approve:
                        //Validate allowed deduction amount
                        int maxAllowedDeduction = this.GetMaxAllowedDeduction(empID);
                        if (request.SuT_Amount > maxAllowedDeduction)
                        {
                            return "MaxAllowedDeduction_" + maxAllowedDeduction.ToString();
                        }

                        request.SuT_ApprovalStatus = 2;
                        request.FundSubscription.FSu_Status = 1;
                        request.Employee.Emp_Role = 2;
                        request.Employee.Emp_AccountStatus = true;

                        var cbd = new CostingBreakdownDetail();
                        cbd.Emp_ID = empID;
                        cbd.CBD_Date = DateTime.UtcNow;
                        cbd.CBD_Details = 1;
                        cbd.CBD_PaidAmount = 0;
                        cbd.FSu_ID = request.FundSubscription.FSu_ID;

                        tpDB.Entry(request).State = EntityState.Modified;
                        tpDB.Entry(request.FundSubscription).State = EntityState.Modified;
                        tpDB.Entry(request.Employee).State = EntityState.Modified;
                        tpDB.CostingBreakdownDetails.Add(cbd);

                        //Check if exception is used
                        var boundaries = this.GetSubscriptionBoundaries(empID);
                        if (request.SuT_Amount > boundaries.MaximumAmount_Normal)
                        {
                            var ex = tpDB.ExceptionAmounts.FirstOrDefault(l => l.Emp_ID == empID && l.Exc_Amount != null && l.Exc_IsUsed != true && (l.FundSubscription == null || l.FundSubscription.FSu_Status == 1));
                            ex.Exc_IsUsed = true;
                            if (ex.FSu_ID == null)
                            {
                                ex.FSu_ID = request.FundSubscription.FSu_ID;
                            }

                            tpDB.Entry(ex).State = EntityState.Modified;
                        }

                        break;
                    case RequestAction.TransferToCommittee:
                        request.SuT_ApprovalStatus = 4;
                        tpDB.Entry(request).State = EntityState.Modified;
                        break;
                    case RequestAction.Reject:
                        request.SuT_ApprovalStatus = 3;
                        request.FundSubscription.FSu_Status = 3;

                        tpDB.Entry(request).State = EntityState.Modified;
                        tpDB.Entry(request.FundSubscription).State = EntityState.Modified;
                        break;
                }

                //Save changes to DB
                tpDB.SaveChanges();


                return "True";
            }

            public string TakeActionToEditSubscriptionRequest(long empID, int year, int serial, string notes, RequestAction action, Nullable<long> adminID)
            {

                var request = tpDB.SubscriptionTransactions.Include("Employee").Include("FundSubscription").FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial && s.SuT_SubscriptionType == 2 && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4));

                if (request == null || request.FundSubscription == null || request.Employee == null)
                {
                    return "NotFound";
                }

                request.SuT_ApprovalDate = DateTime.UtcNow;
                request.SuT_ApprovalNotes = notes;
                request.SuT_AdminID = adminID;

                switch (action)
                {
                    case RequestAction.Approve:
                        //Validate allowed deduction amount
                        int maxAllowedDeduction = this.GetMaxAllowedDeduction(empID);
                        //Loan installment (if exists)
                        var loanData = this.GetLoanData(empID);
                        if (loanData != null)
                        {
                            maxAllowedDeduction = maxAllowedDeduction - loanData.LoanInstallment;
                        }

                        if (request.SuT_Amount > maxAllowedDeduction)
                        {
                            return "MaxAllowedDeduction_" + maxAllowedDeduction.ToString();
                        }

                        request.SuT_ApprovalStatus = 2;
                        tpDB.Entry(request).State = EntityState.Modified;

                        //Check if exception is used
                        var boundaries = this.GetSubscriptionBoundaries(empID);
                        if (request.SuT_Amount > boundaries.MaximumAmount_Normal)
                        {
                            var ex = tpDB.ExceptionAmounts.FirstOrDefault(l => l.Emp_ID == empID && l.Exc_Amount != null && l.Exc_IsUsed != true && (l.FundSubscription == null || l.FundSubscription.FSu_Status == 1));
                            ex.Exc_IsUsed = true;
                            if (ex.FSu_ID == null)
                            {
                                ex.FSu_ID = request.FundSubscription.FSu_ID;
                            }

                            tpDB.Entry(ex).State = EntityState.Modified;
                        }

                        break;
                    case RequestAction.TransferToCommittee:
                        request.SuT_ApprovalStatus = 4;
                        tpDB.Entry(request).State = EntityState.Modified;
                        break;
                    case RequestAction.Reject:
                        request.SuT_ApprovalStatus = 3;
                        tpDB.Entry(request).State = EntityState.Modified;
                        break;
                }

                //Save changes to DB
                tpDB.SaveChanges();


                return "True";
            }

            public string TakeActionToCancelSubscriptionRequest(long empID, int year, int serial, string notes, RequestAction action, Nullable<long> adminID)
            {

                var request = tpDB.SubscriptionTransactions.Include("Employee").Include("FundSubscription").FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial && s.SuT_SubscriptionType == 3 && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4));

                if (request == null || request.FundSubscription == null || request.Employee == null)
                {
                    return "NotFound";
                }

                request.SuT_ApprovalDate = DateTime.UtcNow;
                request.SuT_ApprovalNotes = notes;
                request.SuT_AdminID = adminID;

                switch (action)
                {
                    case RequestAction.Approve:
                        request.SuT_ApprovalStatus = 2;
                        request.FundSubscription.FSu_Status = 2;
                        request.Employee.Emp_AccountStatus = false;
                        tpDB.Entry(request).State = EntityState.Modified;
                        tpDB.Entry(request.FundSubscription).State = EntityState.Modified;
                        tpDB.Entry(request.Employee).State = EntityState.Modified;
                        break;
                    case RequestAction.TransferToCommittee:
                        request.SuT_ApprovalStatus = 4;
                        tpDB.Entry(request).State = EntityState.Modified;
                        break;
                    case RequestAction.Reject:
                        request.SuT_ApprovalStatus = 3;
                        tpDB.Entry(request).State = EntityState.Modified;
                        break;
                }

                //Save changes to DB
                tpDB.SaveChanges();


                return "True";
            }

            public string IsEligibleToRequestLoan(long empID)
            {
                //Employee employee = tpDB.Employees.Where(x => x.Emp_ID == empID).FirstOrDefault();
                //SubscriptionInformation subscriptionInformation = tpDB.SubscriptionInformations.FirstOrDefault();
                SubscriptionTransaction CancelSubscriptionDate = null;

                try
                {
                    CancelSubscriptionDate = tpDB.SubscriptionTransactions.Where(x => x.Emp_ID == empID && x.SuT_SubscriptionType == 3).OrderByDescending(y=>y.SuT_Date).LastOrDefault();
                }
                catch(Exception ex)
                {

                }
                


                //Check if already submitted a request
                if (tpDB.SubscriptionTransactions.Count(st => st.Emp_ID == empID && st.SuT_SubscriptionType == 4 && st.SuT_ApprovalStatus != 2 && st.SuT_ApprovalStatus != 3) > 0)
                {
                    return "AlreadySubmittedRequest";
                }

                var emp = this.GetEmployee(empID);

                if (emp == null)
                {
                    return "EmployeeNotFound";
                }

                //Check if has a valid subscription
                if (emp.SubscriptionData == null)
                {
                    return "NoValidSubscription";
                }

                //Check if not passed the minimum subscription period for requesting loan (according to the exception status)
                int minDays = emp.SubscriptionInformation.LessSubscriptionPeriodForLoan * 30;
                int actualDays = (int)(DateTime.UtcNow - emp.SubscriptionData.SubscriptionDate).TotalDays;
                if (actualDays < minDays)
                {
                    //Check if has exception
                    if (tpDB.LoanExceptions.Count(l => l.Emp_ID == empID && l.FundSubscription.FSu_Status == 1 && l.LEx_LessSubscriptionPeriodForLoan == true) == 0)
                    {
                        return "MinimumSubscriptionPeriodViolation";
                    }
                }


                //Check if has a subscription cancellation request
                if (tpDB.SubscriptionTransactions.Count(st => st.Emp_ID == empID && st.SuT_SubscriptionType == 3 && st.SuT_ApprovalStatus != 2 && st.SuT_ApprovalStatus != 3) > 0)
                {
                    return "SubscriptionCancellationSubmitted";
                }

                //Check if has open loan & no exception available
                if (emp.LoanData != null)
                {
                    //Check if has exception
                    var exp = tpDB.LoanExceptions.FirstOrDefault(l => l.Emp_ID == empID && l.FundSubscription.FSu_Status == 1 && l.LEx_CanRequestLoanWithCurrentActiveLoan == true);
                    if (exp == null)
                    {
                        return "LoanExists";
                    }
                }
                else    //Check the time elapsed since the last closed loan
                {
                    var previousLoan = tpDB.LoanAmounts.Where(l => l.Emp_ID == empID && l.LAm_Status == 2).OrderByDescending(l => l.LAm_Date).FirstOrDefault();
                    if (previousLoan != null)
                    {
                        int minimumDays = emp.SubscriptionInformation.PeriodBetweenLoans * 30;
                        int days = (int)(DateTime.UtcNow - previousLoan.LAm_Date).TotalDays;
                        if (days < minimumDays)
                        {
                            //return "PeriodBetweenLoansExists_" + minimumDays.ToString();
                            return "PeriodBetweenLoansExists";
                        }
                    }
                }

                //Azad 2021-05-30 Check loan Eligiblity
                //Loan4ReSubscriber
                int Config_LessPeriodForLoan4ReSubscriber = emp.SubscriptionInformation.SuI_LessPeriodForLoan4ReSubscriber;
                //LoanNewEmployee
                int Config_LessPeriodForLoanNewEmployee = emp.SubscriptionInformation.SuI_LessPeriodForLoanNewEmployee;

                //Check Joining date
                if(!emp.JoiningDate.HasValue)
                {
                    return "NoJoininDateExist";
                }

                DateTime joiningdate = emp.JoiningDate.Value;
                if(joiningdate.AddMonths(Config_LessPeriodForLoanNewEmployee) > DateTime.Today)
                {
                    return "JoiningDateLessThanPeriod";
                }

                //Check Less Period loan for reSubscriber
                if (CancelSubscriptionDate != null)
                {
                    if (!CancelSubscriptionDate.SuT_Date.HasValue)
                    {
                        return "Loan4ReSubscriberSuT_DateError";
                        //DateTime cancelApprovalDate = CancelSubscriptionDate.SuT_ApprovalDate.Value;

                    }

                    if (CancelSubscriptionDate.SuT_ApprovalDate.HasValue)
                    {
                        //return "Loan4ReSubscriberApprovalDateError";

                        DateTime Loan4ReSubscriber = CancelSubscriptionDate.SuT_ApprovalDate.Value;

                        if (Loan4ReSubscriber.AddMonths(Config_LessPeriodForLoan4ReSubscriber) > DateTime.Today)
                        {
                            return "Loan4ReSubscriberLessThanPeriod";
                        }
                    }

                    //if approval date less than submit date then will procced due to Manager not approval yet and this cancel is not active
                    //if(CancelSubscriptionDate.SuT_Date > CancelSubscriptionDate.SuT_ApprovalDate)
                    //{
                    //    return "Loan4ReSubscriberDateNotCorrect";
                    //}

                   

                }



                //All good
                return "True";
            }

            public string TakeActionToNewLoanRequest(long empID, int year, int serial, int suggestedLoanAmount, string notes, RequestAction action, bool isApprovedByCommittee, out int approvedLoanAmount, Nullable<long> adminID)
            {

                approvedLoanAmount = 0;
                var employee = this.GetEmployee(empID);
                var request = tpDB.SubscriptionTransactions.Include("LoanAmount").FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial && s.SuT_SubscriptionType == 4 && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4));

                if (request == null || request.LoanAmount == null || employee == null)
                {
                    return "NotFound";
                }

                if (action == RequestAction.TransferToCommittee)
                {
                    //int loanAmount = 0;
                    //if (employee.LoanData != null && employee.LoanData.RemainingAmount > 0)
                    //{
                    //    loanAmount = request.LoanAmount.LAm_LoanAmount.Value + employee.LoanData.RemainingAmount;
                    //}
                    //else
                    //{
                    //    loanAmount = request.LoanAmount.LAm_LoanAmount.Value;
                    //}

                    //if (suggestedLoanAmount > loanAmount)
                    //{
                    //    return "SuggestedAmountViolation";
                    //}

                    if (suggestedLoanAmount > request.LoanAmount.LAm_LoanAmount.Value)
                    {
                        return "SuggestedAmountViolation";
                    }
                }

                request.SuT_ApprovalDate = DateTime.UtcNow;
                request.SuT_ApprovalNotes = notes;
                request.SuT_AdminID = adminID;
                int requestedAmount = request.LoanAmount.LAm_LoanAmount.Value;

                switch (action)
                {
                    case RequestAction.Approve:
                        //Check if the total deduction amount is within the max allowed deduction amount
                        int maxAllowedDeduction = this.GetMaxAllowedDeduction(empID);
                        maxAllowedDeduction = maxAllowedDeduction - employee.SubscriptionData.Amount;

                        if (request.SuT_Amount > maxAllowedDeduction)
                        {
                            return "MaxAllowedDeduction_" + maxAllowedDeduction.ToString();
                        }

                        //Close the previous loan (if exists)
                        int previousAmount = 0;

                        //if (employee.LoanData != null && employee.LoanData.RemainingAmount > 0)
                        if (employee.LoanData != null)
                        {
                            var prevLoan = tpDB.LoanAmounts.FirstOrDefault(l => l.Emp_ID == empID && l.LAm_Status == 1);
                            prevLoan.LAm_OriginalLoanAmount = prevLoan.LAm_LoanAmount;
                            //prevLoan.LAm_LoanAmount = employee.LoanData.PaidAmount;
                            prevLoan.LAm_Status = 2;
                            tpDB.Entry(prevLoan).State = EntityState.Modified;
                            if (employee.LoanData.RemainingAmount > 0)
                            {
                                prevLoan.LAm_LoanAmount = employee.LoanData.PaidAmount;
                                request.LoanAmount.LAm_LoanAmount += employee.LoanData.RemainingAmount; //Add the remaining amount to the amount of the new loan
                            }
                            //approvedLoanAmount = request.LoanAmount.LAm_LoanAmount.Value;
                            previousAmount = employee.LoanData.RemainingAmount;

                        }

                        request.SuT_ApprovalStatus = 2;
                        request.LoanAmount.LAm_Status = 1;

                        if (isApprovedByCommittee == true)
                        {
                            //Check if there's an approved value from the committee
                            var me = tpDB.MeetingTransactions.FirstOrDefault(m => m.Emp_ID == empID && m.SuT_Year == year && m.SuT_Serial == serial && m.SuT_SubscriptionType == 4);
                            if (me != null && me.MeT_ApprovedAmount.HasValue)
                            {
                                request.LoanAmount.LAm_LoanAmount = me.MeT_ApprovedAmount + previousAmount;
                                requestedAmount = me.MeT_ApprovedAmount.Value;
                            }
                            else
                            {
                                request.LoanAmount.LAm_LoanAmount = request.LoanAmount.LAm_SuggestedLoanAmount + previousAmount;
                                requestedAmount = request.LoanAmount.LAm_SuggestedLoanAmount.Value;
                            }

                        }

                        var cbd = new CostingBreakdownDetail();
                        cbd.Emp_ID = empID;
                        cbd.CBD_Date = DateTime.UtcNow;
                        cbd.CBD_Details = 2;
                        cbd.CBD_PaidAmount = 0;
                        cbd.LAm_ID = request.LoanAmount.LAm_ID;

                        tpDB.Entry(request).State = EntityState.Modified;
                        tpDB.Entry(request.LoanAmount).State = EntityState.Modified;
                        tpDB.CostingBreakdownDetails.Add(cbd);

                        approvedLoanAmount = requestedAmount;   //To be sent to the employee

                        //Check if exception is used
                        if (request.LoanAmount.LAm_LoanAmount > employee.LoanBasicInfo.MaximumLoanAmount_Normal)
                        {
                            var ex = tpDB.LoanExceptions.FirstOrDefault(l => l.Emp_ID == empID && l.LEx_MaxAmount != null && l.LEx_MaxAmount_IsUsed == false && l.FundSubscription.FSu_Status == 1);
                            ex.LEx_MaxAmount_IsUsed = true;
                            tpDB.Entry(ex).State = EntityState.Modified;
                        }
                        break;
                    case RequestAction.TransferToCommittee:
                        request.SuT_ApprovalStatus = 4;
                        request.LoanAmount.LAm_SuggestedLoanAmount = suggestedLoanAmount;
                        tpDB.Entry(request).State = EntityState.Modified;
                        tpDB.Entry(request.LoanAmount).State = EntityState.Modified;
                        break;
                    case RequestAction.Reject:
                        request.SuT_ApprovalStatus = 3;
                        request.LoanAmount.LAm_Status = 3;

                        tpDB.Entry(request).State = EntityState.Modified;
                        tpDB.Entry(request.LoanAmount).State = EntityState.Modified;
                        break;
                }

                //Save changes to DB
                tpDB.SaveChanges();


                return "True";
            }

            public List<DataObjects.Internal.Common.SubscriptionException> GetSubscriptionExceptions()
            {

                var result = new List<DataObjects.Internal.Common.SubscriptionException>();

                var exceptions = tpDB.ExceptionAmounts.Include("Employee").Where(ex => ex.FundSubscription == null || ex.FundSubscription.FSu_Status == 1).OrderBy(e => e.Emp_ID).ToList();

                for (int i = 0; i < exceptions.Count; i++)
                {
                    var temp = new DataObjects.Internal.Common.SubscriptionException();
                    temp.EmpID = exceptions[i].Emp_ID;
                    temp.Name = exceptions[i].Employee.Emp_FullName;
                    temp.Department = exceptions[i].Employee.Emp_Department;
                    temp.Amount = exceptions[i].Exc_Amount.Value;
                    temp.Notes = exceptions[i].Exc_Notes;
                    if (exceptions[i].Exc_IsUsed == true)
                    {
                        temp.IsUsed = true;
                    }
                    result.Add(temp);
                }


                return result;
            }

            public List<DataObjects.Internal.Common.LoanException> GetLoanExceptions()
            {

                var result = new List<DataObjects.Internal.Common.LoanException>();

                var exceptions = tpDB.LoanExceptions.Include("Employee").Where(ex => ex.FundSubscription.FSu_Status == 1).OrderBy(e => e.Emp_ID).ToList();

                for (int i = 0; i < exceptions.Count; i++)
                {
                    var temp = new DataObjects.Internal.Common.LoanException();
                    temp.EmpID = exceptions[i].Emp_ID;
                    temp.Name = exceptions[i].Employee.Emp_FullName;
                    temp.Department = exceptions[i].Employee.Emp_Department;
                    temp.Amount = exceptions[i].LEx_MaxAmount.Value;
                    temp.MinimumSubscriptionPeriod = exceptions[i].LEx_LessSubscriptionPeriodForLoan.Value;
                    temp.LoanRequestWithActiveLoan = exceptions[i].LEx_CanRequestLoanWithCurrentActiveLoan.Value;
                    temp.Notes = exceptions[i].LEx_Notes;
                    if (exceptions[i].LEx_MaxAmount_IsUsed == true)
                    {
                        temp.IsUsed = true;
                    }
                    result.Add(temp);
                }


                return result;
            }

            public bool IsHangingSubscriptionRequestForException(ExceptionAmount exception)
            {

                //Get subscription request for this employee
                long id = exception.Emp_ID;
                var request = tpDB.SubscriptionTransactions.FirstOrDefault(s => s.Emp_ID == id && (s.SuT_SubscriptionType == 1 || s.SuT_SubscriptionType == 2) && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4));

                if (request == null)
                {
                    return false;
                }

                //Get the subscription boundaries for this employee
                var boundaries = this.GetSubscriptionBoundaries(id);
                if (request.SuT_Amount <= boundaries.MaximumAmount_Normal)   //The request is using this exception
                {
                    return false;
                }


                return true;
            }

            public bool IsHangingLoanRequestForException(LoanException exception)
            {

                //Get subscription request for this employee
                long id = exception.Emp_ID;
                var request = tpDB.SubscriptionTransactions.Include("LoanAmount").FirstOrDefault(s => s.Emp_ID == id && s.SuT_SubscriptionType == 4 && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4));

                if (request == null)
                {
                    return false;
                }

                //Get the loan basic info for this employee
                var loanInfo = this.GetLoanBasicInfo(id);
                if (request.LoanAmount.LAm_LoanAmount <= loanInfo.MaximumLoanAmount_Normal)
                {
                    return false;
                }


                return true;
            }

            public string IsEligibleToEditLoanInstallment(long empID)
            {

                var emp = this.GetEmployee(empID);

                if (emp == null)
                {
                    return "EmployeeNotFound";
                }

                //Check if has a valid subscription
                if (emp.SubscriptionData == null)
                {
                    return "NoValidSubscription";
                }

                //Check if has a subscription cancellation request
                if (tpDB.SubscriptionTransactions.Count(st => st.Emp_ID == empID && st.SuT_SubscriptionType == 3 && st.SuT_ApprovalStatus != 2 && st.SuT_ApprovalStatus != 3) > 0)
                {
                    return "SubscriptionCancellationSubmitted";
                }


                //Check if already has a previous subscription edit request
                if (tpDB.SubscriptionTransactions.Count(st => st.Emp_ID == empID && st.SuT_SubscriptionType == 5 && st.SuT_ApprovalStatus != 2 && st.SuT_ApprovalStatus != 3) > 0)
                {
                    return "AlreadySubmittedRequest";
                }


                //All good
                return "True";
            }

            public string TakeActionToEditLoanRequest(long empID, int year, int serial, string notes, RequestAction action, Nullable<long> adminID)
            {

                var request = tpDB.SubscriptionTransactions.FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial && s.SuT_SubscriptionType == 5 && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4));

                if (request == null)
                {
                    return "NotFound";
                }

                request.SuT_ApprovalDate = DateTime.UtcNow;
                request.SuT_ApprovalNotes = notes;
                request.SuT_AdminID = adminID;

                switch (action)
                {
                    case RequestAction.Approve:
                        var subsData = this.GetSubscriptionData(empID);
                        //Check if the total deduction amount is within the max allowed deduction amount
                        int maxAllowedDeduction = this.GetMaxAllowedDeduction(empID);
                        maxAllowedDeduction = maxAllowedDeduction - subsData.Amount;

                        if (request.SuT_Amount > maxAllowedDeduction)
                        {
                            return "MaxAllowedDeduction_" + maxAllowedDeduction.ToString();
                        }

                        request.SuT_ApprovalStatus = 2;
                        tpDB.Entry(request).State = EntityState.Modified;
                        break;
                    case RequestAction.TransferToCommittee:
                        request.SuT_ApprovalStatus = 4;
                        tpDB.Entry(request).State = EntityState.Modified;
                        break;
                    case RequestAction.Reject:
                        request.SuT_ApprovalStatus = 3;
                        tpDB.Entry(request).State = EntityState.Modified;
                        break;
                }

                //Save changes to DB
                tpDB.SaveChanges();


                return "True";
            }

            public string IsEligibleToCancelLoan(long empID)
            {

                var emp = this.GetEmployee(empID);

                if (emp == null)
                {
                    return "EmployeeNotFound";
                }

                //Check if has a valid subscription
                if (emp.SubscriptionData == null)
                {
                    return "NoValidSubscription";
                }

                //Check if already submitted request
                if (tpDB.SubscriptionTransactions.Count(st => st.Emp_ID == empID && st.SuT_SubscriptionType == 6 && st.SuT_ApprovalStatus != 2 && st.SuT_ApprovalStatus != 3) > 0)
                {
                    return "AlreadySubmittedRequest";
                }


                //All good
                return "True";
            }

            public string TakeActionToCancelLoanRequest(long empID, int year, int serial, string notes, RequestAction action, Nullable<long> adminID)
            {

                var request = tpDB.SubscriptionTransactions.Include("Employee").Include("LoanAmount").FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial && s.SuT_SubscriptionType == 6 && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4));

                if (request == null || request.LoanAmount == null || request.Employee == null)
                {
                    return "NotFound";
                }

                request.SuT_ApprovalDate = DateTime.UtcNow;
                request.SuT_ApprovalNotes = notes;
                request.SuT_AdminID = adminID;

                switch (action)
                {
                    case RequestAction.Approve:
                        request.SuT_ApprovalStatus = 2;
                        request.LoanAmount.LAm_Status = 2;
                        tpDB.Entry(request).State = EntityState.Modified;
                        tpDB.Entry(request.LoanAmount).State = EntityState.Modified;
                        break;
                    case RequestAction.TransferToCommittee:
                        request.SuT_ApprovalStatus = 4;
                        tpDB.Entry(request).State = EntityState.Modified;
                        break;
                    case RequestAction.Reject:
                        request.SuT_ApprovalStatus = 3;
                        tpDB.Entry(request).State = EntityState.Modified;
                        break;
                }

                //Save changes to DB
                tpDB.SaveChanges();


                return "True";
            }

            public string WithdrawUserRequest(long empID, int year, int serial, string notes)
            {

                int loanAmount = 0;

                //Check if the request exists
                var request = tpDB.SubscriptionTransactions
                    .Include("Employee")
                    .Include("FundSubscription")
                    .Include("LoanAmount")
                    .FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial);

                if (request == null || request.Employee == null)
                {
                    return "NotFound";
                }

                //Check loan data integrity
                if (request.SuT_SubscriptionType == 1 || request.SuT_SubscriptionType == 2 || request.SuT_SubscriptionType == 3)    //Subscription
                {
                    if (request.FundSubscription == null)
                    {
                        return "NotFound";
                    }
                }
                else if (request.SuT_SubscriptionType == 4 || request.SuT_SubscriptionType == 5 || request.SuT_SubscriptionType == 6)    //Loan
                {
                    if (request.LoanAmount == null)
                    {
                        return "NotFound";
                    }
                }

                //Check if original state has been changed
                if (request.SuT_ApprovalStatus != 1)
                {
                    return "StateChanged";
                }

                //All validations completed, perform the cancellation
                var action = new RequestAction();
                action = RequestAction.Reject;
                var result = "";

                switch (request.SuT_SubscriptionType)
                {
                    case 1: //New subscription
                        result = TakeActionToNewSubscriptionRequest(empID, year, serial, notes, action, null);
                        break;
                    case 2: //Edit subscription
                        result = TakeActionToEditSubscriptionRequest(empID, year, serial, notes, action, null);
                        break;
                    case 3: //Cancel subscription
                        result = TakeActionToCancelSubscriptionRequest(empID, year, serial, notes, action, null);
                        break;
                    case 4: //New loan
                        result = TakeActionToNewLoanRequest(empID, year, serial, 0, notes, action, false, out loanAmount, null);
                        break;
                    case 5: //Edit loan
                        result = TakeActionToEditLoanRequest(empID, year, serial, notes, action, null);
                        break;
                    case 6: //Cancel loan
                        result = TakeActionToCancelLoanRequest(empID, year, serial, notes, action, null);
                        break;
                }


                return result;
            }

        }

    }
}
