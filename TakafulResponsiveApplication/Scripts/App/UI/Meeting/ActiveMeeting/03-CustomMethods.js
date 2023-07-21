
if (typeof Meeting_ActiveMeeting === 'undefined') {
    // Namespace does not exist, create a new one
    var Meeting_ActiveMeeting = {};
}

//Add the event handlers container object to the main namespace
Meeting_ActiveMeeting.CustomMethods = {};

//Add the event handlers container object to the main namespace
Meeting_ActiveMeeting.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Meeting_ActiveMeeting.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Meeting_ActiveMeeting.uiElements.lstEmployees).empty();
    $('#' + Meeting_ActiveMeeting.uiElements.txtDate).val('');
    $('#' + Meeting_ActiveMeeting.uiElements.chkIsOpenForEvaluation).prop('checked', false);


};


//Ajax functions
//--------------

//Get initial data
Meeting_ActiveMeeting.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_ActiveMeeting.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Meeting_ActiveMeeting.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Meeting_ActiveMeeting.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Meeting_ActiveMeeting.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save data
Meeting_ActiveMeeting.CustomMethods.AjaxCall.Save = function (meetingID, isOpenForEvaluation) {

    var submittedData = {};
    submittedData.MeetingID = meetingID;
    submittedData.IsOpenForEvaluation = isOpenForEvaluation;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_ActiveMeeting.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Meeting_ActiveMeeting.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = Meeting_ActiveMeeting.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = Meeting_ActiveMeeting.CustomMethods.Callback.Save_Completed;

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
Meeting_ActiveMeeting.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Meeting_ActiveMeeting.Meetings = jsonObj.Meetings;

    //Fill the meetings dropdown list
    var list = "";
    var activeMeetingID = '';

    for (var i = 0; i < jsonObj.Meetings.length; i++) {
        var id = jsonObj.Meetings[i].ID;
        var serial = jsonObj.Meetings[i].FormattedSerial;
        list += '<option value="' + id + '">' + serial + '</option>';
        if (jsonObj.Meetings[i].IsActive == true) {
            activeMeetingID = id.toString();
            $('#' + Meeting_ActiveMeeting.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.Meetings[i].Date));
            $('#' + Meeting_ActiveMeeting.uiElements.chkIsOpenForEvaluation).prop('checked', jsonObj.Meetings[i].IsOpenForEvaluation);
        }
    }

    if (list != '') {
        $('#' + Meeting_ActiveMeeting.uiElements.lstMeetings).html(list);
        $('#' + Meeting_ActiveMeeting.uiElements.lstMeetings).val(activeMeetingID);
    }


    Meeting_ActiveMeeting.InitialDataReady = true;

};

Meeting_ActiveMeeting.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Meeting_ActiveMeeting.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save data
Meeting_ActiveMeeting.CustomMethods.Callback.Save_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj == "AlreadySaved") {
        Takaful.CommonMethods.ShowInfoMsg("تم حفظ البيانات بالفعل.", null, null, "info");
        $('#' + Meeting_ActiveMeeting.uiElements.btnSave).show();
        return;
    }

    Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, null, "success");

    $('#' + Meeting_ActiveMeeting.uiElements.btnSave).show();

    //Update the check box value
    var meetingID = $('#' + Meeting_ActiveMeeting.uiElements.lstMeetings + ' option:selected').val();
    var isOpen = $('#' + Meeting_ActiveMeeting.uiElements.chkIsOpenForEvaluation).prop('checked');

    //Fill the employees dropdown list
    for (var i = 0; i < Meeting_ActiveMeeting.Meetings.length; i++) {
        if (Meeting_ActiveMeeting.Meetings[i].ID == meetingID) {
            Meeting_ActiveMeeting.Meetings[i].IsOpenForEvaluation = $('#' + Meeting_ActiveMeeting.uiElements.chkIsOpenForEvaluation).prop('checked');
        } else {
            Meeting_ActiveMeeting.Meetings[i].IsOpenForEvaluation = false;
        }
    }


};

Meeting_ActiveMeeting.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {
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
        $('#' + Meeting_ActiveMeeting.uiElements.btnSave).show();
    }




};

Meeting_ActiveMeeting.CustomMethods.Callback.Save_Completed = function (xhr, status) {

};





