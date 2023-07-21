
//Check for main namespace
if (typeof Meeting_MeetingRequestsDecisions === 'undefined') {
    // Namespace does not exist, create a new one
    var Meeting_MeetingRequestsDecisions = {};
}

//Add the event handlers container object to the main namespace
Meeting_MeetingRequestsDecisions.EventHandlers = {};


//Employees dropdown list selection event
Meeting_MeetingRequestsDecisions.EventHandlers.lstMeetings_onchange = function () {

    if ($('#' + Meeting_MeetingRequestsDecisions.uiElements.lstMeetings)[0].selectedIndex < 0) {
        return;
    }

    $('#' + Meeting_MeetingRequestsDecisions.uiElements.lstMeetings).attr("disabled", "disabled");

    //Load the department of the selected employee
    var meetingID = $('#' + Meeting_MeetingRequestsDecisions.uiElements.lstMeetings + ' option:selected').val();

    //Fill the employees dropdown list
    for (var i = 0; i < Meeting_MeetingRequestsDecisions.Meetings.length; i++) {
        if (Meeting_MeetingRequestsDecisions.Meetings[i].ID == meetingID) {
            $('#' + Meeting_MeetingRequestsDecisions.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(Meeting_MeetingRequestsDecisions.Meetings[i].Date));
            $('#' + Meeting_MeetingRequestsDecisions.uiElements.txtNotes).val(Meeting_MeetingRequestsDecisions.Meetings[i].Notes);
            //Get the requests assigned to this meeting
            Meeting_MeetingRequestsDecisions.CustomMethods.AjaxCall.GetMeetingRequests(meetingID);
            return;
        }
    }


};

