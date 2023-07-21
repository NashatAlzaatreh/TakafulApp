
if (typeof User_RoleManagementNonEmployees === 'undefined') {
    // Namespace does not exist, create a new one
    var User_RoleManagementNonEmployees = {};
}

//Add the event handlers container object to the main namespace
User_RoleManagementNonEmployees.CustomMethods = {};

//Add the event handlers container object to the main namespace
User_RoleManagementNonEmployees.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
User_RoleManagementNonEmployees.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + User_RoleManagementNonEmployees.uiElements.tblEmployees).empty();


};

//Populate the UI table with the array data
User_RoleManagementNonEmployees.CustomMethods.LocalOperations.PopulateEmployeesTable = function () {

    var htmlData = '';

    if (User_RoleManagementNonEmployees.Employees.length > 0) {
        for (var i = 0; i < User_RoleManagementNonEmployees.Employees.length; i++) {

            var checkedAdmin = '', checkedCommitteeMember = '', checkedHelpDesk = '', checkedActive = '';
            if (User_RoleManagementNonEmployees.Employees[i].IsAdmin == true) {
                checkedAdmin = 'checked="checked"';
            }

            if (User_RoleManagementNonEmployees.Employees[i].IsCommitteeMember == true) {
                checkedCommitteeMember = 'checked="checked"';
            }

            if (User_RoleManagementNonEmployees.Employees[i].IsHelpDesk == true) {
                checkedHelpDesk = 'checked="checked"';
            }

            if (User_RoleManagementNonEmployees.Employees[i].IsActive == true) {
                checkedActive = 'checked="checked"';
            }

            htmlData += '<tr>' +
                '<td class="">' + User_RoleManagementNonEmployees.Employees[i].EmployeeNumber + '</td>' +
                '<td class="hidden-for-small">' + User_RoleManagementNonEmployees.Employees[i].Name + '</td>' +
                '<td class="hidden-for-small">' + User_RoleManagementNonEmployees.Employees[i].Department + '</td>' +
                '<td class="text-center"><input id="chkAdmin_' + i.toString() + '" type="checkbox" onchange="User_RoleManagementNonEmployees.EventHandlers.chkAdmin_onchange(' + i.toString() + ')" ' + checkedAdmin + ' /></td>' +
                '<td class="text-center"><input id="chkCommittee_' + i.toString() + '" type="checkbox" onchange="User_RoleManagementNonEmployees.EventHandlers.chkCommittee_onchange(' + i.toString() + ')" ' + checkedCommitteeMember + ' /></td>' +
                '<td class="text-center"><input id="chkHelpDesk_' + i.toString() + '" type="checkbox" onchange="User_RoleManagementNonEmployees.EventHandlers.chkHelpDesk_onchange(' + i.toString() + ')" ' + checkedHelpDesk + ' /></td>' +
                '<td class="text-center"><input id="chkActive_' + i.toString() + '" type="checkbox" onchange="User_RoleManagementNonEmployees.EventHandlers.chkActive_onchange(' + i.toString() + ')" ' + checkedActive + ' /></td>' +
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

    $('#' + User_RoleManagementNonEmployees.uiElements.tblEmployees).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');


};

//Get employee index
User_RoleManagementNonEmployees.CustomMethods.LocalOperations.GetEmployeeIndex = function (empID) {

    for (var i = 0; i < User_RoleManagementNonEmployees.Employees.length; i++) {
        if (User_RoleManagementNonEmployees.Employees[i].EmployeeNumber == empID) {
            return i;
        }
    }

    return -1;

};

//Load the employee data to the popup window
User_RoleManagementNonEmployees.CustomMethods.LocalOperations.LoadEmployee = function (index) {

    //Show the table page for the selected row index
    $("#mainTable").DataTable().row(index).show().draw(false);

    //Load the row data
    $('#' + User_RoleManagementNonEmployees.uiElements.tblSearch).empty();

    var htmlData = '';

    var checkedAdmin = '', checkedCommitteeMember = '', checkedHelpDesk = '', checkedActive = '';
    if ($('#chkAdmin_' + index.toString()).prop('checked') == true) {
        checkedAdmin = 'checked="checked"';
    }

    if ($('#chkCommittee_' + index.toString()).prop('checked') == true) {
        checkedCommitteeMember = 'checked="checked"';
    }

    if ($('#chkHelpDesk_' + index.toString()).prop('checked') == true) {
        checkedHelpDesk = 'checked="checked"';
    }

    if ($('#chkActive_' + index.toString()).prop('checked') == true) {
        checkedActive = 'checked="checked"';
    }

    htmlData += '<tr>' +
        '<td class="">' + User_RoleManagementNonEmployees.Employees[index].EmployeeNumber + '</td>' +
        '<td class="hidden-for-small">' + User_RoleManagementNonEmployees.Employees[index].Name + '</td>' +
        '<td class="hidden-for-small">' + User_RoleManagementNonEmployees.Employees[index].Department + '</td>' +
        '<td class="text-center"><input id="chkAdmin2_' + index.toString() + '" type="checkbox" onchange="User_RoleManagementNonEmployees.EventHandlers.chkAdmin2_onchange(' + index.toString() + ')" ' + checkedAdmin + ' /></td>' +
        '<td class="text-center"><input id="chkCommittee2_' + index.toString() + '" type="checkbox" onchange="User_RoleManagementNonEmployees.EventHandlers.chkCommittee2_onchange(' + index.toString() + ')" ' + checkedCommitteeMember + ' /></td>' +
        '<td class="text-center"><input id="chkHelpDesk2_' + index.toString() + '" type="checkbox" onchange="User_RoleManagementNonEmployees.EventHandlers.chkHelpDesk2_onchange(' + index.toString() + ')" ' + checkedHelpDesk + ' /></td>' +
        '<td class="text-center"><input id="chkActive2_' + index.toString() + '" type="checkbox" onchange="User_RoleManagementNonEmployees.EventHandlers.chkActive2_onchange(' + index.toString() + ')" ' + checkedActive + ' /></td>' +
        '</tr>';


    $('#' + User_RoleManagementNonEmployees.uiElements.tblSearch).html(htmlData);

    $('#' + User_RoleManagementNonEmployees.uiElements.myModal).foundation('reveal', 'open');

};

//Prepare data for export
User_RoleManagementNonEmployees.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];

    //Add header
    dataArr.push([
        "الرقم الوظيفى",
        "الاسم",
        "الإدارة",
        "إدارى النظام",
        "عضو لجنة",
        "خدمة عملاء",
        "تفعيل الحساب"
    ]);

    if (User_RoleManagementNonEmployees.Employees.length > 0) {
        for (var i = 0; i < User_RoleManagementNonEmployees.Employees.length; i++) {
            var admin = "لا", comm = "لا", help = "لا", active = "لا";

            if (User_RoleManagementNonEmployees.Employees[i].IsAdmin == true) {
                admin = "نعم";
            }

            if (User_RoleManagementNonEmployees.Employees[i].IsCommitteeMember == true) {
                comm = "نعم";
            }

            if (User_RoleManagementNonEmployees.Employees[i].IsHelpDesk == true) {
                help = "نعم";
            }

            if (User_RoleManagementNonEmployees.Employees[i].IsActive == true) {
                active = "نعم";
            }

            var arrElement = [
                User_RoleManagementNonEmployees.Employees[i].EmployeeNumber,
                User_RoleManagementNonEmployees.Employees[i].Name,
                User_RoleManagementNonEmployees.Employees[i].Department,
                admin,
                comm,
                help,
                active
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
User_RoleManagementNonEmployees.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = User_RoleManagementNonEmployees.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = User_RoleManagementNonEmployees.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = User_RoleManagementNonEmployees.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = User_RoleManagementNonEmployees.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Set role
User_RoleManagementNonEmployees.CustomMethods.AjaxCall.Set = function (empID, role, value) {

    var submittedData = {};
    submittedData.EmpID = empID;
    submittedData.Role = role;
    submittedData.Value = value;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = User_RoleManagementNonEmployees.ServiceUrl + '/Set';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;

    if (role == 2 && value == true) {   //If committee member
        requestOptions.SuccessCallback = User_RoleManagementNonEmployees.CustomMethods.Callback.Set_Committee_Success;
    } else {
        requestOptions.SuccessCallback = User_RoleManagementNonEmployees.CustomMethods.Callback.Set_Success;
    }

    requestOptions.ErrorCallback = User_RoleManagementNonEmployees.CustomMethods.Callback.Set_Error;
    requestOptions.CompletedCallback = User_RoleManagementNonEmployees.CustomMethods.Callback.Set_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
User_RoleManagementNonEmployees.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = User_RoleManagementNonEmployees.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = User_RoleManagementNonEmployees.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = User_RoleManagementNonEmployees.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = User_RoleManagementNonEmployees.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = User_RoleManagementNonEmployees.CustomMethods.Callback.ExportData_Completed;

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
User_RoleManagementNonEmployees.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    User_RoleManagementNonEmployees.Employees = jsonObj;

    //Fill the exceptions table
    User_RoleManagementNonEmployees.CustomMethods.LocalOperations.PopulateEmployeesTable();

    User_RoleManagementNonEmployees.InitialDataReady = true;

};

User_RoleManagementNonEmployees.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

User_RoleManagementNonEmployees.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Set role
User_RoleManagementNonEmployees.CustomMethods.Callback.Set_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Takaful.CommonMethods.HideLoading();

    if (jsonObj.indexOf("CannotRemoveYourself") > -1) {
        //Restore checkbox state
        var empID = jsonObj.substring(21, jsonObj.lengh);
        empID *= 1;

        for (var i = 0; i < User_RoleManagementNonEmployees.Employees.length; i++) {
            if (User_RoleManagementNonEmployees.Employees[i].EmployeeNumber == empID) {
                $('#chkAdmin_' + i.toString()).prop('checked', true);
                if ($('#chkAdmin2_' + i.toString())) {
                    $('#chkAdmin2_' + i.toString()).prop('checked', true);
                }
            }
        }

        Takaful.CommonMethods.ShowInfoMsg("لا يمكنك إلغاء صلاحية إدارى النظام عن نفسك.", null, 5, "error");
        return;
    }

    if (jsonObj.indexOf("CannotDeactivateYourself") > -1) {
        //Restore checkbox state
        var empID = jsonObj.substring(25, jsonObj.lengh);
        empID *= 1;

        for (var i = 0; i < User_RoleManagementNonEmployees.Employees.length; i++) {
            if (User_RoleManagementNonEmployees.Employees[i].EmployeeNumber == empID) {
                $('#chkActive_' + i.toString()).prop('checked', true);
                if ($('#chkActive2_' + i.toString())) {
                    $('#chkActive2_' + i.toString()).prop('checked', true);
                }
            }
        }

        Takaful.CommonMethods.ShowInfoMsg("لا يمكنك إيقاف تفعيل الحساب عن نفسك.", null, 5, "error");
        return;
    }


    Takaful.CommonMethods.ShowInfoMsg("تم تعديل الصلاحية", null, 1, "success");

};

User_RoleManagementNonEmployees.CustomMethods.Callback.Set_Committee_Success = function (jsonObj) {

    if (!jsonObj || jsonObj != "True") {
        return;
    }

    Takaful.CommonMethods.HideLoading();

    Takaful.CommonMethods.ShowInfoMsg("تم تعديل الصلاحية ، يرجى مراجعة شاشة إدارة أعضاء اللجنة", null, 4, "success");

};

User_RoleManagementNonEmployees.CustomMethods.Callback.Set_Error = function (xhr, status, errorThrown) {
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
        Takaful.CommonMethods.HideLoading();
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    }




};

User_RoleManagementNonEmployees.CustomMethods.Callback.Set_Completed = function (xhr, status) {

};

//Export data
User_RoleManagementNonEmployees.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.URL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + User_RoleManagementNonEmployees.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + User_RoleManagementNonEmployees.uiElements.btnExport).show();

    }, 10000);


};

User_RoleManagementNonEmployees.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

User_RoleManagementNonEmployees.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};




