
if (typeof HR_HRSheetSub === 'undefined') {
    // Namespace does not exist, create a new one
    var HR_HRSheetSub = {};
}

//Add the event handlers container object to the main namespace
HR_HRSheetSub.CustomMethods = {};

//Add the event handlers container object to the main namespace
HR_HRSheetSub.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
HR_HRSheetSub.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + HR_HRSheetSub.uiElements.txtDateFrom).val('');
    $('#' + HR_HRSheetSub.uiElements.txtDateTo).val('');
    $('#' + HR_HRSheetSub.uiElements.txtSerial).val('');
    $('#' + HR_HRSheetSub.uiElements.txtSheetDate).val('');
    $('#' + HR_HRSheetSub.uiElements.txtMonth).val('');
    $('#' + HR_HRSheetSub.uiElements.txtNotes).val('');
    $('#' + HR_HRSheetSub.uiElements.tblSheets).empty();

};

//Populate the UI table with the array data
HR_HRSheetSub.CustomMethods.LocalOperations.PopulateSheetsTable = function () {

    var htmlData = '';

    if (HR_HRSheetSub.Sheets.length > 0) {
        for (var i = 0; i < HR_HRSheetSub.Sheets.length; i++) {
            htmlData += '<tr>' +
                '<td>' + HR_HRSheetSub.Sheets[i].Serial + '</td>' +
                '<td>' + Takaful.CommonMethods.GetFormattedDate(HR_HRSheetSub.Sheets[i].Date) + '</td>' +
                '<td class="hide-for-small">' + HR_HRSheetSub.Sheets[i].Notes + '</td>' +
                '<td>' +
                '<div class="row collapse">' +
                '<div class="large-6 columns" onclick="HR_HRSheetSub.EventHandlers.btnEdit_click(' + i.toString() + ')"><div class="subscribe-btn3"><i class="fa fa-edit"></i></div></div>' +
                '<div class="large-6  columns" onclick="HR_HRSheetSub.EventHandlers.btnDelete_click(' + i.toString() + ')"><div class="subscribe-btn3"><i class="fa fa-remove"></i></div></div>' +
                '</div>' +
                '</td>' +
                '</tr>';
        }
    } else {
        htmlData = '<tr>' +
        '<td class="text-center" colspan="4">لايوجد بيانات</td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '</tr>';
    }

    Takaful.CommonMethods.TerminateDataTable('mainTable');  //Terminate table object

    $('#' + HR_HRSheetSub.uiElements.tblSheets).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Prepare data for export
HR_HRSheetSub.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];


    //Add header
    dataArr.push([
        "رقم الإجتماع",
        "تاريخ الإجتماع",
        "ملاحظات"
    ]);

    if (HR_HRSheetSub.Meetings.length > 0) {
        for (var i = 0; i < HR_HRSheetSub.Meetings.length; i++) {
            var arrElement = [
                HR_HRSheetSub.Meetings[i].FormattedSerial,
                Takaful.CommonMethods.GetFormattedDate(HR_HRSheetSub.Meetings[i].Date),
                HR_HRSheetSub.Meetings[i].Notes
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
HR_HRSheetSub.CustomMethods.AjaxCall.GetInitialData = function (fromDate, toDate) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = HR_HRSheetSub.ServiceUrl + '/InitialData?fromDate=' + fromDate + '&toDate=' + toDate;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = HR_HRSheetSub.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = HR_HRSheetSub.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = HR_HRSheetSub.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save sheet data
HR_HRSheetSub.CustomMethods.AjaxCall.Save = function (sheetID, notes, sheetMonth) {

    var submittedData = {};
    submittedData.SheetID = sheetID;
    submittedData.Notes = notes;
    submittedData.Month = sheetMonth;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = HR_HRSheetSub.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = HR_HRSheetSub.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = HR_HRSheetSub.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = HR_HRSheetSub.CustomMethods.Callback.Save_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Delete meeting
HR_HRSheetSub.CustomMethods.AjaxCall.Delete = function (sheetID) {

    var submittedData = {};
    submittedData.ID = sheetID;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = HR_HRSheetSub.ServiceUrl + '/Delete';
    requestOptions.RequestType = "DELETE";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = HR_HRSheetSub.CustomMethods.Callback.Delete_Success;
    requestOptions.ErrorCallback = HR_HRSheetSub.CustomMethods.Callback.Delete_Error;
    requestOptions.CompletedCallback = HR_HRSheetSub.CustomMethods.Callback.Delete_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
HR_HRSheetSub.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = HR_HRSheetSub.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = HR_HRSheetSub.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = HR_HRSheetSub.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = HR_HRSheetSub.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = HR_HRSheetSub.CustomMethods.Callback.ExportData_Completed;

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
HR_HRSheetSub.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    HR_HRSheetSub.InitialData = jsonObj;
    HR_HRSheetSub.Sheets = jsonObj.Sheets;  //Store the data to local object
    HR_HRSheetSub.CustomMethods.LocalOperations.PopulateSheetsTable();    //Populate the data to UI table

    //$('#' + HR_HRSheetSub.uiElements.txtSerial).val(HR_HRSheetSub.InitialData.NewSerial);
    $('#' + HR_HRSheetSub.uiElements.txtSheetDate).val(Takaful.CommonMethods.GetFormattedDate(HR_HRSheetSub.InitialData.Date));
    //$('#' + HR_HRSheetSub.uiElements.txtMonth).val(HR_HRSheetSub.InitialData.Month);

    HR_HRSheetSub.InitialDataReady = true;

};

HR_HRSheetSub.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

HR_HRSheetSub.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save data
HR_HRSheetSub.CustomMethods.Callback.Save_Success = function (jsonObj) {


    if (!jsonObj || !jsonObj.Sheets || !jsonObj.Message) {
        return;
    }

    //Show loading
    Takaful.CommonMethods.HideLoading();

    if (jsonObj.Message == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, null, "success");
    }

    HR_HRSheetSub.InitialData = jsonObj;
    HR_HRSheetSub.SelectedSheetIndex = -1;  //Reset the selected item
    HR_HRSheetSub.Sheets = jsonObj.Sheets;  //Store the data to local object
    HR_HRSheetSub.CustomMethods.LocalOperations.PopulateSheetsTable();    //Populate the data to UI table

    $('#' + HR_HRSheetSub.uiElements.btnSave).show();
    $('#' + HR_HRSheetSub.uiElements.btnCancel).hide();

    $('#' + HR_HRSheetSub.uiElements.txtDateFrom).val('');
    $('#' + HR_HRSheetSub.uiElements.txtDateTo).val('');
    $('#' + HR_HRSheetSub.uiElements.txtSerial).val('');
    $('#' + HR_HRSheetSub.uiElements.txtSheetDate).val('');
    $('#' + HR_HRSheetSub.uiElements.txtMonth).val('');
    $('#' + HR_HRSheetSub.uiElements.txtNotes).val('');

    $('#' + HR_HRSheetSub.uiElements.txtSerial).val(HR_HRSheetSub.InitialData.NewSerial);
    $('#' + HR_HRSheetSub.uiElements.txtSheetDate).val(Takaful.CommonMethods.GetFormattedDate(HR_HRSheetSub.InitialData.Date));
    $('#' + HR_HRSheetSub.uiElements.txtMonth).val(HR_HRSheetSub.InitialData.Month);



};

HR_HRSheetSub.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    //Show loading
    Takaful.CommonMethods.HideLoading();

    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../User/Login.html");
    } else {
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام طلبك الأن.", null, 0, "error");
        $('#' + HR_HRSheetSub.uiElements.btnSave).show();
    }




};

HR_HRSheetSub.CustomMethods.Callback.Save_Completed = function (xhr, status) {

};

//Delete data
HR_HRSheetSub.CustomMethods.Callback.Delete_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.Sheets || !jsonObj.Message) {
        return;
    }

    //Show loading
    Takaful.CommonMethods.HideLoading();

    if (jsonObj.Message == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم الحذف.", null, null, "success");
    }

    HR_HRSheetSub.InitialData = jsonObj;
    HR_HRSheetSub.SelectedSheetIndex = -1;  //Reset the selected item
    HR_HRSheetSub.Sheets = jsonObj.Sheets;  //Store the data to local object
    HR_HRSheetSub.CustomMethods.LocalOperations.PopulateSheetsTable();    //Populate the data to UI table

    $('#' + HR_HRSheetSub.uiElements.btnSave).show();
    $('#' + HR_HRSheetSub.uiElements.btnCancel).hide();

    $('#' + HR_HRSheetSub.uiElements.txtDateFrom).val('');
    $('#' + HR_HRSheetSub.uiElements.txtDateTo).val('');
    $('#' + HR_HRSheetSub.uiElements.txtSerial).val('');
    $('#' + HR_HRSheetSub.uiElements.txtSheetDate).val('');
    $('#' + HR_HRSheetSub.uiElements.txtMonth).val('');
    $('#' + HR_HRSheetSub.uiElements.txtNotes).val('');

    $('#' + HR_HRSheetSub.uiElements.txtSerial).val(HR_HRSheetSub.InitialData.NewSerial);
    $('#' + HR_HRSheetSub.uiElements.txtSheetDate).val(Takaful.CommonMethods.GetFormattedDate(HR_HRSheetSub.InitialData.Date));
    $('#' + HR_HRSheetSub.uiElements.txtMonth).val(HR_HRSheetSub.InitialData.Month);

};

HR_HRSheetSub.CustomMethods.Callback.Delete_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    //Show loading
    Takaful.CommonMethods.HideLoading();

    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../User/Login.html");
    } else {
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام طلبك الأن.", null, 0, "error");
    }




};

HR_HRSheetSub.CustomMethods.Callback.Delete_Completed = function (xhr, status) {

};

//Export data
HR_HRSheetSub.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.FullURL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + HR_HRSheetSub.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + HR_HRSheetSub.uiElements.btnExport).show();

    }, 5000);


};

HR_HRSheetSub.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

HR_HRSheetSub.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};








