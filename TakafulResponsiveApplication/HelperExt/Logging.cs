using log4net;
using log4net.Core;
using log4net.Layout;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Xml;

namespace TakafulResponsiveApplication.HelperExt
{
    public static class Logging
    {
        public static string ActionProp { get; set; }
        public static string ControllerProp { get; set; }

        public static string IDProp { get; set; }

        public static string ErrorReferanceNoProp { get; set; }

        public static string commentsProp { get; set; }

        public static Exception locException { get; set; }




        /// <summary>
        /// The log
        /// </summary>
        private static readonly ILog Log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        /// <summary>
        /// Logs the information.
        /// </summary>
        /// <param name="comments">The comments.</param>
        public static void LogInfo(string comments)
        {
            Log.Info(comments);
        }

        public static void LogError(Exception errorException, string comments)
        {
            // Don't do anything

            if (!string.IsNullOrEmpty(comments))
                commentsProp = comments;
            else
                commentsProp = string.Empty;

            if (errorException != null)
                locException = errorException;
            else
                locException = null;

            LogErrorCustom(errorException);
        }
        /// <summary>
        /// Logs the error.
        /// </summary>
        /// <param name="errorException">The log error.</param>
        /// <param name="comments">The comments.</param>
        public static void LogErrorCustom(Exception errorException, string actionname = "", string controllername = "", string idval = "")
        {

            if (errorException == null && locException != null)
                errorException = locException;

            string comments = string.IsNullOrEmpty(commentsProp) ? "NULL" : commentsProp;

            string TmpMesage = string.Empty;
            string TmpStackTrace = string.Empty;
            ActionProp = string.IsNullOrEmpty(actionname) ? string.Empty : actionname;
            ControllerProp = string.IsNullOrEmpty(controllername) ? string.Empty : controllername;
            IDProp = string.IsNullOrEmpty(idval) ? string.Empty : idval;

            //ErrorReferanceNoProp = string.IsNullOrEmpty(errorreferNo) ? string.Empty : errorreferNo;

            GetEnglishMessageAndStackTrace(errorException, out TmpMesage, out TmpStackTrace);



            StackTrace stackTrace = new System.Diagnostics.StackTrace(errorException, true);

            string message = GetStackProperties(stackTrace);

            if (errorException != null && errorException.InnerException != null)
            {
                string innerException = "Inner Exception : ";
                if (errorException.InnerException.InnerException != null)
                {
                    innerException = innerException +
                                     errorException.InnerException.InnerException.Message.Replace("\r\n", string.Empty);
                }
                else
                {
                    innerException = innerException + errorException.InnerException.Message.Replace("\r\n", string.Empty);
                }

                Log.Error(message + " - comments : " + comments + " - Error Message : " + TmpMesage + " ,StackTrace : " + TmpStackTrace + " " + innerException);
            }
            else
            {
                // Inner Exception is Null
                if (errorException != null)
                {
                    Log.Error(message + " - comments : " + comments + " - Error Message : " + TmpMesage + " ,StackTrace : " + TmpStackTrace);
                }
            }
        }

        /// <summary>
        /// Logs the fatal error.
        /// </summary>
        /// <param name="fatalException">The log fatal error.</param>
        /// <param name="comments">The comments.</param>
        public static void LogFatalError(Exception fatalException, string comments)
        {
            //Azad this to solutin for handle Fata errors but we does not use Now maybe will use Later 2017-09-12
            //if (fatalException != null)
            //{
            //    commentsProp = comments;
            //    throw fatalException;
            //}
            //else
            //{
            comments = string.IsNullOrEmpty(comments) ? "NULL" : comments;


            var stackTrace = new System.Diagnostics.StackTrace(fatalException, true);

            string message = GetStackProperties(stackTrace);

            if (fatalException != null && fatalException.InnerException != null)
            {
                string innerException = "Inner Exception : ";
                if (fatalException.InnerException.InnerException != null)
                {
                    innerException = innerException +
                                     fatalException.InnerException.InnerException.Message.Replace("\r\n", string.Empty);
                }
                else
                {
                    innerException = innerException + fatalException.InnerException.Message.Replace("\r\n", string.Empty);
                }

                Log.Fatal(message + " - " + comments + " - " + fatalException.Message + " " + innerException);
            }
            else
            {
                //// Inner Exception is Null
                if (fatalException != null)
                {
                    Log.Fatal(message + " - " + comments + " - " + fatalException.Message);
                }
            }
            //}
        }

