
if (typeof Employee_FinancialTransactionsManagement === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_FinancialTransactionsManagement = {};
}

//Add the event handlers container object to the main namespace
Employee_FinancialTransactionsManagement.CustomMethods = {};

//Add the event handlers container object to the main namespace
Employee_FinancialTransactionsManagement.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Employee_FinancialTransactionsManagement.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtEmployeeNumber).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.lstEmployees).empty();
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtDepartment).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtPosition).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtSubscriptionAmount).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTotalSubscription).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLoanAmount).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtInstallmentAmount).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtPaidLoanAmount).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtRemainingLoanAmount).val('');


    $('#' + Employee_FinancialTransactionsManagement.uiElements.rdoCredit).prop('checked', false);
    $('#' + Employee_FinancialTransactionsManagement.uiElements.rdoDebit).prop('checked', false);
    $('#' + Employee_FinancialTransactionsManagement.uiElements.rdoSubscription).prop('checked', false);
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Subscription).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Subscription).attr('disabled', 'disabled');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionDate_Subscription).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionAmount_Subscription).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionType_Subscription).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.rdoLoan).prop('checked', false);
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Loan).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Loan).attr('disabled', 'disabled');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionDate_Loan).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionAmount_Loan).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionType_Loan).val('');



};


//Ajax functions
//--------------

//Get initial data
Employee_FinancialTransactionsManagement.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_FinancialTransactionsManagement.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Employee_FinancialTransactionsManagement.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Employee_FinancialTransactionsManagement.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Employee_FinancialTransactionsManagement.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save data
Employee_FinancialTransactionsManagement.CustomMethods.AjaxCall.SaveData = function (empID, type, category, amount) {

    var submittedData = {};
    submittedData.EmpID = empID;
    submittedData.Type = type;
    submittedData.Category = category;
    submittedData.Amount = amount;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_FinancialTransactionsManagement.ServiceUrl + '/SaveData';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Employee_FinancialTransactionsManagement.CustomMethods.Callback.SaveData_Success;
    requestOptions.ErrorCallback = Employee_FinancialTransactionsManagement.CustomMethods.Callback.SaveData_Error;
    requestOptions.CompletedCallback = Employee_FinancialTransactionsManagement.CustomMethods.Callback.SaveData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};


Employee_FinancialTransactionsManagement.CustomMethods.AjaxCall.GetEmployeeData = function (empID) {

    //var submittedData = {};
    //submittedData.EmpID = empID;
    //var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_FinancialTransactionsManagement.ServiceUrl + '/EmployeeData?empID=' + empID;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj;
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Employee_FinancialTransactionsManagement.CustomMethods.Callback.GetEmployeeData_Success;
    requestOptions.ErrorCallback = Employee_FinancialTransactionsManagement.CustomMethods.Callback.GetEmployeeData_Error;
    requestOptions.CompletedCallback = Employee_FinancialTransactionsManagement.CustomMethods.Callback.GetEmployeeData_Completed;

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
Employee_FinancialTransactionsManagement.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Employee_FinancialTransactionsManagement.Employees = jsonObj;

    //Fill the employees dropdown list
    var empList = "";
    for (var i = 0; i < jsonObj.length; i++) {
        var id = jsonObj[i].EmployeeNumber;
        var name = jsonObj[i].Name;
        empList += '<option value="' + id + '">' + id + " / " + name + '</option>';
    }

    if (empList != '') {
        $('#' + Employee_FinancialTransactionsManagement.uiElements.lstEmployees).html(empList);
        $('#' + Employee_FinancialTransactionsManagement.uiElements.lstEmployees).val('');
    }

    //Check if supplied employee id in query string
    if (Employee_FinancialTransactionsManagement.EmployeeID > 0) {
        $("#" + Employee_FinancialTransactionsManagement.uiElements.txtEmployeeNumber).val(Employee_FinancialTransactionsManagement.EmployeeID);
        Employee_FinancialTransactionsManagement.EventHandlers.btnSearch_onclick();
        Employee_FinancialTransactionsManagement.EmployeeID = 0;
    }

    Employee_FinancialTransactionsManagement.InitialDataReady = true;

};

