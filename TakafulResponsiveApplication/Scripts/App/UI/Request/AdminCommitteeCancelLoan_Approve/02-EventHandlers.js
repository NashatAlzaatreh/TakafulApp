
//Check for main namespace
if (typeof Request_AdminCommitteeCancelLoan_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_AdminCommitteeCancelLoan_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_AdminCommitteeCancelLoan_Approve.EventHandlers = {};

//Submit button
Request_AdminCommitteeCancelLoan_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    Request_AdminCommitteeCancelLoan_Approve.CustomMethods.AjaxCall.TakeAction(Request_AdminCommitteeCancelLoan_Approve.EmpID, Request_AdminCommitteeCancelLoan_Approve.Year, Request_AdminCommitteeCancelLoan_Approve.Serial, Request_AdminCommitteeCancelLoan_Approve.MemberID, event.data.action);


};