        //Azad Get English Exception only for Logs
        public static string GetEnglishMessageAndStackTrace(this Exception ex, out string outexMsg, out string outexStackTrace)
        {
            CultureInfo currentCulture = Thread.CurrentThread.CurrentUICulture;
            string str = string.Empty;

            try
            {

                //ViewContext.RouteData.Values["action"]
                dynamic exceptionInstanceLocal = System.Activator.CreateInstance(ex.GetType());

                Thread.CurrentThread.CurrentUICulture = new CultureInfo("en-US");

                if (ex.Message == exceptionInstanceLocal.Message)
                {
                    dynamic exceptionInstanceENG = System.Activator.CreateInstance(ex.GetType());

                    outexMsg = exceptionInstanceENG.ToString();


                    str = exceptionInstanceENG.ToString() + ex.StackTrace;

                    outexStackTrace = ex.StackTrace;


                }
                else
                {
                    outexMsg = ex.Message;
                    outexStackTrace = ex.StackTrace;

                    str = ex.ToString();
                }
                Thread.CurrentThread.CurrentUICulture = currentCulture;

                return str;

            }
            catch (Exception)
            {
                Thread.CurrentThread.CurrentUICulture = currentCulture;

                outexMsg = ex.Message;
                outexStackTrace = ex.StackTrace;

                return ex.ToString();
            }
        }


        /// <summary>
        /// Gets the stack properties.
        /// </summary>
        /// <param name="stackTrace">The stack trace.</param>
        /// <returns>Returns Exception Details</returns>
        private static string GetStackProperties(System.Diagnostics.StackTrace stackTrace)
        {
            if (stackTrace.FrameCount > 0)
            {
                var stackProps = new StackTracePropertiesHelper
                {
                    FileName = System.IO.Path.GetFileName(stackTrace.GetFrame(stackTrace.FrameCount - 1).GetFileName()),
                    MethodName = stackTrace.GetFrame(stackTrace.FrameCount - 1).GetMethod().Name,
                    LineNumber = stackTrace.GetFrame(stackTrace.FrameCount - 1).GetFileLineNumber(),
                    ColumnNumber = stackTrace.GetFrame(stackTrace.FrameCount - 1).GetFileColumnNumber()
                };

                return " " + stackProps.FileName + "-" + stackProps.MethodName + " (L" + stackProps.LineNumber + ", C" +
                       stackProps.ColumnNumber + ") ";
            }
            return null;
        }
    }

    public class CusXmlLayout : XmlLayoutBase
    {

        static string _action = string.Empty;