Employee_FinancialTransactionsManagement.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Employee_FinancialTransactionsManagement.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save data
Employee_FinancialTransactionsManagement.CustomMethods.Callback.SaveData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    //Hide loading screen
    Takaful.CommonMethods.HideLoading();

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, null, "success");
        //Wait 3 seconds for the message then, refresh the page
        setTimeout(function () {
            location.replace("FinancialTransactionsManagement.html?empID=" + Employee_FinancialTransactionsManagement.EmployeeID);
            //location.reload();
        }, 3000);
    } else {
        var msg = "";
        switch (jsonObj) {
            case "NotValidData":
                msg = "البيانات التى تم إدخالها غير صحيحة.";
                break;
            case "EmployeeNotFound":
                msg = "الموظف غير مسجل.";
                break;
            case "NotValidSubscription":
                msg = "الموظف غير مشترك.";
                break;
            case "NotValidLoan":
                msg = "لا يوجد قرض فعال لهذا الموظف.";
                break;
            case "DuplicatedTransaction":
                msg = "لا يمكن تسجيل اجرائين من نفس النوع فى نفس اليوم.";
                break;
        }
        Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
        $('#' + Employee_FinancialTransactionsManagement.uiElements.btnSave).show();
    }



};

Employee_FinancialTransactionsManagement.CustomMethods.Callback.SaveData_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    //Hide loading screen
    Takaful.CommonMethods.HideLoading();

    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../User/Login.html");
    } else {
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    }

    $('#' + Employee_FinancialTransactionsManagement.uiElements.btnSave).show();



};

Employee_FinancialTransactionsManagement.CustomMethods.Callback.SaveData_Completed = function (xhr, status) {

};

// Get Employee Daata


Employee_FinancialTransactionsManagement.CustomMethods.Callback.GetEmployeeData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }
    var employee  = jsonObj[0];
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtDepartment).val(employee.Department);
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtPosition).val(employee.Position);
    if (employee.CurrentSubscriptionAmount != null) {
        $('#' + Employee_FinancialTransactionsManagement.uiElements.txtSubscriptionAmount).val(employee.CurrentSubscriptionAmount);
    }
    if (employee.TotalSubscriptionAmount != null) {
        $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTotalSubscription).val(employee.TotalSubscriptionAmount);
    }

    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLoanAmount).val(employee.LoanAmount);
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtInstallmentAmount).val(employee.LoanInstallmentAmount);
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtPaidLoanAmount).val(employee.PaidLoanAmount);
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtRemainingLoanAmount).val(employee.RemainingLoanAmount);

    //Last recorded subscription transaction
    if (employee.LastSubscriptionTransaction != null) {
        $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionDate_Subscription).val(Takaful.CommonMethods.GetFormattedDate(employee.LastSubscriptionTransaction.Date));
        $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionAmount_Subscription).val(employee.LastSubscriptionTransaction.Amount);
        $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionType_Subscription).val(employee.LastSubscriptionTransaction.Type);
    }

    //Last recorded loan installment transaction
    if (employee.LastLoanTransaction != null) {
        $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionDate_Loan).val(Takaful.CommonMethods.GetFormattedDate(employee.LastLoanTransaction.Date));
        $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionAmount_Loan).val(employee.LastLoanTransaction.Amount);
        $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionType_Loan).val(employee.LastLoanTransaction.Type);
    }
};

Employee_FinancialTransactionsManagement.CustomMethods.Callback.GetEmployeeData_Error = function (xhr, status, errorThrown) {
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

Employee_FinancialTransactionsManagement.CustomMethods.Callback.GetEmployeeData_Completed = function (xhr, status) {

};





