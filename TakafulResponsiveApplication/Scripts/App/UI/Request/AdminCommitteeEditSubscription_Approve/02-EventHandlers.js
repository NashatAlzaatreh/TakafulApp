
//Check for main namespace
if (typeof Request_AdminCommitteeEditSubscription_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_AdminCommitteeEditSubscription_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_AdminCommitteeEditSubscription_Approve.EventHandlers = {};

//Submit button
Request_AdminCommitteeEditSubscription_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    //alert(event.data.action);
    Request_AdminCommitteeEditSubscription_Approve.CustomMethods.AjaxCall.TakeAction(Request_AdminCommitteeEditSubscription_Approve.EmpID, Request_AdminCommitteeEditSubscription_Approve.Year, Request_AdminCommitteeEditSubscription_Approve.Serial, Request_AdminCommitteeEditSubscription_Approve.MemberID, event.data.action);


};














