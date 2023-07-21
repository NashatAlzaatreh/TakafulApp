
if (typeof User_AuditManagement === 'undefined') {
    // Namespace does not exist, create a new one
    var User_AuditManagement = {};
}

//Add the event handlers container object to the main namespace
User_AuditManagement.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
User_AuditManagement.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + User_AuditManagement.uiElements.txtUserName).val('');
    $("#" + User_AuditManagement.uiElements.txtPassword).val('');


};


//Ajax functions
//--------------

//Get initial data
User_AuditManagement.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = User_AuditManagement.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = User_AuditManagement.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = User_AuditManagement.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = User_AuditManagement.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save
User_AuditManagement.CustomMethods.Save = function (userName, password) {

    var submittedData = {};
    submittedData.UserName = userName;
    submittedData.Password = password;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = User_AuditManagement.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = User_AuditManagement.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = User_AuditManagement.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = User_AuditManagement.CustomMethods.Callback.Save_Completed;

    //requestOptions.RequestHeaderAdd = [{ hkey: 'oldpassword', hvalue: oldPass }, { hkey: 'newpassword', hvalue: newPass }];

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);

};


//Callback functions
//------------------

//Get initial data
User_AuditManagement.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    $('#' + User_AuditManagement.uiElements.txtUserName).val(jsonObj.UserName);
    $("#" + User_AuditManagement.uiElements.txtPassword).val(jsonObj.Password);

    User_RoleManagement.InitialDataReady = true;

};

User_AuditManagement.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../User/Login.html");
    } else {
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    }




};

User_AuditManagement.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save
User_AuditManagement.CustomMethods.Callback.Save_Success = function (jsonObj) {


    Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, null, "success");

    setTimeout(function () { window.history.back(); }, 2000);

};

User_AuditManagement.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {

    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);


    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../User/Login.html");
    } else {
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    }


};

User_AuditManagement.CustomMethods.Callback.Save_Completed = function (xhr, status) {


};




