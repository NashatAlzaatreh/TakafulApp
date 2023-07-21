
if (typeof Meeting_AddRequestToMeeting === 'undefined') {
    // Namespace does not exist, create a new one
    var Meeting_AddRequestToMeeting = {};
}

//Add the event handlers container object to the main namespace
Meeting_AddRequestToMeeting.CustomMethods = {};

//Add the event handlers container object to the main namespace
Meeting_AddRequestToMeeting.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Meeting_AddRequestToMeeting.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Meeting_AddRequestToMeeting.uiElements.lstEmployees).empty();
    $('#' + Meeting_AddRequestToMeeting.uiElements.txtDate).val('');
    $('#' + Meeting_AddRequestToMeeting.uiElements.txtNotes).val('');
    $('#' + Meeting_AddRequestToMeeting.uiElements.tblAllRequests).empty();
    $('#' + Meeting_AddRequestToMeeting.uiElements.tblMeetingRequests).empty();


};

//Populate the all requests UI table with the array data
Meeting_AddRequestToMeeting.CustomMethods.LocalOperations.PopulateAllRequestsTable = function () {

    var htmlData = '';

    if (Meeting_AddRequestToMeeting.AllRequests.length > 0) {
        for (var i = 0; i < Meeting_AddRequestToMeeting.AllRequests.length; i++) {
            htmlData += '<tr>' +
                '<td>' + Meeting_AddRequestToMeeting.AllRequests[i].EmployeeNumber + '</td>' +
                '<td>' + Meeting_AddRequestToMeeting.AllRequests[i].Name + '</td>' +
                '<td class="hide-for-small">' + Meeting_AddRequestToMeeting.AllRequests[i].Department + '</td>' +
                '<td class="hide-for-small">' + Takaful.CommonMethods.GetFormattedDate(Meeting_AddRequestToMeeting.AllRequests[i].RequestDate) + '</td>' +
                '<td class="hide-for-small">' + Meeting_AddRequestToMeeting.AllRequests[i].Type + '</td>' +
                '<td class="text-center">' +
                '<div class="row collapse">' +
                '<div class="large-12 columns " onclick="Meeting_AddRequestToMeeting.EventHandlers.btnAdd_click(' + i.toString() + ')"><div class="subscribe-btn4"><i class="fa fa-plus">&nbsp; إضافة</i></div></div>' +
                '</div>' +
                '</td>' +
                '</tr>';
        }
    } else {
        htmlData = '<tr>' +
        '<td class="text-center" colspan="6">لايوجد بيانات</td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '</tr>';
    }

    Takaful.CommonMethods.TerminateDataTable('mainTable');  //Terminate table object

    $('#' + Meeting_AddRequestToMeeting.uiElements.tblAllRequests).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Populate the meeting requests UI table with the array data
Meeting_AddRequestToMeeting.CustomMethods.LocalOperations.PopulateMeetingRequestsTable = function () {

    var htmlData = '';

    if (Meeting_AddRequestToMeeting.MeetingRequests.length > 0) {
        for (var i = 0; i < Meeting_AddRequestToMeeting.MeetingRequests.length; i++) {
            htmlData += '<tr>' +
                '<td>' + Meeting_AddRequestToMeeting.MeetingRequests[i].EmployeeNumber + '</td>' +
                '<td>' + Meeting_AddRequestToMeeting.MeetingRequests[i].Name + '</td>' +
                '<td class="hide-for-small">' + Meeting_AddRequestToMeeting.MeetingRequests[i].Department + '</td>' +
                '<td class="hide-for-small">' + Takaful.CommonMethods.GetFormattedDate(Meeting_AddRequestToMeeting.MeetingRequests[i].RequestDate) + '</td>' +
                '<td class="hide-for-small">' + Meeting_AddRequestToMeeting.MeetingRequests[i].Type + '</td>' +
                '<td class="text-center">' +
                '<div class="row collapse">' +
                '<div class="large-12 columns " onclick="Meeting_AddRequestToMeeting.EventHandlers.btnRemove_click(' + i.toString() + ')"><div class="subscribe-btn4"><i class="fa fa-minus">&nbsp; حذف</i></div></div>' +
                '</div>' +
                '</td>' +
                '</tr>';
        }
    } else {
        htmlData = '<tr>' +
        '<td class="text-center" colspan="6">لايوجد بيانات</td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '</tr>';
    }

    Takaful.CommonMethods.TerminateDataTable('mainTable2');  //Terminate table object

    $('#' + Meeting_AddRequestToMeeting.uiElements.tblMeetingRequests).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable2');

};


//Ajax functions
//--------------

//Get initial data
Meeting_AddRequestToMeeting.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_AddRequestToMeeting.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Meeting_AddRequestToMeeting.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Meeting_AddRequestToMeeting.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Meeting_AddRequestToMeeting.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Get meeting requsts
Meeting_AddRequestToMeeting.CustomMethods.AjaxCall.GetMeetingRequests = function (meetingID) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_AddRequestToMeeting.ServiceUrl + '/MeetingRequests?meetingID=' + meetingID;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Meeting_AddRequestToMeeting.CustomMethods.Callback.GetMeetingRequests_Success;
    requestOptions.ErrorCallback = Meeting_AddRequestToMeeting.CustomMethods.Callback.GetMeetingRequests_Error;
    requestOptions.CompletedCallback = Meeting_AddRequestToMeeting.CustomMethods.Callback.GetMeetingRequests_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Add request to meeting
Meeting_AddRequestToMeeting.CustomMethods.AjaxCall.AddRequestToMeeting = function (meetingID, empID, year, serial, typeID) {

    var submittedData = {};
    submittedData.MeetingID = meetingID;
    submittedData.EmpID = empID;
    submittedData.Year = year;
    submittedData.Serial = serial;
    submittedData.TypeID = typeID;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_AddRequestToMeeting.ServiceUrl + '/Add';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Meeting_AddRequestToMeeting.CustomMethods.Callback.AddRequestToMeeting_Success;
    requestOptions.ErrorCallback = Meeting_AddRequestToMeeting.CustomMethods.Callback.AddRequestToMeeting_Error;
    requestOptions.CompletedCallback = Meeting_AddRequestToMeeting.CustomMethods.Callback.AddRequestToMeeting_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Remove request from meeting
Meeting_AddRequestToMeeting.CustomMethods.AjaxCall.RemoveRequestFromMeeting = function (meetingID, empID, year, serial, typeID) {

    var submittedData = {};
    submittedData.MeetingID = meetingID;
    submittedData.EmpID = empID;
    submittedData.Year = year;
    submittedData.Serial = serial;
    submittedData.TypeID = typeID;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_AddRequestToMeeting.ServiceUrl + '/Remove';
    requestOptions.RequestType = "Delete";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Meeting_AddRequestToMeeting.CustomMethods.Callback.RemoveRequestFromMeeting_Success;
    requestOptions.ErrorCallback = Meeting_AddRequestToMeeting.CustomMethods.Callback.RemoveRequestFromMeeting_Error;
    requestOptions.CompletedCallback = Meeting_AddRequestToMeeting.CustomMethods.Callback.RemoveRequestFromMeeting_Completed;

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
Meeting_AddRequestToMeeting.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.Meetings || !jsonObj.AllRequests) {
        return;
    }

    Meeting_AddRequestToMeeting.Meetings = jsonObj.Meetings;
    Meeting_AddRequestToMeeting.AllRequests = jsonObj.AllRequests;

    //Fill the meetings dropdown list
    var list = "";
    var activeMeetingID = '';

    for (var i = 0; i < jsonObj.Meetings.length; i++) {
        var id = jsonObj.Meetings[i].ID;
        var serial = jsonObj.Meetings[i].FormattedSerial;
        list += '<option value="' + id + '">' + serial + '</option>';
        if (jsonObj.Meetings[i].IsActive == true) {
            activeMeetingID = id.toString();
            $('#' + Meeting_AddRequestToMeeting.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.Meetings[i].Date));
            $('#' + Meeting_AddRequestToMeeting.uiElements.txtNotes).val(jsonObj.Meetings[i].Notes);
        }
    }

    if (list != '') {
        $('#' + Meeting_AddRequestToMeeting.uiElements.lstMeetings).html(list);
        $('#' + Meeting_AddRequestToMeeting.uiElements.lstMeetings).val(activeMeetingID);
    }

    //Fill the requests table
    Meeting_AddRequestToMeeting.CustomMethods.LocalOperations.PopulateAllRequestsTable();
    Meeting_AddRequestToMeeting.CustomMethods.LocalOperations.PopulateMeetingRequestsTable();   //No data exists, but adding the empty row

    //Check if there is a selected meeting
    if (activeMeetingID != '') {
        Meeting_AddRequestToMeeting.EventHandlers.lstMeetings_onchange();
    }

    Meeting_AddRequestToMeeting.InitialDataReady = true;

};

