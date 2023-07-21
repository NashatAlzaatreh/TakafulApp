
if (typeof User_RestorePassword === 'undefined') {
    // Namespace does not exist, create a new one
    var User_RestorePassword = {};
}

//Add the event handlers container object to the main namespace
User_RestorePassword.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
User_RestorePassword.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + User_RestorePassword.uiElements.txtEmployeeNumber).val('');
    $("#" + User_RestorePassword.uiElements.txtEmployeeNumber).focus();
    $('#' + User_RestorePassword.uiElements.txtEmail).val('');


};


//Ajax functions
//--------------

//Send
User_RestorePassword.CustomMethods.Send = function (empNumber, email) {

    var submittedData = {};
    submittedData.EmpNumber = empNumber;
    submittedData.Email = email;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = User_RestorePassword.ServiceUrl + '/Send';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = User_RestorePassword.CustomMethods.Callback.Send_Success;
    requestOptions.ErrorCallback = User_RestorePassword.CustomMethods.Callback.Send_Error;
    requestOptions.CompletedCallback = User_RestorePassword.CustomMethods.Callback.Send_Completed;

    //requestOptions.RequestHeaderAdd = [{ hkey: 'userpassword', hvalue: password }];

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);

};


//Callback functions
//------------------

//Send
User_RestorePassword.CustomMethods.Callback.Send_Success = function (jsonObj) {

    if (jsonObj=="NotFound") {
        Takaful.CommonMethods.ShowInfoMsg("من فضلك تأكد من الرقم الوظيفى والبريد الإلكترونى.", null, null, "error");
        return;
    }

    User_RestorePassword.CustomMethods.LocalOperations.ResetUI();
    Takaful.CommonMethods.ShowInfoMsg("تم إرسال كلمة السر إلى البريد الإلكترونى الخاص بك.", null, 0, "success");



};

User_RestorePassword.CustomMethods.Callback.Send_Error = function (xhr, status, errorThrown) {

    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);


    if (xhr.responseText == "NotFound") {
        
    } else {
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_Error, null, null, "error");
    }


};

User_RestorePassword.CustomMethods.Callback.Send_Completed = function (xhr, status) {


};




