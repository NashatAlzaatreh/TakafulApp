
if (typeof Request_NewLoan_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_NewLoan_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_NewLoan_Approve.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_NewLoan_Approve.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_NewLoan_Approve.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Request_NewLoan_Approve.uiElements.txtEmployeeNumber).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtName).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtDepartment).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtPosition).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtJoinDate).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtSalary).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtRequestedLoanAmount).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtSuggestedLoanAmount).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtLoanPayment).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtPreviousLoanAmount).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtTotalLoanAmount).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtSubscriptionAmount).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtTotalPaidAmount).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtMaxDeductedAmount).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtTotalSubscriptionAmount).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtEndServiceBenefitsAmount).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtSubscriptionsAndBenefitsAmount).val('');
    $('#' + Request_NewLoan_Approve.uiElements.txtNotes).val('');


};


//Ajax functions
//--------------

//Get initial data
Request_NewLoan_Approve.CustomMethods.AjaxCall.GetInitialData = function (empID, year, serial) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_NewLoan_Approve.ServiceUrl + '/InitialData?empID=' + empID.toString() + '&year=' + year.toString() + '&serial=' + serial.toString();
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_NewLoan_Approve.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_NewLoan_Approve.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_NewLoan_Approve.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Navigate (Next or Previous)
Request_NewLoan_Approve.CustomMethods.AjaxCall.Navigate = function (empID, year, serial, direction) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_NewLoan_Approve.ServiceUrl + '/Navigate?empID=' + empID.toString() + '&year=' + year.toString() + '&serial=' + serial.toString() + "&direction=" + direction;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_NewLoan_Approve.CustomMethods.Callback.Navigate_Success;
    requestOptions.ErrorCallback = Request_NewLoan_Approve.CustomMethods.Callback.Navigate_Error;
    requestOptions.CompletedCallback = Request_NewLoan_Approve.CustomMethods.Callback.Navigate_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Approve, transfer or reject the request
Request_NewLoan_Approve.CustomMethods.AjaxCall.TakeAction = function (empID, year, serial, suggestedLoanAmount, notes, action) {

    Request_NewLoan_Approve.IsTakingAction = true;

    var submittedData = {};
    submittedData.EmpID = empID;
    submittedData.Year = year;
    submittedData.Serial = serial;
    submittedData.SuggestedLoanAmount = suggestedLoanAmount;
    submittedData.Notes = notes;
    submittedData.Action = action;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_NewLoan_Approve.ServiceUrl + '/TakeAction';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Request_NewLoan_Approve.CustomMethods.Callback.TakeAction_Success;
    requestOptions.ErrorCallback = Request_NewLoan_Approve.CustomMethods.Callback.TakeAction_Error;
    requestOptions.CompletedCallback = Request_NewLoan_Approve.CustomMethods.Callback.TakeAction_Completed;

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
Request_NewLoan_Approve.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {

        return;
    }

    Request_NewLoan_Approve.InitialData = jsonObj;

    $('#' + Request_NewLoan_Approve.uiElements.txtApplicant).val(jsonObj.Applicant);
    $('#' + Request_NewLoan_Approve.uiElements.txtEmployeeNumber).val(jsonObj.EmployeeNumber);
    $('#' + Request_NewLoan_Approve.uiElements.txtName).val(jsonObj.Name);
    $('#' + Request_NewLoan_Approve.uiElements.txtDepartment).val(jsonObj.Department);
    $('#' + Request_NewLoan_Approve.uiElements.txtPosition).val(jsonObj.Position);
    if (jsonObj.JoinDate != null) {
        $('#' + Request_NewLoan_Approve.uiElements.txtJoinDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.JoinDate));
    }

    if (jsonObj.Salary != null) {
        $('#' + Request_NewLoan_Approve.uiElements.txtSalary).val(jsonObj.Salary);
    }

    $('#' + Request_NewLoan_Approve.uiElements.txtRequestedLoanAmount).val(jsonObj.RequestedLoanAmount);
    $('#' + Request_NewLoan_Approve.uiElements.txtPreviousLoanAmount).val(jsonObj.PreviousLoanAmount);
    $('#' + Request_NewLoan_Approve.uiElements.txtTotalLoanAmount).val(jsonObj.TotalLoanAmount);

    if (jsonObj.SuggestedLoanAmount > 0) {
        $('#' + Request_NewLoan_Approve.uiElements.txtSuggestedLoanAmount).val(jsonObj.SuggestedLoanAmount);
        Request_NewLoan_Approve.EventHandlers.btnCalculate_onclick();
    }

    $('#' + Request_NewLoan_Approve.uiElements.txtSubscriptionAmount).val(jsonObj.CurrentSubscriptionAmount);
    $('#' + Request_NewLoan_Approve.uiElements.txtTotalSubscriptionAmount).val(jsonObj.TotalSubscriptionAmount);
    $('#' + Request_NewLoan_Approve.uiElements.txtTotalPaidAmount).val(jsonObj.TotalDeductedAmount);
    $('#' + Request_NewLoan_Approve.uiElements.txtMaxDeductedAmount).val(jsonObj.MaxDeductedAmount);
    $('#' + Request_NewLoan_Approve.uiElements.txtEndServiceBenefitsAmount).val(jsonObj.EndServiceBenefitAmount);
    $('#' + Request_NewLoan_Approve.uiElements.txtSubscriptionsAndBenefitsAmount).val(jsonObj.EndServiceBenefitAmountAndTotalSubscription);
    $('#' + Request_NewLoan_Approve.uiElements.txtUserNotes).val(jsonObj.UserNotes);

    //If already transferred to committee
    if (jsonObj.IsTransferredToCommittee == true) {
        $('#' + Request_NewLoan_Approve.uiElements.btnTransfer).hide();
    } else {
        $('#' + Request_NewLoan_Approve.uiElements.btnTransfer).show();
    }

    $('#' + Request_NewLoan_Approve.uiElements.btnApprove).show();
    $('#' + Request_NewLoan_Approve.uiElements.btnReject).show();

    Request_NewLoan_Approve.InitialDataReady = true;

};

