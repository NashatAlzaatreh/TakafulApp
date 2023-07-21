﻿
if (typeof Request_NewSubscription_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_NewSubscription_Submit = {};
}

//Add the event handlers container object to the main namespace
Request_NewSubscription_Submit.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_NewSubscription_Submit.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_NewSubscription_Submit.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Request_NewSubscription_Submit.uiElements.txtEmployeeNumber).val('');
    $('#' + Request_NewSubscription_Submit.uiElements.txtName).val('');
    $('#' + Request_NewSubscription_Submit.uiElements.txtDate).val('');
    $('#' + Request_NewSubscription_Submit.uiElements.txtDepartment).val('');
    $('#' + Request_NewSubscription_Submit.uiElements.txtPosition).val('');
    $('#' + Request_NewSubscription_Submit.uiElements.txtCalculatedAmount).val('');
    $('#' + Request_NewSubscription_Submit.uiElements.txtRequiredAmount).val('0');
    $('#' + Request_NewSubscription_Submit.uiElements.txtNotes).val('');


};


//Ajax functions
//--------------

//Get initial data
Request_NewSubscription_Submit.CustomMethods.AjaxCall.GetInitialData = function (empID) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_NewSubscription_Submit.ServiceUrl + '/InitialData?empID=' + empID;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_NewSubscription_Submit.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_NewSubscription_Submit.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_NewSubscription_Submit.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Submit request
Request_NewSubscription_Submit.CustomMethods.AjaxCall.Submit = function (empID, amount, notes) {

    var subscriptionData = {};
    subscriptionData.EmpID = empID;
    subscriptionData.Amount = amount;
    subscriptionData.Notes = notes;
    var obj = JSON.stringify(subscriptionData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_NewSubscription_Submit.ServiceUrl + '/Submit';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Request_NewSubscription_Submit.CustomMethods.Callback.Submit_Success;
    requestOptions.ErrorCallback = Request_NewSubscription_Submit.CustomMethods.Callback.Submit_Error;
    requestOptions.CompletedCallback = Request_NewSubscription_Submit.CustomMethods.Callback.Submit_Completed;

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
Request_NewSubscription_Submit.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Request_NewSubscription_Submit.InitialData = jsonObj;

    $('#' + Request_NewSubscription_Submit.uiElements.txtEmployeeNumber).val(jsonObj.EmployeeNumber);
    $('#' + Request_NewSubscription_Submit.uiElements.txtName).val(jsonObj.Name);
    $('#' + Request_NewSubscription_Submit.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.Date));
    $('#' + Request_NewSubscription_Submit.uiElements.txtDepartment).val(jsonObj.Department);
    $('#' + Request_NewSubscription_Submit.uiElements.txtPosition).val(jsonObj.Position);
    if (jsonObj.SubscriptionBoundaries != null) {
        $('#' + Request_NewSubscription_Submit.uiElements.txtCalculatedAmount).val(jsonObj.SubscriptionBoundaries.MinimumAmount);
    }


    Request_NewSubscription_Submit.InitialDataReady = true;

};

Request_NewSubscription_Submit.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_NewSubscription_Submit.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Get initial data
Request_NewSubscription_Submit.CustomMethods.Callback.Submit_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("طلبك الآن قيد المراجعة ... سيتم ارسال بريد الكترونى ورسالة نصية الى الهاتف الخاص بك بحالة الطلب", null, 0, "success");
    } else {
        var msg = "";
        switch (jsonObj) {
            case "EmployeeNotFound":
                msg = "هذا الرقم الوظيفى غير مسجل على النظام ، يرجى مراجعة إدارة صندوق التكافل.";
                break;
            case "AlreadyRegistered":
                msg = "أنت بالفعل مشترك بالصندوق، يرجى الدخول بإستخدام رقمك الوظيفى وكلمة المرور لتتمتع بخدمات الصندوق.";
                break;
            case "NoEmail":
                msg = "يرجى مراجعة إدارة صندوق التكافل لعدم توافر بريد الكترونى يمكنك من إستكمال خطوات التسجيل.";
                break;
            case "AmountIsOutsideBoundaries":
                msg = "قيمة الاشتراك يجب أن لا تقل عن : " + Request_NewSubscription_Submit.InitialData.SubscriptionBoundaries.MinimumAmount + " ، ولا تزيد عن : " + Request_NewSubscription_Submit.InitialData.SubscriptionBoundaries.MaximumAmount + ".";
                break;
            case "AlreadySubmittedRequest":
                msg = "طلبك السابق لازال قيد المراجعة";
                break;
            default:

                break;
        }
        Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
    }


};

Request_NewSubscription_Submit.CustomMethods.Callback.Submit_Error = function (xhr, status, errorThrown) {
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

Request_NewSubscription_Submit.CustomMethods.Callback.Submit_Completed = function (xhr, status) {

};








