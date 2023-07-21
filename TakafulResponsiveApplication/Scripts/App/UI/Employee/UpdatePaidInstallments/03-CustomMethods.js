
if (typeof Employee_UpdatePaidInstallments === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_UpdatePaidInstallments = {};
}

//Add the event handlers container object to the main namespace
Employee_UpdatePaidInstallments.CustomMethods = {};

//Add the event handlers container object to the main namespace
Employee_UpdatePaidInstallments.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Employee_UpdatePaidInstallments.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Employee_UpdatePaidInstallments.uiElements.txtEmployeeNumber).val('');
    $('#' + Employee_UpdatePaidInstallments.uiElements.txtDate).val('');
    $('#' + Employee_UpdatePaidInstallments.uiElements.chkEmployees).prop('checked', false);
    $('#' + Employee_UpdatePaidInstallments.uiElements.tblEmployees).empty();


};

//Populate the employees UI table with the array data
Employee_UpdatePaidInstallments.CustomMethods.LocalOperations.PopulateEmployeesTable = function () {

    var htmlData = '';

    if (Employee_UpdatePaidInstallments.Employees.length > 0) {
        for (var i = 0; i < Employee_UpdatePaidInstallments.Employees.length; i++) {
            var isSelected = '';

            if (Employee_UpdatePaidInstallments.Employees[i].IsSelected == true) {
                isSelected = 'checked=checked';
            }

            htmlData += '<tr>' +
                '<td>' + Employee_UpdatePaidInstallments.Employees[i].EmployeeNumber + '</td>' +
                '<td class="hide-for-small">' + Employee_UpdatePaidInstallments.Employees[i].Name + '</td>' +
                '<td>' + Takaful.CommonMethods.GetFormattedDate(Employee_UpdatePaidInstallments.Employees[i].LastTransactionDate) + '</td>' +
                '<td class="hide-for-small">' + Employee_UpdatePaidInstallments.Employees[i].LoanAmount + '</td>' +
                '<td class="hide-for-small">' + Employee_UpdatePaidInstallments.Employees[i].PaidLoanAmount + '</td>' +
                '<td class="hide-for-small">' + Employee_UpdatePaidInstallments.Employees[i].RemainingLoanAmount + '</td>' +
                '<td class="hide-for-small">' + Employee_UpdatePaidInstallments.Employees[i].LoanInstallmentAmount + '</td>' +
                '<td><input id="txt_' + i.toString() + '" type="number" onchange="Employee_UpdatePaidInstallments.EventHandlers.txtAmount_onchange(' + i.toString() + ')" value="' + Employee_UpdatePaidInstallments.Employees[i].CurrentPaidAmount + '" /></td>' +
                '<td class="text-center"><input id="chk_' + i.toString() + '" type="checkbox" onchange="Employee_UpdatePaidInstallments.EventHandlers.chkApprove_onchange(' + i.toString() + ')" ' + isSelected + ' /></td>' +
                '</tr>';
        }
    } else {
        htmlData = '<tr>' +
        '<td class="text-center" colspan="9">لايوجد بيانات</td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '</tr>';
    }

    Takaful.CommonMethods.TerminateDataTable('mainTable');  //Terminate table object

    $('#' + Employee_UpdatePaidInstallments.uiElements.tblEmployees).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Validate the amount
Employee_UpdatePaidInstallments.CustomMethods.LocalOperations.IsValidAmount = function (amount) {

    //var amount = $("#txt_" + index.toString()).val();

    if (isNaN(amount) || amount == '') {
        amount = 0;
    }

    amount *= 1;

    if (amount == 0) {
        return false;
    }

    return true;

};

//Build the json collection to be saved
Employee_UpdatePaidInstallments.CustomMethods.LocalOperations.BuildJsonCollection = function () {

    var dataCollection = [];
    var tDate = Takaful.CommonMethods.GetFormattedDate($('#' + Employee_UpdatePaidInstallments.uiElements.txtDate).val());

    for (var i = 0; i < Employee_UpdatePaidInstallments.Employees.length; i++) {
        if (Employee_UpdatePaidInstallments.Employees[i].IsSelected == true) {
            if (Employee_UpdatePaidInstallments.CustomMethods.LocalOperations.IsValidAmount(Employee_UpdatePaidInstallments.Employees[i].CurrentPaidAmount) == true) {  //If amount a valid amount
                var temp = {};
                temp.EmployeeNumber = Employee_UpdatePaidInstallments.Employees[i].EmployeeNumber;
                temp.Amount = Employee_UpdatePaidInstallments.Employees[i].CurrentPaidAmount;
                temp.TransactionDate = tDate;
                dataCollection.push(temp);
            }
        }
    }

    return JSON.stringify(dataCollection);

};

//Check if employee exists
Employee_UpdatePaidInstallments.CustomMethods.LocalOperations.IsEmployeeExists = function (empID) {

    for (var i = 0; i < Employee_UpdatePaidInstallments.Employees.length; i++) {
        if (Employee_UpdatePaidInstallments.Employees[i].EmployeeNumber == empID) {
            return true;
        }
    }

    return false;

};

//Prepare data for export
Employee_UpdatePaidInstallments.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];

    //Add header
    dataArr.push([
        "الرقم الوظيفى",
        "الاسم",
        "تاريخ اخر احتساب",
        "مبلغ القرض",
        "اجمالي المسدد",
        "المتبقي",
        "قيمة القسط",
        "المبلغ المسدد"
    ]);

    if (Employee_UpdatePaidInstallments.Employees.length > 0) {
        for (var i = 0; i < Employee_UpdatePaidInstallments.Employees.length; i++) {
            var arrElement = [
                Employee_UpdatePaidInstallments.Employees[i].EmployeeNumber,
                Employee_UpdatePaidInstallments.Employees[i].Name,
                Takaful.CommonMethods.GetFormattedDate(Employee_UpdatePaidInstallments.Employees[i].LastTransactionDate),
                Employee_UpdatePaidInstallments.Employees[i].LoanAmount,
                Employee_UpdatePaidInstallments.Employees[i].PaidLoanAmount,
                Employee_UpdatePaidInstallments.Employees[i].RemainingLoanAmount,
                Employee_UpdatePaidInstallments.Employees[i].LoanInstallmentAmount,
            Employee_UpdatePaidInstallments.Employees[i].CurrentPaidAmount
            ];

            dataArr.push(arrElement);
        }
    }

    var jObj = JSON.stringify(dataArr);


    return jObj;
};


