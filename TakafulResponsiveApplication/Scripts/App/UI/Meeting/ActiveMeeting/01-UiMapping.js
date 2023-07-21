
//Check for main namespace
if (typeof Meeting_ActiveMeeting === 'undefined') {
    // Namespace does not exist, create a new one
    var Meeting_ActiveMeeting = {};
}


//Add the ui elements container object to the main namespace
Meeting_ActiveMeeting.uiElements = {};

//Map each ui element to a variable
Meeting_ActiveMeeting.uiElements.lstMeetings = "lstMeetings";
Meeting_ActiveMeeting.uiElements.txtDate = "txtDate";
Meeting_ActiveMeeting.uiElements.chkIsOpenForEvaluation = "chkIsOpenForEvaluation";
Meeting_ActiveMeeting.uiElements.btnSave = "btnSave";
Meeting_ActiveMeeting.uiElements.btnHistoryBack = "btnHistoryBack";







