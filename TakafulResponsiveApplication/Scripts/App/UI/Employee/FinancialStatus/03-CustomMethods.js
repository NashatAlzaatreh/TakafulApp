
if (typeof Employee_FinancialStatus === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_FinancialStatus = {};
}

//Add the event handlers container object to the main namespace
Employee_FinancialStatus.CustomMethods = {};

//Add the event handlers container object to the main namespace
Employee_FinancialStatus.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Employee_FinancialStatus.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Employee_FinancialStatus.uiElements.txtEmployeeNumber).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtName).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtDepartment).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtPosition).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtJoinDate).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtSalary).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtSubscriptionAmount).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtTotalSubscription).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtLoanAmount).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtInstallmentAmount).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtPaidLoanAmount).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtRemainingLoanAmount).val('');


};


//Ajax functions
//--------------

//Get initial data
Employee_FinancialStatus.CustomMethods.AjaxCall.GetData = function (empID) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_FinancialStatus.ServiceUrl + '/GetData?empID=' + empID;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Employee_FinancialStatus.CustomMethods.Callback.GetData_Success;
    requestOptions.ErrorCallback = Employee_FinancialStatus.CustomMethods.Callback.GetData_Error;
    requestOptions.CompletedCallback = Employee_FinancialStatus.CustomMethods.Callback.GetData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};


//Callback functions
//------------------

//Get data
Employee_FinancialStatus.CustomMethods.Callback.GetData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj.EmployeeNumber == 0) {
        Takaful.CommonMethods.ShowInfoMsg("هذا الرقم الوظيفى غير مسجل.", null, 2, "info");
        return;
    }

    //$('#' + Employee_FinancialStatus.uiElements.txtEmployeeNumber).val(jsonObj.EmployeeNumber);
    $('#' + Employee_FinancialStatus.uiElements.txtName).val(jsonObj.Name);
    $('#' + Employee_FinancialStatus.uiElements.txtDepartment).val(jsonObj.Department);
    $('#' + Employee_FinancialStatus.uiElements.txtPosition).val(jsonObj.Position);
    $('#' + Employee_FinancialStatus.uiElements.txtJoinDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.JoinDate));
    $('#' + Employee_FinancialStatus.uiElements.txtSalary).val(jsonObj.Salary);

    if (jsonObj.CurrentSubscriptionAmount != null) {
        $('#' + Employee_FinancialStatus.uiElements.txtSubscriptionAmount).val(jsonObj.CurrentSubscriptionAmount);

        if (jsonObj.TotalSubscriptionAmount != null) {
            $('#' + Employee_FinancialStatus.uiElements.txtTotalSubscription).val(jsonObj.TotalSubscriptionAmount);
        }

        $('#' + Employee_FinancialStatus.uiElements.txtLoanAmount).val(jsonObj.LoanAmount);
        $('#' + Employee_FinancialStatus.uiElements.txtInstallmentAmount).val(jsonObj.LoanInstallmentAmount);
        $('#' + Employee_FinancialStatus.uiElements.txtPaidLoanAmount).val(jsonObj.PaidLoanAmount);
        $('#' + Employee_FinancialStatus.uiElements.txtRemainingLoanAmount).val(jsonObj.RemainingLoanAmount);
        $('#' + Employee_FinancialStatus.uiElements.txtZakahAmount).val(jsonObj.ZakahAmount);
    }




};

Employee_FinancialStatus.CustomMethods.Callback.GetData_Error = function (xhr, status, errorThrown) {
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

Employee_FinancialStatus.CustomMethods.Callback.GetData_Completed = function (xhr, status) {

};







