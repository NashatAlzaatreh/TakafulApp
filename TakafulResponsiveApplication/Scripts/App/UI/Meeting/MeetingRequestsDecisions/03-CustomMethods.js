
if (typeof Meeting_MeetingRequestsDecisions === 'undefined') {
    // Namespace does not exist, create a new one
    var Meeting_MeetingRequestsDecisions = {};
}

//Add the event handlers container object to the main namespace
Meeting_MeetingRequestsDecisions.CustomMethods = {};

//Add the event handlers container object to the main namespace
Meeting_MeetingRequestsDecisions.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Meeting_MeetingRequestsDecisions.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Meeting_MeetingRequestsDecisions.uiElements.lstEmployees).empty();
    $('#' + Meeting_MeetingRequestsDecisions.uiElements.txtDate).val('');
    $('#' + Meeting_MeetingRequestsDecisions.uiElements.txtNotes).val('');
    $('#' + Meeting_MeetingRequestsDecisions.uiElements.tblAllRequests).empty();
    $('#' + Meeting_MeetingRequestsDecisions.uiElements.tblMeetingRequests).empty();


};

//Populate the meeting requests UI table with the array data
Meeting_MeetingRequestsDecisions.CustomMethods.LocalOperations.PopulateMeetingRequestsTable = function () {

    var htmlData = '';

    if (Meeting_MeetingRequestsDecisions.MeetingRequests.length > 0) {
        for (var i = 0; i < Meeting_MeetingRequestsDecisions.MeetingRequests.length; i++) {
            htmlData += '<tr>' +
                '<td>' + Meeting_MeetingRequestsDecisions.MeetingRequests[i].EmployeeNumber + '</td>' +
                '<td>' + Meeting_MeetingRequestsDecisions.MeetingRequests[i].Name + '</td>' +
                '<td class="hide-for-small">' + Meeting_MeetingRequestsDecisions.MeetingRequests[i].Department + '</td>' +
                '<td class="hide-for-small">' + Takaful.CommonMethods.GetFormattedDate(Meeting_MeetingRequestsDecisions.MeetingRequests[i].RequestDate) + '</td>' +
                '<td class="hide-for-small">' + Meeting_MeetingRequestsDecisions.MeetingRequests[i].Type + '</td>' +
                '<td>' + Meeting_MeetingRequestsDecisions.MeetingRequests[i].Status + '</td>' +
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

    $('#' + Meeting_MeetingRequestsDecisions.uiElements.tblMeetingRequests).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};


//Ajax functions
//--------------

//Get initial data
Meeting_MeetingRequestsDecisions.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_MeetingRequestsDecisions.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Meeting_MeetingRequestsDecisions.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Meeting_MeetingRequestsDecisions.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Meeting_MeetingRequestsDecisions.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Get meeting requsts
Meeting_MeetingRequestsDecisions.CustomMethods.AjaxCall.GetMeetingRequests = function (meetingID) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_MeetingRequestsDecisions.ServiceUrl + '/MeetingRequests?meetingID=' + meetingID;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Meeting_MeetingRequestsDecisions.CustomMethods.Callback.GetMeetingRequests_Success;
    requestOptions.ErrorCallback = Meeting_MeetingRequestsDecisions.CustomMethods.Callback.GetMeetingRequests_Error;
    requestOptions.CompletedCallback = Meeting_MeetingRequestsDecisions.CustomMethods.Callback.GetMeetingRequests_Completed;

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
Meeting_MeetingRequestsDecisions.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.Meetings) {
        return;
    }

    Meeting_MeetingRequestsDecisions.Meetings = jsonObj.Meetings;

    //Fill the meetings dropdown list
    var list = "";
    var activeMeetingID = '';

    for (var i = 0; i < jsonObj.Meetings.length; i++) {
        var id = jsonObj.Meetings[i].ID;
        var serial = jsonObj.Meetings[i].FormattedSerial;
        list += '<option value="' + id + '">' + serial + '</option>';
        if (jsonObj.Meetings[i].IsActive == true) {
            activeMeetingID = id.toString();
            $('#' + Meeting_MeetingRequestsDecisions.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.Meetings[i].Date));
            $('#' + Meeting_MeetingRequestsDecisions.uiElements.txtNotes).val(jsonObj.Meetings[i].Notes);
        }
    }

    if (list != '') {
        $('#' + Meeting_MeetingRequestsDecisions.uiElements.lstMeetings).html(list);
        $('#' + Meeting_MeetingRequestsDecisions.uiElements.lstMeetings).val(activeMeetingID);
    }

    //Fill the requests table
    Meeting_MeetingRequestsDecisions.CustomMethods.LocalOperations.PopulateMeetingRequestsTable();   //No data exists, but adding the empty row

    //Check if there is a selected meeting
    if (activeMeetingID != '') {
        Meeting_MeetingRequestsDecisions.EventHandlers.lstMeetings_onchange();
    }

    Meeting_MeetingRequestsDecisions.InitialDataReady = true;

};

Meeting_MeetingRequestsDecisions.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Meeting_MeetingRequestsDecisions.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Get meeting requsts
Meeting_MeetingRequestsDecisions.CustomMethods.Callback.GetMeetingRequests_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Meeting_MeetingRequestsDecisions.MeetingRequests = jsonObj;

    //Fill the meeting requests table
    Meeting_MeetingRequestsDecisions.CustomMethods.LocalOperations.PopulateMeetingRequestsTable();

    $('#' + Meeting_MeetingRequestsDecisions.uiElements.lstMeetings).removeAttr("disabled"); //Enable the meetings list
    $('#' + Meeting_MeetingRequestsDecisions.uiElements.txtRequestCount).val(jsonObj.length);


};

Meeting_MeetingRequestsDecisions.CustomMethods.Callback.GetMeetingRequests_Error = function (xhr, status, errorThrown) {
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

    $('#' + Meeting_MeetingRequestsDecisions.uiElements.lstMeetings).removeAttr("disabled"); //Enable the meetings list


};

Meeting_MeetingRequestsDecisions.CustomMethods.Callback.GetMeetingRequests_Completed = function (xhr, status) {

};


