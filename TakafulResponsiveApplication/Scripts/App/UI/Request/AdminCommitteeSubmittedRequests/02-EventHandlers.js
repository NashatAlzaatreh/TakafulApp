
//Check for main namespace
if (typeof Request_AdminCommitteeSubmittedRequests === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_AdminCommitteeSubmittedRequests = {};
}

//Add the event handlers container object to the main namespace
Request_AdminCommitteeSubmittedRequests.EventHandlers = {};


//Employees dropdown list selection event
Request_AdminCommitteeSubmittedRequests.EventHandlers.lstMembers_onchange = function () {

    Request_AdminCommitteeSubmittedRequests.SelectedMemberID = 0;
    Request_AdminCommitteeSubmittedRequests.Requests = [];
    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.tblRequests).empty();
    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.txtNotes).val('');

    if ($('#' + Request_AdminCommitteeSubmittedRequests.uiElements.lstMembers)[0].selectedIndex < 0) {
        return;
    }

    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.lstMembers).attr("disabled", "disabled");

    //Load the requests for the selected committee member
    var memberID = $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.lstMembers + ' option:selected').val();

    Request_AdminCommitteeSubmittedRequests.SelectedMemberID = memberID;

    Request_AdminCommitteeSubmittedRequests.CustomMethods.AjaxCall.GetRequests(memberID);



};

//Load the notes for the selected request
Request_AdminCommitteeSubmittedRequests.EventHandlers.btnAdd_click = function (index) {

    Request_AdminCommitteeSubmittedRequests.SelectedIndex = -1;
    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.txtNotes).val('');

    if (index >= 0) {
        //Get the selected request data
        if (Request_AdminCommitteeSubmittedRequests.Requests[index].Notes != null) {
            $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.txtNotes).val(Request_AdminCommitteeSubmittedRequests.Requests[index].Notes);
        }

        Request_AdminCommitteeSubmittedRequests.SelectedIndex = index;

        //Open the modal window
        $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.NoteIn).foundation('reveal', 'open');
    }

};

//Close modal window
Request_AdminCommitteeSubmittedRequests.EventHandlers.btnClose_click = function (index) {

    Request_AdminCommitteeSubmittedRequests.SelectedIndex = -1;
    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.txtNotes).val('');
    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.NoteIn).foundation('reveal', 'close');


};

//Export button
Request_AdminCommitteeSubmittedRequests.EventHandlers.btnExport_onclick = function () {

    if (Request_AdminCommitteeSubmittedRequests.Requests.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Request_AdminCommitteeSubmittedRequests.CustomMethods.AjaxCall.ExportData();


};