Meeting_AddRequestToMeeting.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Meeting_AddRequestToMeeting.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Get meeting requsts
Meeting_AddRequestToMeeting.CustomMethods.Callback.GetMeetingRequests_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Meeting_AddRequestToMeeting.MeetingRequests = jsonObj;

    //Fill the meeting requests table
    Meeting_AddRequestToMeeting.CustomMethods.LocalOperations.PopulateMeetingRequestsTable();

    $('#' + Meeting_AddRequestToMeeting.uiElements.lstMeetings).removeAttr("disabled"); //Enable the meetings list
    $('#' + Meeting_AddRequestToMeeting.uiElements.txtRequestCount).val(jsonObj.length);

    Meeting_AddRequestToMeeting.InitialDataReady = true;

};

Meeting_AddRequestToMeeting.CustomMethods.Callback.GetMeetingRequests_Error = function (xhr, status, errorThrown) {
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

    $('#' + Meeting_AddRequestToMeeting.uiElements.lstMeetings).removeAttr("disabled"); //Enable the meetings list


};

Meeting_AddRequestToMeeting.CustomMethods.Callback.GetMeetingRequests_Completed = function (xhr, status) {

};

//Add request to meeting
Meeting_AddRequestToMeeting.CustomMethods.Callback.AddRequestToMeeting_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj.Message == "PastDate") {
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن إضافة طلبات جديدة للاجتماعات السابقة.", null, null, "error");
        return;
    }

    Meeting_AddRequestToMeeting.AllRequests = jsonObj.AllRequests;
    Meeting_AddRequestToMeeting.MeetingRequests = jsonObj.MeetingRequests;

    //Fill the requests table
    Meeting_AddRequestToMeeting.CustomMethods.LocalOperations.PopulateAllRequestsTable();
    Meeting_AddRequestToMeeting.CustomMethods.LocalOperations.PopulateMeetingRequestsTable();
    $('#' + Meeting_AddRequestToMeeting.uiElements.txtRequestCount).val(jsonObj.MeetingRequests.length);

    Takaful.CommonMethods.ShowInfoMsg("تم إضافة الطلب لهذا الإجتماع.", null, null, "success");


};