Request_NewLoan_Approve.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_NewLoan_Approve.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Navigate
Request_NewLoan_Approve.CustomMethods.Callback.Navigate_Success = function (jsonObj) {

    if (!jsonObj) {
        if (Request_NewLoan_Approve.IsTakingAction == false) {
            Takaful.CommonMethods.ShowInfoMsg("لا توجد طلبات أخرى.", null, null, null);
        } else {
            window.history.back();
        }
        return;
    }


    location.replace("NewLoan_Approve.html?empID=" + jsonObj.EmpID.toString() + "&year=" + jsonObj.Year.toString() + "&serial=" + jsonObj.Serial.toString());


};

Request_NewLoan_Approve.CustomMethods.Callback.Navigate_Error = function (xhr, status, errorThrown) {
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

    Request_NewLoan_Approve.IsTakingAction = false;


};

Request_NewLoan_Approve.CustomMethods.Callback.Navigate_Completed = function (xhr, status) {

};

//Approve, transfer or reject the request
Request_NewLoan_Approve.CustomMethods.Callback.TakeAction_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }


    if (jsonObj == "NotFound") {
        Takaful.CommonMethods.ShowInfoMsg("لايمكن إتمام طلبك الأن.", null, 0, "error");
        return;
    } else if (jsonObj == "SuggestedAmountViolation") {
        $("#" + Request_NewLoan_Approve.uiElements.txtSuggestedLoanAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("الحد الأقصى لمبلغ القرض المقترح هو: " + Request_NewLoan_Approve.InitialData.TotalLoanAmount, null, 0, "error");
        return;
    }

    if (jsonObj.includes("MaxAllowedDeduction_")) {
        var amount = jsonObj.substring(20);
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن ان يزيد قسط القرض عن: " + amount, null, 3, "error");
        return;
    }

    var msg = "";

    switch (jsonObj) {
        case "Approved_Email_SMS":
            msg = "تم ارسال بريد الكترونى ورسالة نصية بعد اعتماد طلب القرض";
            break;
        case "Approved_Email":
            msg = "تم ارسال بريد الكترونى بعد اعتماد طلب القرض";
            break;
        case "Approved":
            msg = "تم اعتماد الطلب";
            break;
        case "Transferred":
            msg = "تم ارسال نسخة من الطلب إلى اللجنة";
            break;
        case "Rejected_Email_SMS":
            msg = "تم ارسال بريد الكترونى ورسالة نصية للإبلاغ برفض طلب القرض";
            break;
        case "Rejected_Email":
            msg = "تم ارسال بريد الكترونى للإبلاغ برفض طلب القرض";
            break;
        case "Rejected":
            msg = "تم رفض الطلب";
            break;
    }

    Takaful.CommonMethods.ShowInfoMsg(msg, null, 3, "success");


    $('#' + Request_NewLoan_Approve.uiElements.btnApprove).hide();
    $('#' + Request_NewLoan_Approve.uiElements.btnTransfer).hide();
    $('#' + Request_NewLoan_Approve.uiElements.btnReject).hide();

    //Wait 2 seconds then, Go to the next request
    setTimeout(function () {
        Request_NewLoan_Approve.CustomMethods.AjaxCall.Navigate(Request_NewLoan_Approve.EmpID, Request_NewLoan_Approve.Year, Request_NewLoan_Approve.Serial, 1);
    }, 3000);






};

Request_NewLoan_Approve.CustomMethods.Callback.TakeAction_Error = function (xhr, status, errorThrown) {
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

    Request_NewLoan_Approve.IsTakingAction = false;


};

Request_NewLoan_Approve.CustomMethods.Callback.TakeAction_Completed = function (xhr, status) {

};




