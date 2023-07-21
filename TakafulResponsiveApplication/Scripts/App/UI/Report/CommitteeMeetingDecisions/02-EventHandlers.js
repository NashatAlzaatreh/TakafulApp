
//Check for main namespace
if (typeof Report_CommitteeMeetingDecisions === 'undefined') {
    // Namespace does not exist, create a new one
    var Report_CommitteeMeetingDecisions = {};
}

//Add the event handlers container object to the main namespace
Report_CommitteeMeetingDecisions.EventHandlers = {};


//Meetings dropdown list selection event
Report_CommitteeMeetingDecisions.EventHandlers.lstMeetings_onchange = function () {

    if ($('#' + Report_CommitteeMeetingDecisions.uiElements.lstMeetings)[0].selectedIndex < 0) {
        return;
    }

    $('#' + Report_CommitteeMeetingDecisions.uiElements.lstMeetings).attr("disabled", "disabled");

    //Load the department of the selected employee
    var meetingID = $('#' + Report_CommitteeMeetingDecisions.uiElements.lstMeetings + ' option:selected').val();

    //Fill the employees dropdown list
    for (var i = 0; i < Report_CommitteeMeetingDecisions.Meetings.length; i++) {
        if (Report_CommitteeMeetingDecisions.Meetings[i].ID == meetingID) {
            $('#' + Report_CommitteeMeetingDecisions.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(Report_CommitteeMeetingDecisions.Meetings[i].Date));
            $('#' + Report_CommitteeMeetingDecisions.uiElements.chkIsOpenForEvaluation).prop('checked', Report_CommitteeMeetingDecisions.Meetings[i].IsOpenForEvaluation);
            $('#' + Report_CommitteeMeetingDecisions.uiElements.lstMeetings).removeAttr("disabled");
            return;
        }
    }


};

//Export the data
Report_CommitteeMeetingDecisions.EventHandlers.btnExport_click = function () {

    //Input validation
    //Selected meeting
    if ($('#' + Report_CommitteeMeetingDecisions.uiElements.lstMeetings)[0].selectedIndex < 0) {
        $('#' + Report_CommitteeMeetingDecisions.uiElements.lstMeetings).focus();
        Takaful.CommonMethods.ShowInfoMsg('من فضلك إختر الإجتماع أولاً.', null, null, "error");
        return;
    }

    var meetingID = $('#' + Report_CommitteeMeetingDecisions.uiElements.lstMeetings + ' option:selected').val();

    //Export data
    Report_CommitteeMeetingDecisions.CustomMethods.AjaxCall.Export(meetingID);

    $('#' + Report_CommitteeMeetingDecisions.uiElements.btnExport).hide();

};




