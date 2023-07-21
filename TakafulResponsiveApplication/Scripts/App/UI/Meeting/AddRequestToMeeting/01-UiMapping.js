
//Check for main namespace
if (typeof Meeting_AddRequestToMeeting === 'undefined') {
    // Namespace does not exist, create a new one
    var Meeting_AddRequestToMeeting = {};
}


//Add the ui elements container object to the main namespace
Meeting_AddRequestToMeeting.uiElements = {};

//Map each ui element to a variable
Meeting_AddRequestToMeeting.uiElements.lstMeetings = "lstMeetings";
Meeting_AddRequestToMeeting.uiElements.txtDate = "txtDate";
Meeting_AddRequestToMeeting.uiElements.txtRequestCount = "txtRequestCount";
Meeting_AddRequestToMeeting.uiElements.txtNotes = "txtNotes";
Meeting_AddRequestToMeeting.uiElements.tblAllRequests = "tblAllRequests";
Meeting_AddRequestToMeeting.uiElements.tblMeetingRequests = "tblMeetingRequests";
Meeting_AddRequestToMeeting.uiElements.btnHistoryBack = "btnHistoryBack";







