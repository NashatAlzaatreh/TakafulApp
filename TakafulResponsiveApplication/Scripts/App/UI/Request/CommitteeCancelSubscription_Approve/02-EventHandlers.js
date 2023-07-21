
//Check for main namespace
if (typeof Request_CommitteeCancelSubscription_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeCancelSubscription_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeCancelSubscription_Approve.EventHandlers = {};

//Submit button
Request_CommitteeCancelSubscription_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    //alert(event.data.action);
    Request_CommitteeCancelSubscription_Approve.CustomMethods.AjaxCall.TakeAction(Request_CommitteeCancelSubscription_Approve.EmpID, Request_CommitteeCancelSubscription_Approve.Year, Request_CommitteeCancelSubscription_Approve.Serial, event.data.action);


};


//Navigate button
Request_CommitteeCancelSubscription_Approve.EventHandlers.Navigate_onclick = function (event) {

    Request_CommitteeCancelSubscription_Approve.CustomMethods.AjaxCall.Navigate(Request_CommitteeCancelSubscription_Approve.EmpID, Request_CommitteeCancelSubscription_Approve.Year, Request_CommitteeCancelSubscription_Approve.Serial, event.data.direction);


};

//Postpone button
Request_CommitteeCancelSubscription_Approve.EventHandlers.btnExit_onclick = function (event) {

    Request_CommitteeCancelSubscription_Approve.IsTakingAction = true;
    Request_CommitteeCancelSubscription_Approve.CustomMethods.AjaxCall.Navigate(Request_CommitteeCancelSubscription_Approve.EmpID, Request_CommitteeCancelSubscription_Approve.Year, Request_CommitteeCancelSubscription_Approve.Serial, 1);

};










