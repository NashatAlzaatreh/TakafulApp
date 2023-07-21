
if (typeof Employee_UpdateSubscription === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_UpdateSubscription = {};
}

//Add the event handlers container object to the main namespace
Employee_UpdateSubscription.CustomMethods = {};

//Add the event handlers container object to the main namespace
Employee_UpdateSubscription.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Employee_UpdateSubscription.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Employee_UpdateSubscription.uiElements.chkEmployees).prop('checked', false);
    $('#' + Employee_UpdateSubscription.uiElements.tblEmployees).empty();


};

//Populate the employees UI table with the array data
Employee_UpdateSubscription.CustomMethods.LocalOperations.PopulateEmployeesTable = function () {

    var htmlData = '';

    if (Employee_UpdateSubscription.Employees.length > 0) {
        for (var i = 0; i < Employee_UpdateSubscription.Employees.length; i++) {
            var isError = '', isSelected = '';
            if (Employee_UpdateSubscription.Employees[i].CurrentSubscription < Employee_UpdateSubscription.Employees[i].MinimumSubscription || Employee_UpdateSubscription.Employees[i].CurrentSubscription > Employee_UpdateSubscription.Employees[i].MaximumSubscription) {
                isError = 'style="color: red; font-weight: bold;"';
                Employee_UpdateSubscription.Employees[i].IsSelected = true;
            }
            if (Employee_UpdateSubscription.Employees[i].IsSelected == true) {
                isSelected = 'checked=checked';
            }

            htmlData += '<tr>' +
                '<td>' + Employee_UpdateSubscription.Employees[i].EmployeeNumber + '</td>' +
                '<td class="hide-for-small">' + Employee_UpdateSubscription.Employees[i].Name + '</td>' +
                '<td class="hide-for-small">' + Employee_UpdateSubscription.Employees[i].PreviousSalary + '</td>' +
                '<td class="hide-for-small">' + Employee_UpdateSubscription.Employees[i].CurrentSalary + '</td>' +
                '<td ' + isError + ' >' + Employee_UpdateSubscription.Employees[i].CurrentSubscription + '</td>' +
                '<td><input id="txt_' + i.toString() + '" type="number" onchange="Employee_UpdateSubscription.EventHandlers.txtSubscription_onchange(' + i.toString() + ')" min="' + Employee_UpdateSubscription.Employees[i].MinimumSubscription + '" max="' + Employee_UpdateSubscription.Employees[i].MaximumSubscription + '" value="' + Employee_UpdateSubscription.Employees[i].CalculatedSubscription + '" /></td>' +
                '<td class="hide-for-small">' + Employee_UpdateSubscription.Employees[i].MinimumSubscription + ' - ' + Employee_UpdateSubscription.Employees[i].MaximumSubscription + '</td>' +
                '<td class="text-center"><input id="chk_' + i.toString() + '" type="checkbox" onchange="Employee_UpdateSubscription.EventHandlers.chkApprove_onchange(' + i.toString() + ')" ' + isSelected + ' /></td>' +
                '</tr>';
        }
    } else {
        htmlData = '<tr>' +
        '<td class="text-center" colspan="8">لايوجد بيانات</td>' +
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

    $('#' + Employee_UpdateSubscription.uiElements.tblEmployees).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Build the json collection to be saved
Employee_UpdateSubscription.CustomMethods.LocalOperations.BuildJsonCollection = function () {

    var dataCollection = [];

    for (var i = 0; i < Employee_UpdateSubscription.Employees.length; i++) {
        if (Employee_UpdateSubscription.Employees[i].IsSelected == true) {
            if (Employee_UpdateSubscription.Employees[i].CalculatedSubscription != Employee_UpdateSubscription.Employees[i].CurrentSubscription) {  //If amount has been changed
                var temp = {};
                temp.EmployeeNumber = Employee_UpdateSubscription.Employees[i].EmployeeNumber;
                temp.CalculatedSubscription = Employee_UpdateSubscription.Employees[i].CalculatedSubscription;
                dataCollection.push(temp);
            }
        }
    }

    return JSON.stringify(dataCollection);

};

//Prepare data for export
Employee_UpdateSubscription.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];

    //Add header
    dataArr.push([
        "الرقم الوظيفى",
        "الاسم",
        "الراتب السابق",
        "الراتب الحالى",
        "الاشتراك الحالى",
        "الاشتراك المحتسب",
        "حد الاشتراك"
    ]);

    if (Employee_UpdateSubscription.Employees.length > 0) {
        for (var i = 0; i < Employee_UpdateSubscription.Employees.length; i++) {
            var arrElement = [
                Employee_UpdateSubscription.Employees[i].EmployeeNumber,
                Employee_UpdateSubscription.Employees[i].Name,
                Employee_UpdateSubscription.Employees[i].PreviousSalary,
                Employee_UpdateSubscription.Employees[i].CurrentSalary,
                Employee_UpdateSubscription.Employees[i].CurrentSubscription,
                Employee_UpdateSubscription.Employees[i].CalculatedSubscription,
                Employee_UpdateSubscription.Employees[i].MinimumSubscription + ' - ' + Employee_UpdateSubscription.Employees[i].MaximumSubscription
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
Employee_UpdateSubscription.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_UpdateSubscription.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Employee_UpdateSubscription.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Employee_UpdateSubscription.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Employee_UpdateSubscription.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save
Employee_UpdateSubscription.CustomMethods.AjaxCall.Save = function () {

    var data = Employee_UpdateSubscription.CustomMethods.LocalOperations.BuildJsonCollection();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_UpdateSubscription.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = data;
    requestOptions.SuccessCallback = Employee_UpdateSubscription.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = Employee_UpdateSubscription.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = Employee_UpdateSubscription.CustomMethods.Callback.Save_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
Employee_UpdateSubscription.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = Employee_UpdateSubscription.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_UpdateSubscription.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = Employee_UpdateSubscription.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = Employee_UpdateSubscription.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = Employee_UpdateSubscription.CustomMethods.Callback.ExportData_Completed;

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
Employee_UpdateSubscription.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.Employees) {
        return;
    }

    Employee_UpdateSubscription.Employees = jsonObj.Employees;

    //Fill the employees table
    Employee_UpdateSubscription.CustomMethods.LocalOperations.PopulateEmployeesTable();

    if (jsonObj.Employees.length > 0) {
        $('#' + Employee_UpdateSubscription.uiElements.btnSave).show();
    }


    Employee_UpdateSubscription.InitialDataReady = true;

};

Employee_UpdateSubscription.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Employee_UpdateSubscription.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save
Employee_UpdateSubscription.CustomMethods.Callback.Save_Success = function (jsonObj) {

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

Employee_UpdateSubscription.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {
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

Employee_UpdateSubscription.CustomMethods.Callback.Save_Completed = function (xhr, status) {

};

//Export data
Employee_UpdateSubscription.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.URL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + Employee_UpdateSubscription.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Employee_UpdateSubscription.uiElements.btnExport).show();

    }, 5000);


};

Employee_UpdateSubscription.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

Employee_UpdateSubscription.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};



