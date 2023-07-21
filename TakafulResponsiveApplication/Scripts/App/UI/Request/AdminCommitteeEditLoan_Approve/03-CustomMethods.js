
if (typeof Request_AdminCommitteeEditLoan_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_AdminCommitteeEditLoan_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_AdminCommitteeEditLoan_Approve.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_AdminCommitteeEditLoan_Approve.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_AdminCommitteeEditLoan_Approve.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtEmployeeNumber).val('');
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtName).val('');
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtDepartment).val('');
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtPosition).val('');
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtJoinDate).val('');
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtSalary).val('');
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtInstallmentAmount).val('');
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtNewInstallmentAmount).val('');
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtLoanAmount).val('');
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtPaidLoanAmount).val('');
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtRemainingLoanAmount).val('');


};


//Ajax functions
//--------------

//Get initial data
Request_AdminCommitteeEditLoan_Approve.CustomMethods.AjaxCall.GetInitialData = function (empID, year, serial) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_AdminCommitteeEditLoan_Approve.ServiceUrl + '/InitialData?empID=' + empID.toString() + '&year=' + year.toString() + '&serial=' + serial.toString();
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_AdminCommitteeEditLoan_Approve.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_AdminCommitteeEditLoan_Approve.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_AdminCommitteeEditLoan_Approve.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Approve, transfer or reject the request
Request_AdminCommitteeEditLoan_Approve.CustomMethods.AjaxCall.TakeAction = function (empID, year, serial, memberID, action) {

    Request_AdminCommitteeEditLoan_Approve.IsTakingAction = true;

    var submittedData = {};
    submittedData.EmpID = empID;
    submittedData.Year = year;
    submittedData.Serial = serial;
    submittedData.MemberID = memberID;
    submittedData.Action = action;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_AdminCommitteeEditLoan_Approve.ServiceUrl + '/TakeAction';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Request_AdminCommitteeEditLoan_Approve.CustomMethods.Callback.TakeAction_Success;
    requestOptions.ErrorCallback = Request_AdminCommitteeEditLoan_Approve.CustomMethods.Callback.TakeAction_Error;
    requestOptions.CompletedCallback = Request_AdminCommitteeEditLoan_Approve.CustomMethods.Callback.TakeAction_Completed;

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
Request_AdminCommitteeEditLoan_Approve.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {

        return;
    }

    Request_AdminCommitteeEditLoan_Approve.InitialData = jsonObj;

    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtEmployeeNumber).val(jsonObj.EmployeeNumber);
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtName).val(jsonObj.Name);
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtDepartment).val(jsonObj.Department);
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtPosition).val(jsonObj.Position);
    if (jsonObj.JoinDate != null) {
        $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtJoinDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.JoinDate));
    }

    if (jsonObj.Salary != null) {
        $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtSalary).val(jsonObj.Salary);
    }

    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtInstallmentAmount).val(jsonObj.CurrentInstallmentAmount);
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtNewInstallmentAmount).val(jsonObj.NewInstallmentAmount);
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtLoanAmount).val(jsonObj.LoanAmount);
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtPaidLoanAmount).val(jsonObj.PaidLoanAmount);
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.txtRemainingLoanAmount).val(jsonObj.RemainingLoanAmount);


    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.btnApprove).show();
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.btnReject).show();
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.btnExit).show();

    Request_AdminCommitteeEditLoan_Approve.InitialDataReady = true;

};

Request_AdminCommitteeEditLoan_Approve.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_AdminCommitteeEditLoan_Approve.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Approve, transfer or reject the request
Request_AdminCommitteeEditLoan_Approve.CustomMethods.Callback.TakeAction_Success = function (jsonObj) {

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

    Takaful.CommonMethods.ShowInfoMsg("تم حفظ القرار.", null, 3, "success");


    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.btnApprove).hide();
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.btnExit).hide();
    $('#' + Request_AdminCommitteeEditLoan_Approve.uiElements.btnReject).hide();

    //Wait 2 seconds then, Go to the next request
    setTimeout(function () {
        window.history.back();
    }, 3000);






};

Request_AdminCommitteeEditLoan_Approve.CustomMethods.Callback.TakeAction_Error = function (xhr, status, errorThrown) {
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

    Request_AdminCommitteeEditLoan_Approve.IsTakingAction = false;


};

Request_AdminCommitteeEditLoan_Approve.CustomMethods.Callback.TakeAction_Completed = function (xhr, status) {

};




