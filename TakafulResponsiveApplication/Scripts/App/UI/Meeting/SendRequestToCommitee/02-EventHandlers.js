
//Check for main namespace
if (typeof Meeting_SendRequestToCommitee === 'undefined') {
    // Namespace does not exist, create a new one
    var Meeting_SendRequestToCommitee = {};
}

//Add the event handlers container object to the main namespace
Meeting_SendRequestToCommitee.EventHandlers = {};


//Load the notes for the selected request
Meeting_SendRequestToCommitee.EventHandlers.btnAdd_click = function (index) {

    Meeting_SendRequestToCommitee.SelectedIndex = -1;
    $('#' + Meeting_SendRequestToCommitee.uiElements.txtNotes).val('');

    if (index >= 0) {
        //Get the selected request data
        if (Meeting_SendRequestToCommitee.Requests[index].Notes != null) {
            $('#' + Meeting_SendRequestToCommitee.uiElements.txtNotes).val(Meeting_SendRequestToCommitee.Requests[index].Notes);
        }

        Meeting_SendRequestToCommitee.SelectedIndex = index;

        //Open the modal window
        $('#' + Meeting_SendRequestToCommitee.uiElements.NoteIn).foundation('reveal', 'open');
    }

};

//Remove the selected request from the selected meeting
Meeting_SendRequestToCommitee.EventHandlers.btnSave_click = function () {

    if (Meeting_SendRequestToCommitee.SelectedIndex == null || Meeting_SendRequestToCommitee.SelectedIndex == -1) {
        return;
    }

    var index = Meeting_SendRequestToCommitee.SelectedIndex;

    //Get the selected request data
    var empID = Meeting_SendRequestToCommitee.Requests[index].EmployeeNumber;
    var year = Meeting_SendRequestToCommitee.Requests[index].Year;
    var serial = Meeting_SendRequestToCommitee.Requests[index].Serial;
    var typeID = Meeting_SendRequestToCommitee.Requests[index].TypeID;
    var notes = $('#' + Meeting_SendRequestToCommitee.uiElements.txtNotes).val().trim();

    //Save 
    Meeting_SendRequestToCommitee.CustomMethods.AjaxCall.SaveNotes(empID, year, serial, typeID, notes);

};

//Close modal window
Meeting_SendRequestToCommitee.EventHandlers.btnClose_click = function (index) {

    Meeting_SendRequestToCommitee.SelectedIndex = -1;
    $('#' + Meeting_SendRequestToCommitee.uiElements.txtNotes).val('');
    $('#' + Meeting_SendRequestToCommitee.uiElements.NoteIn).foundation('reveal', 'close');


};

//Export button
Meeting_SendRequestToCommitee.EventHandlers.btnExport_onclick = function () {

    if (Meeting_SendRequestToCommitee.Requests.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Meeting_SendRequestToCommitee.CustomMethods.AjaxCall.ExportData();


};

//Send button
Meeting_SendRequestToCommitee.EventHandlers.btnSend_onclick = function () {

    Meeting_SendRequestToCommitee.CustomMethods.AjaxCall.Send();

};


