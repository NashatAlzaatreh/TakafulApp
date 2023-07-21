
//Check for main namespace
if (typeof Request_AdminCommitteeCancelSubscription_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_AdminCommitteeCancelSubscription_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_AdminCommitteeCancelSubscription_Approve.EventHandlers = {};

//Submit button
Request_AdminCommitteeCancelSubscription_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    //alert(event.data.action);
    Request_AdminCommitteeCancelSubscription_Approve.CustomMethods.AjaxCall.TakeAction(Request_AdminCommitteeCancelSubscription_Approve.EmpID, Request_AdminCommitteeCancelSubscription_Approve.Year, Request_AdminCommitteeCancelSubscription_Approve.Serial, Request_AdminCommitteeCancelSubscription_Approve.MemberID, event.data.action);


};















