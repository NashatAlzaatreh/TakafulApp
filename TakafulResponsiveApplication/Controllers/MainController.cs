using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;
using Newtonsoft.Json;
using TakafulResponsiveApplication.Models.Business.Common;

namespace TakafulResponsiveApplication.Controllers
{
    public class MainController : ApiController
    {

        //Last index:   //GET = 121   //PUT = 0   //POST = 128  //DELETE = 6


        #region ==== Master ====

        // GET: api/Main/Master/InternalMenus
        [Route("api/Main/Master/InternalMenus")]
        [HttpGet]
        public IHttpActionResult Get2()
        {

            var businessObj = new Models.Business.UI.MasterP();
            object result = null;

            try
            {
                result = businessObj.GetInternalMenus();
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/Master/Logout
        [Route("api/Main/Master/Logout")]
        [HttpPost]
        public IHttpActionResult Post6()
        {

            try
            {
                HttpContext.Current.Session.Remove("EmployeeID");
                HttpContext.Current.Session.Remove("LoggedUser");
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok("Done");

        }

        #endregion ==== Master ====


        #region    ==== Home ====

        #region Main

        // GET: api/Main/Home_Main/InitialData
        [Route("api/Main/Home_Main/InitialData")]
        [HttpGet]
        //[ResponseType(typeof(string))]
        public IHttpActionResult Get()
        {

            var businessObj = new Models.Business.UI.Home_Main();
            var dataObj = new Models.DataObjects.Internal.Home_Main.MainObject();

            try
            {
                dataObj = businessObj.GetInitialData();
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }


            return Ok(dataObj);

        }

        // GET: api/Main/Home_Main/Register?employeeID=7463
        [Route("api/Main/Home_Main/Register")]
        [HttpGet]
        [ResponseType(typeof(string))]
        public IHttpActionResult Get(long employeeID)
        {

            var index = new Models.Business.UI.Home_Main();
            string result = "";

            try
            {
                //Register employee
                result = index.Register(employeeID);
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion Main

        #region Start

        // GET: api/Main/Home_Start/InitialData
        [Route("api/Main/Home_Start/InitialData")]
        [HttpGet]
        //[ResponseType(typeof(string))]
        public IHttpActionResult Get5()
        {

            var businessObj = new Models.Business.UI.Home_Start();
            var dataObj = new Models.DataObjects.Internal.Home_Start.MainObject();

            try
            {
                //Check authorization
                if (!IsValidLogin())
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData((Models.DataObjects.Internal.User_Login.LoggedUser)HttpContext.Current.Session["LoggedUser"]);
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        #endregion Start

        #region Admin

        // GET: api/Main/Home_Admin/InitialData
        [Route("api/Main/Home_Admin/InitialData")]
        [HttpGet]
        //[ResponseType(typeof(string))]
        public IHttpActionResult Get4()
        {

            var businessObj = new Models.Business.UI.Home_Admin();
            var dataObj = new Models.DataObjects.Internal.Home_Admin.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        #endregion Admin

        #region Employee

        // GET: api/Main/Home_Employee/InitialData
        [Route("api/Main/Home_Employee/InitialData")]
        [HttpGet]
        //[ResponseType(typeof(string))]
        public IHttpActionResult Get6()
        {

            var businessObj = new Models.Business.UI.Home_Employee();
            var dataObj = new Models.DataObjects.Internal.Home_Employee.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Employee))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        #endregion Employee

        #region CommitteeMember

        // GET: api/Main/Home_CommitteeMember/InitialData
        [Route("api/Main/Home_CommitteeMember/InitialData")]
        [HttpGet]
        public IHttpActionResult Get34()
        {

            var businessObj = new Models.Business.UI.Home_CommitteeMember();
            var dataObj = new Models.DataObjects.Internal.Home_CommitteeMember.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        #endregion CommitteeMember

        #region HelpDesk

        // GET: api/Main/Home_HelpDesk/InitialData
        [Route("api/Main/Home_HelpDesk/InitialData")]
        [HttpGet]
        public IHttpActionResult Get72()
        {

            var businessObj = new Models.Business.UI.Home_HelpDesk();
            var dataObj = new Models.DataObjects.Internal.Home_HelpDesk.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.HelpDesk))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        #endregion HelpDesk

        #endregion ==== Home ====


        #region    ==== User ====

        #region Login

        //[Route("api/Main/User_Login/InitialData")]
        //[HttpGet]
        ////[ResponseType(typeof(string))]
        //public IHttpActionResult GetUser_LoginInitialData()
        //{

        //    var businessObj = new Models.Business.UI.Home_Main();
        //    var dataObj = new Models.DataObjects.Internal.Home_Main.MainObject();

        //    try
        //    {
        //        dataObj = businessObj.GetInitialData();
        //    }
        //    catch (Exception ex)
        //    {
        //        LogException(ex);
        //        return InternalServerErrorResult("InternalServerError");
        //    }


        //    return Ok(dataObj);

        //}

        [Route("api/Main/User_Login/DoSubscriptionRulesAcceptance")]
        [HttpPost]
        [ResponseType(typeof(bool))]
        public IHttpActionResult DoSubscriptionRulesAcceptance(long EmpId,bool IsApproval)
        {

            var businessObj = new Models.Business.UI.User_SubscriptionRulesAcceptance();
            bool dataObj = false; //new Models.DataObjects.Internal.User_SubscriptionRulesAcceptance();

            try
            {
                //Check authorization
                //if (!IsAuthorized(Models.Business.Common.UserRole.Employee))
                //{
                //    //this.Forbidden("NotAuthorized");
                //    return ForbiddenResult("NotAuthorized");
                //}

                dataObj = businessObj.DoIsApprovalNewRolesTable(EmpId, IsApproval, string.Empty);
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);


        }
        [Route("api/Main/User_Login/SubscriptionRulesAcceptance")]
        [HttpPost]
        [ResponseType(typeof(string))]
        public IHttpActionResult GetSubscriptionRulesAcceptance(long EmpId)
        {

            var businessObj = new Models.Business.UI.User_SubscriptionRulesAcceptance();
            var dataObj = new Models.DataObjects.Internal.User_SubscriptionRulesAcceptance();

            try
            {
                //Check authorization
                //if (!IsAuthorized(Models.Business.Common.UserRole.Employee))
                //{
                //    //this.Forbidden("NotAuthorized");
                //    return ForbiddenResult("NotAuthorized");
                //}

                dataObj = businessObj.GetIsApprovalNewRolesTable(EmpId);
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/User_Login/Login?userName=7463
        [Route("api/Main/User_Login/Login")]
        [HttpPost]
        [ResponseType(typeof(string))]
        public IHttpActionResult Post(string userName)
        {
            //string myPageURL = "";
            userName = userName.Replace("_-_-_", ".");

            try
            {

                //Check the username and password (in the request header)
                if (string.IsNullOrEmpty(userName) || !Request.Headers.Contains("userpassword"))
                {
                    //return StatusCode(HttpStatusCode.BadRequest);
                    return NotFoundResult("NotFound");
                }

                long employeeID;
                if (!long.TryParse(userName, out employeeID))
                {
                    return NotFoundResult("NotFound");
                }

                var loginPage = new Models.Business.UI.User_Login();

                //Login
                string pass = Request.Headers.GetValues("userpassword").First();
                Models.DataObjects.Internal.User_Login.LoggedUser loggedUser = loginPage.Login(employeeID, pass);

                if (loggedUser == null)
                {
                    //HttpContext.Current.Session["EmployeeID"] = null;
                    //HttpContext.Current.Session["LoggedUser"] = null;
                    HttpContext.Current.Session.Remove("EmployeeID");
                    HttpContext.Current.Session.Remove("LoggedUser");
                    return NotFoundResult("NotFound");
                }

                else if(loggedUser != null)
                {
                    var SubscriptionPage = new Models.Business.UI.User_SubscriptionRulesAcceptance();
                    var Subscriptio =    SubscriptionPage.GetIsApprovalNewRolesTable(employeeID);
                    if (Subscriptio == null)
                    {
                        return Ok("NeedApproval");
                    }else
                    {
                        if(Subscriptio.Acceptance.HasValue && Subscriptio.Acceptance.Value==false)
                        {
                            return Ok("NeedApproval");
                        }
                    }
                }

                //Add the user to the session    
                HttpContext.Current.Session["EmployeeID"] = loggedUser.EmployeeID;
                //HttpContext.Current.Session["EmployeeRole"] = loggedUser.RoleID;
                HttpContext.Current.Session["LoggedUser"] = loggedUser;
                //myPageURL = loggedUser.MyPageURL;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }


            return Ok("Success");

        }

        #endregion Login

        #region RestorePassword

        // GET: api/Main/User_RestorePassword/Send
        [Route("api/Main/User_RestorePassword/Send")]
        [HttpPost]
        public IHttpActionResult Post(object submittedData)
        {
            var businessObj = new Models.Business.UI.User_RestorePassword();
            string result = "";

            try
            {
                dynamic obj = submittedData;
                var empNumber = (long)obj.EmpNumber;
                var email = obj.Email.ToString();

                result = businessObj.Send(empNumber, email);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion RestorePassword

        #region ChangePassword

        // GET: api/Main/User_ChangePassword/Submit
        [Route("api/Main/User_ChangePassword/Submit")]
        [HttpPost]
        public IHttpActionResult Post67()
        {
            var businessObj = new Models.Business.UI.User_ChangePassword();
            string result = "";

            try
            {
                //Check authorization
                if (!IsValidLogin())
                {
                    return ForbiddenResult("NotAuthorized");
                }

                //Check the old and new password (in the request header)
                if (!Request.Headers.Contains("oldpassword") || !Request.Headers.Contains("newpassword"))
                {
                    return BadRequestResult("NoPassword");
                }

                string oldPass = Request.Headers.GetValues("oldpassword").First();
                string newPass = Request.Headers.GetValues("newpassword").First();

                result = businessObj.Submit(oldPass, newPass);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion ChangePassword

        #region RoleManagement

        // GET: api/Main/User_RoleManagement/InitialData
        [Route("api/Main/User_RoleManagement/InitialData")]
        [HttpGet]
        public IHttpActionResult Get79()
        {

            var businessObj = new Models.Business.UI.User_RoleManagement();
            var dataObj = new List<Models.DataObjects.Internal.User_RoleManagement.MainObject>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/User_RoleManagement/Set
        [Route("api/Main/User_RoleManagement/Set")]
        [HttpPost]
        public IHttpActionResult Post68(object submittedData)
        {

            var businessObj = new Models.Business.UI.User_RoleManagement();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var role = (int)obj.Role;
                var value = (bool)obj.Value;

                result = businessObj.SetRole(empID, role, value);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/User_RoleManagement/Export
        [Route("api/Main/User_RoleManagement/Export")]
        [HttpPost]
        public IHttpActionResult Post69(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.User_RoleManagement();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion RoleManagement

        #region RoleManagementNonEmployees

        // GET: api/Main/User_RoleManagementNonEmployees/InitialData
        [Route("api/Main/User_RoleManagementNonEmployees/InitialData")]
        [HttpGet]
        public IHttpActionResult Get86()
        {

            var businessObj = new Models.Business.UI.User_RoleManagementNonEmployees();
            var dataObj = new List<Models.DataObjects.Internal.User_RoleManagementNonEmployees.MainObject>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/User_RoleManagementNonEmployees/Set
        [Route("api/Main/User_RoleManagementNonEmployees/Set")]
        [HttpPost]
        public IHttpActionResult Post79(object submittedData)
        {

            var businessObj = new Models.Business.UI.User_RoleManagementNonEmployees();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var role = (int)obj.Role;
                var value = (bool)obj.Value;

                result = businessObj.SetRole(empID, role, value);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/User_RoleManagementNonEmployees/Export
        [Route("api/Main/User_RoleManagementNonEmployees/Export")]
        [HttpPost]
        public IHttpActionResult Post80(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.User_RoleManagementNonEmployees();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion RoleManagementNonEmployees

        #region AuditManagement

        // GET: api/Main/User_AuditManagement/InitialData
        [Route("api/Main/User_AuditManagement/InitialData")]
        [HttpGet]
        public IHttpActionResult Get103()
        {

            var businessObj = new Models.Business.UI.User_AuditManagement();
            var dataObj = new Models.DataObjects.Internal.User_AuditManagement.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/User_AuditManagement/Save
        [Route("api/Main/User_AuditManagement/Save")]
        [HttpPost]
        public IHttpActionResult Post101(object submittedData)
        {

            var businessObj = new Models.Business.UI.User_AuditManagement();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var userName = (long)obj.UserName;
                var password = obj.Password.ToString();

                result = businessObj.Save(userName, password);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion AuditManagement

        #endregion ==== User ====


        #region ==== Misc ====

        #region CommitteeMembers

        // GET: api/Main/Misc_CommitteeMembers/InitialData
        [Route("api/Main/Misc_CommitteeMembers/InitialData")]
        [HttpGet]
        //[ResponseType(typeof(string))]
        public IHttpActionResult Get3()
        {

            var businessObj = new Models.Business.UI.Misc_CommitteeMembers();
            var dataObj = new List<Models.DataObjects.Internal.Misc_CommitteeMembers.MainObject>();
            string data = "";

            try
            {
                dataObj = businessObj.GetInitialData();

                if (dataObj.Count > 0)
                {
                    for (int i = 0; i < dataObj.Count; i++)
                    {
                        data += "<tr><td>" + dataObj[i].FullName + "</td><td>" + dataObj[i].OrganizationalStructure + "</td><td><img src=\"" + dataObj[i].ImagePath + "\" class=\"round\" alt=\"\" /></td></tr>";
                        //data += "<tr><th>" + dataObj[i].FullName + "</th><th>" + dataObj[i].OrganizationalStructure + "</th><th><img src=\"" + dataObj[i].ImagePath + "\" width=\"70\" height=\"70\" /></th></tr>";
                    }
                }
                else
                {
                    data += "<tr><td class=\"text-center\" colspan=\"3\">لايوجد بيانات</td></tr>";
                }

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(data);

        }

        #endregion CommitteeMembers

        #region ContactUs

        // GET: api/Main/Misc_ContactUs/PostInquiry
        [Route("api/Main/Misc_ContactUs/PostInquiry")]
        [HttpPost]
        //[ResponseType(typeof(string))]
        public async Task<IHttpActionResult> Post2(Models.DataObjects.Internal.Misc_ContactUs.Inquiry inquiry)
        {

            var businessObj = new Models.Business.UI.Misc_ContactUs();
            //var dataObj = new Models.DataObjects.Internal.Misc_ContactUs.Inquiry();

            try
            {

                if (inquiry == null)
                {
                    return BadRequestResult("BadRequest");
                }

                //dataObj.ID = inquiry.ID;
                //dataObj.Name = inquiry.Name;
                //dataObj.Mobile = inquiry.Mobile;
                //dataObj.Email = inquiry.Email;
                //dataObj.Message = inquiry.Message;
                //dataObj.CreatedDateTime = DateTime.UtcNow;

                //if (await businessObj.PostInquiry(dataObj) != true)
                //{
                //    throw InternalServerError("InternalServerError");
                //}

                inquiry.ID = 0;
                inquiry.CreatedDateTime = DateTime.UtcNow;

                if (await businessObj.PostInquiry(inquiry) != true)
                {
                    return InternalServerErrorResult("InternalServerError");
                }

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok("Done.");

        }

        #endregion ContactUs

        #region FileUploads

        // POST: api/Main/Misc/FileUploads/Upload
        [Route("api/Main/Misc/FileUploads/Upload")]
        [HttpPost]
        public async Task<HttpResponseMessage> Post()
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            try
            {
                string filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp + "/");

                var provider = new MultipartFormDataStreamProvider(filePath);

                await Request.Content.ReadAsMultipartAsync(provider);
                string newFileName = "";

                if (provider.FileData.Count > 0)
                {
                    MultipartFileData file = provider.FileData[0];

                    //Add the original extention to the file
                    //newFileName = String.Format("{0}{1}", file.LocalFileName, Path.GetExtension(file.Headers.ContentDisposition.FileName.Replace("\"", "")));
                    newFileName = Path.GetDirectoryName(file.LocalFileName) + "\\" + file.Headers.ContentDisposition.FileName.Replace("\"", "");
                    //Check if file exists with the same name
                    if (File.Exists(newFileName))
                    {
                        File.Delete(newFileName);

                    }
                    File.Move(file.LocalFileName, newFileName);
                }


                //foreach (MultipartFileData file in provider.FileData)
                //{
                //    //Add the original extention to the file
                //    string newFileName = String.Format("{0}{1}", file.LocalFileName, Path.GetExtension(file.Headers.ContentDisposition.FileName.Replace("\"", "")));
                //    File.Move(file.LocalFileName, newFileName);

                //    //Return a URL to the file location to enable viewing the file
                //    //return new HttpResponseMessage()
                //    //{
                //    //    Content = new StringContent(Path.GetFileName(newFileName).Replace(".", "dot")),
                //    //    StatusCode = HttpStatusCode.OK
                //    //};
                //}

                //return new HttpResponseMessage(HttpStatusCode.OK);
                //return Ok(new StringContent(Path.GetFileName(newFileName).Replace(".", "dot")));

                //Return a URL to the file location to enable viewing the file
                string location = Path.GetFileName(newFileName).Replace(".", "dottttt");

                return new HttpResponseMessage()
                {
                    Content = new StringContent(location),
                    StatusCode = HttpStatusCode.OK
                };

            }
            catch (Exception e)
            {
                //    System.Diagnostics.EventLog.WriteEntry("TakafulSystem", e.ToString() + Environment.NewLine + e.StackTrace, System.Diagnostics.EventLogEntryType.Error);
                //    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
                LogException(e);
                //return InternalServerErrorResult("InternalServerError");
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        // DELETE: api/Main/Misc/FileUploads/DeleteTempFile?fileName=CancelSubscription_2016118113738507.xlsx
        [Route("api/Main/Misc/FileUploads/DeleteTempFile")]
        [HttpDelete]
        public HttpResponseMessage DeleteTempFile(string fileName)
        {

            string filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp + "/" + fileName.Replace("dottttt", "."));

            if (!File.Exists(filePath))
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }

            File.Delete(filePath);

            return new HttpResponseMessage(HttpStatusCode.NoContent);


        }

        #endregion FileUploads

        #region SystemConfiguration

        // GET: api/Main/Misc_SystemConfiguration/InitialData
        [Route("api/Main/Misc_SystemConfiguration/InitialData")]
        [HttpGet]
        public IHttpActionResult Get83()
        {

            var businessObj = new Models.Business.UI.Misc_SystemConfiguration();
            var dataObj = new Models.DataObjects.Internal.Misc_SystemConfiguration.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Misc_SystemConfiguration/Save
        [Route("api/Main/Misc_SystemConfiguration/Save")]
        [HttpPost]
        public IHttpActionResult Post76(object subscriptionData)
        {

            var businessObj = new Models.Business.UI.Misc_SystemConfiguration();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = subscriptionData;
                var subscriptionPercentage = (int)obj.SubscriptionPercentage;
                var minSubscriptionAmount = (int)obj.MinSubscriptionAmount;
                var maxSubscriptionAmount = (int)obj.MaxSubscriptionAmount;
                var maxInstallmentsCount = (int)obj.MaxInstallmentsCount;
                var minSubscriptionPeriod = (int)obj.MinSubscriptionPeriod;
                var maxLoanAmount1 = (int)obj.MaxLoanAmount1;
                var maxLoanAmount2 = (int)obj.MaxLoanAmount2;
                var totalSubscriptionForMaxLoanAmount = (int)obj.TotalSubscriptionForMaxLoanAmount;
                var minPeriodBetweenLoans = (int)obj.MinPeriodBetweenLoans;
                var maxDeductionPercentage = (int)obj.MaxDeductionPercentage;
                var email = obj.Email.ToString();
                var suI_LessPeriodForLoan4ReSubscriber = (int)obj.SuI_LessPeriodForLoan4ReSubscriber;
                var suI_LessPeriodForReSbubscrition = (int)obj.SuI_LessPeriodForReSbubscrition;
                var suI_LessPeriodForLoanNewEmployee = (int)obj.SuI_LessPeriodForLoanNewEmployee;

                result = businessObj.Save(subscriptionPercentage, minSubscriptionAmount, maxSubscriptionAmount, maxInstallmentsCount, minSubscriptionPeriod, maxLoanAmount1, maxLoanAmount2, totalSubscriptionForMaxLoanAmount, minPeriodBetweenLoans, maxDeductionPercentage, email, suI_LessPeriodForLoan4ReSubscriber,suI_LessPeriodForReSbubscrition, suI_LessPeriodForLoanNewEmployee);
                
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion SystemConfiguration

        #region HomePageSettings

        // GET: api/Main/Misc_HomePageSettings/InitialData
        [Route("api/Main/Misc_HomePageSettings/InitialData")]
        [HttpGet]
        public IHttpActionResult Get102()
        {

            var businessObj = new Models.Business.UI.Misc_HomePageSettings();
            var dataObj = new Models.DataObjects.Internal.Misc_HomePageSettings.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Misc_HomePageSettings/Save
        [Route("api/Main/Misc_HomePageSettings/Save")]
        [HttpPost]
        public IHttpActionResult Post99(object submittedData)
        {

            var businessObj = new Models.Business.UI.Misc_HomePageSettings();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var title1 = obj.Title1.ToString();
                var title2 = obj.Title2.ToString();
                var title3 = obj.Title3.ToString();

                result = businessObj.Save(title1, title2, title3);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/Misc_HomePageSettings/SaveFile
        [Route("api/Main/Misc_HomePageSettings/SaveFile")]
        [HttpPost]
        public IHttpActionResult Post100(object submittedData)
        {
            string tempPath_Server = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath = "";
            string result = "";
            var businessObj = new Models.Business.UI.Misc_HomePageSettings();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var index = (int)obj.Index;
                var fileName = obj.FileName.ToString();

                filePath = tempPath_Server + "\\" + fileName.Replace("dottttt", ".");

                //Check if file exists in temp directory
                if (!File.Exists(filePath))
                {
                    return BadRequestResult("BadRequest");
                }

                //Upload the data from the file
                result = businessObj.SaveFile(index, fileName);
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion HomePageSettings

        #endregion ==== Misc ====


        #region ==== Request ====

        #region SubmittedRequests

        // GET: api/Main/Request_SubmittedRequests/InitialData?type=2&fromDate=2015-10-02&toDate=2015-11-15
        [Route("api/Main/Request_SubmittedRequests/InitialData")]
        [HttpGet]
        //[ResponseType(typeof(string))]
        public IHttpActionResult Get7(int type, DateTime fromDate, DateTime toDate)
        {

            var businessObj = new Models.Business.UI.Request_SubmittedRequests();
            var dataObj = new Models.DataObjects.Internal.Request_SubmittedRequests.MainObject();
            var reqType = new Common.Business.RequestType();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                switch (type)
                {
                    case 1:
                        reqType = Common.Business.RequestType.NewSubscription;
                        break;
                    case 2:
                        reqType = Common.Business.RequestType.EditSubscription;
                        break;
                    case 3:
                        reqType = Common.Business.RequestType.CancelSubscription;
                        break;
                    case 4:
                        reqType = Common.Business.RequestType.NewLoan;
                        break;
                    case 5:
                        reqType = Common.Business.RequestType.EditLoanInstallment;
                        break;
                    case 6:
                        reqType = Common.Business.RequestType.CancelLoan;
                        break;
                }

                dataObj = businessObj.GetInitialData(reqType, fromDate, toDate);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_SubmittedRequests/Export?type=2
        [Route("api/Main/Request_SubmittedRequests/Export")]
        [HttpPost]
        public IHttpActionResult Post10(List<List<string>> submittedData, int type)
        {

            var businessObj = new Models.Business.UI.Request_SubmittedRequests();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, type, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }


        #endregion SubmittedRequests

        #region NewSubscription_Submit

        // GET: api/Main/Request_NewSubscription_Submit/InitialData?empID=2232
        [Route("api/Main/Request_NewSubscription_Submit/InitialData")]
        [HttpGet]
        //[ResponseType(typeof(string))]
        public IHttpActionResult Get8(long empID)
        {

            var businessObj = new Models.Business.UI.Request_NewSubscription_Submit();
            var dataObj = new Models.DataObjects.Internal.Request_NewSubscription_Submit.MainObject();

            try
            {

                dataObj = businessObj.GetInitialData(empID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_NewSubscription_Submit/Submit
        [Route("api/Main/Request_NewSubscription_Submit/Submit")]
        [HttpPost]
        //[ResponseType(typeof(string))]
        public IHttpActionResult Post3(object subscriptionData)
        {

            var businessObj = new Models.Business.UI.Request_NewSubscription_Submit();
            string result = "";

            try
            {

                dynamic obj = subscriptionData;
                var empID = (long)obj.EmpID;
                var amount = (int)obj.Amount;
                var notes = obj.Notes.ToString();

                result = businessObj.Subscribe(empID, amount, notes);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion NewSubscription_Submit

        #region EditSubscription_Submit

        // GET: api/Main/Request_EditSubscription_Submit/InitialData
        [Route("api/Main/Request_EditSubscription_Submit/InitialData")]
        [HttpGet]
        //[ResponseType(typeof(string))]
        public IHttpActionResult Get9()
        {

            var businessObj = new Models.Business.UI.Request_EditSubscription_Submit();
            var dataObj = new Models.DataObjects.Internal.Request_EditSubscription_Submit.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Employee))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_EditSubscription_Submit/Submit
        [Route("api/Main/Request_EditSubscription_Submit/Submit")]
        [HttpPost]
        //[ResponseType(typeof(string))]
        public IHttpActionResult Post4(object subscriptionData)
        {

            var businessObj = new Models.Business.UI.Request_EditSubscription_Submit();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Employee))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = subscriptionData;
                var amount = (int)obj.Amount;
                var notes = obj.Notes.ToString();

                result = businessObj.EditSubscription(amount, notes);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion EditSubscription_Submit

        #region CancelSubscription_Submit

        // GET: api/Main/Request_CancelSubscription_Submit/InitialData
        [Route("api/Main/Request_CancelSubscription_Submit/InitialData")]
        [HttpGet]
        //[ResponseType(typeof(string))]
        public IHttpActionResult Get10()
        {

            var businessObj = new Models.Business.UI.Request_CancelSubscription_Submit();
            var dataObj = new Models.DataObjects.Internal.Request_CancelSubscription_Submit.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Employee))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CancelSubscription_Submit/Submit
        [Route("api/Main/Request_CancelSubscription_Submit/Submit")]
        [HttpPost]
        //[ResponseType(typeof(string))]
        public IHttpActionResult Post5(object subscriptionData)
        {

            var businessObj = new Models.Business.UI.Request_CancelSubscription_Submit();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Employee))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = subscriptionData;
                var notes = obj.Notes.ToString();

                result = businessObj.CancelSubscription(notes);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion CancelSubscription_Submit

        #region NewSubscription_Approve

        // GET: api/Main/Request_NewSubscription_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_NewSubscription_Approve/InitialData")]
        [HttpGet]
        //[ResponseType(typeof(string))]
        public IHttpActionResult Get11(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_NewSubscription_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_NewSubscription_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/Request_NewSubscription_Approve/Navigate?empID=2232&year=2012&serial=5&direction=1
        [Route("api/Main/Request_NewSubscription_Approve/Navigate")]
        [HttpGet]
        public IHttpActionResult Get12(long empID, int year, int serial, int direction)
        {

            var businessObj = new Models.Business.UI.Request_NewSubscription_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_NewSubscription_Approve.NavigationObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.Navigate(empID, year, serial, direction);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_NewSubscription_Approve/TakeAction
        [Route("api/Main/Request_NewSubscription_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post7(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_NewSubscription_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var notes = obj.Notes.ToString();
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, notes, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion NewSubscription_Approve

        #region EditSubscription_Approve

        // GET: api/Main/Request_EditSubscription_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_EditSubscription_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get13(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_EditSubscription_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_EditSubscription_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/Request_EditSubscription_Approve/Navigate?empID=2232&year=2012&serial=5&direction=1
        [Route("api/Main/Request_EditSubscription_Approve/Navigate")]
        [HttpGet]
        public IHttpActionResult Get14(long empID, int year, int serial, int direction)
        {

            var businessObj = new Models.Business.UI.Request_EditSubscription_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_EditSubscription_Approve.NavigationObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.Navigate(empID, year, serial, direction);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_EditSubscription_Approve/TakeAction
        [Route("api/Main/Request_EditSubscription_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post8(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_EditSubscription_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var notes = obj.Notes.ToString();
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, notes, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion EditSubscription_Approve

        #region CancelSubscription_Approve

        // GET: api/Main/Request_CancelSubscription_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_CancelSubscription_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get15(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_CancelSubscription_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CancelSubscription_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/Request_CancelSubscription_Approve/Navigate?empID=2232&year=2012&serial=5&direction=1
        [Route("api/Main/Request_CancelSubscription_Approve/Navigate")]
        [HttpGet]
        public IHttpActionResult Get16(long empID, int year, int serial, int direction)
        {

            var businessObj = new Models.Business.UI.Request_CancelSubscription_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CancelSubscription_Approve.NavigationObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.Navigate(empID, year, serial, direction);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CancelSubscription_Approve/TakeAction
        [Route("api/Main/Request_CancelSubscription_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post9(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CancelSubscription_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var notes = obj.Notes.ToString();
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, notes, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion CancelSubscription_Approve

        #region NewLoan_Submit

        // GET: api/Main/Request_NewLoan_Submit/InitialData
        [Route("api/Main/Request_NewLoan_Submit/InitialData")]
        [HttpGet]
        public IHttpActionResult Get17()
        {

            var businessObj = new Models.Business.UI.Request_NewLoan_Submit();
            var dataObj = new Models.DataObjects.Internal.Request_NewLoan_Submit.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Employee))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_NewLoan_Submit/Submit
        [Route("api/Main/Request_NewLoan_Submit/Submit")]
        [HttpPost]
        public IHttpActionResult Post11(object submittedData)
        {
            #region Azad 2023-03-17 Disable block Submit Load even new year 2023 
            //////////////////////////////////////////////////////////////////
            //Azad 2022-10-13 re-Enable Submit Load in 2023
            //////////////////////////////////////////////////////////////////
            //throw new Exception();
            
            //////////////////////////////////////////////////////////////////
            #endregion



            var businessObj = new Models.Business.UI.Request_NewLoan_Submit();
            string result = "";


            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Employee))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var loanAmount = (int)obj.LoanAmount;
                var installmentAmount = (int)obj.InstallmentAmount;
                var notes = obj.Notes.ToString();

                result = businessObj.Submit(loanAmount, installmentAmount, notes);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion NewLoan_Submit

        #region EditLoan_Submit

        // GET: api/Main/Request_EditLoan_Submit/InitialData
        [Route("api/Main/Request_EditLoan_Submit/InitialData")]
        [HttpGet]
        public IHttpActionResult Get22()
        {

            var businessObj = new Models.Business.UI.Request_EditLoan_Submit();
            var dataObj = new Models.DataObjects.Internal.Request_EditLoan_Submit.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Employee))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_EditLoan_Submit/Submit
        [Route("api/Main/Request_EditLoan_Submit/Submit")]
        [HttpPost]
        public IHttpActionResult Post17(object subscriptionData)
        {

            var businessObj = new Models.Business.UI.Request_EditLoan_Submit();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Employee))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = subscriptionData;
                var amount = (int)obj.Amount;
                var notes = obj.Notes.ToString();

                result = businessObj.Submit(amount, notes);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion EditLoan_Submit

        #region CancelLoan_Submit

        // GET: api/Main/Request_CancelLoan_Submit/InitialData
        [Route("api/Main/Request_CancelLoan_Submit/InitialData")]
        [HttpGet]
        public IHttpActionResult Get25()
        {

            var businessObj = new Models.Business.UI.Request_CancelLoan_Submit();
            var dataObj = new Models.DataObjects.Internal.Request_CancelLoan_Submit.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Employee))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CancelLoan_Submit/Submit
        [Route("api/Main/Request_CancelLoan_Submit/Submit")]
        [HttpPost]
        public IHttpActionResult Post19(object subscriptionData)
        {

            var businessObj = new Models.Business.UI.Request_CancelLoan_Submit();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Employee))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = subscriptionData;
                var notes = obj.Notes.ToString();

                result = businessObj.CancelLoan(notes);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion CancelLoan_Submit

        #region NewLoan_Approve

        // GET: api/Main/Request_NewLoan_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_NewLoan_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get18(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_NewLoan_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_NewLoan_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/Request_NewLoan_Approve/Navigate?empID=2232&year=2012&serial=5&direction=1
        [Route("api/Main/Request_NewLoan_Approve/Navigate")]
        [HttpGet]
        public IHttpActionResult Get19(long empID, int year, int serial, int direction)
        {

            var businessObj = new Models.Business.UI.Request_NewLoan_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_NewLoan_Approve.NavigationObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.Navigate(year, serial, direction);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_NewLoan_Approve/TakeAction
        [Route("api/Main/Request_NewLoan_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post12(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_NewLoan_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var suggestedLoanAmount = (int)obj.SuggestedLoanAmount;
                var notes = obj.Notes.ToString();
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, suggestedLoanAmount, notes, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion NewLoan_Approve

        #region EditLoan_Approve

        // GET: api/Main/Request_EditLoan_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_EditLoan_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get23(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_EditLoan_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_EditLoan_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/Request_EditLoan_Approve/Navigate?empID=2232&year=2012&serial=5&direction=1
        [Route("api/Main/Request_EditLoan_Approve/Navigate")]
        [HttpGet]
        public IHttpActionResult Get24(long empID, int year, int serial, int direction)
        {

            var businessObj = new Models.Business.UI.Request_EditLoan_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_EditLoan_Approve.NavigationObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.Navigate(year, serial, direction);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_EditLoan_Approve/TakeAction
        [Route("api/Main/Request_EditLoan_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post18(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_EditLoan_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var notes = obj.Notes.ToString();
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, notes, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion EditLoan_Approve

        #region CancelLoan_Approve

        // GET: api/Main/Request_CancelLoan_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_CancelLoan_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get26(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_CancelLoan_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CancelLoan_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/Request_CancelLoan_Approve/Navigate?empID=2232&year=2012&serial=5&direction=1
        [Route("api/Main/Request_CancelLoan_Approve/Navigate")]
        [HttpGet]
        public IHttpActionResult Get27(long empID, int year, int serial, int direction)
        {

            var businessObj = new Models.Business.UI.Request_CancelLoan_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CancelLoan_Approve.NavigationObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.Navigate(year, serial, direction);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CancelLoan_Approve/TakeAction
        [Route("api/Main/Request_CancelLoan_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post20(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CancelLoan_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var notes = obj.Notes.ToString();
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, notes, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion CancelLoan_Approve

        #region UserRequests

        // GET: api/Main/Request_UserRequests/InitialData
        [Route("api/Main/Request_UserRequests/InitialData")]
        [HttpGet]
        public IHttpActionResult Get28()
        {

            var businessObj = new Models.Business.UI.Request_UserRequests();
            var dataObj = new List<Models.DataObjects.Internal.Request_UserRequests.MainObject>();
            string data = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Employee))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

                //if (dataObj.Count > 0)
                //{
                //    for (int i = 0; i < dataObj.Count; i++)
                //    {
                //        data += "<tr><td>" + dataObj[i].Type + "</td><td>" + dataObj[i].Date + "</td><td>" + dataObj[i].Status + "</td><td>" + dataObj[i].Amount + "</td></tr>";
                //    }
                //}
                //else
                //{
                //    data += "<tr><td class=\"text-center\" colspan=\"4\">لايوجد بيانات</td></tr>";
                //}

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            //return Ok(data);
            return Ok(dataObj);

        }

        // POST: api/Main/Request_UserRequests/Withdraw
        [Route("api/Main/Request_UserRequests/Withdraw")]
        [HttpPost]
        public IHttpActionResult Post72(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_UserRequests();
            var result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Employee))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;

                result = businessObj.WithdrawSubmittedRequest(year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            //return Ok(data);
            return Ok(result);

        }

        #endregion UserRequests

        #region CommitteeSubmittedRequests

        // GET: api/Main/Request_CommitteeSubmittedRequests/InitialData
        [Route("api/Main/Request_CommitteeSubmittedRequests/InitialData")]
        [HttpGet]
        public IHttpActionResult Get35()
        {

            var businessObj = new Models.Business.UI.Request_CommitteeSubmittedRequests();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeSubmittedRequests.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CommitteeSubmittedRequests/Export
        [Route("api/Main/Request_CommitteeSubmittedRequests/Export")]
        [HttpPost]
        public IHttpActionResult Post28(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeSubmittedRequests();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion CommitteeSubmittedRequests

        #region CommitteeNewSubscription_Approve

        // GET: api/Main/Request_CommitteeNewSubscription_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_CommitteeNewSubscription_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get36(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeNewSubscription_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeNewSubscription_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CommitteeNewSubscription_Approve/TakeAction
        [Route("api/Main/Request_CommitteeNewSubscription_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post29(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeNewSubscription_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // GET: api/Main/Request_CommitteeNewSubscription_Approve/Navigate?empID=2232&year=2012&serial=5&direction=1
        [Route("api/Main/Request_CommitteeNewSubscription_Approve/Navigate")]
        [HttpGet]
        public IHttpActionResult Get93(long empID, int year, int serial, int direction)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeNewSubscription_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeNewSubscription_Approve.NavigationObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.Navigate(empID, year, serial, direction);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        #endregion CommitteeNewSubscription_Approve

        #region CommitteeEditSubscription_Approve

        // GET: api/Main/Request_CommitteeEditSubscription_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_CommitteeEditSubscription_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get37(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeEditSubscription_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeEditSubscription_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CommitteeEditSubscription_Approve/TakeAction
        [Route("api/Main/Request_CommitteeEditSubscription_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post30(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeEditSubscription_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // GET: api/Main/Request_CommitteeEditSubscription_Approve/Navigate?empID=2232&year=2012&serial=5&direction=1
        [Route("api/Main/Request_CommitteeEditSubscription_Approve/Navigate")]
        [HttpGet]
        public IHttpActionResult Get94(long empID, int year, int serial, int direction)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeEditSubscription_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeEditSubscription_Approve.NavigationObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.Navigate(empID, year, serial, direction);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        #endregion CommitteeEditSubscription_Approve

        #region CommitteeCancelSubscription_Approve

        // GET: api/Main/Request_CommitteeCancelSubscription_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_CommitteeCancelSubscription_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get38(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeCancelSubscription_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeCancelSubscription_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CommitteeCancelSubscription_Approve/TakeAction
        [Route("api/Main/Request_CommitteeCancelSubscription_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post31(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeCancelSubscription_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // GET: api/Main/Request_CommitteeCancelSubscription_Approve/Navigate?empID=2232&year=2012&serial=5&direction=1
        [Route("api/Main/Request_CommitteeCancelSubscription_Approve/Navigate")]
        [HttpGet]
        public IHttpActionResult Get95(long empID, int year, int serial, int direction)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeCancelSubscription_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeCancelSubscription_Approve.NavigationObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.Navigate(empID, year, serial, direction);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        #endregion CommitteeCancelSubscription_Approve

        #region CommitteeNewLoan_Approve

        // GET: api/Main/Request_CommitteeNewLoan_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_CommitteeNewLoan_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get39(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeNewLoan_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeNewLoan_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CommitteeNewLoan_Approve/TakeAction
        [Route("api/Main/Request_CommitteeNewLoan_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post32(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeNewLoan_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // GET: api/Main/Request_CommitteeNewLoan_Approve/Navigate?empID=2232&year=2012&serial=5&direction=1
        [Route("api/Main/Request_CommitteeNewLoan_Approve/Navigate")]
        [HttpGet]
        public IHttpActionResult Get96(long empID, int year, int serial, int direction)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeNewLoan_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeNewLoan_Approve.NavigationObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.Navigate(empID, year, serial, direction);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        #endregion CommitteeNewLoan_Approve

        #region CommitteeEditLoan_Approve

        // GET: api/Main/Request_CommitteeEditLoan_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_CommitteeEditLoan_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get40(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeEditLoan_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeEditLoan_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CommitteeEditLoan_Approve/TakeAction
        [Route("api/Main/Request_CommitteeEditLoan_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post33(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeEditLoan_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // GET: api/Main/Request_CommitteeEditLoan_Approve/Navigate?empID=2232&year=2012&serial=5&direction=1
        [Route("api/Main/Request_CommitteeEditLoan_Approve/Navigate")]
        [HttpGet]
        public IHttpActionResult Get97(long empID, int year, int serial, int direction)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeEditLoan_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeEditLoan_Approve.NavigationObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.Navigate(empID, year, serial, direction);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        #endregion CommitteeEditLoan_Approve

        #region CommitteeCancelLoan_Approve

        // GET: api/Main/Request_CommitteeCancelLoan_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_CommitteeCancelLoan_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get41(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeCancelLoan_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeCancelLoan_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CommitteeCancelLoan_Approve/TakeAction
        [Route("api/Main/Request_CommitteeCancelLoan_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post34(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeCancelLoan_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // GET: api/Main/Request_CommitteeCancelLoan_Approve/Navigate?empID=2232&year=2012&serial=5&direction=1
        [Route("api/Main/Request_CommitteeCancelLoan_Approve/Navigate")]
        [HttpGet]
        public IHttpActionResult Get98(long empID, int year, int serial, int direction)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeCancelLoan_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeCancelLoan_Approve.NavigationObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.Navigate(empID, year, serial, direction);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        #endregion CommitteeCancelLoan_Approve

        #region AdminCommitteeSubmittedRequests

        // GET: api/Main/Request_AdminCommitteeSubmittedRequests/InitialData
        [Route("api/Main/Request_AdminCommitteeSubmittedRequests/InitialData")]
        [HttpGet]
        public IHttpActionResult Get45()
        {

            var businessObj = new Models.Business.UI.Request_AdminCommitteeSubmittedRequests();
            var dataObj = new Models.DataObjects.Internal.Request_AdminCommitteeSubmittedRequests.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/Request_AdminCommitteeSubmittedRequests/Requests?memberID=234
        [Route("api/Main/Request_AdminCommitteeSubmittedRequests/Requests")]
        [HttpGet]
        public IHttpActionResult Get46(long memberID)
        {

            var businessObj = new Models.Business.UI.Request_AdminCommitteeSubmittedRequests();
            var dataObj = new List<Models.DataObjects.Internal.Request_AdminCommitteeSubmittedRequests.Request>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetRequests(memberID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_AdminCommitteeSubmittedRequests/Export
        [Route("api/Main/Request_AdminCommitteeSubmittedRequests/Export")]
        [HttpPost]
        public IHttpActionResult Post37(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.Request_AdminCommitteeSubmittedRequests();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion AdminCommitteeSubmittedRequests

        #region AdminCommitteeNewSubscription_Approve

        // GET: api/Main/Request_AdminCommitteeNewSubscription_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_AdminCommitteeNewSubscription_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get47(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_AdminCommitteeNewSubscription_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_AdminCommitteeNewSubscription_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_AdminCommitteeNewSubscription_Approve/TakeAction
        [Route("api/Main/Request_AdminCommitteeNewSubscription_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post38(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_AdminCommitteeNewSubscription_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var memberID = (long)obj.MemberID;
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, memberID, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion AdminCommitteeNewSubscription_Approve

        #region AdminCommitteeEditSubscription_Approve

        // GET: api/Main/Request_AdminCommitteeEditSubscription_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_AdminCommitteeEditSubscription_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get48(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_AdminCommitteeEditSubscription_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_AdminCommitteeEditSubscription_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_AdminCommitteeEditSubscription_Approve/TakeAction
        [Route("api/Main/Request_AdminCommitteeEditSubscription_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post39(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_AdminCommitteeEditSubscription_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var memberID = (long)obj.MemberID;
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, memberID, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion AdminCommitteeEditSubscription_Approve

        #region AdminCommitteeCancelSubscription_Approve

        // GET: api/Main/Request_AdminCommitteeCancelSubscription_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_AdminCommitteeCancelSubscription_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get49(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_AdminCommitteeCancelSubscription_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_AdminCommitteeCancelSubscription_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_AdminCommitteeCancelSubscription_Approve/TakeAction
        [Route("api/Main/Request_AdminCommitteeCancelSubscription_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post40(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_AdminCommitteeCancelSubscription_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var memberID = (long)obj.MemberID;
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, memberID, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion AdminCommitteeCancelSubscription_Approve

        #region AdminCommitteeNewLoan_Approve

        // GET: api/Main/Request_AdminCommitteeNewLoan_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_AdminCommitteeNewLoan_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get50(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_AdminCommitteeNewLoan_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_AdminCommitteeNewLoan_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_AdminCommitteeNewLoan_Approve/TakeAction
        [Route("api/Main/Request_AdminCommitteeNewLoan_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post41(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_AdminCommitteeNewLoan_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var memberID = (long)obj.MemberID;
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, memberID, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion AdminCommitteeNewLoan_Approve

        #region AdminCommitteeEditLoan_Approve

        // GET: api/Main/Request_AdminCommitteeEditLoan_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_AdminCommitteeEditLoan_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get51(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_AdminCommitteeEditLoan_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_AdminCommitteeEditLoan_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_AdminCommitteeEditLoan_Approve/TakeAction
        [Route("api/Main/Request_AdminCommitteeEditLoan_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post42(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_AdminCommitteeEditLoan_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var memberID = (long)obj.MemberID;
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, memberID, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion AdminCommitteeEditLoan_Approve

        #region AdminCommitteeCancelLoan_Approve

        // GET: api/Main/Request_AdminCommitteeCancelLoan_Approve/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_AdminCommitteeCancelLoan_Approve/InitialData")]
        [HttpGet]
        public IHttpActionResult Get52(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_AdminCommitteeCancelLoan_Approve();
            var dataObj = new Models.DataObjects.Internal.Request_AdminCommitteeCancelLoan_Approve.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_AdminCommitteeCancelLoan_Approve/TakeAction
        [Route("api/Main/Request_AdminCommitteeCancelLoan_Approve/TakeAction")]
        [HttpPost]
        public IHttpActionResult Post43(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_AdminCommitteeCancelLoan_Approve();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var memberID = (long)obj.MemberID;
                var action = (int)obj.Action;

                result = businessObj.TakeAction(empID, year, serial, memberID, action);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion AdminCommitteeCancelLoan_Approve

        #region CommitteeDecisionApproval

        // GET: api/Main/Request_CommitteeDecisionApproval/InitialData
        [Route("api/Main/Request_CommitteeDecisionApproval/InitialData")]
        [HttpGet]
        public IHttpActionResult Get53()
        {

            var businessObj = new Models.Business.UI.Request_CommitteeDecisionApproval();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeDecisionApproval.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CommitteeDecisionApproval/Export
        [Route("api/Main/Request_CommitteeDecisionApproval/Export")]
        [HttpPost]
        public IHttpActionResult Post44(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeDecisionApproval();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // POST: api/Main/Request_CommitteeDecisionApproval/Save
        [Route("api/Main/Request_CommitteeDecisionApproval/Save")]
        [HttpPost]
        public IHttpActionResult Post45()
        {

            var businessObj = new Models.Business.UI.Request_CommitteeDecisionApproval();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                result = businessObj.Save();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion CommitteeDecisionApproval

        #region CommitteeNewSubscription_Reset

        // GET: api/Main/Request_CommitteeNewSubscription_Reset/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_CommitteeNewSubscription_Reset/InitialData")]
        [HttpGet]
        public IHttpActionResult Get54(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeNewSubscription_Reset();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeNewSubscription_Reset.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CommitteeNewSubscription_Reset/Reset
        [Route("api/Main/Request_CommitteeNewSubscription_Reset/Reset")]
        [HttpPost]
        public IHttpActionResult Post46(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeNewSubscription_Reset();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;

                result = businessObj.Reset(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion CommitteeNewSubscription_Reset

        #region CommitteeEditSubscription_Reset

        // GET: api/Main/Request_CommitteeEditSubscription_Reset/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_CommitteeEditSubscription_Reset/InitialData")]
        [HttpGet]
        public IHttpActionResult Get55(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeEditSubscription_Reset();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeEditSubscription_Reset.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CommitteeEditSubscription_Reset/Reset
        [Route("api/Main/Request_CommitteeEditSubscription_Reset/Reset")]
        [HttpPost]
        public IHttpActionResult Post47(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeEditSubscription_Reset();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;

                result = businessObj.Reset(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion CommitteeEditSubscription_Reset

        #region CommitteeCancelSubscription_Reset

        // GET: api/Main/Request_CommitteeCancelSubscription_Reset/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_CommitteeCancelSubscription_Reset/InitialData")]
        [HttpGet]
        public IHttpActionResult Get56(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeCancelSubscription_Reset();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeCancelSubscription_Reset.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CommitteeCancelSubscription_Reset/Reset
        [Route("api/Main/Request_CommitteeCancelSubscription_Reset/Reset")]
        [HttpPost]
        public IHttpActionResult Post48(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeCancelSubscription_Reset();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;

                result = businessObj.Reset(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion CommitteeCancelSubscription_Reset

        #region CommitteeNewLoan_Reset

        // GET: api/Main/Request_CommitteeNewLoan_Reset/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_CommitteeNewLoan_Reset/InitialData")]
        [HttpGet]
        public IHttpActionResult Get57(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeNewLoan_Reset();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeNewLoan_Reset.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CommitteeNewLoan_Reset/Reset
        [Route("api/Main/Request_CommitteeNewLoan_Reset/Reset")]
        [HttpPost]
        public IHttpActionResult Post49(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeNewLoan_Reset();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;

                result = businessObj.Reset(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion CommitteeNewLoan_Reset

        #region CommitteeEditLoan_Reset

        // GET: api/Main/Request_CommitteeEditLoan_Reset/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_CommitteeEditLoan_Reset/InitialData")]
        [HttpGet]
        public IHttpActionResult Get58(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeEditLoan_Reset();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeEditLoan_Reset.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CommitteeEditLoan_Reset/Reset
        [Route("api/Main/Request_CommitteeEditLoan_Reset/Reset")]
        [HttpPost]
        public IHttpActionResult Post50(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeEditLoan_Reset();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;

                result = businessObj.Reset(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion CommitteeEditLoan_Reset

        #region CommitteeCancelLoan_Reset

        // GET: api/Main/Request_CommitteeCancelLoan_Reset/InitialData?empID=2232&year=2012&serial=5
        [Route("api/Main/Request_CommitteeCancelLoan_Reset/InitialData")]
        [HttpGet]
        public IHttpActionResult Get59(long empID, int year, int serial)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeCancelLoan_Reset();
            var dataObj = new Models.DataObjects.Internal.Request_CommitteeCancelLoan_Reset.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_CommitteeCancelLoan_Reset/Reset
        [Route("api/Main/Request_CommitteeCancelLoan_Reset/Reset")]
        [HttpPost]
        public IHttpActionResult Post51(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeCancelLoan_Reset();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;

                result = businessObj.Reset(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion CommitteeCancelLoan_Reset

        #region CommitteeDecisionDetails

        // GET: api/Main/Request_CommitteeDecisionDetails/InitialData?empID=2232&year=2012&serial=5&type=4
        [Route("api/Main/Request_CommitteeDecisionDetails/InitialData")]
        [HttpGet]
        public IHttpActionResult Get60(long empID, int year, int serial, int type)
        {

            var businessObj = new Models.Business.UI.Request_CommitteeDecisionDetails();
            var dataObj = new List<Models.DataObjects.Internal.Request_CommitteeDecisionDetails.MainObject>();
            string data = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID, year, serial, type);

                if (dataObj.Count > 0)
                {
                    for (int i = 0; i < dataObj.Count; i++)
                    {
                        data += "<tr><td>" + dataObj[i].FullName + "</td><td>" + dataObj[i].OrganizationalStructure + "</td><td>" + dataObj[i].Decision + "</td><td>" + dataObj[i].DecisionEntry + "</td></tr>";
                    }
                }
                else
                {
                    data += "<tr><td>لايوجد بيانات</td><td></td><td></td></tr>";
                }

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(data);

        }

        #endregion CommitteeDecisionDetails

        #region HelpDeskEditSubscription_Submit

        // GET: api/Main/Request_HelpDeskEditSubscription_Submit/InitialData?employeeNumber=123
        [Route("api/Main/Request_HelpDeskEditSubscription_Submit/InitialData")]
        [HttpGet]
        public IHttpActionResult Get73(long employeeNumber)
        {

            var businessObj = new Models.Business.UI.Request_HelpDeskEditSubscription_Submit();
            var dataObj = new Models.DataObjects.Internal.Request_EditSubscription_Submit.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.HelpDesk))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(employeeNumber);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_HelpDeskEditSubscription_Submit/Submit
        [Route("api/Main/Request_HelpDeskEditSubscription_Submit/Submit")]
        [HttpPost]
        public IHttpActionResult Post62(object subscriptionData)
        {

            var businessObj = new Models.Business.UI.Request_HelpDeskEditSubscription_Submit();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.HelpDesk))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = subscriptionData;
                var employeeNumber = (long)obj.EmployeeNumber;
                var amount = (int)obj.Amount;
                var notes = obj.Notes.ToString();

                result = businessObj.EditSubscription(employeeNumber, amount, notes);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion HelpDeskEditSubscription_Submit

        #region HelpDeskCancelSubscription_Submit

        // GET: api/Main/Request_HelpDeskCancelSubscription_Submit/InitialData?employeeNumber=123
        [Route("api/Main/Request_HelpDeskCancelSubscription_Submit/InitialData")]
        [HttpGet]
        public IHttpActionResult Get74(long employeeNumber)
        {

            var businessObj = new Models.Business.UI.Request_HelpDeskCancelSubscription_Submit();
            var dataObj = new Models.DataObjects.Internal.Request_CancelSubscription_Submit.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.HelpDesk))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(employeeNumber);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_HelpDeskCancelSubscription_Submit/Submit
        [Route("api/Main/Request_HelpDeskCancelSubscription_Submit/Submit")]
        [HttpPost]
        public IHttpActionResult Post63(object subscriptionData)
        {

            var businessObj = new Models.Business.UI.Request_HelpDeskCancelSubscription_Submit();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.HelpDesk))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = subscriptionData;
                var employeeNumber = (long)obj.EmployeeNumber;
                var notes = obj.Notes.ToString();

                result = businessObj.CancelSubscription(employeeNumber, notes);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion HelpDeskCancelSubscription_Submit

        #region HelpDeskNewLoan_Submit

        // GET: api/Main/Request_HelpDeskNewLoan_Submit/InitialData?employeeNumber=123
        [Route("api/Main/Request_HelpDeskNewLoan_Submit/InitialData")]
        [HttpGet]
        public IHttpActionResult Get75(long employeeNumber)
        {

            var businessObj = new Models.Business.UI.Request_HelpDeskNewLoan_Submit();
            var dataObj = new Models.DataObjects.Internal.Request_NewLoan_Submit.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.HelpDesk))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(employeeNumber);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_HelpDeskNewLoan_Submit/Submit
        [Route("api/Main/Request_HelpDeskNewLoan_Submit/Submit")]
        [HttpPost]
        public IHttpActionResult Post64(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_HelpDeskNewLoan_Submit();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.HelpDesk))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var employeeNumber = (long)obj.EmployeeNumber;
                var loanAmount = (int)obj.LoanAmount;
                var installmentAmount = (int)obj.InstallmentAmount;
                var notes = obj.Notes.ToString();

                result = businessObj.Submit(employeeNumber, loanAmount, installmentAmount, notes);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion HelpDeskNewLoan_Submit

        #region HelpDeskEditLoan_Submit

        // GET: api/Main/Request_HelpDeskEditLoan_Submit/InitialData?employeeNumber=123
        [Route("api/Main/Request_HelpDeskEditLoan_Submit/InitialData")]
        [HttpGet]
        public IHttpActionResult Get76(long employeeNumber)
        {

            var businessObj = new Models.Business.UI.Request_HelpDeskEditLoan_Submit();
            var dataObj = new Models.DataObjects.Internal.Request_EditLoan_Submit.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.HelpDesk))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(employeeNumber);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_HelpDeskEditLoan_Submit/Submit
        [Route("api/Main/Request_HelpDeskEditLoan_Submit/Submit")]
        [HttpPost]
        public IHttpActionResult Post65(object subscriptionData)
        {

            var businessObj = new Models.Business.UI.Request_HelpDeskEditLoan_Submit();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.HelpDesk))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = subscriptionData;
                var employeeNumber = (long)obj.EmployeeNumber;
                var amount = (int)obj.Amount;
                var notes = obj.Notes.ToString();

                result = businessObj.Submit(employeeNumber, amount, notes);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion HelpDeskEditLoan_Submit

        #region HelpDeskCancelLoan_Submit

        // GET: api/Main/Request_HelpDeskCancelLoan_Submit/InitialData?employeeNumber=123
        [Route("api/Main/Request_HelpDeskCancelLoan_Submit/InitialData")]
        [HttpGet]
        public IHttpActionResult Get77(long employeeNumber)
        {

            var businessObj = new Models.Business.UI.Request_HelpDeskCancelLoan_Submit();
            var dataObj = new Models.DataObjects.Internal.Request_CancelLoan_Submit.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.HelpDesk))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(employeeNumber);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Request_HelpDeskCancelLoan_Submit/Submit
        [Route("api/Main/Request_HelpDeskCancelLoan_Submit/Submit")]
        [HttpPost]
        public IHttpActionResult Post66(object subscriptionData)
        {

            var businessObj = new Models.Business.UI.Request_HelpDeskCancelLoan_Submit();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.HelpDesk))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = subscriptionData;
                var employeeNumber = (long)obj.EmployeeNumber;
                var notes = obj.Notes.ToString();

                result = businessObj.CancelSubscription(employeeNumber, notes);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion HelpDeskCancelLoan_Submit

        #region HelpDeskUserRequests

        // GET: api/Main/Request_HelpDeskUserRequests/InitialData?employeeNumber=123
        [Route("api/Main/Request_HelpDeskUserRequests/InitialData")]
        [HttpGet]
        public IHttpActionResult Get78(long employeeNumber)
        {

            var businessObj = new Models.Business.UI.Request_HelpDeskUserRequests();
            var dataObj = new List<Models.DataObjects.Internal.Request_UserRequests.MainObject>();
            string data = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.HelpDesk))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(employeeNumber);

                //if (dataObj.Count > 0)
                //{
                //    for (int i = 0; i < dataObj.Count; i++)
                //    {
                //        data += "<tr><td>" + dataObj[i].Type + "</td><td>" + dataObj[i].Date + "</td><td>" + dataObj[i].Status + "</td><td>" + dataObj[i].Amount + "</td></tr>";
                //    }
                //}
                //else
                //{
                //    data += "<tr><td class=\"text-center\" colspan=\"4\">لايوجد بيانات</td></tr>";
                //}

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            //return Ok(data);
            return Ok(dataObj);

        }

        // POST: api/Main/Request_HelpDeskUserRequests/Withdraw
        [Route("api/Main/Request_HelpDeskUserRequests/Withdraw")]
        [HttpPost]
        public IHttpActionResult Post73(object submittedData)
        {

            var businessObj = new Models.Business.UI.Request_HelpDeskUserRequests();
            var result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.HelpDesk))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;

                result = businessObj.WithdrawSubmittedRequest(empID, year, serial);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            //return Ok(data);
            return Ok(result);

        }

        #endregion HelpDeskUserRequests


        #endregion ==== Request ====


        #region ==== Exception ====

        #region Subscription

        // GET: api/Main/Exception_Subscription_Submit/InitialData
        [Route("api/Main/Exception_Subscription_Submit/InitialData")]
        [HttpGet]
        public IHttpActionResult Get20()
        {

            var businessObj = new Models.Business.UI.Exception_Subscription_Submit();
            var dataObj = new Models.DataObjects.Internal.Exception_Subscription_Submit.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Exception_Subscription_Submit/Save
        [Route("api/Main/Exception_Subscription_Submit/Save")]
        [HttpPost]
        public IHttpActionResult Post13(object submittedData)
        {

            var businessObj = new Models.Business.UI.Exception_Subscription_Submit();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var amount = (int)obj.Amount;
                var notes = obj.Notes.ToString();

                result = businessObj.Save(empID, amount, notes);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // DELETE: api/Main/Exception_Subscription_Submit/Delete
        [Route("api/Main/Exception_Subscription_Submit/Delete")]
        [HttpDelete]
        public IHttpActionResult Delete1(object submittedData)
        {

            var businessObj = new Models.Business.UI.Exception_Subscription_Submit();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;

                result = businessObj.Delete(empID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/Exception_Subscription_Submit/Export
        [Route("api/Main/Exception_Subscription_Submit/Export")]
        [HttpPost]
        public IHttpActionResult Post15(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.Exception_Subscription_Submit();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion Subscription

        #region Loan

        // GET: api/Main/Exception_Loan_Submit/InitialData
        [Route("api/Main/Exception_Loan_Submit/InitialData")]
        [HttpGet]
        public IHttpActionResult Get21()
        {

            var businessObj = new Models.Business.UI.Exception_Loan_Submit();
            var dataObj = new Models.DataObjects.Internal.Exception_Loan_Submit.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Exception_Loan_Submit/Save
        [Route("api/Main/Exception_Loan_Submit/Save")]
        [HttpPost]
        public IHttpActionResult Post14(object submittedData)
        {

            var businessObj = new Models.Business.UI.Exception_Loan_Submit();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var amount = (int)obj.Amount;
                var minSubPeriod = (bool)obj.MinimumSubscriptionPeriod;
                var loanWithLoan = (bool)obj.LoanRequestWithActiveLoan;
                var notes = obj.Notes.ToString();

                result = businessObj.Save(empID, minSubPeriod, loanWithLoan, amount, notes);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // DELETE: api/Main/Exception_Loan_Submit/Delete
        [Route("api/Main/Exception_Loan_Submit/Delete")]
        [HttpDelete]
        public IHttpActionResult Delete2(object submittedData)
        {

            var businessObj = new Models.Business.UI.Exception_Loan_Submit();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;

                result = businessObj.Delete(empID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/Exception_Loan_Submit/Export?
        [Route("api/Main/Exception_Loan_Submit/Export")]
        [HttpPost]
        public IHttpActionResult Post16(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.Exception_Loan_Submit();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion Loan

        #endregion ==== Exception ====


        #region ==== Meeting ====

        #region MeetingList

        // GET: api/Main/Meeting_MeetingList/InitialData?fromDate=2015-10-02&toDate=2015-11-15
        [Route("api/Main/Meeting_MeetingList/InitialData")]
        [HttpGet]
        public IHttpActionResult Get29(DateTime fromDate, DateTime toDate)
        {

            var businessObj = new Models.Business.UI.Meeting_MeetingList();
            var dataObj = new Models.DataObjects.Internal.Meeting_MeetingList.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(fromDate, toDate);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Meeting_MeetingList/Save
        [Route("api/Main/Meeting_MeetingList/Save")]
        [HttpPost]
        public IHttpActionResult Post21(object submittedData)
        {

            var businessObj = new Models.Business.UI.Meeting_MeetingList();
            dynamic resultObj = new ExpandoObject();
            string resultMessage = "";
            var dataObj = new Models.DataObjects.Internal.Meeting_MeetingList.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var meetingID = (int)obj.MeetingID;
                var date = (DateTime)obj.Date;
                var notes = obj.Notes.ToString();

                dataObj = businessObj.Save(meetingID, date, notes, out resultMessage);
                resultObj.Meetings = dataObj.Meetings;
                resultObj.Message = resultMessage;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // DELETE: api/Main/Meeting_MeetingList/Delete
        [Route("api/Main/Meeting_MeetingList/Delete")]
        [HttpDelete]
        public IHttpActionResult Delete3(object submittedData)
        {

            var businessObj = new Models.Business.UI.Meeting_MeetingList();
            dynamic resultObj = new ExpandoObject();
            string resultMessage = "";
            var dataObj = new Models.DataObjects.Internal.Meeting_MeetingList.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var meetingID = (int)obj.ID;

                dataObj = businessObj.Delete(meetingID, out resultMessage);
                resultObj.Meetings = dataObj.Meetings;
                resultObj.Message = resultMessage;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // POST: api/Main/Meeting_MeetingList/Export
        [Route("api/Main/Meeting_MeetingList/Export")]
        [HttpPost]
        public IHttpActionResult Post22(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.Meeting_MeetingList();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }


        #endregion MeetingList

        #region ActiveMeeting

        // GET: api/Main/Meeting_ActiveMeeting/InitialData
        [Route("api/Main/Meeting_ActiveMeeting/InitialData")]
        [HttpGet]
        public IHttpActionResult Get30()
        {

            var businessObj = new Models.Business.UI.Meeting_ActiveMeeting();
            var dataObj = new Models.DataObjects.Internal.Meeting_ActiveMeeting.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Meeting_ActiveMeeting/Save
        [Route("api/Main/Meeting_ActiveMeeting/Save")]
        [HttpPost]
        public IHttpActionResult Post23(object submittedData)
        {

            var businessObj = new Models.Business.UI.Meeting_ActiveMeeting();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var meetingID = (int)obj.MeetingID;
                var isOpenForEvaluation = (bool)obj.IsOpenForEvaluation;

                result = businessObj.Save(meetingID, isOpenForEvaluation);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion ActiveMeeting

        #region AddRequestToMeeting

        // GET: api/Main/Meeting_AddRequestToMeeting/InitialData
        [Route("api/Main/Meeting_AddRequestToMeeting/InitialData")]
        [HttpGet]
        public IHttpActionResult Get31()
        {

            var businessObj = new Models.Business.UI.Meeting_AddRequestToMeeting();
            var dataObj = new Models.DataObjects.Internal.Meeting_AddRequestToMeeting.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/Meeting_AddRequestToMeeting/MeetingRequests?meetingID=2
        [Route("api/Main/Meeting_AddRequestToMeeting/MeetingRequests")]
        [HttpGet]
        public IHttpActionResult Get32(int meetingID)
        {

            var businessObj = new Models.Business.UI.Meeting_AddRequestToMeeting();
            var dataObj = new List<Models.DataObjects.Internal.Meeting_AddRequestToMeeting.Request>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetMeetingRequests(meetingID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Meeting_AddRequestToMeeting/Add
        [Route("api/Main/Meeting_AddRequestToMeeting/Add")]
        [HttpPost]
        public IHttpActionResult Post24(object submittedData)
        {

            var businessObj = new Models.Business.UI.Meeting_AddRequestToMeeting();
            string resultMessage = "";
            var dataObj = new Models.DataObjects.Internal.Meeting_AddRequestToMeeting.ResultObject();
            dynamic resultObj = new ExpandoObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var meetingID = (int)obj.MeetingID;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var typeID = (int)obj.TypeID;


                dataObj = businessObj.Add(meetingID, empID, year, serial, typeID, out resultMessage);
                resultObj.AllRequests = dataObj.AllRequests;
                resultObj.MeetingRequests = dataObj.MeetingRequests;
                resultObj.Message = resultMessage;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // POST: api/Main/Meeting_AddRequestToMeeting/Remove
        [Route("api/Main/Meeting_AddRequestToMeeting/Remove")]
        [HttpDelete]
        public IHttpActionResult Post25(object submittedData)
        {

            var businessObj = new Models.Business.UI.Meeting_AddRequestToMeeting();
            string resultMessage = "";
            var dataObj = new Models.DataObjects.Internal.Meeting_AddRequestToMeeting.ResultObject();
            dynamic resultObj = new ExpandoObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var meetingID = (int)obj.MeetingID;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var typeID = (int)obj.TypeID;


                dataObj = businessObj.Remove(meetingID, empID, year, serial, typeID, out resultMessage);
                resultObj.AllRequests = dataObj.AllRequests;
                resultObj.MeetingRequests = dataObj.MeetingRequests;
                resultObj.Message = resultMessage;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion AddRequestToMeeting

        #region SendRequestToCommitee

        // GET: api/Main/Meeting_SendRequestToCommitee/InitialData
        [Route("api/Main/Meeting_SendRequestToCommitee/InitialData")]
        [HttpGet]
        public IHttpActionResult Get33()
        {

            var businessObj = new Models.Business.UI.Meeting_SendRequestToCommitee();
            var dataObj = new Models.DataObjects.Internal.Meeting_SendRequestToCommitee.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Meeting_SendRequestToCommitee/AddNotes
        [Route("api/Main/Meeting_SendRequestToCommitee/AddNotes")]
        [HttpPost]
        public IHttpActionResult Post26(object submittedData)
        {

            var businessObj = new Models.Business.UI.Meeting_SendRequestToCommitee();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var typeID = (int)obj.TypeID;
                var notes = obj.Notes.ToString();

                result = businessObj.SaveNotes(empID, year, serial, typeID, notes);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/Meeting_SendRequestToCommitee/Export
        [Route("api/Main/Meeting_SendRequestToCommitee/Export")]
        [HttpPost]
        public IHttpActionResult Post27(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.Meeting_SendRequestToCommitee();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // POST: api/Main/Meeting_SendRequestToCommitee/SendNotifications
        [Route("api/Main/Meeting_SendRequestToCommitee/SendNotifications")]
        [HttpPost]
        public IHttpActionResult Post98()
        {

            var businessObj = new Models.Business.UI.Meeting_SendRequestToCommitee();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                result = businessObj.SendNotifications();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion SendRequestToCommitee

        #region MeetingRequestsDecisions

        // GET: api/Main/Meeting_MeetingRequestsDecisions/InitialData
        [Route("api/Main/Meeting_MeetingRequestsDecisions/InitialData")]
        [HttpGet]
        public IHttpActionResult Get61()
        {

            var businessObj = new Models.Business.UI.Meeting_MeetingRequestsDecisions();
            var dataObj = new Models.DataObjects.Internal.Meeting_MeetingRequestsDecisions.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/Meeting_MeetingRequestsDecisions/MeetingRequests?meetingID=2
        [Route("api/Main/Meeting_MeetingRequestsDecisions/MeetingRequests")]
        [HttpGet]
        public IHttpActionResult Get62(int meetingID)
        {

            var businessObj = new Models.Business.UI.Meeting_MeetingRequestsDecisions();
            var dataObj = new List<Models.DataObjects.Internal.Meeting_MeetingRequestsDecisions.Request>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetMeetingRequests(meetingID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        #endregion MeetingRequestsDecisions

        #region ApprovedLoanAmount

        // GET: api/Main/Meeting_ApprovedLoanAmount/InitialData
        [Route("api/Main/Meeting_ApprovedLoanAmount/InitialData")]
        [HttpGet]
        public IHttpActionResult Get105()
        {

            var businessObj = new Models.Business.UI.Meeting_ApprovedLoanAmount();
            var dataObj = new Models.DataObjects.Internal.Meeting_ApprovedLoanAmount.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Meeting_ApprovedLoanAmount/SaveAmount
        [Route("api/Main/Meeting_ApprovedLoanAmount/SaveAmount")]
        [HttpPost]
        public IHttpActionResult Post104(object submittedData)
        {

            var businessObj = new Models.Business.UI.Meeting_ApprovedLoanAmount();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var year = (int)obj.Year;
                var serial = (int)obj.Serial;
                var amount = (int)obj.Amount;

                result = businessObj.SaveAmount(empID, year, serial, amount);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/Meeting_ApprovedLoanAmount/Export
        [Route("api/Main/Meeting_ApprovedLoanAmount/Export")]
        [HttpPost]
        public IHttpActionResult Post105(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.Meeting_ApprovedLoanAmount();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //this.Forbidden("NotAuthorized");
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion ApprovedLoanAmount

        #endregion ==== Meeting ====


        #region ==== Employee ====

        #region DataManagement

        // GET: api/Main/Employee_DataManagement/InitialData
        [Route("api/Main/Employee_DataManagement/InitialData")]
        [HttpGet]
        public IHttpActionResult Get42()
        {

            var businessObj = new Models.Business.UI.Employee_DataManagement();
            var dataObj = new List<Models.DataObjects.Internal.Employee_DataManagement.MainObject>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Employee_DataManagement/Save
        [Route("api/Main/Employee_DataManagement/Save")]
        [HttpPost]
        public IHttpActionResult Post35(object submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_DataManagement();
            dynamic resultObj = new ExpandoObject();
            string resultMessage = "";
            var dataObj = new List<Models.DataObjects.Internal.Employee_DataManagement.MainObject>();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var id = (long)obj.ID;
                var empNumber = (long)obj.EmpNumber;
                var empName = obj.Name.ToString();
                var position = obj.Position.ToString();
                var department = obj.Department.ToString();
                var joinDate = (DateTime?)obj.JoinDate;
                var degree = obj.Degree.ToString();
                var salary = (int)obj.Salary;
                var endService = (int)obj.EndService;
                var nationality = obj.Nationality.ToString();
                var gender = (int)obj.Gender;
                var isCitizen = (bool)obj.IsCitizen;
                var birthDate = (DateTime?)obj.BirthDate;
                var email = obj.Email.ToString();
                var mobile = obj.Mobile.ToString();

                dataObj = businessObj.Save(id, empNumber, empName, position, department, joinDate, degree, salary, endService, nationality, gender, isCitizen, birthDate, email, mobile, out resultMessage);

                resultObj.Employees = dataObj;
                resultObj.Message = resultMessage;
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // DELETE: api/Main/Employee_DataManagement/Delete
        [Route("api/Main/Employee_DataManagement/Delete")]
        [HttpDelete]
        public IHttpActionResult Delete4(object submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_DataManagement();
            dynamic resultObj = new ExpandoObject();
            string resultMessage = "";
            var dataObj = new List<Models.DataObjects.Internal.Employee_DataManagement.MainObject>();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (int)obj.EmpID;

                dataObj = businessObj.Delete(empID, out resultMessage);
                resultObj.Employees = dataObj;
                resultObj.Message = resultMessage;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // POST: api/Main/Employee_DataManagement/Export
        [Route("api/Main/Employee_DataManagement/Export")]
        [HttpPost]
        public IHttpActionResult Post36(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_DataManagement();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // GET: api/Main/Employee_DataManagement/Upload?fileName=test.xls
        [Route("api/Main/Employee_DataManagement/Upload")]
        [HttpGet]
        public IHttpActionResult Get43(string fileName)
        {

            var businessObj = new Models.Business.UI.Employee_DataManagement();
            var dataObj = new List<Models.DataObjects.Internal.Employee_DataManagement.MainObject>();
            dynamic resultObj = new ExpandoObject();
            string resultMessage = "";
            string resultErrorData = "";
            string tempPath_Server = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath = tempPath_Server + "\\" + fileName.Replace("dottttt", ".");


            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    //Check if file exists in temp directory
                    if (File.Exists(filePath))
                    {
                        File.Delete(filePath);
                    }
                    return ForbiddenResult("NotAuthorized");
                }

                //Check if file exists in temp directory
                if (!File.Exists(filePath))
                {
                    return BadRequestResult("BadRequest");
                }

                //Upload the data from the file
                dataObj = businessObj.UploadFile(filePath, out resultMessage, out resultErrorData);
                resultObj.Employees = dataObj;
                resultObj.Message = resultMessage;
                resultObj.ErrorDataMessage = resultErrorData;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // GET: api/Main/Employee_DataManagement/GRP?empID=243
        [Route("api/Main/Employee_DataManagement/GRP")]
        [HttpGet]
        public IHttpActionResult Get119(long empID)
        {

            var businessObj = new Models.Business.UI.Employee_DataManagement();
            var dataObj = new Models.DataObjects.Internal.Employee_DataManagement.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetEmployeeData(empID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }


        #endregion DataManagement

        #region FinancialStatus

        // GET: api/Main/Employee_FinancialStatus/GetData?empID=123
        [Route("api/Main/Employee_FinancialStatus/GetData")]
        [HttpGet]
        public IHttpActionResult Get44(long empID)
        {

            var businessObj = new Models.Business.UI.Employee_FinancialStatus();
            var dataObj = new Models.DataObjects.Internal.Employee_FinancialStatus.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin) && !IsAuthorized(Models.Business.Common.UserRole.HelpDesk) && !IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(empID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        #endregion FinancialStatus

        #region CommitteeManagement

        // GET: api/Main/Employee_CommitteeManagement/InitialData
        [Route("api/Main/Employee_CommitteeManagement/InitialData")]
        [HttpGet]
        public IHttpActionResult Get80()
        {

            var businessObj = new Models.Business.UI.Employee_CommitteeManagement();
            var dataObj = new List<Models.DataObjects.Internal.Employee_CommitteeManagement.MainObject>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Employee_CommitteeManagement/Save
        [Route("api/Main/Employee_CommitteeManagement/Save")]
        [HttpPost]
        public IHttpActionResult Post70(object submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_CommitteeManagement();
            dynamic resultObj = new ExpandoObject();
            string resultMessage = "";
            var dataObj = new List<Models.DataObjects.Internal.Employee_CommitteeManagement.MainObject>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var title = obj.Title.ToString();
                var imageFileName = obj.ImageFileName.ToString().Replace("dottttt", ".");

                dataObj = businessObj.Save(empID, title, imageFileName, out resultMessage);

                resultObj.Members = dataObj;
                resultObj.Message = resultMessage;
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // POST: api/Main/Employee_CommitteeManagement/Move
        [Route("api/Main/Employee_CommitteeManagement/Move")]
        [HttpPost]
        public IHttpActionResult Post71(object submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_CommitteeManagement();
            dynamic resultObj = new ExpandoObject();
            string resultMessage = "";
            var dataObj = new List<Models.DataObjects.Internal.Employee_CommitteeManagement.MainObject>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var direction = (int)obj.Direction;

                dataObj = businessObj.Move(empID, direction, out resultMessage);

                resultObj.Members = dataObj;
                resultObj.Message = resultMessage;
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion CommitteeManagement

        #region FinancialTransactionsManagement

        // GET: api/Main/Employee_FinancialTransactionsManagement/InitialData
        [Route("api/Main/Employee_FinancialTransactionsManagement/InitialData")]
        [HttpGet]
        public IHttpActionResult Get81()
        {

            var businessObj = new Models.Business.UI.Employee_FinancialTransactionsManagement();
            var dataObj = new List<Models.DataObjects.Internal.Employee_FinancialTransactionsManagement.MainObject>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }


        // GET: api/Main/Employee_FinancialTransactionsManagement/EmployeeData
        [Route("api/Main/Employee_FinancialTransactionsManagement/EmployeeData")]
        [HttpGet]
        public IHttpActionResult EmployeeData(int empID)
        {

            var businessObj = new Models.Business.UI.Employee_FinancialTransactionsManagement();
            var dataObj = new List<Models.DataObjects.Internal.Employee_FinancialTransactionsManagement.MainObject>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetEmployeeFinancialData(empID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Employee_FinancialTransactionsManagement/SaveData
        [Route("api/Main/Employee_FinancialTransactionsManagement/SaveData")]
        [HttpPost]
        public IHttpActionResult Post74(object submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_FinancialTransactionsManagement();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var empID = (long)obj.EmpID;
                var type = (int)obj.Type;
                var category = (int)obj.Category;
                var amount = (int)obj.Amount;

                result = businessObj.Save(empID, type, category, amount);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion FinancialTransactionsManagement

        #region UpdateSubscription

        // GET: api/Main/Employee_UpdateSubscription/InitialData
        [Route("api/Main/Employee_UpdateSubscription/InitialData")]
        [HttpGet]
        public IHttpActionResult Get82()
        {

            var businessObj = new Models.Business.UI.Employee_UpdateSubscription();
            var dataObj = new Models.DataObjects.Internal.Employee_UpdateSubscription.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Employee_UpdateSubscription/Save
        [Route("api/Main/Employee_UpdateSubscription/Save")]
        [HttpPost]
        public IHttpActionResult Post75(object submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_UpdateSubscription();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                var data = JsonConvert.DeserializeObject<List<Models.DataObjects.External.Employee_UpdateSubscription_In>>(submittedData.ToString());

                result = businessObj.Save(data);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/Employee_UpdateSubscription/Export
        [Route("api/Main/Employee_UpdateSubscription/Export")]
        [HttpPost]
        public IHttpActionResult Post88(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_UpdateSubscription();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion UpdateSubscription

        #region UpdatePaidInstallments

        // GET: api/Main/Employee_UpdatePaidInstallments/InitialData
        [Route("api/Main/Employee_UpdatePaidInstallments/InitialData")]
        [HttpGet]
        public IHttpActionResult Get84()
        {

            var businessObj = new Models.Business.UI.Employee_UpdatePaidInstallments();
            var dataObj = new Models.DataObjects.Internal.Employee_UpdatePaidInstallments.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Employee_UpdatePaidInstallments/Save
        [Route("api/Main/Employee_UpdatePaidInstallments/Save")]
        [HttpPost]
        public IHttpActionResult Post77(object submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_UpdatePaidInstallments();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                var data = JsonConvert.DeserializeObject<List<Models.DataObjects.External.Employee_UpdatePaidInstallments_In>>(submittedData.ToString());

                result = businessObj.Save(data);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/Employee_UpdatePaidInstallments/Export
        [Route("api/Main/Employee_UpdatePaidInstallments/Export")]
        [HttpPost]
        public IHttpActionResult Post89(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_UpdatePaidInstallments();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion UpdatePaidInstallments

        #region UpdatePaidSubscriptions

        // GET: api/Main/Employee_UpdatePaidSubscriptions/InitialData
        [Route("api/Main/Employee_UpdatePaidSubscriptions/InitialData")]
        [HttpGet]
        public IHttpActionResult Get85()
        {

            var businessObj = new Models.Business.UI.Employee_UpdatePaidSubscriptions();
            var dataObj = new Models.DataObjects.Internal.Employee_UpdatePaidSubscriptions.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Employee_UpdatePaidSubscriptions/Save
        [Route("api/Main/Employee_UpdatePaidSubscriptions/Save")]
        [HttpPost]
        public IHttpActionResult Post78(object submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_UpdatePaidSubscriptions();
            string result = "";

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                var data = JsonConvert.DeserializeObject<List<Models.DataObjects.External.Employee_UpdatePaidSubscriptions_In>>(submittedData.ToString());

                result = businessObj.Save(data);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/Employee_UpdatePaidSubscriptions/Export
        [Route("api/Main/Employee_UpdatePaidSubscriptions/Export")]
        [HttpPost]
        public IHttpActionResult Post90(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_UpdatePaidSubscriptions();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion UpdatePaidSubscriptions

        #region UploadPaidSubscriptions

        // GET: api/Main/Employee_UploadPaidSubscriptions/UploadedData?fileName=datafile.xlsx
        [Route("api/Main/Employee_UploadPaidSubscriptions/UploadedData")]
        [HttpGet]
        public IHttpActionResult Get91(string fileName)
        {
            string tempPath_Server = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath = tempPath_Server + "\\" + fileName.Replace("dottttt", ".");
            dynamic resultObj = new ExpandoObject();
            string resultMessage = "";
            var businessObj = new Models.Business.UI.Employee_UploadPaidSubscriptions();
            var dataObj = new List<Models.DataObjects.Internal.Employee_UploadPaidSubscriptions.Employee>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                //Check if file exists in temp directory
                if (!File.Exists(filePath))
                {
                    return BadRequestResult("BadRequest");
                }

                //Upload the data from the file
                dataObj = businessObj.GetUploadedData(filePath, out resultMessage);
                resultObj.Employees = dataObj;
                resultObj.Message = resultMessage;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // POST: api/Main/Employee_UploadPaidSubscriptions/Save
        [Route("api/Main/Employee_UploadPaidSubscriptions/Save")]
        [HttpPost]
        public IHttpActionResult Post91(object submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_UploadPaidSubscriptions();
            object result;

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                var data = JsonConvert.DeserializeObject<List<Models.DataObjects.External.Employee_UploadPaidSubscriptions_In>>(submittedData.ToString());

                result = businessObj.Save(data);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/Employee_UploadPaidSubscriptions/Export
        [Route("api/Main/Employee_UploadPaidSubscriptions/Export")]
        [HttpPost]
        public IHttpActionResult Post92(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_UploadPaidSubscriptions();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion UploadPaidSubscriptions

        #region UploadPaidInstallments

        // GET: api/Main/Employee_UploadPaidInstallments/UploadedData?fileName=datafile.xlsx
        [Route("api/Main/Employee_UploadPaidInstallments/UploadedData")]
        [HttpGet]
        public IHttpActionResult Get92(string fileName)
        {
            string tempPath_Server = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath = tempPath_Server + "\\" + fileName.Replace("dottttt", ".");
            dynamic resultObj = new ExpandoObject();
            string resultMessage = "";
            var businessObj = new Models.Business.UI.Employee_UploadPaidInstallments();
            var dataObj = new List<Models.DataObjects.Internal.Employee_UploadPaidInstallments.Employee>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                //Check if file exists in temp directory
                if (!File.Exists(filePath))
                {
                    return BadRequestResult("BadRequest");
                }

                //Upload the data from the file
                dataObj = businessObj.GetUploadedData(filePath, out resultMessage);
                resultObj.Employees = dataObj;
                resultObj.Message = resultMessage;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // POST: api/Main/Employee_UploadPaidInstallments/Save
        [Route("api/Main/Employee_UploadPaidInstallments/Save")]
        [HttpPost]
        public IHttpActionResult Post93(object submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_UploadPaidInstallments();
            object result;

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                var data = JsonConvert.DeserializeObject<List<Models.DataObjects.External.Employee_UploadPaidInstallments_In>>(submittedData.ToString());

                result = businessObj.Save(data);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/Employee_UploadPaidInstallments/Export
        [Route("api/Main/Employee_UploadPaidInstallments/Export")]
        [HttpPost]
        public IHttpActionResult Post94(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_UploadPaidInstallments();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion UploadPaidInstallments

        #region LoanClosing

        // GET: api/Main/Employee_LoanClosing/InitialData
        [Route("api/Main/Employee_LoanClosing/InitialData")]
        [HttpGet]
        public IHttpActionResult Get104()
        {

            var businessObj = new Models.Business.UI.Employee_LoanClosing();
            var dataObj = new Models.DataObjects.Internal.Employee_LoanClosing.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Employee_LoanClosing/Save
        [Route("api/Main/Employee_LoanClosing/Save")]
        [HttpPost]
        public IHttpActionResult Post102(object submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_LoanClosing();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;

                var employeesIDs = JsonConvert.DeserializeObject<List<long>>(obj.EmployeesIDs.ToString());

                result = businessObj.Save(employeesIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/Employee_LoanClosing/Export
        [Route("api/Main/Employee_LoanClosing/Export")]
        [HttpPost]
        public IHttpActionResult Post103(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.Employee_LoanClosing();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion LoanClosing

        #endregion ==== Employee ====


        #region ==== HR ====

        #region HRSheet

        // GET: api/Main/HR_HRSheet/InitialData?fromDate=2015-10-02&toDate=2015-11-15
        [Route("api/Main/HR_HRSheet/InitialData")]
        [HttpGet]
        public IHttpActionResult Get63(DateTime fromDate, DateTime toDate)
        {

            var businessObj = new Models.Business.UI.HR_HRSheet();
            var dataObj = new Models.DataObjects.Internal.HR_HRSheet.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(fromDate, toDate);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/HR_HRSheet/Save
        [Route("api/Main/HR_HRSheet/Save")]
        [HttpPost]
        public IHttpActionResult Post52(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheet();
            dynamic resultObj = new ExpandoObject();
            string resultMessage = "";
            var dataObj = new Models.DataObjects.Internal.HR_HRSheet.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var notes = obj.Notes.ToString();

                dataObj = businessObj.Save(sheetID, notes, out resultMessage);
                resultObj.NewSerial = dataObj.NewSerial;
                resultObj.Date = dataObj.Date;
                resultObj.Month = dataObj.Month;
                resultObj.Sheets = dataObj.Sheets;
                resultObj.Message = resultMessage;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // DELETE: api/Main/HR_HRSheet/Delete
        [Route("api/Main/HR_HRSheet/Delete")]
        [HttpDelete]
        public IHttpActionResult Delete5(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheet();
            dynamic resultObj = new ExpandoObject();
            string resultMessage = "";
            var dataObj = new Models.DataObjects.Internal.HR_HRSheet.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.ID;

                dataObj = businessObj.Delete(sheetID, out resultMessage);
                resultObj.NewSerial = dataObj.NewSerial;
                resultObj.Date = dataObj.Date;
                resultObj.Month = dataObj.Month;
                resultObj.Sheets = dataObj.Sheets;
                resultObj.Message = resultMessage;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // POST: api/Main/HR_HRSheet/Export
        [Route("api/Main/HR_HRSheet/Export")]
        [HttpPost]
        public IHttpActionResult Post53(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheet();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }


        #endregion HRSheet

        #region HRSheetModification

        // GET: api/Main/HR_HRSheetModification/InitialData
        [Route("api/Main/HR_HRSheetModification/InitialData")]
        [HttpGet]
        public IHttpActionResult Get64()
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification();
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetModification.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/HR_HRSheetModification/SheetEmployees?sheetID=2
        [Route("api/Main/HR_HRSheetModification/SheetEmployees")]
        [HttpGet]
        public IHttpActionResult Get65(int sheetID)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification();
            var dataObj = new List<Models.DataObjects.Internal.HR_HRSheetModification.Employee>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetSheetEmployees(sheetID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/HR_HRSheetModification/Save
        [Route("api/Main/HR_HRSheetModification/Save")]
        [HttpPost]
        public IHttpActionResult Post54(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification();
            string result = "";


            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Save(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification/Approve
        [Route("api/Main/HR_HRSheetModification/Approve")]
        [HttpPost]
        public IHttpActionResult Post81(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Approve(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification/Export
        [Route("api/Main/HR_HRSheetModification/Export")]
        [HttpPost]
        public IHttpActionResult Post58(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion HRSheetModification

        #region HRSheetModification_NewSubscriptions

        // GET: api/Main/HR_HRSheetModification_NewSubscriptions/InitialData
        [Route("api/Main/HR_HRSheetModification_NewSubscriptions/InitialData")]
        [HttpGet]
        public IHttpActionResult Get70()
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewSubscriptions();
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetModification_NewSubscriptions.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/HR_HRSheetModification_NewSubscriptions/SheetEmployees?sheetID=2
        [Route("api/Main/HR_HRSheetModification_NewSubscriptions/SheetEmployees")]
        [HttpGet]
        public IHttpActionResult Get71(int sheetID)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewSubscriptions();
            var dataObj = new List<Models.DataObjects.Internal.HR_HRSheetModification_NewSubscriptions.Employee>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetSheetRequests(sheetID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/HR_HRSheetModification_NewSubscriptions/Save
        [Route("api/Main/HR_HRSheetModification_NewSubscriptions/Save")]
        [HttpPost]
        public IHttpActionResult Post57(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewSubscriptions();
            string result = "";


            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Save(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_NewSubscriptions/Approve
        [Route("api/Main/HR_HRSheetModification_NewSubscriptions/Approve")]
        [HttpPost]
        public IHttpActionResult Post84(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewSubscriptions();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Approve(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_NewSubscriptions/Export
        [Route("api/Main/HR_HRSheetModification_NewSubscriptions/Export")]
        [HttpPost]
        public IHttpActionResult Post61(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewSubscriptions();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion HRSheetModification_NewSubscriptions

        #region HRSheetModification_ModifiedSubscriptions

        // GET: api/Main/HR_HRSheetModification_ModifiedSubscriptions/InitialData
        [Route("api/Main/HR_HRSheetModification_ModifiedSubscriptions/InitialData")]
        [HttpGet]
        public IHttpActionResult Get68()
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_ModifiedSubscriptions();
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetModification_ModifiedSubscriptions.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/HR_HRSheetModification_ModifiedSubscriptions/SheetEmployees?sheetID=2
        [Route("api/Main/HR_HRSheetModification_ModifiedSubscriptions/SheetEmployees")]
        [HttpGet]
        public IHttpActionResult Get69(int sheetID)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_ModifiedSubscriptions();
            var dataObj = new List<Models.DataObjects.Internal.HR_HRSheetModification_ModifiedSubscriptions.Employee>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetSheetRequests(sheetID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/HR_HRSheetModification_ModifiedSubscriptions/Save
        [Route("api/Main/HR_HRSheetModification_ModifiedSubscriptions/Save")]
        [HttpPost]
        public IHttpActionResult Post56(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_ModifiedSubscriptions();
            string result = "";


            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Save(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_ModifiedSubscriptions/Approve
        [Route("api/Main/HR_HRSheetModification_ModifiedSubscriptions/Approve")]
        [HttpPost]
        public IHttpActionResult Post83(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_ModifiedSubscriptions();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Approve(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_ModifiedSubscriptions/Export
        [Route("api/Main/HR_HRSheetModification_ModifiedSubscriptions/Export")]
        [HttpPost]
        public IHttpActionResult Post60(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_ModifiedSubscriptions();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion HRSheetModification_ModifiedSubscriptions

        #region HRSheetModification_CancelledSubscriptions

        // GET: api/Main/HR_HRSheetModification_CancelledSubscriptions/InitialData
        [Route("api/Main/HR_HRSheetModification_CancelledSubscriptions/InitialData")]
        [HttpGet]
        public IHttpActionResult Get66()
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledSubscriptions();
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetModification_CancelledSubscriptions.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/HR_HRSheetModification_CancelledSubscriptions/SheetEmployees?sheetID=2
        [Route("api/Main/HR_HRSheetModification_CancelledSubscriptions/SheetEmployees")]
        [HttpGet]
        public IHttpActionResult Get67(int sheetID)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledSubscriptions();
            var dataObj = new List<Models.DataObjects.Internal.HR_HRSheetModification_CancelledSubscriptions.Employee>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetSheetRequests(sheetID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/HR_HRSheetModification_CancelledSubscriptions/Save
        [Route("api/Main/HR_HRSheetModification_CancelledSubscriptions/Save")]
        [HttpPost]
        public IHttpActionResult Post55(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledSubscriptions();
            string result = "";


            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Save(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_CancelledSubscriptions/Approve
        [Route("api/Main/HR_HRSheetModification_CancelledSubscriptions/Approve")]
        [HttpPost]
        public IHttpActionResult Post82(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledSubscriptions();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Approve(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_CancelledSubscriptions/Export
        [Route("api/Main/HR_HRSheetModification_CancelledSubscriptions/Export")]
        [HttpPost]
        public IHttpActionResult Post59(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledSubscriptions();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion HRSheetModification_CancelledSubscriptions

        #region HRSheetModification_NewLoans

        // GET: api/Main/HR_HRSheetModification_NewLoans/InitialData
        [Route("api/Main/HR_HRSheetModification_NewLoans/InitialData")]
        [HttpGet]
        public IHttpActionResult Get89()
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewLoans();
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetModification_NewLoans.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/HR_HRSheetModification_NewLoans/SheetEmployees?sheetID=2
        [Route("api/Main/HR_HRSheetModification_NewLoans/SheetEmployees")]
        [HttpGet]
        public IHttpActionResult Get90(int sheetID)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewLoans();
            var dataObj = new List<Models.DataObjects.Internal.HR_HRSheetModification_NewLoans.Employee>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetSheetRequests(sheetID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/HR_HRSheetModification_NewLoans/Save
        [Route("api/Main/HR_HRSheetModification_NewLoans/Save")]
        [HttpPost]
        public IHttpActionResult Post85(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewLoans();
            string result = "";


            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Save(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_NewLoans/Approve
        [Route("api/Main/HR_HRSheetModification_NewLoans/Approve")]
        [HttpPost]
        public IHttpActionResult Post86(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewLoans();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Approve(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_NewLoans/Export
        [Route("api/Main/HR_HRSheetModification_NewLoans/Export")]
        [HttpPost]
        public IHttpActionResult Post87(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewLoans();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion HRSheetModification_NewLoans

        #region HRSheetModification_ModifiedInstallments

        // GET: api/Main/HR_HRSheetModification_ModifiedInstallments/InitialData
        [Route("api/Main/HR_HRSheetModification_ModifiedInstallments/InitialData")]
        [HttpGet]
        public IHttpActionResult Get120()
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_ModifiedInstallments();
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetModification_ModifiedInstallments.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/HR_HRSheetModification_ModifiedInstallments/SheetEmployees?sheetID=2
        [Route("api/Main/HR_HRSheetModification_ModifiedInstallments/SheetEmployees")]
        [HttpGet]
        public IHttpActionResult Get121(int sheetID)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_ModifiedInstallments();
            var dataObj = new List<Models.DataObjects.Internal.HR_HRSheetModification_ModifiedInstallments.Employee>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetSheetRequests(sheetID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/HR_HRSheetModification_ModifiedInstallments/Save
        [Route("api/Main/HR_HRSheetModification_ModifiedInstallments/Save")]
        [HttpPost]
        public IHttpActionResult Post126(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_ModifiedInstallments();
            string result = "";


            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Save(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_ModifiedInstallments/Approve
        [Route("api/Main/HR_HRSheetModification_ModifiedInstallments/Approve")]
        [HttpPost]
        public IHttpActionResult Post127(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_ModifiedInstallments();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Approve(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_ModifiedInstallments/Export
        [Route("api/Main/HR_HRSheetModification_ModifiedInstallments/Export")]
        [HttpPost]
        public IHttpActionResult Post128(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_ModifiedInstallments();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion HRSheetModification_ModifiedInstallments

        #region HRSheetModification_CancelledLoans

        // GET: api/Main/HR_HRSheetModification_CancelledLoans/InitialData
        [Route("api/Main/HR_HRSheetModification_CancelledLoans/InitialData")]
        [HttpGet]
        public IHttpActionResult Get99()
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledLoans();
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetModification_CancelledLoans.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/HR_HRSheetModification_CancelledLoans/SheetEmployees?sheetID=2
        [Route("api/Main/HR_HRSheetModification_CancelledLoans/SheetEmployees")]
        [HttpGet]
        public IHttpActionResult Get100(int sheetID)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledLoans();
            var dataObj = new List<Models.DataObjects.Internal.HR_HRSheetModification_CancelledLoans.Employee>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetSheetRequests(sheetID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/HR_HRSheetModification_CancelledLoans/Save
        [Route("api/Main/HR_HRSheetModification_CancelledLoans/Save")]
        [HttpPost]
        public IHttpActionResult Post95(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledLoans();
            string result = "";


            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Save(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_CancelledLoans/Approve
        [Route("api/Main/HR_HRSheetModification_CancelledLoans/Approve")]
        [HttpPost]
        public IHttpActionResult Post96(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledLoans();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Approve(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_CancelledLoans/Export
        [Route("api/Main/HR_HRSheetModification_CancelledLoans/Export")]
        [HttpPost]
        public IHttpActionResult Post97(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledLoans();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion HRSheetModification_CancelledLoans

        #region HRSheetSub

        // GET: api/Main/HR_HRSheetSub/InitialData?fromDate=2015-10-02&toDate=2015-11-15
        [Route("api/Main/HR_HRSheetSub/InitialData")]
        [HttpGet]
        public IHttpActionResult Get106(DateTime fromDate, DateTime toDate)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetSub();
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetSub.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData(fromDate, toDate);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/HR_HRSheetSub/Save
        [Route("api/Main/HR_HRSheetSub/Save")]
        [HttpPost]
        public IHttpActionResult Post106(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetSub();
            dynamic resultObj = new ExpandoObject();
            string resultMessage = "";
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetSub.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var notes = obj.Notes.ToString();
                var sheetMonth = (DateTime)obj.Month;

                dataObj = businessObj.Save(sheetID, notes, sheetMonth, out resultMessage);
                resultObj.NewSerial = dataObj.NewSerial;
                resultObj.Date = dataObj.Date;
                resultObj.Month = dataObj.Month;
                resultObj.Sheets = dataObj.Sheets;
                resultObj.Message = resultMessage;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // DELETE: api/Main/HR_HRSheetSub/Delete
        [Route("api/Main/HR_HRSheetSub/Delete")]
        [HttpDelete]
        public IHttpActionResult Delete6(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetSub();
            dynamic resultObj = new ExpandoObject();
            string resultMessage = "";
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetSub.MainObject();

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.ID;

                dataObj = businessObj.Delete(sheetID, out resultMessage);
                resultObj.NewSerial = dataObj.NewSerial;
                resultObj.Date = dataObj.Date;
                resultObj.Month = dataObj.Month;
                resultObj.Sheets = dataObj.Sheets;
                resultObj.Message = resultMessage;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        // POST: api/Main/HR_HRSheetSub/Export
        [Route("api/Main/HR_HRSheetSub/Export")]
        [HttpPost]
        public IHttpActionResult Post107(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetSub();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion HRSheetSub

        #region HRSheetModificationSub

        // GET: api/Main/HR_HRSheetModificationSub/InitialData
        [Route("api/Main/HR_HRSheetModificationSub/InitialData")]
        [HttpGet]
        public IHttpActionResult Get107()
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModificationSub();
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetModificationSub.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/HR_HRSheetModificationSub/SheetEmployees?sheetID=2
        [Route("api/Main/HR_HRSheetModificationSub/SheetEmployees")]
        [HttpGet]
        public IHttpActionResult Get108(int sheetID)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModificationSub();
            var dataObj = new List<Models.DataObjects.Internal.HR_HRSheetModificationSub.Employee>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetSheetEmployees(sheetID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/HR_HRSheetModificationSub/Save
        [Route("api/Main/HR_HRSheetModificationSub/Save")]
        [HttpPost]
        public IHttpActionResult Post108(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModificationSub();
            string result = "";


            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Save(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModificationSub/Approve
        [Route("api/Main/HR_HRSheetModificationSub/Approve")]
        [HttpPost]
        public IHttpActionResult Post109(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModificationSub();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Approve(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModificationSub/Export
        [Route("api/Main/HR_HRSheetModificationSub/Export")]
        [HttpPost]
        public IHttpActionResult Post110(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModificationSub();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion HRSheetModificationSub

        #region HRSheetModification_CancelledSubscriptionsSub

        // GET: api/Main/HR_HRSheetModification_CancelledSubscriptionsSub/InitialData
        [Route("api/Main/HR_HRSheetModification_CancelledSubscriptionsSub/InitialData")]
        [HttpGet]
        public IHttpActionResult Get109()
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledSubscriptionsSub();
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetModification_CancelledSubscriptionsSub.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/HR_HRSheetModification_CancelledSubscriptionsSub/SheetEmployees?sheetID=2
        [Route("api/Main/HR_HRSheetModification_CancelledSubscriptionsSub/SheetEmployees")]
        [HttpGet]
        public IHttpActionResult Get110(int sheetID)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledSubscriptionsSub();
            var dataObj = new List<Models.DataObjects.Internal.HR_HRSheetModification_CancelledSubscriptionsSub.Employee>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetSheetEmployees(sheetID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/HR_HRSheetModification_CancelledSubscriptionsSub/Save
        [Route("api/Main/HR_HRSheetModification_CancelledSubscriptionsSub/Save")]
        [HttpPost]
        public IHttpActionResult Post111(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledSubscriptionsSub();
            string result = "";


            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Save(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_CancelledSubscriptionsSub/Approve
        [Route("api/Main/HR_HRSheetModification_CancelledSubscriptionsSub/Approve")]
        [HttpPost]
        public IHttpActionResult Post112(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledSubscriptionsSub();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Approve(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_CancelledSubscriptionsSub/Export
        [Route("api/Main/HR_HRSheetModification_CancelledSubscriptionsSub/Export")]
        [HttpPost]
        public IHttpActionResult Post113(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledSubscriptionsSub();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion HRSheetModification_CancelledSubscriptionsSub

        #region HRSheetModification_ModifiedSubscriptionsSub

        // GET: api/Main/HR_HRSheetModification_ModifiedSubscriptionsSub/InitialData
        [Route("api/Main/HR_HRSheetModification_ModifiedSubscriptionsSub/InitialData")]
        [HttpGet]
        public IHttpActionResult Get111()
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_ModifiedSubscriptionsSub();
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetModification_ModifiedSubscriptionsSub.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/HR_HRSheetModification_ModifiedSubscriptionsSub/SheetEmployees?sheetID=2
        [Route("api/Main/HR_HRSheetModification_ModifiedSubscriptionsSub/SheetEmployees")]
        [HttpGet]
        public IHttpActionResult Get112(int sheetID)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_ModifiedSubscriptionsSub();
            var dataObj = new List<Models.DataObjects.Internal.HR_HRSheetModification_ModifiedSubscriptionsSub.Employee>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetSheetEmployees(sheetID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/HR_HRSheetModification_ModifiedSubscriptionsSub/Save
        [Route("api/Main/HR_HRSheetModification_ModifiedSubscriptionsSub/Save")]
        [HttpPost]
        public IHttpActionResult Post114(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_ModifiedSubscriptionsSub();
            string result = "";


            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Save(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_ModifiedSubscriptionsSub/Approve
        [Route("api/Main/HR_HRSheetModification_ModifiedSubscriptionsSub/Approve")]
        [HttpPost]
        public IHttpActionResult Post115(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_ModifiedSubscriptionsSub();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Approve(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_ModifiedSubscriptionsSub/Export
        [Route("api/Main/HR_HRSheetModification_ModifiedSubscriptionsSub/Export")]
        [HttpPost]
        public IHttpActionResult Post116(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_ModifiedSubscriptionsSub();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion HRSheetModification_ModifiedSubscriptionsSub

        #region HRSheetModification_NewSubscriptionsSub

        // GET: api/Main/HR_HRSheetModification_NewSubscriptionsSub/InitialData
        [Route("api/Main/HR_HRSheetModification_NewSubscriptionsSub/InitialData")]
        [HttpGet]
        public IHttpActionResult Get113()
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewSubscriptionsSub();
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetModification_NewSubscriptionsSub.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/HR_HRSheetModification_NewSubscriptionsSub/SheetEmployees?sheetID=2
        [Route("api/Main/HR_HRSheetModification_NewSubscriptionsSub/SheetEmployees")]
        [HttpGet]
        public IHttpActionResult Get114(int sheetID)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewSubscriptionsSub();
            var dataObj = new List<Models.DataObjects.Internal.HR_HRSheetModification_NewSubscriptionsSub.Employee>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetSheetEmployees(sheetID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/HR_HRSheetModification_NewSubscriptionsSub/Save
        [Route("api/Main/HR_HRSheetModification_NewSubscriptionsSub/Save")]
        [HttpPost]
        public IHttpActionResult Post117(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewSubscriptionsSub();
            string result = "";


            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Save(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_NewSubscriptionsSub/Approve
        [Route("api/Main/HR_HRSheetModification_NewSubscriptionsSub/Approve")]
        [HttpPost]
        public IHttpActionResult Post118(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewSubscriptionsSub();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Approve(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_NewSubscriptionsSub/Export
        [Route("api/Main/HR_HRSheetModification_NewSubscriptionsSub/Export")]
        [HttpPost]
        public IHttpActionResult Post119(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewSubscriptionsSub();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion HRSheetModification_NewSubscriptionsSub

        #region HRSheetModification_NewLoansSub

        // GET: api/Main/HR_HRSheetModification_NewLoansSub/InitialData
        [Route("api/Main/HR_HRSheetModification_NewLoansSub/InitialData")]
        [HttpGet]
        public IHttpActionResult Get115()
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewLoansSub();
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetModification_NewLoansSub.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/HR_HRSheetModification_NewLoansSub/SheetEmployees?sheetID=2
        [Route("api/Main/HR_HRSheetModification_NewLoansSub/SheetEmployees")]
        [HttpGet]
        public IHttpActionResult Get116(int sheetID)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewLoansSub();
            var dataObj = new List<Models.DataObjects.Internal.HR_HRSheetModification_NewLoansSub.Employee>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetSheetEmployees(sheetID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/HR_HRSheetModification_NewLoansSub/Save
        [Route("api/Main/HR_HRSheetModification_NewLoansSub/Save")]
        [HttpPost]
        public IHttpActionResult Post120(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewLoansSub();
            string result = "";


            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Save(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_NewLoansSub/Approve
        [Route("api/Main/HR_HRSheetModification_NewLoansSub/Approve")]
        [HttpPost]
        public IHttpActionResult Post121(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewLoansSub();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Approve(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_NewLoansSub/Export
        [Route("api/Main/HR_HRSheetModification_NewLoansSub/Export")]
        [HttpPost]
        public IHttpActionResult Post122(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_NewLoansSub();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion HRSheetModification_NewLoansSub

        #region HRSheetModification_CancelledLoansSub

        // GET: api/Main/HR_HRSheetModification_CancelledLoansSub/InitialData
        [Route("api/Main/HR_HRSheetModification_CancelledLoansSub/InitialData")]
        [HttpGet]
        public IHttpActionResult Get117()
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledLoansSub();
            var dataObj = new Models.DataObjects.Internal.HR_HRSheetModification_CancelledLoansSub.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // GET: api/Main/HR_HRSheetModification_CancelledLoansSub/SheetEmployees?sheetID=2
        [Route("api/Main/HR_HRSheetModification_CancelledLoansSub/SheetEmployees")]
        [HttpGet]
        public IHttpActionResult Get118(int sheetID)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledLoansSub();
            var dataObj = new List<Models.DataObjects.Internal.HR_HRSheetModification_CancelledLoansSub.Employee>();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetSheetEmployees(sheetID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/HR_HRSheetModification_CancelledLoansSub/Save
        [Route("api/Main/HR_HRSheetModification_CancelledLoansSub/Save")]
        [HttpPost]
        public IHttpActionResult Post123(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledLoansSub();
            string result = "";


            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Save(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_CancelledLoansSub/Approve
        [Route("api/Main/HR_HRSheetModification_CancelledLoansSub/Approve")]
        [HttpPost]
        public IHttpActionResult Post124(object submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledLoansSub();
            string result = "";

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dynamic obj = submittedData;
                var sheetID = (int)obj.SheetID;
                var selectedIDs = obj.SelectedIDs.ToString();

                result = businessObj.Approve(sheetID, selectedIDs);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        // POST: api/Main/HR_HRSheetModification_CancelledLoansSub/Export
        [Route("api/Main/HR_HRSheetModification_CancelledLoansSub/Export")]
        [HttpPost]
        public IHttpActionResult Post125(List<List<string>> submittedData)
        {

            var businessObj = new Models.Business.UI.HR_HRSheetModification_CancelledLoansSub();
            var filePath = HttpContext.Current.Server.MapPath("~/" + Common.PathConfig.UploadPath_Temp);
            string filePath_UI = "../../" + Common.PathConfig.UploadPath_Temp + "/";
            dynamic resultObj = new ExpandoObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                if (submittedData == null || submittedData.Count == 0 || submittedData[0].Count == 0)
                {
                    return BadRequestResult("NoDataToExport");
                }


                var fileName = businessObj.ExportDataToExcel(submittedData, filePath);
                filePath_UI += fileName;


                resultObj.URL = filePath_UI;
                resultObj.Name = fileName;
                resultObj.FullURL = Common.CurrentHostingServer.Host + "/" + Common.PathConfig.UploadPath_Temp + "/" + fileName;

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(resultObj);

        }

        #endregion HRSheetModification_CancelledLoansSub

        #endregion ==== HR ====


        #region ==== Report ====

        #region CommitteeMeetingDecisions

        // GET: api/Main/Report_CommitteeMeetingDecisions/InitialData
        [Route("api/Main/Report_CommitteeMeetingDecisions/InitialData")]
        [HttpGet]
        public IHttpActionResult Get87()
        {

            var businessObj = new Models.Business.UI.Report_CommitteeMeetingDecisions();
            var dataObj = new Models.DataObjects.Internal.Report_CommitteeMeetingDecisions.MainObject();

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin) && !IsAuthorized(Models.Business.Common.UserRole.CommitteeMember) && !IsAuthorized(Models.Business.Common.UserRole.Auditor))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                dataObj = businessObj.GetInitialData();

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(dataObj);

        }

        // POST: api/Main/Report_CommitteeMeetingDecisions/Export?meetingID=43
        [Route("api/Main/Report_CommitteeMeetingDecisions/Export")]
        [HttpGet]
        public IHttpActionResult Get88(int meetingID)
        {

            var businessObj = new Models.Business.UI.Report_CommitteeMeetingDecisions();
            object result;

            try
            {

                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin) && !IsAuthorized(Models.Business.Common.UserRole.CommitteeMember) && !IsAuthorized(Models.Business.Common.UserRole.Auditor))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                result = businessObj.Export(meetingID);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion CommitteeMeetingDecisions

        #region AdminDecisions

        // POST: api/Main/Report_AdminDecisions/Export?from=1900-01-01&to=2099-12-31
        [Route("api/Main/Report_AdminDecisions/Export")]
        [HttpGet]
        public IHttpActionResult Get101(DateTime from, DateTime to)
        {

            var businessObj = new Models.Business.UI.Report_AdminDecisions();
            object result;

            try
            {
                //Check authorization
                if (!IsAuthorized(Models.Business.Common.UserRole.Admin) && !IsAuthorized(Models.Business.Common.UserRole.CommitteeMember))
                {
                    return ForbiddenResult("NotAuthorized");
                }

                result = businessObj.Export(from, to);

            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok(result);

        }

        #endregion AdminDecisions

        #endregion ==== Report ====


        /////////////////////////////////////////////////////////////


        #region EncyptPasswords
        // POST: api/Main/Employee_FinancialTransactionsManagement/SaveData
        [Route("api/Main/Employees/EncyptPasswords")]
        [HttpPost]
        public IHttpActionResult EncyptPasswords()
        {
            /*This api must be used only once.*/
            try
            {

                using (Models.DB.TakafulEntities tpDB = new Models.DB.TakafulEntities())
                {
                    foreach (var employee in tpDB.Employees
                        .Where(e => string.IsNullOrEmpty(e.SecurityStamp) || string.IsNullOrEmpty(e.Emp_Password_Enc))
                        .ToList())
                    {
                        //if (string.IsNullOrEmpty(employee.SecurityStamp) && string.IsNullOrEmpty(employee.Emp_Password_Enc))
                        //{
                            employee.SecurityStamp = Common.Helper.EncyptDecrypt.GenerateEncryptionKey();
                            employee.Emp_Password_Enc = Common.Helper.EncyptDecrypt.Encrypt(employee.Emp_Password, employee.SecurityStamp);
                            tpDB.Entry(employee).State = System.Data.Entity.EntityState.Modified;
                            tpDB.SaveChanges();
                        //}
                    }
                }
            }
            catch (Exception ex)
            {
                LogException(ex);
                return InternalServerErrorResult("InternalServerError");
            }

            return Ok();

        }
        #endregion
        /// <summary>
        /// creates an <see cref="HttpResponseException"/> with a response code of 400
        /// and places the reason in the reason header and the body.
        /// </summary>
        /// <param name="reason">Explanation text for the client.</param>
        /// <returns>A new HttpResponseException</returns>
        private HttpResponseException ForbiddenException(string reason)
        {
            return CreateHttpResponseException(reason, HttpStatusCode.Forbidden);
        }
        private IHttpActionResult ForbiddenResult(string message)
        {
            return CreateHttpResponseMessage(message, HttpStatusCode.Forbidden);
        }

        /// <summary>
        /// creates an <see cref="HttpResponseException"/> with a response code of 400
        /// and places the reason in the reason header and the body.
        /// </summary>
        /// <param name="reason">Explanation text for the client.</param>
        /// <returns>A new HttpResponseException</returns>
        private HttpResponseException BadRequestException(string reason)
        {
            return CreateHttpResponseException(reason, HttpStatusCode.BadRequest);
        }
        private IHttpActionResult BadRequestResult(string message)
        {
            return CreateHttpResponseMessage(message, HttpStatusCode.BadRequest);
        }

        /// <summary>
        /// creates an <see cref="HttpResponseException"/> with a response code of 404
        /// and places the reason in the reason header and the body.
        /// </summary>
        /// <param name="reason">Explanation text for the client.</param>
        /// <returns>A new HttpResponseException</returns>
        private HttpResponseException NotFoundException(string reason)
        {
            return CreateHttpResponseException(reason, HttpStatusCode.NotFound);
        }
        private IHttpActionResult NotFoundResult(string message)
        {
            return CreateHttpResponseMessage(message, HttpStatusCode.NotFound);
        }

        private HttpResponseException InternalServerErrorException(string reason)
        {
            return CreateHttpResponseException(reason, HttpStatusCode.InternalServerError);
        }
        private IHttpActionResult InternalServerErrorResult(string message)
        {
            return CreateHttpResponseMessage(message, HttpStatusCode.InternalServerError);
        }

        /// <summary>
        /// Creates an <see cref="HttpResponseException"/> to be thrown by the api.
        /// </summary>
        /// <param name="reason">Explanation text, also added to the body.</param>
        /// <param name="code">The HTTP status code.</param>
        /// <returns>A new <see cref="HttpResponseException"/></returns>
        private static HttpResponseException CreateHttpResponseException(string reason, HttpStatusCode code)
        {
            var response = new HttpResponseMessage
            {
                StatusCode = code,
                ReasonPhrase = reason,
                Content = new StringContent(reason)
            };
            throw new HttpResponseException(response);


        }
        private static IHttpActionResult CreateHttpResponseMessage(string message, HttpStatusCode code)
        {
            var response = new HttpResponseMessage
            {
                StatusCode = code,
                ReasonPhrase = message,
                Content = new StringContent(message)
            };

            return new ResponseMessageResult(response);

        }

        private static bool IsValidLogin()
        {

            var utl = new Common.Utility();
            return utl.IsLoggedin();

        }

        private static bool IsAuthorized(Models.Business.Common.UserRole userRole)
        {

            var utl = new Common.Utility();
            return utl.IsAuthorizedUser(userRole);

        }

        private static void LogException(Exception ex)
        {

            var utl = new Common.Utility();

            //Task.Factory.StartNew(() =>
            //{
            utl.LogException(ex);
            //});


        }


    }
}
