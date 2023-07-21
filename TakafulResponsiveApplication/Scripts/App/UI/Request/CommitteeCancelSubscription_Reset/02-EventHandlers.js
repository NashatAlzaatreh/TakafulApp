
//Check for main namespace
if (typeof Request_CommitteeCancelSubscription_Reset === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeCancelSubscription_Reset = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeCancelSubscription_Reset.EventHandlers = {};

//Submit button
Request_CommitteeCancelSubscription_Reset.EventHandlers.btnReset_onclick = function (event) {

    //alert(event.data.action);
    Request_CommitteeCancelSubscription_Reset.CustomMethods.AjaxCall.Reset(Request_CommitteeCancelSubscription_Reset.EmpID, Request_CommitteeCancelSubscription_Reset.Year, Request_CommitteeCancelSubscription_Reset.Serial);


};