Meeting_AddRequestToMeeting.CustomMethods.Callback.AddRequestToMeeting_Error = function (xhr, status, errorThrown) {
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

Meeting_AddRequestToMeeting.CustomMethods.Callback.AddRequestToMeeting_Completed = function (xhr, status) {

};

//Remove request from meeting
Meeting_AddRequestToMeeting.CustomMethods.Callback.RemoveRequestFromMeeting_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj.Message == "RelatedDecisions") {
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن حذف الطلب من هذا الإجتماع لوجود قرارات متعلقة به من أعضاء اللجنة.", null, null, "error");
        return;
    }

    if (jsonObj.Message == "PastDate") {
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن حذف طلبات من الاجتماعات السابقة.", null, null, "error");
        return;
    }

    Meeting_AddRequestToMeeting.AllRequests = jsonObj.AllRequests;
    Meeting_AddRequestToMeeting.MeetingRequests = jsonObj.MeetingRequests;

    //Fill the requests table
    Meeting_AddRequestToMeeting.CustomMethods.LocalOperations.PopulateAllRequestsTable();
    Meeting_AddRequestToMeeting.CustomMethods.LocalOperations.PopulateMeetingRequestsTable();
    $('#' + Meeting_AddRequestToMeeting.uiElements.txtRequestCount).val(jsonObj.MeetingRequests.length);

    Takaful.CommonMethods.ShowInfoMsg("تم حذف الطلب من هذا الإجتماع.", null, null, "success");


};

Meeting_AddRequestToMeeting.CustomMethods.Callback.RemoveRequestFromMeeting_Error = function (xhr, status, errorThrown) {
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
        $('#' + Meeting_AddRequestToMeeting.uiElements.btnSave).show();
    }




};

Meeting_AddRequestToMeeting.CustomMethods.Callback.RemoveRequestFromMeeting_Completed = function (xhr, status) {

};



