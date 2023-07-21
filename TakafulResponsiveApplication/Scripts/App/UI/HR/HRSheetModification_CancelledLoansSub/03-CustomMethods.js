
if (typeof HR_HRSheetModification_CancelledLoansSub === 'undefined') {
    // Namespace does not exist, create a new one
    var HR_HRSheetModification_CancelledLoansSub = {};
}

//Add the event handlers container object to the main namespace
HR_HRSheetModification_CancelledLoansSub.CustomMethods = {};

//Add the event handlers container object to the main namespace
HR_HRSheetModification_CancelledLoansSub.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
HR_HRSheetModification_CancelledLoansSub.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.lstEmployees).empty();
    $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.txtDate).val('');
    $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.txtMonth).val('');
    $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.txtNotes).val('');
    $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.chkEmployees).prop('checked', false);
    $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.tblEmployees).empty();


};

//Populate the employees UI table with the array data
HR_HRSheetModification_CancelledLoansSub.CustomMethods.LocalOperations.PopulateEmployeesTable = function () {

    var htmlData = '';

    if (HR_HRSheetModification_CancelledLoansSub.Employees.length > 0) {
        for (var i = 0; i < HR_HRSheetModification_CancelledLoansSub.Employees.length; i++) {
            var checked = '', disabled = "";
            if (HR_HRSheetModification_CancelledLoansSub.Employees[i].IsIncluded == true) {
                checked = 'checked="checked"';
            }

            if (HR_HRSheetModification_CancelledLoansSub.CurrentSheetIndex >= 0) {
                if (HR_HRSheetModification_CancelledLoansSub.Sheets[HR_HRSheetModification_CancelledLoansSub.CurrentSheetIndex].IsClosed == true) {
                    disabled = "disabled";
                }
            }

            htmlData += '<tr>' +
                '<td>' + HR_HRSheetModification_CancelledLoansSub.Employees[i].EmployeeNumber + '</td>' +
                '<td class="hide-for-small">' + HR_HRSheetModification_CancelledLoansSub.Employees[i].Name + '</td>' +
                '<td class="hide-for-small">' + HR_HRSheetModification_CancelledLoansSub.Employees[i].Department + '</td>' +
                '<td class="hide-for-small">' + HR_HRSheetModification_CancelledLoansSub.Employees[i].Position + '</td>' +
                '<td class="hide-for-small">' + HR_HRSheetModification_CancelledLoansSub.Employees[i].OriginalSheetSerial + '</td>' +
                '<td class="hide-for-small">' + Takaful.CommonMethods.GetFormattedDate(HR_HRSheetModification_CancelledLoansSub.Employees[i].OriginalSheetDate) + '</td>' +
                '<td class="text-center"><input id="chk_' + i.toString() + '" type="checkbox" onchange="HR_HRSheetModification_CancelledLoansSub.EventHandlers.chkApprove_onchange(' + i.toString() + ')" ' + checked + ' ' + disabled + ' /></td>' +
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

    $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.tblEmployees).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Prepare data for export
HR_HRSheetModification_CancelledLoansSub.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];


    //Add header
    dataArr.push([
        "الرقم الوظيفي",
        "الاسم",
        "الإدارة",
        "الوظيفة",
        "رقم الكشف الاصلى",
        "تاريخ الكشف الاصلى"
    ]);

    if (HR_HRSheetModification_CancelledLoansSub.Employees.length > 0) {
        for (var i = 0; i < HR_HRSheetModification_CancelledLoansSub.Employees.length; i++) {
            if (HR_HRSheetModification_CancelledLoansSub.Employees[i].IsIncluded == true) {
                var arrElement = [
                    HR_HRSheetModification_CancelledLoansSub.Employees[i].EmployeeNumber,
                    HR_HRSheetModification_CancelledLoansSub.Employees[i].Name,
                    HR_HRSheetModification_CancelledLoansSub.Employees[i].Department,
                    HR_HRSheetModification_CancelledLoansSub.Employees[i].Position,
                    HR_HRSheetModification_CancelledLoansSub.Employees[i].OriginalSheetSerial,
                    Takaful.CommonMethods.GetFormattedDate(HR_HRSheetModification_CancelledLoansSub.Employees[i].OriginalSheetDate)
                ];

                dataArr.push(arrElement);
            }
        }
    }

    var jObj = JSON.stringify(dataArr);


    return jObj;
};

//Ajax functions
//--------------

