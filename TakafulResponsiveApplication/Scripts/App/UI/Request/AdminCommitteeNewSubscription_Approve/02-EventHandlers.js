
//Check for main namespace
if (typeof Request_AdminCommitteeNewSubscription_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_AdminCommitteeNewSubscription_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_AdminCommitteeNewSubscription_Approve.EventHandlers = {};

//Submit button
Request_AdminCommitteeNewSubscription_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    Request_AdminCommitteeNewSubscription_Approve.CustomMethods.AjaxCall.TakeAction(Request_AdminCommitteeNewSubscription_Approve.EmpID, Request_AdminCommitteeNewSubscription_Approve.Year, Request_AdminCommitteeNewSubscription_Approve.Serial, Request_AdminCommitteeNewSubscription_Approve.MemberID, event.data.action);


};