        protected override void FormatXml(XmlWriter writer, LoggingEvent loggingEvent)
        {
            //Logging.ActionProp = ViewContext.Controller.ValueProvider.GetValue("action").ToString();
            //string sss= HttpContext.Current.Request.RequestContext.RouteData.DataTokens["action"].ToString();
            Logging.ErrorReferanceNoProp = string.Empty;
            Logging.ErrorReferanceNoProp = Guid.NewGuid().ToString();
            if (System.Web.HttpContext.Current.Session != null)
            {
                System.Web.HttpContext.Current.Session["ErrorReferanceNo"] = string.Empty;
                System.Web.HttpContext.Current.Session["ErrorReferanceNo"] = Logging.ErrorReferanceNoProp;
            }

            string LogLevel = string.Empty;
            string UserID = "Guest";

            try
            {
                LogLevel = loggingEvent.Level.Name;
                UserID = string.IsNullOrEmpty(HttpContext.Current.User.Identity.Name) ? "Guest" : HttpContext.Current.User.Identity.Name;
            }
            catch { }

            writer.WriteStartElement("LogEntry");
            writer.WriteStartElement("Date");
            writer.WriteString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff"));
            writer.WriteEndElement();
            writer.WriteStartElement("LogType");
            if (!string.IsNullOrEmpty(LogLevel))
            {
                writer.WriteString(LogLevel);
                writer.WriteEndElement();

                if (LogLevel.ToUpper() == "ERROR")
                {
                    //Controller
                    if (!string.IsNullOrEmpty(Logging.ControllerProp))
                    {
                        writer.WriteStartElement("Controller");
                        writer.WriteString(Logging.ControllerProp);
                        writer.WriteEndElement();
                    }
                    else
                    {
                        writer.WriteStartElement("Controller");
                        writer.WriteString("");
                        writer.WriteEndElement();
                    }

                    //Action
                    if (!string.IsNullOrEmpty(Logging.ActionProp))
                    {
                        writer.WriteStartElement("Action");
                        writer.WriteString(Logging.ActionProp);
                        writer.WriteEndElement();
                    }
                    else
                    {
                        writer.WriteStartElement("Action");
                        writer.WriteString("");
                        writer.WriteEndElement();
                    }

                    //ID
                    if (!string.IsNullOrEmpty(Logging.IDProp))
                    {
                        writer.WriteStartElement("ID");
                        writer.WriteString(Logging.IDProp);
                        writer.WriteEndElement();
                    }
                    else
                    {
                        writer.WriteStartElement("ID");
                        writer.WriteString("");
                        writer.WriteEndElement();
                    }
                }
            }
            else
            {
                writer.WriteString("ERROR");
                writer.WriteEndElement();

                //Controller
                if (!string.IsNullOrEmpty(Logging.ControllerProp))
                {
                    writer.WriteStartElement("Controller");
                    writer.WriteString(Logging.ControllerProp);
                    writer.WriteEndElement();
                }
                else
                {
                    writer.WriteStartElement("Controller");
                    writer.WriteString("");
                    writer.WriteEndElement();
                }

                //Action
                if (!string.IsNullOrEmpty(Logging.ActionProp))
                {
                    writer.WriteStartElement("Action");
                    writer.WriteString(Logging.ActionProp);
                    writer.WriteEndElement();
                }
                else
                {
                    writer.WriteStartElement("Action");
                    writer.WriteString("");
                    writer.WriteEndElement();
                }

                //ID
                if (!string.IsNullOrEmpty(Logging.IDProp))
                {
                    writer.WriteStartElement("ID");
                    writer.WriteString(Logging.IDProp);
                    writer.WriteEndElement();
                }
                else
                {
                    writer.WriteStartElement("ID");
                    writer.WriteString("");
                    writer.WriteEndElement();
                }

            }




            writer.WriteStartElement("UserID");
            writer.WriteString(UserID);
            writer.WriteEndElement();

            if (!string.IsNullOrEmpty(Logging.ErrorReferanceNoProp))
            {
                writer.WriteStartElement("ErrorReferanceNo");
                writer.WriteString(Logging.ErrorReferanceNoProp);
                writer.WriteEndElement();
            }
            else
            {
                writer.WriteStartElement("ErrorReferanceNo");
                writer.WriteString("");
                writer.WriteEndElement();
            }

            writer.WriteStartElement("Message");
            writer.WriteString(loggingEvent.RenderedMessage);
            writer.WriteEndElement();
            writer.WriteEndElement();
        }
    }


    public class StackTracePropertiesHelper
    {
        /// <summary>
        /// Gets or sets the name of the file.
        /// </summary>
        /// <value>
        /// The name of the file.
        /// </value>
        public string FileName { get; set; }

        /// <summary>
        /// Gets or sets the name of the method.
        /// </summary>
        /// <value>
        /// The name of the method.
        /// </value>
        public string MethodName { get; set; }

        /// <summary>
        /// Gets or sets the line number.
        /// </summary>
        /// <value>
        /// The line number.
        /// </value>
        public int LineNumber { get; set; }

        /// <summary>
        /// Gets or sets the column number.
        /// </summary>
        /// <value>
        /// The column number.
        /// </value>
        public int ColumnNumber { get; set; }
    }
}