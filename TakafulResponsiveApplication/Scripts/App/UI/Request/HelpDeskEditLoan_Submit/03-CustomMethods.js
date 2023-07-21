﻿
if (typeof Request_HelpDeskEditLoan_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_HelpDeskEditLoan_Submit = {};
}

//Add the event handlers container object to the main namespace
Request_HelpDeskEditLoan_Submit.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_HelpDeskEditLoan_Submit.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_HelpDeskEditLoan_Submit.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.txtEmployeeNumber).val('');
    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.txtName).val('');
    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.txtDate).val('');
    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.txtDepartment).val('');
    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.txtPosition).val('');
    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.txtCurrentAmount).val('');
    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.txtRequiredAmount).val('0');
    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.txtNotes).val('');

    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.btnSubmit).hide();

};


//Ajax functions
//--------------

//Get initial data
Request_HelpDeskEditLoan_Submit.CustomMethods.AjaxCall.GetInitialData = function (employeeNumber) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_HelpDeskEditLoan_Submit.ServiceUrl + '/InitialData?employeeNumber=' + employeeNumber;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_HelpDeskEditLoan_Submit.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_HelpDeskEditLoan_Submit.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_HelpDeskEditLoan_Submit.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Submit request
Request_HelpDeskEditLoan_Submit.CustomMethods.AjaxCall.Submit = function (employeeNumber, amount, notes) {

    var subscriptionData = {};
    subscriptionData.EmployeeNumber = employeeNumber;
    subscriptionData.Amount = amount;
    subscriptionData.Notes = notes;
    var obj = JSON.stringify(subscriptionData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_HelpDeskEditLoan_Submit.ServiceUrl + '/Submit';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Request_HelpDeskEditLoan_Submit.CustomMethods.Callback.Submit_Success;
    requestOptions.ErrorCallback = Request_HelpDeskEditLoan_Submit.CustomMethods.Callback.Submit_Error;
    requestOptions.CompletedCallback = Request_HelpDeskEditLoan_Submit.CustomMethods.Callback.Submit_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};


//Callback functions
//------------------

//Get initial data
Request_HelpDeskEditLoan_Submit.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) { //No valid loan exists for this user
        //Hide loading screen
        Takaful.CommonMethods.HideLoading();
        $("#" + Request_HelpDeskEditLoan_Submit.uiElements.btnSubmit).hide();
        Takaful.CommonMethods.ShowInfoMsg("يجب تقديم طلب قرض أولاً والموافقة علية حتى يتسنى لك التعديل.", null, 3, "error");
        return;
    }

    Request_HelpDeskEditLoan_Submit.InitialData = jsonObj;

    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.txtEmployeeNumber).val(jsonObj.EmployeeNumber);
    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.txtName).val(jsonObj.Name);
    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.Date));
    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.txtDepartment).val(jsonObj.Department);
    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.txtPosition).val(jsonObj.Position);
    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.txtCurrentAmount).val(jsonObj.CurrentInstallmentAmount);

    Request_HelpDeskEditLoan_Submit.EmployeeNumber = jsonObj.EmployeeNumber;
    $('#' + Request_HelpDeskEditLoan_Submit.uiElements.btnSubmit).show();

    Request_HelpDeskEditLoan_Submit.InitialDataReady = true;

};

Request_HelpDeskEditLoan_Submit.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_HelpDeskEditLoan_Submit.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Submit
Request_HelpDeskEditLoan_Submit.CustomMethods.Callback.Submit_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("طلبك الآن قيد المراجعة", null, 0, "success");
    } else {
        var msg = "";
        switch (jsonObj) {
            case "EmployeeNotFound":
                msg = "هذا الرقم الوظيفى غير مسجل على النظام ، يرجى مراجعة إدارة صندوق التكافل.";
                break;
            case "NoValidSubscription":
                msg = "ليس لديك بيانات اشتراك مسجلة.";
                break;
            case "SubscriptionCancellationSubmitted":
                msg = "لايمكن تقديم هذا الطلب حيث أنك قمت بتقديم طلب انسحاب من الصندوق.";
                break;
            case "AlreadySubmittedRequest":
                msg = "طلبك السابق لازال قيد المراجعة";
                break;
            case "MaxInstallmentViolation":
                msg = "الحد الأقصى لقيمة القسط هو: " + Request_HelpDeskEditLoan_Submit.InitialData.MaximumLoanInstallmentAmount;
                break;
            case "MinInstallmentViolation":
                msg = "الحد الأدنى لقيمة القسط هو: " + Request_HelpDeskEditLoan_Submit.InitialData.MinimumLoanInstallmentAmount;
                break;

            default:

                break;
        }
        Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
    }


};

Request_HelpDeskEditLoan_Submit.CustomMethods.Callback.Submit_Error = function (xhr, status, errorThrown) {
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
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام طلبك الأن.", null, 0, "error");
    }




};

Request_HelpDeskEditLoan_Submit.CustomMethods.Callback.Submit_Completed = function (xhr, status) {

};








