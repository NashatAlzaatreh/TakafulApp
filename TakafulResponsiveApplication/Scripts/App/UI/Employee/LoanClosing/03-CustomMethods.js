
if (typeof Employee_LoanClosing === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_LoanClosing = {};
}

//Add the event handlers container object to the main namespace
Employee_LoanClosing.CustomMethods = {};

//Add the event handlers container object to the main namespace
Employee_LoanClosing.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Employee_LoanClosing.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Employee_LoanClosing.uiElements.chkEmployees).prop('checked', false);
    $('#' + Employee_LoanClosing.uiElements.tblEmployees).empty();
    $('#' + Employee_LoanClosing.uiElements.chkEmployees2).prop('checked', false);
    $('#' + Employee_LoanClosing.uiElements.tblEmployees2).empty();


};

//Populate the employees UI table with the array data
Employee_LoanClosing.CustomMethods.LocalOperations.PopulateEmployeesTable = function () {

    var htmlData = '';

    if (Employee_LoanClosing.Employees.length > 0) {
        for (var i = 0; i < Employee_LoanClosing.Employees.length; i++) {
            var isSelected = '';

            if (Employee_LoanClosing.Employees[i].IsSelected == true) {
                isSelected = 'checked=checked';
            }

            htmlData += '<tr>' +
                '<td>' + Employee_LoanClosing.Employees[i].EmployeeNumber + '</td>' +
                '<td class="hide-for-small">' + Employee_LoanClosing.Employees[i].Name + '</td>' +
                '<td class="hide-for-small">' + Employee_LoanClosing.Employees[i].LoanAmount + '</td>' +
                '<td class="hide-for-small">' + Employee_LoanClosing.Employees[i].LoanInstallmentAmount + '</td>' +
                '<td class="hide-for-small">' + Employee_LoanClosing.Employees[i].PaidLoanAmount + '</td>' +
                '<td>' + Employee_LoanClosing.Employees[i].RemainingLoanAmount + '</td>' +
                '<td class="text-center"><input id="chk_' + i.toString() + '" type="checkbox" onchange="Employee_LoanClosing.EventHandlers.chkApprove_onchange(' + i.toString() + ')" ' + isSelected + ' /></td>' +
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

    $('#' + Employee_LoanClosing.uiElements.tblEmployees).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Populate the employees UI table 2 with the array data
Employee_LoanClosing.CustomMethods.LocalOperations.PopulateEmployeesTable2 = function () {

    var htmlData = '';

    if (Employee_LoanClosing.Employees2.length > 0) {
        for (var i = 0; i < Employee_LoanClosing.Employees2.length; i++) {
            var isSelected = '';

            if (Employee_LoanClosing.Employees2[i].IsSelected == true) {
                isSelected = 'checked=checked';
            }

            htmlData += '<tr>' +
                '<td>' + Employee_LoanClosing.Employees2[i].EmployeeNumber + '</td>' +
                '<td class="hide-for-small">' + Employee_LoanClosing.Employees2[i].Name + '</td>' +
                '<td class="hide-for-small">' + Employee_LoanClosing.Employees2[i].LoanAmount + '</td>' +
                '<td class="hide-for-small">' + Employee_LoanClosing.Employees2[i].LoanInstallmentAmount + '</td>' +
                '<td class="hide-for-small">' + Employee_LoanClosing.Employees2[i].PaidLoanAmount + '</td>' +
                '<td>' + Employee_LoanClosing.Employees2[i].RemainingLoanAmount + '</td>' +
                '<td class="text-center"><input id="chk2_' + i.toString() + '" type="checkbox" onchange="Employee_LoanClosing.EventHandlers.chkApprove2_onchange(' + i.toString() + ')" ' + isSelected + ' /></td>' +
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

    Takaful.CommonMethods.TerminateDataTable('mainTable2');  //Terminate table object

    $('#' + Employee_LoanClosing.uiElements.tblEmployees2).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable2');

};

//Build the json collection to be saved
Employee_LoanClosing.CustomMethods.LocalOperations.BuildJsonCollection = function (type) {

    var dataCollection = [];
    var resultObj = {};

    if (type == 1) {
        for (var i = 0; i < Employee_LoanClosing.Employees.length; i++) {
            if (Employee_LoanClosing.Employees[i].IsSelected == true) {
                dataCollection.push(Employee_LoanClosing.Employees[i].EmployeeNumber);
            }
        }
    } else if (type == 2) {
        for (var j = 0; j < Employee_LoanClosing.Employees2.length; j++) {
            if (Employee_LoanClosing.Employees2[j].IsSelected == true) {
                dataCollection.push(Employee_LoanClosing.Employees2[j].EmployeeNumber);
            }
        }
    }

    resultObj.EmployeesIDs = dataCollection;

    return JSON.stringify(resultObj);

};

//Prepare data for export
Employee_LoanClosing.CustomMethods.LocalOperations.PrepareDataForExport = function (type) {

    var dataArr = [];

    //Add header
    dataArr.push([
        "الرقم الوظيفى",
        "الاسم",
        "مبلغ القرض",
        "قيمة القسط",
        "اجمالي المسدد",
        "المتبقي"
    ]);

    if (type == 1) {
        if (Employee_LoanClosing.Employees.length > 0) {
            for (var i = 0; i < Employee_LoanClosing.Employees.length; i++) {
                var arrElement = [
                    Employee_LoanClosing.Employees[i].EmployeeNumber,
                    Employee_LoanClosing.Employees[i].Name,
                    Employee_LoanClosing.Employees[i].LoanAmount,
                    Employee_LoanClosing.Employees[i].LoanInstallmentAmount,
                    Employee_LoanClosing.Employees[i].PaidLoanAmount,
                    Employee_LoanClosing.Employees[i].RemainingLoanAmount
                ];

                dataArr.push(arrElement);
            }
        }
    } else if (type == 2) {
        if (Employee_LoanClosing.Employees2.length > 0) {
            for (var j = 0; j < Employee_LoanClosing.Employees2.length; j++) {
                var arrElement2 = [
                    Employee_LoanClosing.Employees2[j].EmployeeNumber,
                    Employee_LoanClosing.Employees2[j].Name,
                    Employee_LoanClosing.Employees2[j].LoanAmount,
                    Employee_LoanClosing.Employees2[j].LoanInstallmentAmount,
                    Employee_LoanClosing.Employees2[j].PaidLoanAmount,
                    Employee_LoanClosing.Employees2[j].RemainingLoanAmount
                ];

                dataArr.push(arrElement2);
            }
        }
    }


    var jObj = JSON.stringify(dataArr);


    return jObj;
};


//Ajax functions
//--------------

//Get initial data
Employee_LoanClosing.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_LoanClosing.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Employee_LoanClosing.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Employee_LoanClosing.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Employee_LoanClosing.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save
Employee_LoanClosing.CustomMethods.AjaxCall.Save = function (type) {

    var data = Employee_LoanClosing.CustomMethods.LocalOperations.BuildJsonCollection(type);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_LoanClosing.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = data;
    requestOptions.SuccessCallback = Employee_LoanClosing.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = Employee_LoanClosing.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = Employee_LoanClosing.CustomMethods.Callback.Save_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
Employee_LoanClosing.CustomMethods.AjaxCall.ExportData = function (type) {

    var exportData = Employee_LoanClosing.CustomMethods.LocalOperations.PrepareDataForExport(type);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_LoanClosing.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = Employee_LoanClosing.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = Employee_LoanClosing.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = Employee_LoanClosing.CustomMethods.Callback.ExportData_Completed;

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
Employee_LoanClosing.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.Employees) {
        return;
    }

    Employee_LoanClosing.Employees = jsonObj.Employees;
    Employee_LoanClosing.Employees2 = jsonObj.Employees2;

    //Fill the employees table
    Employee_LoanClosing.CustomMethods.LocalOperations.PopulateEmployeesTable();

    //Fill the employees table 2
    Employee_LoanClosing.CustomMethods.LocalOperations.PopulateEmployeesTable2();

    if (jsonObj.Employees.length > 0) {
        $('#' + Employee_LoanClosing.uiElements.btnSave).show();
    }

    if (jsonObj.Employees2.length > 0) {
        $('#' + Employee_LoanClosing.uiElements.btnSave2).show();
    }


    Employee_LoanClosing.InitialDataReady = true;

};

Employee_LoanClosing.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Employee_LoanClosing.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save
Employee_LoanClosing.CustomMethods.Callback.Save_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    //Hide loading
    Takaful.CommonMethods.HideLoading();

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم اغلاق القروض.", null, 0, "success");
        setTimeout(function () {
            //window.history.back();
            location.reload();
        }, 5000);
        return;
    } else {
        if (jsonObj == "NotValid") {
            Takaful.CommonMethods.ShowInfoMsg("البيانات غير سليمة ولا تحقق الشروط المطلوبة.", null, 0, "error");
            return;
        }
    }


};

Employee_LoanClosing.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {
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

Employee_LoanClosing.CustomMethods.Callback.Save_Completed = function (xhr, status) {

};

//Export data
Employee_LoanClosing.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.URL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + Employee_LoanClosing.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Employee_LoanClosing.uiElements.btnExport).show();

    }, 5000);


};

Employee_LoanClosing.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

Employee_LoanClosing.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};


