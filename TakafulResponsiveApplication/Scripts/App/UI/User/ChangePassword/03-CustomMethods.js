
if (typeof User_ChangePassword === 'undefined') {
    // Namespace does not exist, create a new one
    var User_ChangePassword = {};
}

//Add the event handlers container object to the main namespace
User_ChangePassword.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
User_ChangePassword.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + User_ChangePassword.uiElements.txtOldPassword).val('');
    $("#" + User_ChangePassword.uiElements.txtOldPassword).focus();
    $("#" + User_ChangePassword.uiElements.txtNewPassword).val('');
    $('#' + User_ChangePassword.uiElements.txtConfirmPassword).val('');


};


//Ajax functions
//--------------

//Submit
User_ChangePassword.CustomMethods.Submit = function (oldPass, newPass) {

    //var submittedData = {};
    //submittedData.OldPass = oldPass;
    //submittedData.NewPass = newPass;
    //var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = User_ChangePassword.ServiceUrl + '/Submit';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = User_ChangePassword.CustomMethods.Callback.Submit_Success;
    requestOptions.ErrorCallback = User_ChangePassword.CustomMethods.Callback.Submit_Error;
    requestOptions.CompletedCallback = User_ChangePassword.CustomMethods.Callback.Submit_Completed;

    requestOptions.RequestHeaderAdd = [{ hkey: 'oldpassword', hvalue: oldPass }, { hkey: 'newpassword', hvalue: newPass }];

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);

};


//Callback functions
//------------------

//Submit
User_ChangePassword.CustomMethods.Callback.Submit_Success = function (jsonObj) {

    $("#" + User_ChangePassword.uiElements.btnSubmit).show();

    if (jsonObj == "WrongPassword") {
        $("#" + User_ChangePassword.uiElements.txtOldPassword).focus();
        Takaful.CommonMethods.ShowInfoMsg("كلمة المرور الحالية غير صحيحة.", null, 0, "error");
        return;
    }

    User_ChangePassword.CustomMethods.LocalOperations.ResetUI();
    Takaful.CommonMethods.ShowInfoMsg("تم تغيير كلمة المرور الخاصة بك.", null, 0, "success");



};

User_ChangePassword.CustomMethods.Callback.Submit_Error = function (xhr, status, errorThrown) {

    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);

    $("#" + User_ChangePassword.uiElements.btnSubmit).show();

    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../User/Login.html");
    } else {
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    }


};

User_ChangePassword.CustomMethods.Callback.Submit_Completed = function (xhr, status) {


};




