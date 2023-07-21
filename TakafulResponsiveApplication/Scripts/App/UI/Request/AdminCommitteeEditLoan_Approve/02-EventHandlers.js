
//Check for main namespace
if (typeof Request_AdminCommitteeEditLoan_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_AdminCommitteeEditLoan_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_AdminCommitteeEditLoan_Approve.EventHandlers = {};

//Submit button
Request_AdminCommitteeEditLoan_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    Request_AdminCommitteeEditLoan_Approve.CustomMethods.AjaxCall.TakeAction(Request_AdminCommitteeEditLoan_Approve.EmpID, Request_AdminCommitteeEditLoan_Approve.Year, Request_AdminCommitteeEditLoan_Approve.Serial, Request_AdminCommitteeEditLoan_Approve.MemberID, event.data.action);


};














