
//Check for main namespace
if (typeof Request_SubmittedRequests === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_SubmittedRequests = {};
}


//Add the ui elements container object to the main namespace
Request_SubmittedRequests.uiElements = {};

//Map each ui element to a variable
Request_SubmittedRequests.uiElements.divTitle = "divTitle";
Request_SubmittedRequests.uiElements.txtDateFrom = "txtDateFrom";
Request_SubmittedRequests.uiElements.txtDateTo = "txtDateTo";
Request_SubmittedRequests.uiElements.btnSearch = "btnSearch";
Request_SubmittedRequests.uiElements.tblRequests = "tblRequests";
Request_SubmittedRequests.uiElements.btnExport = "btnExport";
Request_SubmittedRequests.uiElements.btnHistoryBack = "btnHistoryBack";

















