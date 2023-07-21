
//Check for main namespace
if (typeof Request_CommitteeDecisionApproval === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeDecisionApproval = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeDecisionApproval.EventHandlers = {};



//Export button
Request_CommitteeDecisionApproval.EventHandlers.btnExport_onclick = function () {

    if (Request_CommitteeDecisionApproval.Requests.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Request_CommitteeDecisionApproval.CustomMethods.AjaxCall.ExportData();


};

//Export button
Request_CommitteeDecisionApproval.EventHandlers.btnSave_onclick = function () {

    if (Request_CommitteeDecisionApproval.Requests.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد طلبات للاعتماد.", null, null, "error");
        return;
    }

    Request_CommitteeDecisionApproval.CustomMethods.AjaxCall.Save();


};




