
//Check for main namespace
if (typeof Meeting_MeetingList === 'undefined') {
    // Namespace does not exist, create a new one
    var Meeting_MeetingList = {};
}

//Add the event handlers container object to the main namespace
Meeting_MeetingList.EventHandlers = {};

//Search button
Meeting_MeetingList.EventHandlers.btnSearch_onclick = function () {

    //Build parameter string
    var param = "";
    var from = Takaful.CommonMethods.GetFormattedDate($('#' + Meeting_MeetingList.uiElements.txtDateFrom).val());
    if (from.trim() != '') {
        param += 'from=' + from;
    }
    var to = Takaful.CommonMethods.GetFormattedDate($('#' + Meeting_MeetingList.uiElements.txtDateTo).val());
    if (to.trim() != '') {
        if (param.trim() == "") {
            param += 'to=' + to;
        } else {
            param += '&to=' + to;
        }

    }

    if (param.trim() != "") {
        param = "?" + param;
    }

    //Reload page with the selected dates
    //window.location.href = 'SubmittedRequests.html?' + param;
    window.location.replace('MeetingList.html' + param);


};

//Save the meeting data
Meeting_MeetingList.EventHandlers.btnSave_click = function () {

    //Input validation
    //Meeting date
    var date = $("#" + Meeting_MeetingList.uiElements.txtMeetingDate).val().trim();

    if (Takaful.CommonMethods.GetFormattedDate(date) == '') {
        $("#" + Meeting_MeetingList.uiElements.txtMeetingDate).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل تاريخ الإجتماع.", null, null, "error");
        return;
    }

    //Notes
    var notes = $("#" + Meeting_MeetingList.uiElements.txtNotes).val();

    //Get meeting ID
    var meetingID = 0;
    if (Meeting_MeetingList.SelectedMeetingIndex >= 0) {
        meetingID = Meeting_MeetingList.Meetings[Meeting_MeetingList.SelectedMeetingIndex].ID;
    }

    //Save data
    Meeting_MeetingList.CustomMethods.AjaxCall.Save(meetingID, date, notes);

    $('#' + Meeting_MeetingList.uiElements.btnSave).hide();

};

//Delete meeting
Meeting_MeetingList.EventHandlers.btnDelete_click = function (index) {


    var yesResult = function () {
        var meetingID = Meeting_MeetingList.Meetings[index].ID;

        //Delete exception
        Meeting_MeetingList.CustomMethods.AjaxCall.Delete(meetingID);
    };

    //Confirmation alert
    Takaful.CommonMethods.ShowConfirmMsg("سوف يتم حذف هذا الإجتماع نهائياً ، هل أنت متأكد؟", yesResult);



};

//Load the selected employee exception in edit mode
Meeting_MeetingList.EventHandlers.btnEdit_click = function (index) {

    if (index >= 0) {

        //Serial
        $('#' + Meeting_MeetingList.uiElements.txtSerial).val(Meeting_MeetingList.Meetings[index].FormattedSerial);

        //Date
        $('#' + Meeting_MeetingList.uiElements.txtMeetingDate).fdatepicker('update', new Date(Meeting_MeetingList.Meetings[index].Date));

        //Notes
        $('#' + Meeting_MeetingList.uiElements.txtNotes).val(Meeting_MeetingList.Meetings[index].Notes);

        Meeting_MeetingList.SelectedMeetingIndex = index;   //Set selected index

        //Cancellation buton
        $('#' + Meeting_MeetingList.uiElements.btnCancel).show();
    }

};

//Cancel the edit mode
Meeting_MeetingList.EventHandlers.btnCancelEdit_click = function () {

    Meeting_MeetingList.SelectedMeetingIndex = -1;
    $('#' + Meeting_MeetingList.uiElements.txtSerial).val('');
    $('#' + Meeting_MeetingList.uiElements.txtMeetingDate).val('');
    $('#' + Meeting_MeetingList.uiElements.txtNotes).val('');
    $('#' + Meeting_MeetingList.uiElements.btnSave).show();
    $('#' + Meeting_MeetingList.uiElements.btnCancel).hide();

};

//Export button
Meeting_MeetingList.EventHandlers.btnExport_onclick = function () {

    if (Meeting_MeetingList.Meetings.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Meeting_MeetingList.CustomMethods.AjaxCall.ExportData();


};












