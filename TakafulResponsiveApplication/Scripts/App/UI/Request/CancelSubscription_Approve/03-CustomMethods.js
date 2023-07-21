
if (typeof Request_CancelSubscription_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CancelSubscription_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_CancelSubscription_Approve.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_CancelSubscription_Approve.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_CancelSubscription_Approve.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Request_CancelSubscription_Approve.uiElements.txtEmployeeNumber).val('');
    $('#' + Request_CancelSubscription_Approve.uiElements.txtName).val('');
    $('#' + Request_CancelSubscription_Approve.uiElements.txtDepartment).val('');
    $('#' + Request_CancelSubscription_Approve.uiElements.txtPosition).val('');
    $('#' + Request_CancelSubscription_Approve.uiElements.txtJoinDate).val('');
    $('#' + Request_CancelSubscription_Approve.uiElements.txtSalary).val('');
    $('#' + Request_CancelSubscription_Approve.uiElements.txtSubscriptionAmount).val('');
    $('#' + Request_CancelSubscription_Approve.uiElements.txtTotalSubscription).val('');
    $('#' + Request_CancelSubscription_Approve.uiElements.txtLoanAmount).val('');
    $('#' + Request_CancelSubscription_Approve.uiElements.txtPaidLoanAmount).val('');
    $('#' + Request_CancelSubscription_Approve.uiElements.txtRemainingLoanAmount).val('');
    $('#' + Request_CancelSubscription_Approve.uiElements.txtNotes).val('');


};


//Ajax functions
//--------------

//Get initial data
Request_CancelSubscription_Approve.CustomMethods.AjaxCall.GetInitialData = function (empID, year, serial) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CancelSubscription_Approve.ServiceUrl + '/InitialData?empID=' + empID.toString() + '&year=' + year.toString() + '&serial=' + serial.toString();
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_CancelSubscription_Approve.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_CancelSubscription_Approve.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_CancelSubscription_Approve.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Navigate (Next or Previous)
Request_CancelSubscription_Approve.CustomMethods.AjaxCall.Navigate = function (empID, year, serial, direction) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CancelSubscription_Approve.ServiceUrl + '/Navigate?empID=' + empID.toString() + '&year=' + year.toString() + '&serial=' + serial.toString() + "&direction=" + direction;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_CancelSubscription_Approve.CustomMethods.Callback.Navigate_Success;
    requestOptions.ErrorCallback = Request_CancelSubscription_Approve.CustomMethods.Callback.Navigate_Error;
    requestOptions.CompletedCallback = Request_CancelSubscription_Approve.CustomMethods.Callback.Navigate_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Approve, transfer or reject the request
Request_CancelSubscription_Approve.CustomMethods.AjaxCall.TakeAction = function (empID, year, serial, notes, action) {

    Request_CancelSubscription_Approve.IsTakingAction = true;

    var submittedData = {};
    submittedData.EmpID = empID;
    submittedData.Year = year;
    submittedData.Serial = serial;
    submittedData.Notes = notes;
    submittedData.Action = action;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CancelSubscription_Approve.ServiceUrl + '/TakeAction';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Request_CancelSubscription_Approve.CustomMethods.Callback.TakeAction_Success;
    requestOptions.ErrorCallback = Request_CancelSubscription_Approve.CustomMethods.Callback.TakeAction_Error;
    requestOptions.CompletedCallback = Request_CancelSubscription_Approve.CustomMethods.Callback.TakeAction_Completed;

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
Request_CancelSubscription_Approve.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {

        return;
    }

    Request_CancelSubscription_Approve.InitialData = jsonObj;

    $('#' + Request_CancelSubscription_Approve.uiElements.txtApplicant).val(jsonObj.Applicant);
    $('#' + Request_CancelSubscription_Approve.uiElements.txtEmployeeNumber).val(jsonObj.EmployeeNumber);
    $('#' + Request_CancelSubscription_Approve.uiElements.txtName).val(jsonObj.Name);
    $('#' + Request_CancelSubscription_Approve.uiElements.txtDepartment).val(jsonObj.Department);
    $('#' + Request_CancelSubscription_Approve.uiElements.txtPosition).val(jsonObj.Position);
    if (jsonObj.JoinDate != null) {
        $('#' + Request_CancelSubscription_Approve.uiElements.txtJoinDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.JoinDate));
    }

    if (jsonObj.Salary != null) {
        $('#' + Request_CancelSubscription_Approve.uiElements.txtSalary).val(jsonObj.Salary);
    }

    $('#' + Request_CancelSubscription_Approve.uiElements.txtSubscriptionAmount).val(jsonObj.CurrentSubscriptionAmount);
    $('#' + Request_CancelSubscription_Approve.uiElements.txtTotalSubscription).val(jsonObj.TotalSubscriptionAmount);
    $('#' + Request_CancelSubscription_Approve.uiElements.txtLoanAmount).val(jsonObj.LoanAmount);
    $('#' + Request_CancelSubscription_Approve.uiElements.txtPaidLoanAmount).val(jsonObj.PaidLoanAmount);
    $('#' + Request_CancelSubscription_Approve.uiElements.txtRemainingLoanAmount).val(jsonObj.RemainingLoanAmount);
    $('#' + Request_CancelSubscription_Approve.uiElements.txtUserNotes).val(jsonObj.UserNotes);

    //If already transferred to committee
    if (jsonObj.IsTransferredToCommittee == true) {
        $('#' + Request_CancelSubscription_Approve.uiElements.btnTransfer).hide();
    } else {
        $('#' + Request_CancelSubscription_Approve.uiElements.btnTransfer).show();
    }

    $('#' + Request_CancelSubscription_Approve.uiElements.btnApprove).show();
    $('#' + Request_CancelSubscription_Approve.uiElements.btnReject).show();

    Request_CancelSubscription_Approve.InitialDataReady = true;

};

