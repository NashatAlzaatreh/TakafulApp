﻿
if (typeof Request_CommitteeEditSubscription_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeEditSubscription_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeEditSubscription_Approve.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_CommitteeEditSubscription_Approve.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_CommitteeEditSubscription_Approve.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtEmployeeNumber).val('');
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtName).val('');
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtDepartment).val('');
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtPosition).val('');
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtJoinDate).val('');
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtSalary).val('');
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtSubscriptionAmount).val('');
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtNewSubscriptionAmount).val('');
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtTotalSubscription).val('');


};


//Ajax functions
//--------------

//Get initial data
Request_CommitteeEditSubscription_Approve.CustomMethods.AjaxCall.GetInitialData = function (empID, year, serial) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CommitteeEditSubscription_Approve.ServiceUrl + '/InitialData?empID=' + empID.toString() + '&year=' + year.toString() + '&serial=' + serial.toString();
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Approve, transfer or reject the request
Request_CommitteeEditSubscription_Approve.CustomMethods.AjaxCall.TakeAction = function (empID, year, serial, action) {

    Request_CommitteeEditSubscription_Approve.IsTakingAction = true;

    var submittedData = {};
    submittedData.EmpID = empID;
    submittedData.Year = year;
    submittedData.Serial = serial;
    submittedData.Action = action;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CommitteeEditSubscription_Approve.ServiceUrl + '/TakeAction';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.TakeAction_Success;
    requestOptions.ErrorCallback = Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.TakeAction_Error;
    requestOptions.CompletedCallback = Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.TakeAction_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Navigate (Next or Previous)
Request_CommitteeEditSubscription_Approve.CustomMethods.AjaxCall.Navigate = function (empID, year, serial, direction) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CommitteeEditSubscription_Approve.ServiceUrl + '/Navigate?empID=' + empID.toString() + '&year=' + year.toString() + '&serial=' + serial.toString() + "&direction=" + direction + "&type=2";
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.Navigate_Success;
    requestOptions.ErrorCallback = Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.Navigate_Error;
    requestOptions.CompletedCallback = Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.Navigate_Completed;

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
Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj || jsonObj.NewSubscriptionAmount == null) {

        return;
    }

    Request_CommitteeEditSubscription_Approve.InitialData = jsonObj;

    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtEmployeeNumber).val(jsonObj.EmployeeNumber);
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtName).val(jsonObj.Name);
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtDepartment).val(jsonObj.Department);
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtPosition).val(jsonObj.Position);
    if (jsonObj.JoinDate != null) {
        $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtJoinDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.JoinDate));
    }

    if (jsonObj.Salary != null) {
        $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtSalary).val(jsonObj.Salary);
    }

    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtSubscriptionAmount).val(jsonObj.CurrentSubscriptionAmount);
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtNewSubscriptionAmount).val(jsonObj.NewSubscriptionAmount);
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtTotalSubscription).val(jsonObj.TotalSubscriptionAmount);
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.txtUserNotes).val(jsonObj.UserNotes);

    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.btnApprove).show();
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.btnReject).show();
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.btnExit).show();

    Request_CommitteeEditSubscription_Approve.InitialDataReady = true;

};

Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Approve, transfer or reject the request
Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.TakeAction_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }


    if (jsonObj == "NotFound") {
        Takaful.CommonMethods.ShowInfoMsg("لايمكن إتمام طلبك الأن.", null, 0, "error");
        return;
    }

    var msg = "";

    //switch (jsonObj) {
    //    case "Approved":
    //        msg = "تم اعتماد الطلب";
    //        break;
    //    case "Rejected":
    //        msg = "تم رفض الطلب";
    //        break;
    //}

    Takaful.CommonMethods.ShowInfoMsg("تم حفظ القرار.", null, 3, "success");


    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.btnApprove).hide();
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.btnExit).hide();
    $('#' + Request_CommitteeEditSubscription_Approve.uiElements.btnReject).hide();

    //Wait 2 seconds then, Go to the next request
    setTimeout(function () {
        Request_CommitteeEditSubscription_Approve.CustomMethods.AjaxCall.Navigate(Request_CommitteeEditSubscription_Approve.EmpID, Request_CommitteeEditSubscription_Approve.Year, Request_CommitteeEditSubscription_Approve.Serial, 1);
    }, 2000);


};

Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.TakeAction_Error = function (xhr, status, errorThrown) {
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

    Request_CommitteeEditSubscription_Approve.IsTakingAction = false;


};

Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.TakeAction_Completed = function (xhr, status) {

};

//Navigate
Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.Navigate_Success = function (jsonObj) {

    if (!jsonObj) {
        if (Request_CommitteeEditSubscription_Approve.IsTakingAction == false) {
            Takaful.CommonMethods.ShowInfoMsg("لا توجد طلبات أخرى.", null, null, null);
        } else {
            window.history.back();
        }
        return;
    }

    var pageName = '';

    switch (jsonObj.Type) {
        case 1:
            pageName = 'CommitteeNewSubscription_Approve.html';
            break;
        case 2:
            pageName = 'CommitteeEditSubscription_Approve.html';
            break;
        case 3:
            pageName = 'CommitteeCancelSubscription_Approve.html';
            break;
        case 4:
            pageName = 'CommitteeNewLoan_Approve.html';
            break;
        case 5:
            pageName = 'CommitteeEditLoan_Approve.html';
            break;
        case 6:
            pageName = 'CommitteeCancelLoan_Approve.html';
            break;
    }


    location.replace(pageName + "?empID=" + jsonObj.EmpID.toString() + "&year=" + jsonObj.Year.toString() + "&serial=" + jsonObj.Serial.toString());


};

Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.Navigate_Error = function (xhr, status, errorThrown) {
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

    Request_CommitteeEditSubscription_Approve.IsTakingAction = false;


};

Request_CommitteeEditSubscription_Approve.CustomMethods.Callback.Navigate_Completed = function (xhr, status) {

};

