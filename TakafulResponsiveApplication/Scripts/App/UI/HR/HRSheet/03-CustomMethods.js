
if (typeof HR_HRSheet === 'undefined') {
    // Namespace does not exist, create a new one
    var HR_HRSheet = {};
}

//Add the event handlers container object to the main namespace
HR_HRSheet.CustomMethods = {};

//Add the event handlers container object to the main namespace
HR_HRSheet.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
HR_HRSheet.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + HR_HRSheet.uiElements.txtDateFrom).val('');
    $('#' + HR_HRSheet.uiElements.txtDateTo).val('');
    $('#' + HR_HRSheet.uiElements.txtSerial).val('');
    $('#' + HR_HRSheet.uiElements.txtSheetDate).val('');
    $('#' + HR_HRSheet.uiElements.txtMonth).val('');
    $('#' + HR_HRSheet.uiElements.txtNotes).val('');
    $('#' + HR_HRSheet.uiElements.tblSheets).empty();

};

//Populate the UI table with the array data
HR_HRSheet.CustomMethods.LocalOperations.PopulateSheetsTable = function () {

    var htmlData = '';

    if (HR_HRSheet.Sheets.length > 0) {
        for (var i = 0; i < HR_HRSheet.Sheets.length; i++) {
            htmlData += '<tr>' +
                '<td>' + HR_HRSheet.Sheets[i].Serial + '</td>' +
                '<td>' + Takaful.CommonMethods.GetFormattedDate(HR_HRSheet.Sheets[i].Date) + '</td>' +
                '<td class="hide-for-small">' + HR_HRSheet.Sheets[i].Notes + '</td>' +
                '<td>' +
                '<div class="row collapse">' +
                '<div class="large-6 columns" onclick="HR_HRSheet.EventHandlers.btnEdit_click(' + i.toString() + ')"><div class="subscribe-btn3"><i class="fa fa-edit"></i></div></div>' +
                '<div class="large-6  columns" onclick="HR_HRSheet.EventHandlers.btnDelete_click(' + i.toString() + ')"><div class="subscribe-btn3"><i class="fa fa-remove"></i></div></div>' +
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

    $('#' + HR_HRSheet.uiElements.tblSheets).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Prepare data for export
HR_HRSheet.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];


    //Add header
    dataArr.push([
        "رقم الإجتماع",
        "تاريخ الإجتماع",
        "ملاحظات"
    ]);

    if (HR_HRSheet.Meetings.length > 0) {
        for (var i = 0; i < HR_HRSheet.Meetings.length; i++) {
            var arrElement = [
                HR_HRSheet.Meetings[i].FormattedSerial,
                Takaful.CommonMethods.GetFormattedDate(HR_HRSheet.Meetings[i].Date),
                HR_HRSheet.Meetings[i].Notes
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
HR_HRSheet.CustomMethods.AjaxCall.GetInitialData = function (fromDate, toDate) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = HR_HRSheet.ServiceUrl + '/InitialData?fromDate=' + fromDate + '&toDate=' + toDate;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = HR_HRSheet.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = HR_HRSheet.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = HR_HRSheet.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save sheet data
HR_HRSheet.CustomMethods.AjaxCall.Save = function (sheetID, notes) {

    var submittedData = {};
    submittedData.SheetID = sheetID;
    submittedData.Notes = notes;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = HR_HRSheet.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = HR_HRSheet.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = HR_HRSheet.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = HR_HRSheet.CustomMethods.Callback.Save_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Delete meeting
HR_HRSheet.CustomMethods.AjaxCall.Delete = function (sheetID) {

    var submittedData = {};
    submittedData.ID = sheetID;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = HR_HRSheet.ServiceUrl + '/Delete';
    requestOptions.RequestType = "DELETE";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = HR_HRSheet.CustomMethods.Callback.Delete_Success;
    requestOptions.ErrorCallback = HR_HRSheet.CustomMethods.Callback.Delete_Error;
    requestOptions.CompletedCallback = HR_HRSheet.CustomMethods.Callback.Delete_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
HR_HRSheet.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = HR_HRSheet.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = HR_HRSheet.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = HR_HRSheet.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = HR_HRSheet.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = HR_HRSheet.CustomMethods.Callback.ExportData_Completed;

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
HR_HRSheet.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    HR_HRSheet.InitialData = jsonObj;
    HR_HRSheet.Sheets = jsonObj.Sheets;  //Store the data to local object
    HR_HRSheet.CustomMethods.LocalOperations.PopulateSheetsTable();    //Populate the data to UI table

    $('#' + HR_HRSheet.uiElements.txtSerial).val(HR_HRSheet.InitialData.NewSerial);
    $('#' + HR_HRSheet.uiElements.txtSheetDate).val(Takaful.CommonMethods.GetFormattedDate(HR_HRSheet.InitialData.Date));
    //$('#' + HR_HRSheet.uiElements.txtMonth).val(HR_HRSheet.InitialData.Month);

    HR_HRSheet.InitialDataReady = true;

};

HR_HRSheet.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

HR_HRSheet.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save data
HR_HRSheet.CustomMethods.Callback.Save_Success = function (jsonObj) {


    if (!jsonObj || !jsonObj.Sheets || !jsonObj.Message) {
        return;
    }

    //Show loading
    Takaful.CommonMethods.HideLoading();

    if (jsonObj.Message == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, null, "success");
    }

    HR_HRSheet.InitialData = jsonObj;
    HR_HRSheet.SelectedSheetIndex = -1;  //Reset the selected item
    HR_HRSheet.Sheets = jsonObj.Sheets;  //Store the data to local object
    HR_HRSheet.CustomMethods.LocalOperations.PopulateSheetsTable();    //Populate the data to UI table

    $('#' + HR_HRSheet.uiElements.btnSave).show();
    $('#' + HR_HRSheet.uiElements.btnCancel).hide();

    $('#' + HR_HRSheet.uiElements.txtDateFrom).val('');
    $('#' + HR_HRSheet.uiElements.txtDateTo).val('');
    $('#' + HR_HRSheet.uiElements.txtSerial).val('');
    $('#' + HR_HRSheet.uiElements.txtSheetDate).val('');
    $('#' + HR_HRSheet.uiElements.txtMonth).val('');
    $('#' + HR_HRSheet.uiElements.txtNotes).val('');

    $('#' + HR_HRSheet.uiElements.txtSerial).val(HR_HRSheet.InitialData.NewSerial);
    $('#' + HR_HRSheet.uiElements.txtSheetDate).val(Takaful.CommonMethods.GetFormattedDate(HR_HRSheet.InitialData.Date));
    $('#' + HR_HRSheet.uiElements.txtMonth).val(HR_HRSheet.InitialData.Month);



};

HR_HRSheet.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {
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
        $('#' + HR_HRSheet.uiElements.btnSave).show();
    }




};

HR_HRSheet.CustomMethods.Callback.Save_Completed = function (xhr, status) {

};

//Delete data
HR_HRSheet.CustomMethods.Callback.Delete_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.Sheets || !jsonObj.Message) {
        return;
    }

    //Show loading
    Takaful.CommonMethods.HideLoading();

    if (jsonObj.Message == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم الحذف.", null, null, "success");
    } else if (jsonObj.Message == "ApprovedSheet") {
        Takaful.CommonMethods.ShowInfoMsg("لايمكن حذف هذا الكشف لوجود بيانات معتمدة اعتماد نهائى.", null, null, "error");
        return;
    }

    HR_HRSheet.InitialData = jsonObj;
    HR_HRSheet.SelectedSheetIndex = -1;  //Reset the selected item
    HR_HRSheet.Sheets = jsonObj.Sheets;  //Store the data to local object
    HR_HRSheet.CustomMethods.LocalOperations.PopulateSheetsTable();    //Populate the data to UI table

    $('#' + HR_HRSheet.uiElements.btnSave).show();
    $('#' + HR_HRSheet.uiElements.btnCancel).hide();

    $('#' + HR_HRSheet.uiElements.txtDateFrom).val('');
    $('#' + HR_HRSheet.uiElements.txtDateTo).val('');
    $('#' + HR_HRSheet.uiElements.txtSerial).val('');
    $('#' + HR_HRSheet.uiElements.txtSheetDate).val('');
    $('#' + HR_HRSheet.uiElements.txtMonth).val('');
    $('#' + HR_HRSheet.uiElements.txtNotes).val('');

    $('#' + HR_HRSheet.uiElements.txtSerial).val(HR_HRSheet.InitialData.NewSerial);
    $('#' + HR_HRSheet.uiElements.txtSheetDate).val(Takaful.CommonMethods.GetFormattedDate(HR_HRSheet.InitialData.Date));
    $('#' + HR_HRSheet.uiElements.txtMonth).val(HR_HRSheet.InitialData.Month);

};

HR_HRSheet.CustomMethods.Callback.Delete_Error = function (xhr, status, errorThrown) {
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

HR_HRSheet.CustomMethods.Callback.Delete_Completed = function (xhr, status) {

};

//Export data
HR_HRSheet.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.FullURL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + HR_HRSheet.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + HR_HRSheet.uiElements.btnExport).show();

    }, 5000);


};

HR_HRSheet.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

HR_HRSheet.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};








