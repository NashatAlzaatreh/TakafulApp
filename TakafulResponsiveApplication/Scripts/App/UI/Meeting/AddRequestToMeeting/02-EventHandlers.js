
//Check for main namespace
if (typeof Meeting_AddRequestToMeeting === 'undefined') {
    // Namespace does not exist, create a new one
    var Meeting_AddRequestToMeeting = {};
}

//Add the event handlers container object to the main namespace
Meeting_AddRequestToMeeting.EventHandlers = {};


//Employees dropdown list selection event
Meeting_AddRequestToMeeting.EventHandlers.lstMeetings_onchange = function () {

    if ($('#' + Meeting_AddRequestToMeeting.uiElements.lstMeetings)[0].selectedIndex < 0) {
        return;
    }

    $('#' + Meeting_AddRequestToMeeting.uiElements.lstMeetings).attr("disabled", "disabled");

    //Load the department of the selected employee
    var meetingID = $('#' + Meeting_AddRequestToMeeting.uiElements.lstMeetings + ' option:selected').val();

    //Fill the employees dropdown list
    for (var i = 0; i < Meeting_AddRequestToMeeting.Meetings.length; i++) {
        if (Meeting_AddRequestToMeeting.Meetings[i].ID == meetingID) {
            $('#' + Meeting_AddRequestToMeeting.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(Meeting_AddRequestToMeeting.Meetings[i].Date));
            $('#' + Meeting_AddRequestToMeeting.uiElements.txtNotes).val(Meeting_AddRequestToMeeting.Meetings[i].Notes);
            //Get the requests assigned to this meeting
            Meeting_AddRequestToMeeting.CustomMethods.AjaxCall.GetMeetingRequests(meetingID);
            return;
        }
    }


};

//Add the selected request to the selected meeting
Meeting_AddRequestToMeeting.EventHandlers.btnAdd_click = function (index) {

    if (index >= 0) {

        //Check if selected meeting
        if ($('#' + Meeting_AddRequestToMeeting.uiElements.lstMeetings)[0].selectedIndex < 0) {
            $('#' + Meeting_AddRequestToMeeting.uiElements.lstMeetings).focus();
            Takaful.CommonMethods.ShowInfoMsg('من فضلك إختر الإجتماع أولاً.', null, null, "error");
            return;
        }

        var meetingID = $('#' + Meeting_AddRequestToMeeting.uiElements.lstMeetings + ' option:selected').val();

        //Get the selected request data
        var empID = Meeting_AddRequestToMeeting.AllRequests[index].EmployeeNumber;
        var year = Meeting_AddRequestToMeeting.AllRequests[index].Year;
        var serial = Meeting_AddRequestToMeeting.AllRequests[index].Serial;
        var typeID = Meeting_AddRequestToMeeting.AllRequests[index].TypeID;

        //Save
        Meeting_AddRequestToMeeting.CustomMethods.AjaxCall.AddRequestToMeeting(meetingID, empID, year, serial, typeID);
    }

};

//Remove the selected request from the selected meeting
Meeting_AddRequestToMeeting.EventHandlers.btnRemove_click = function (index) {

    if (index >= 0) {

        //Check if selected meeting
        if ($('#' + Meeting_AddRequestToMeeting.uiElements.lstMeetings)[0].selectedIndex < 0) {
            $('#' + Meeting_AddRequestToMeeting.uiElements.lstMeetings).focus();
            Takaful.CommonMethods.ShowInfoMsg('من فضلك إختر الإجتماع أولاً.', null, null, "error");
            return;
        }

        var meetingID = $('#' + Meeting_AddRequestToMeeting.uiElements.lstMeetings + ' option:selected').val();

        //Get the selected request data
        var empID = Meeting_AddRequestToMeeting.MeetingRequests[index].EmployeeNumber;
        var year = Meeting_AddRequestToMeeting.MeetingRequests[index].Year;
        var serial = Meeting_AddRequestToMeeting.MeetingRequests[index].Serial;
        var typeID = Meeting_AddRequestToMeeting.MeetingRequests[index].TypeID;

        //Save
        Meeting_AddRequestToMeeting.CustomMethods.AjaxCall.RemoveRequestFromMeeting(meetingID, empID, year, serial, typeID);
    }

};