//Get initial data
HR_HRSheetModification_CancelledLoansSub.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = HR_HRSheetModification_CancelledLoansSub.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Get sheet employees
HR_HRSheetModification_CancelledLoansSub.CustomMethods.AjaxCall.GetSheetEmployees = function (sheetID) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = HR_HRSheetModification_CancelledLoansSub.ServiceUrl + '/SheetEmployees?sheetID=' + sheetID;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.GetSheetEmployees_Success;
    requestOptions.ErrorCallback = HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.GetSheetEmployees_Error;
    requestOptions.CompletedCallback = HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.GetSheetEmployees_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save
HR_HRSheetModification_CancelledLoansSub.CustomMethods.AjaxCall.Save = function (sheetID, selectedIDs) {

    var submittedData = {};
    submittedData.SheetID = sheetID;
    submittedData.SelectedIDs = selectedIDs;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = HR_HRSheetModification_CancelledLoansSub.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.Save_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Approve
HR_HRSheetModification_CancelledLoansSub.CustomMethods.AjaxCall.Approve = function (sheetID, selectedIDs) {

    var submittedData = {};
    submittedData.SheetID = sheetID;
    submittedData.SelectedIDs = selectedIDs;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = HR_HRSheetModification_CancelledLoansSub.ServiceUrl + '/Approve';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.Approve_Success;
    requestOptions.ErrorCallback = HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.Approve_Error;
    requestOptions.CompletedCallback = HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.Approve_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
HR_HRSheetModification_CancelledLoansSub.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = HR_HRSheetModification_CancelledLoansSub.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = HR_HRSheetModification_CancelledLoansSub.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.ExportData_Completed;

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
HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.Sheets) {
        return;
    }

    HR_HRSheetModification_CancelledLoansSub.Sheets = jsonObj.Sheets;

    //Fill the meetings dropdown list
    var list = "";
    var activeMeetingID = '';

    for (var i = 0; i < jsonObj.Sheets.length; i++) {
        var id = jsonObj.Sheets[i].ID;
        var serial = jsonObj.Sheets[i].Serial;
        list += '<option value="' + id + '">' + serial + '</option>';
    }

    if (list != '') {
        $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.lstSheets).html(list);
        $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.lstSheets).val('');
    }

    HR_HRSheetModification_CancelledLoansSub.CustomMethods.LocalOperations.PopulateEmployeesTable();   //No data exists, but adding the empty row

    HR_HRSheetModification_CancelledLoansSub.InitialDataReady = true;

};

HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Get sheet employees
HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.GetSheetEmployees_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    HR_HRSheetModification_CancelledLoansSub.Employees = jsonObj;

    //Fill the sheet employees table
    HR_HRSheetModification_CancelledLoansSub.CustomMethods.LocalOperations.PopulateEmployeesTable();

    $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.lstSheets).removeAttr("disabled"); //Enable the sheet list

    if (HR_HRSheetModification_CancelledLoansSub.Sheets[HR_HRSheetModification_CancelledLoansSub.CurrentSheetIndex].IsClosed != true && jsonObj.length > 0) {
        $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.btnSave).show();
        $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.btnSubmit).show();
        $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.chkEmployees).removeAttr("disabled");
    } else {
        $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.btnSave).hide();
        $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.btnSubmit).hide();
        $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.chkEmployees).attr("disabled", "disabled");
    }

    HR_HRSheetModification_CancelledLoansSub.CurrentSheetIndex = -1;


};

HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.GetSheetEmployees_Error = function (xhr, status, errorThrown) {
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

    $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.lstSheets).removeAttr("disabled"); //Enable the meetings list


};

HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.GetSheetEmployees_Completed = function (xhr, status) {

};

//Save
HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.Save_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, 0, "success");
        return;
    }


};

HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {
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




};

HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.Save_Completed = function (xhr, status) {

};

//Approve
HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.Approve_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم الاعتماد.", null, 0, "success");
        //Wait 3 seconds then, reload page
        setTimeout(function () { window.location.reload(); }, 3000);
        return;
    }


};

HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.Approve_Error = function (xhr, status, errorThrown) {
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




};

HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.Approve_Completed = function (xhr, status) {

};

//Export data
HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.FullURL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + HR_HRSheetModification_CancelledLoansSub.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + HR_HRSheetModification_CancelledLoansSub.uiElements.btnExport).show();

    }, 5000);


};

HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

HR_HRSheetModification_CancelledLoansSub.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};


