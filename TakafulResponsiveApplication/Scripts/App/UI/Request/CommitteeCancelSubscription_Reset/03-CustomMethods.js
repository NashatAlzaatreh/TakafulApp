﻿
if (typeof Request_CommitteeCancelSubscription_Reset === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeCancelSubscription_Reset = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeCancelSubscription_Reset.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_CommitteeCancelSubscription_Reset.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_CommitteeCancelSubscription_Reset.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtEmployeeNumber).val('');
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtName).val('');
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtDepartment).val('');
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtPosition).val('');
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtJoinDate).val('');
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtSalary).val('');
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtSubscriptionAmount).val('');
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtTotalSubscription).val('');
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtLoanAmount).val('');
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtPaidLoanAmount).val('');
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtRemainingLoanAmount).val('');


};


//Ajax functions
//--------------

//Get initial data
Request_CommitteeCancelSubscription_Reset.CustomMethods.AjaxCall.GetInitialData = function (empID, year, serial) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CommitteeCancelSubscription_Reset.ServiceUrl + '/InitialData?empID=' + empID.toString() + '&year=' + year.toString() + '&serial=' + serial.toString();
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_CommitteeCancelSubscription_Reset.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_CommitteeCancelSubscription_Reset.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_CommitteeCancelSubscription_Reset.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Approve, transfer or reject the request
Request_CommitteeCancelSubscription_Reset.CustomMethods.AjaxCall.Reset = function (empID, year, serial) {

    Request_CommitteeCancelSubscription_Reset.IsTakingAction = true;

    var submittedData = {};
    submittedData.EmpID = empID;
    submittedData.Year = year;
    submittedData.Serial = serial;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CommitteeCancelSubscription_Reset.ServiceUrl + '/Reset';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Request_CommitteeCancelSubscription_Reset.CustomMethods.Callback.Reset_Success;
    requestOptions.ErrorCallback = Request_CommitteeCancelSubscription_Reset.CustomMethods.Callback.Reset_Error;
    requestOptions.CompletedCallback = Request_CommitteeCancelSubscription_Reset.CustomMethods.Callback.Reset_Completed;

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
Request_CommitteeCancelSubscription_Reset.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {

        return;
    }

    Request_CommitteeCancelSubscription_Reset.InitialData = jsonObj;

    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtEmployeeNumber).val(jsonObj.EmployeeNumber);
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtName).val(jsonObj.Name);
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtDepartment).val(jsonObj.Department);
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtPosition).val(jsonObj.Position);
    if (jsonObj.JoinDate != null) {
        $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtJoinDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.JoinDate));
    }

    if (jsonObj.Salary != null) {
        $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtSalary).val(jsonObj.Salary);
    }

    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtSubscriptionAmount).val(jsonObj.CurrentSubscriptionAmount);
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtTotalSubscription).val(jsonObj.TotalSubscriptionAmount);
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtLoanAmount).val(jsonObj.LoanAmount);
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtPaidLoanAmount).val(jsonObj.PaidLoanAmount);
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtRemainingLoanAmount).val(jsonObj.RemainingLoanAmount);
    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.txtUserNotes).val(jsonObj.UserNotes);

    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.btnReset).show();


    Request_CommitteeCancelSubscription_Reset.InitialDataReady = true;

};

Request_CommitteeCancelSubscription_Reset.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_CommitteeCancelSubscription_Reset.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Reset
Request_CommitteeCancelSubscription_Reset.CustomMethods.Callback.Reset_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }


    if (jsonObj == "NotFound") {
        Takaful.CommonMethods.ShowInfoMsg("لايمكن إتمام طلبك الأن.", null, 0, "error");
        return;
    }

    //var msg = "";

    //switch (jsonObj) {
    //    case "Approved":
    //        msg = "تم اعتماد الطلب";
    //        break;
    //    case "Rejected":
    //        msg = "تم رفض الطلب";
    //        break;
    //}

    Takaful.CommonMethods.ShowInfoMsg("تم إرجاع الطلب لحالته الأولى.", null, 3, "success");


    $('#' + Request_CommitteeCancelSubscription_Reset.uiElements.btnReset).hide();


    //Wait 2 seconds then, Go to the next request
    setTimeout(function () {
        window.history.back();
    }, 3000);






};

Request_CommitteeCancelSubscription_Reset.CustomMethods.Callback.Reset_Error = function (xhr, status, errorThrown) {
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

    //Request_CommitteeCancelSubscription_Reset.IsTakingAction = false;


};

Request_CommitteeCancelSubscription_Reset.CustomMethods.Callback.Reset_Completed = function (xhr, status) {

};






