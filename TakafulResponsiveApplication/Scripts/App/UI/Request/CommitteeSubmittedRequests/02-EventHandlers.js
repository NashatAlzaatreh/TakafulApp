
//Check for main namespace
if (typeof Request_CommitteeSubmittedRequests === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeSubmittedRequests = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeSubmittedRequests.EventHandlers = {};


//Load the notes for the selected request
Request_CommitteeSubmittedRequests.EventHandlers.btnAdd_click = function (index) {

    Request_CommitteeSubmittedRequests.SelectedIndex = -1;
    $('#' + Request_CommitteeSubmittedRequests.uiElements.txtNotes).val('');

    if (index >= 0) {
        //Get the selected request data
        if (Request_CommitteeSubmittedRequests.Requests[index].Notes != null) {
            $('#' + Request_CommitteeSubmittedRequests.uiElements.txtNotes).val(Request_CommitteeSubmittedRequests.Requests[index].Notes);
        }

        Request_CommitteeSubmittedRequests.SelectedIndex = index;

        //Open the modal window
        $('#' + Request_CommitteeSubmittedRequests.uiElements.NoteIn).foundation('reveal', 'open');
    }

};

//Close modal window
Request_CommitteeSubmittedRequests.EventHandlers.btnClose_click = function (index) {

    Request_CommitteeSubmittedRequests.SelectedIndex = -1;
    $('#' + Request_CommitteeSubmittedRequests.uiElements.txtNotes).val('');
    $('#' + Request_CommitteeSubmittedRequests.uiElements.NoteIn).foundation('reveal', 'close');


};

//Export button
Request_CommitteeSubmittedRequests.EventHandlers.btnExport_onclick = function () {

    if (Request_CommitteeSubmittedRequests.Requests.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Request_CommitteeSubmittedRequests.CustomMethods.AjaxCall.ExportData();


};