
if (typeof Employee_UpdatePaidSubscriptions === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_UpdatePaidSubscriptions = {};
}

//Add the event handlers container object to the main namespace
Employee_UpdatePaidSubscriptions.CustomMethods = {};

//Add the event handlers container object to the main namespace
Employee_UpdatePaidSubscriptions.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Employee_UpdatePaidSubscriptions.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Employee_UpdatePaidSubscriptions.uiElements.txtEmployeeNumber).val('');
    $('#' + Employee_UpdatePaidSubscriptions.uiElements.txtDate).val('');
    $('#' + Employee_UpdatePaidSubscriptions.uiElements.chkEmployees).prop('checked', false);
    $('#' + Employee_UpdatePaidSubscriptions.uiElements.tblEmployees).empty();


};

//Populate the employees UI table with the array data
Employee_UpdatePaidSubscriptions.CustomMethods.LocalOperations.PopulateEmployeesTable = function () {

    var htmlData = '';

    if (Employee_UpdatePaidSubscriptions.Employees.length > 0) {
        for (var i = 0; i < Employee_UpdatePaidSubscriptions.Employees.length; i++) {
            var isSelected = '';

            if (Employee_UpdatePaidSubscriptions.Employees[i].IsSelected == true) {
                isSelected = 'checked=checked';
            }

            htmlData += '<tr>' +
                '<td>' + Employee_UpdatePaidSubscriptions.Employees[i].EmployeeNumber + '</td>' +
                '<td class="hide-for-small">' + Employee_UpdatePaidSubscriptions.Employees[i].Name + '</td>' +
                '<td>' + Takaful.CommonMethods.GetFormattedDate(Employee_UpdatePaidSubscriptions.Employees[i].LastTransactionDate) + '</td>' +
                '<td class="hide-for-small">' + Employee_UpdatePaidSubscriptions.Employees[i].TotalSubscriptionAmount + '</td>' +
                '<td class="hide-for-small">' + Employee_UpdatePaidSubscriptions.Employees[i].CurrentSubscriptionAmount + '</td>' +
                '<td><input id="txt_' + i.toString() + '" type="number" onchange="Employee_UpdatePaidSubscriptions.EventHandlers.txtAmount_onchange(' + i.toString() + ')" value="' + Employee_UpdatePaidSubscriptions.Employees[i].CurrentPaidAmount + '" /></td>' +
                '<td class="text-center"><input id="chk_' + i.toString() + '" type="checkbox" onchange="Employee_UpdatePaidSubscriptions.EventHandlers.chkApprove_onchange(' + i.toString() + ')" ' + isSelected + ' /></td>' +
                '</tr>';
        }
    } else {
        htmlData = '<tr>' +
        '<td class="text-center" colspan="7">لايوجد بيانات</td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '</tr>';
    }

    Takaful.CommonMethods.TerminateDataTable('mainTable');  //Terminate table object

    $('#' + Employee_UpdatePaidSubscriptions.uiElements.tblEmployees).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Validate the amount
Employee_UpdatePaidSubscriptions.CustomMethods.LocalOperations.IsValidAmount = function (amount) {

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
Employee_UpdatePaidSubscriptions.CustomMethods.LocalOperations.BuildJsonCollection = function () {

    var dataCollection = [];
    var tDate = Takaful.CommonMethods.GetFormattedDate($('#' + Employee_UpdatePaidSubscriptions.uiElements.txtDate).val());

    for (var i = 0; i < Employee_UpdatePaidSubscriptions.Employees.length; i++) {
        if (Employee_UpdatePaidSubscriptions.Employees[i].IsSelected == true) {
            if (Employee_UpdatePaidSubscriptions.CustomMethods.LocalOperations.IsValidAmount(Employee_UpdatePaidSubscriptions.Employees[i].CurrentPaidAmount) == true) {  //If amount a valid amount
                var temp = {};
                temp.EmployeeNumber = Employee_UpdatePaidSubscriptions.Employees[i].EmployeeNumber;
                temp.Amount = Employee_UpdatePaidSubscriptions.Employees[i].CurrentPaidAmount;
                temp.TransactionDate = tDate;
                dataCollection.push(temp);
            }
        }
    }

    return JSON.stringify(dataCollection);

};

//Check if employee exists
Employee_UpdatePaidSubscriptions.CustomMethods.LocalOperations.IsEmployeeExists = function (empID) {

    for (var i = 0; i < Employee_UpdatePaidSubscriptions.Employees.length; i++) {
        if (Employee_UpdatePaidSubscriptions.Employees[i].EmployeeNumber == empID) {
            return true;
        }
    }

    return false;

};

//Prepare data for export
Employee_UpdatePaidSubscriptions.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];

    //Add header
    dataArr.push([
        "الرقم الوظيفى",
        "الاسم",
        "تاريخ اخر احتساب",
        "رصيد الاشتراك",
        "قيمة الاشتراك",
        "المبلغ المسدد"
    ]);

    if (Employee_UpdatePaidSubscriptions.Employees.length > 0) {
        for (var i = 0; i < Employee_UpdatePaidSubscriptions.Employees.length; i++) {
            var arrElement = [
                Employee_UpdatePaidSubscriptions.Employees[i].EmployeeNumber,
                Employee_UpdatePaidSubscriptions.Employees[i].Name,
                Takaful.CommonMethods.GetFormattedDate(Employee_UpdatePaidSubscriptions.Employees[i].LastTransactionDate),
                Employee_UpdatePaidSubscriptions.Employees[i].TotalSubscriptionAmount,
                Employee_UpdatePaidSubscriptions.Employees[i].CurrentSubscriptionAmount,
                Employee_UpdatePaidSubscriptions.Employees[i].CurrentPaidAmount
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
Employee_UpdatePaidSubscriptions.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_UpdatePaidSubscriptions.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Employee_UpdatePaidSubscriptions.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Employee_UpdatePaidSubscriptions.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Employee_UpdatePaidSubscriptions.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save
Employee_UpdatePaidSubscriptions.CustomMethods.AjaxCall.Save = function () {

    var data = Employee_UpdatePaidSubscriptions.CustomMethods.LocalOperations.BuildJsonCollection();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_UpdatePaidSubscriptions.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = data;
    requestOptions.SuccessCallback = Employee_UpdatePaidSubscriptions.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = Employee_UpdatePaidSubscriptions.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = Employee_UpdatePaidSubscriptions.CustomMethods.Callback.Save_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
Employee_UpdatePaidSubscriptions.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = Employee_UpdatePaidSubscriptions.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_UpdatePaidSubscriptions.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = Employee_UpdatePaidSubscriptions.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = Employee_UpdatePaidSubscriptions.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = Employee_UpdatePaidSubscriptions.CustomMethods.Callback.ExportData_Completed;

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
Employee_UpdatePaidSubscriptions.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.Employees) {
        return;
    }

    Employee_UpdatePaidSubscriptions.Employees = jsonObj.Employees;

    //Fill the employees table
    Employee_UpdatePaidSubscriptions.CustomMethods.LocalOperations.PopulateEmployeesTable();

    if (jsonObj.Employees.length > 0) {
        $('#' + Employee_UpdatePaidSubscriptions.uiElements.btnSave).show();
    }


    Employee_UpdatePaidSubscriptions.InitialDataReady = true;

};

Employee_UpdatePaidSubscriptions.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Employee_UpdatePaidSubscriptions.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save
Employee_UpdatePaidSubscriptions.CustomMethods.Callback.Save_Success = function (jsonObj) {

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

Employee_UpdatePaidSubscriptions.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {
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

Employee_UpdatePaidSubscriptions.CustomMethods.Callback.Save_Completed = function (xhr, status) {

};

//Export data
Employee_UpdatePaidSubscriptions.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.URL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + Employee_UpdatePaidSubscriptions.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Employee_UpdatePaidSubscriptions.uiElements.btnExport).show();

    }, 5000);


};

Employee_UpdatePaidSubscriptions.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

Employee_UpdatePaidSubscriptions.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};


