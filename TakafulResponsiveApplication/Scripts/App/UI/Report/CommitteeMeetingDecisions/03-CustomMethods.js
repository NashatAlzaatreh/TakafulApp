
if (typeof Report_CommitteeMeetingDecisions === 'undefined') {
    // Namespace does not exist, create a new one
    var Report_CommitteeMeetingDecisions = {};
}

//Add the event handlers container object to the main namespace
Report_CommitteeMeetingDecisions.CustomMethods = {};

//Add the event handlers container object to the main namespace
Report_CommitteeMeetingDecisions.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Report_CommitteeMeetingDecisions.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Report_CommitteeMeetingDecisions.uiElements.lstEmployees).empty();
    $('#' + Report_CommitteeMeetingDecisions.uiElements.txtDate).val('');


};


//Ajax functions
//--------------

//Get initial data
Report_CommitteeMeetingDecisions.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Report_CommitteeMeetingDecisions.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Report_CommitteeMeetingDecisions.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Report_CommitteeMeetingDecisions.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Report_CommitteeMeetingDecisions.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save data
Report_CommitteeMeetingDecisions.CustomMethods.AjaxCall.Export = function (meetingID) {

    //var submittedData = {};
    //submittedData.MeetingID = meetingID;
    //var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Report_CommitteeMeetingDecisions.ServiceUrl + '/Export?meetingID=' + meetingID;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Report_CommitteeMeetingDecisions.CustomMethods.Callback.Export_Success;
    requestOptions.ErrorCallback = Report_CommitteeMeetingDecisions.CustomMethods.Callback.Export_Error;
    requestOptions.CompletedCallback = Report_CommitteeMeetingDecisions.CustomMethods.Callback.Export_Completed;

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
Report_CommitteeMeetingDecisions.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Report_CommitteeMeetingDecisions.Meetings = jsonObj.Meetings;

    //Fill the meetings dropdown list
    var list = "";
    var activeMeetingID = '';

    for (var i = 0; i < jsonObj.Meetings.length; i++) {
        var id = jsonObj.Meetings[i].ID;
        var serial = jsonObj.Meetings[i].FormattedSerial;
        list += '<option value="' + id + '">' + serial + '</option>';
    }

    if (list != '') {
        $('#' + Report_CommitteeMeetingDecisions.uiElements.lstMeetings).html(list);
        $('#' + Report_CommitteeMeetingDecisions.uiElements.lstMeetings).val('');
    }


    Report_CommitteeMeetingDecisions.InitialDataReady = true;

};

Report_CommitteeMeetingDecisions.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Report_CommitteeMeetingDecisions.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Export data
Report_CommitteeMeetingDecisions.CustomMethods.Callback.Export_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.FullURL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    Takaful.CommonMethods.ShowInfoMsg('تم استخراج الملف.', null, null, "success");

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Report_CommitteeMeetingDecisions.uiElements.btnExport).show();

    }, 5000);




};

Report_CommitteeMeetingDecisions.CustomMethods.Callback.Export_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    //Show export button
    $("#" + Report_CommitteeMeetingDecisions.uiElements.btnExport).show();

    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../User/Login.html");
    } else if (xhr.responseText == "NoDataToExport") {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, 0, "error");
    } else {
        Takaful.CommonMethods.ShowInfoMsg("لايمكن إتمام طلبك الأن.", null, 0, "error");
    }




};

Report_CommitteeMeetingDecisions.CustomMethods.Callback.Export_Completed = function (xhr, status) {

};





