
//Check for main namespace
if (typeof Request_SubmittedRequests === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_SubmittedRequests = {};
}

//Add the event handlers container object to the main namespace
Request_SubmittedRequests.EventHandlers = {};

//Search button
Request_SubmittedRequests.EventHandlers.btnSearch_onclick = function () {

    //Build parameter string
    var param = "type=" + Request_SubmittedRequests.type;
    var from = Takaful.CommonMethods.GetFormattedDate($('#' + Request_SubmittedRequests.uiElements.txtDateFrom).val());
    if (from.trim() != '') {
        param += '&from=' + from;
    }
    var to = Takaful.CommonMethods.GetFormattedDate($('#' + Request_SubmittedRequests.uiElements.txtDateTo).val());
    if (to.trim() != '') {
        param += '&to=' + to;
    }

    //Reload page with the selected dates
    //window.location.href = 'SubmittedRequests.html?' + param;
    window.location.replace('SubmittedRequests.html?' + param);


};

//Export button
Request_SubmittedRequests.EventHandlers.btnExport_onclick = function () {

    if (Request_SubmittedRequests.Requests.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Request_SubmittedRequests.CustomMethods.AjaxCall.ExportData();


};