Request_CancelSubscription_Approve.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_CancelSubscription_Approve.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Approve, transfer or reject the request
Request_CancelSubscription_Approve.CustomMethods.Callback.TakeAction_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }


    if (jsonObj == "NotFound") {
        Takaful.CommonMethods.ShowInfoMsg("لايمكن إتمام طلبك الأن.", null, 0, "error");
        return;
    }

    var msg = "";

    switch (jsonObj) {
        case "Approved_Email_SMS":
            msg = "تم ارسال بريد الكترونى ورسالة نصية بعد اعتماد طلب الانسحاب من الصندوق";
            break;
        case "Approved_Email":
            msg = "تم ارسال بريد الكترونى بعد اعتماد طلب الانسحاب من الصندوق";
            break;
        case "Approved":
            msg = "تم اعتماد الطلب";
            break;
        case "Transferred":
            msg = "تم ارسال نسخة من الطلب إلى اللجنة";
            break;
        case "Rejected_Email_SMS":
            msg = "تم ارسال بريد الكترونى ورسالة نصية للإبلاغ برفض طلب الانسحاب من الصندوق";
            break;
        case "Rejected_Email":
            msg = "تم ارسال بريد الكترونى للإبلاغ برفض طلب الانسحاب من الصندوق";
            break;
        case "Rejected":
            msg = "تم رفض الطلب";
            break;
    }

    Takaful.CommonMethods.ShowInfoMsg(msg, null, 3, "success");


    $('#' + Request_CancelSubscription_Approve.uiElements.btnApprove).hide();
    $('#' + Request_CancelSubscription_Approve.uiElements.btnTransfer).hide();
    $('#' + Request_CancelSubscription_Approve.uiElements.btnReject).hide();

    //Wait 2 seconds then, Go to the next request
    setTimeout(function () {
        Request_CancelSubscription_Approve.CustomMethods.AjaxCall.Navigate(Request_CancelSubscription_Approve.EmpID, Request_CancelSubscription_Approve.Year, Request_CancelSubscription_Approve.Serial, 1);
    }, 3000);






};

Request_CancelSubscription_Approve.CustomMethods.Callback.TakeAction_Error = function (xhr, status, errorThrown) {
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

    Request_CancelSubscription_Approve.IsTakingAction = false;


};

Request_CancelSubscription_Approve.CustomMethods.Callback.TakeAction_Completed = function (xhr, status) {

};

//Navigate
Request_CancelSubscription_Approve.CustomMethods.Callback.Navigate_Success = function (jsonObj) {

    if (!jsonObj) {
        if (Request_CancelSubscription_Approve.IsTakingAction == false) {
            Takaful.CommonMethods.ShowInfoMsg("لا توجد طلبات أخرى.", null, null, null);
        } else {
            window.history.back();
        }
        return;
    }


    location.replace("CancelSubscription_Approve.html?empID=" + jsonObj.EmpID.toString() + "&year=" + jsonObj.Year.toString() + "&serial=" + jsonObj.Serial.toString());


};

Request_CancelSubscription_Approve.CustomMethods.Callback.Navigate_Error = function (xhr, status, errorThrown) {
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

    Request_CancelSubscription_Approve.IsTakingAction = false;


};

Request_CancelSubscription_Approve.CustomMethods.Callback.Navigate_Completed = function (xhr, status) {

};