//Ajax functions
//--------------

//Get initial data
Employee_UpdatePaidInstallments.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_UpdatePaidInstallments.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Employee_UpdatePaidInstallments.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Employee_UpdatePaidInstallments.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Employee_UpdatePaidInstallments.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save
Employee_UpdatePaidInstallments.CustomMethods.AjaxCall.Save = function () {

    var data = Employee_UpdatePaidInstallments.CustomMethods.LocalOperations.BuildJsonCollection();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_UpdatePaidInstallments.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = data;
    requestOptions.SuccessCallback = Employee_UpdatePaidInstallments.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = Employee_UpdatePaidInstallments.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = Employee_UpdatePaidInstallments.CustomMethods.Callback.Save_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
Employee_UpdatePaidInstallments.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = Employee_UpdatePaidInstallments.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_UpdatePaidInstallments.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = Employee_UpdatePaidInstallments.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = Employee_UpdatePaidInstallments.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = Employee_UpdatePaidInstallments.CustomMethods.Callback.ExportData_Completed;

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
Employee_UpdatePaidInstallments.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.Employees) {
        return;
    }

    Employee_UpdatePaidInstallments.Employees = jsonObj.Employees;

    //Fill the employees table
    Employee_UpdatePaidInstallments.CustomMethods.LocalOperations.PopulateEmployeesTable();

    if (jsonObj.Employees.length > 0) {
        $('#' + Employee_UpdatePaidInstallments.uiElements.btnSave).show();
    }


    Employee_UpdatePaidInstallments.InitialDataReady = true;

};

Employee_UpdatePaidInstallments.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Employee_UpdatePaidInstallments.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save
Employee_UpdatePaidInstallments.CustomMethods.Callback.Save_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    //Hide loading
    Takaful.CommonMethods.HideLoading();

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, 0, "success");
        setTimeout(function () {
            window.history.back();
        }, 5000);
        return;
    } else {
        if (jsonObj == "NotValid") {
            Takaful.CommonMethods.ShowInfoMsg("البيانات غير سليمة ولا تحقق الشروط المطلوبة.", null, 0, "error");
            return;
        }
    }


};

Employee_UpdatePaidInstallments.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    //Hide loading
    Takaful.CommonMethods.HideLoading();

    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../User/Login.html");
    } else {
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام طلبك الأن.", null, 0, "error");
    }




};

Employee_UpdatePaidInstallments.CustomMethods.Callback.Save_Completed = function (xhr, status) {

};

//Export data
Employee_UpdatePaidInstallments.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.URL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + Employee_UpdatePaidInstallments.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Employee_UpdatePaidInstallments.uiElements.btnExport).show();

    }, 5000);


};

Employee_UpdatePaidInstallments.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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
    } else if (xhr.responseText == "NoDataToExport") {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, 0, "error");
    } else {
        Takaful.CommonMethods.ShowInfoMsg("لايمكن إتمام طلبك الأن.", null, 0, "error");
    }




};

Employee_UpdatePaidInstallments.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};


