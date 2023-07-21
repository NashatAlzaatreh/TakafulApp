
if (typeof Meeting_MeetingList === 'undefined') {
    // Namespace does not exist, create a new one
    var Meeting_MeetingList = {};
}

//Add the event handlers container object to the main namespace
Meeting_MeetingList.CustomMethods = {};

//Add the event handlers container object to the main namespace
Meeting_MeetingList.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Meeting_MeetingList.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Meeting_MeetingList.uiElements.txtDateFrom).val('');
    $('#' + Meeting_MeetingList.uiElements.txtDateTo).val('');
    $('#' + Meeting_MeetingList.uiElements.txtSerial).val('');
    $('#' + Meeting_MeetingList.uiElements.txtMeetingDate).val('');
    $('#' + Meeting_MeetingList.uiElements.txtNotes).val('');
    $('#' + Meeting_MeetingList.uiElements.tblMeetings).empty();

};

//Populate the UI table with the array data
Meeting_MeetingList.CustomMethods.LocalOperations.PopulateMeetingsTable = function () {

    var htmlData = '';

    if (Meeting_MeetingList.Meetings.length > 0) {
        for (var i = 0; i < Meeting_MeetingList.Meetings.length; i++) {
            htmlData += '<tr>' +
                '<td>' + Meeting_MeetingList.Meetings[i].FormattedSerial + '</td>' +
                '<td>' + Takaful.CommonMethods.GetFormattedDate(Meeting_MeetingList.Meetings[i].Date) + '</td>' +
                '<td class="hide-for-small">' + Meeting_MeetingList.Meetings[i].Notes + '</td>' +
                '<td>' +
                '<div class="row collapse">' +
                '<div class="large-6 columns" onclick="Meeting_MeetingList.EventHandlers.btnEdit_click(' + i.toString() + ')"><div class="subscribe-btn3"><i class="fa fa-edit"></i></div></div>' +
                '<div class="large-6  columns" onclick="Meeting_MeetingList.EventHandlers.btnDelete_click(' + i.toString() + ')"><div class="subscribe-btn3"><i class="fa fa-remove"></i></div></div>' +
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

    $('#' + Meeting_MeetingList.uiElements.tblMeetings).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Prepare data for export
Meeting_MeetingList.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];


    //Add header
    dataArr.push([
        "رقم الإجتماع",
        "تاريخ الإجتماع",
        "ملاحظات"
    ]);

    if (Meeting_MeetingList.Meetings.length > 0) {
        for (var i = 0; i < Meeting_MeetingList.Meetings.length; i++) {
            var arrElement = [
                Meeting_MeetingList.Meetings[i].FormattedSerial,
                Takaful.CommonMethods.GetFormattedDate(Meeting_MeetingList.Meetings[i].Date),
                Meeting_MeetingList.Meetings[i].Notes
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
Meeting_MeetingList.CustomMethods.AjaxCall.GetInitialData = function (fromDate, toDate) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_MeetingList.ServiceUrl + '/InitialData?fromDate=' + fromDate + '&toDate=' + toDate;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Meeting_MeetingList.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Meeting_MeetingList.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Meeting_MeetingList.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save meeting data
Meeting_MeetingList.CustomMethods.AjaxCall.Save = function (meetingID, date, notes) {

    var submittedData = {};
    submittedData.MeetingID = meetingID;
    submittedData.Date = date;
    submittedData.Notes = notes;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_MeetingList.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Meeting_MeetingList.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = Meeting_MeetingList.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = Meeting_MeetingList.CustomMethods.Callback.Save_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Delete meeting
Meeting_MeetingList.CustomMethods.AjaxCall.Delete = function (meetingID) {

    var submittedData = {};
    submittedData.ID = meetingID;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_MeetingList.ServiceUrl + '/Delete';
    requestOptions.RequestType = "DELETE";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Meeting_MeetingList.CustomMethods.Callback.Delete_Success;
    requestOptions.ErrorCallback = Meeting_MeetingList.CustomMethods.Callback.Delete_Error;
    requestOptions.CompletedCallback = Meeting_MeetingList.CustomMethods.Callback.Delete_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
Meeting_MeetingList.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = Meeting_MeetingList.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_MeetingList.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = Meeting_MeetingList.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = Meeting_MeetingList.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = Meeting_MeetingList.CustomMethods.Callback.ExportData_Completed;

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
Meeting_MeetingList.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Meeting_MeetingList.Meetings = jsonObj.Meetings;  //Store the data to local object
    Meeting_MeetingList.CustomMethods.LocalOperations.PopulateMeetingsTable();    //Populate the data to UI table

    Meeting_MeetingList.InitialDataReady = true;

};

Meeting_MeetingList.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Meeting_MeetingList.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save data
Meeting_MeetingList.CustomMethods.Callback.Save_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.Meetings || !jsonObj.Message) {
        return;
    }

    Meeting_MeetingList.SelectedMeetingIndex = -1;  //Reset the selected item
    Meeting_MeetingList.Meetings = jsonObj.Meetings;  //Store the data to local object
    Meeting_MeetingList.CustomMethods.LocalOperations.PopulateMeetingsTable();    //Populate the data to UI table

    if (jsonObj.Message == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, null, "success");
    } else if (jsonObj.Message == "MeetingWithLaterDateExists") {
        Takaful.CommonMethods.ShowInfoMsg("تم الحفظ ، ولكن يوجد اجتماعات سابقة مسجلة بتاريخ لاحق لهذا الإجتماع.", null, null, "success");
    }

    $('#' + Meeting_MeetingList.uiElements.btnSave).show();
    $('#' + Meeting_MeetingList.uiElements.btnCancel).hide();

    $('#' + Meeting_MeetingList.uiElements.txtDateFrom).val('');
    $('#' + Meeting_MeetingList.uiElements.txtDateTo).val('');
    $('#' + Meeting_MeetingList.uiElements.txtSerial).val('');
    $('#' + Meeting_MeetingList.uiElements.txtMeetingDate).val('');
    $('#' + Meeting_MeetingList.uiElements.txtNotes).val('');




};

Meeting_MeetingList.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {
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
        $('#' + Meeting_MeetingList.uiElements.btnSave).show();
    }




};

Meeting_MeetingList.CustomMethods.Callback.Save_Completed = function (xhr, status) {

};

//Delete data
Meeting_MeetingList.CustomMethods.Callback.Delete_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.Meetings || !jsonObj.Message) {
        return;
    }

    if (jsonObj.Message == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم الحذف.", null, null, "success");
    } else if (jsonObj.Message == "DataRelationExists") {
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_ErrorDeleteWithRelatedData, null, 0, "error");
        return;
    }

    Meeting_MeetingList.SelectedMeetingIndex = -1;  //Reset the selected item
    Meeting_MeetingList.Meetings = jsonObj.Meetings;  //Store the data to local object
    Meeting_MeetingList.CustomMethods.LocalOperations.PopulateMeetingsTable();    //Populate the data to UI table

    $('#' + Meeting_MeetingList.uiElements.btnSave).show();
    $('#' + Meeting_MeetingList.uiElements.btnCancel).hide();

    $('#' + Meeting_MeetingList.uiElements.txtDateFrom).val('');
    $('#' + Meeting_MeetingList.uiElements.txtDateTo).val('');
    $('#' + Meeting_MeetingList.uiElements.txtSerial).val('');
    $('#' + Meeting_MeetingList.uiElements.txtMeetingDate).val('');
    $('#' + Meeting_MeetingList.uiElements.txtNotes).val('');


};

Meeting_MeetingList.CustomMethods.Callback.Delete_Error = function (xhr, status, errorThrown) {
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

Meeting_MeetingList.CustomMethods.Callback.Delete_Completed = function (xhr, status) {

};

//Export data
Meeting_MeetingList.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.FullURL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + Meeting_MeetingList.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Meeting_MeetingList.uiElements.btnExport).show();

    }, 5000);


};

Meeting_MeetingList.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

Meeting_MeetingList.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};








