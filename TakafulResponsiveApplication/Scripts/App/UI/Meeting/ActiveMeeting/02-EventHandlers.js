
//Check for main namespace
if (typeof Meeting_ActiveMeeting === 'undefined') {
    // Namespace does not exist, create a new one
    var Meeting_ActiveMeeting = {};
}

//Add the event handlers container object to the main namespace
Meeting_ActiveMeeting.EventHandlers = {};


//Employees dropdown list selection event
Meeting_ActiveMeeting.EventHandlers.lstMeetings_onchange = function () {

    if ($('#' + Meeting_ActiveMeeting.uiElements.lstMeetings)[0].selectedIndex < 0) {
        return;
    }

    $('#' + Meeting_ActiveMeeting.uiElements.lstMeetings).attr("disabled", "disabled");

    //Load the department of the selected employee
    var meetingID = $('#' + Meeting_ActiveMeeting.uiElements.lstMeetings + ' option:selected').val();

    //Fill the employees dropdown list
    for (var i = 0; i < Meeting_ActiveMeeting.Meetings.length; i++) {
        if (Meeting_ActiveMeeting.Meetings[i].ID == meetingID) {
            $('#' + Meeting_ActiveMeeting.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(Meeting_ActiveMeeting.Meetings[i].Date));
            $('#' + Meeting_ActiveMeeting.uiElements.chkIsOpenForEvaluation).prop('checked', Meeting_ActiveMeeting.Meetings[i].IsOpenForEvaluation);
            $('#' + Meeting_ActiveMeeting.uiElements.lstMeetings).removeAttr("disabled");
            return;
        }
    }


};

//Save the active meeting
Meeting_ActiveMeeting.EventHandlers.btnSave_click = function () {

    //Input validation
    //Selected meeting
    if ($('#' + Meeting_ActiveMeeting.uiElements.lstMeetings)[0].selectedIndex < 0) {
        $('#' + Meeting_ActiveMeeting.uiElements.lstMeetings).focus();
        Takaful.CommonMethods.ShowInfoMsg('من فضلك إختر الإجتماع أولاً.', null, null, "error");
        return;
    }

    var meetingID = $('#' + Meeting_ActiveMeeting.uiElements.lstMeetings + ' option:selected').val();
    var isOpen = $('#' + Meeting_ActiveMeeting.uiElements.chkIsOpenForEvaluation).prop('checked');

    //Save data
    Meeting_ActiveMeeting.CustomMethods.AjaxCall.Save(meetingID, isOpen);

    $('#' + Meeting_ActiveMeeting.uiElements.btnSave).hide();

};




