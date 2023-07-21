
//Check for main namespace
if (typeof Request_CancelSubscription_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CancelSubscription_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_CancelSubscription_Approve.EventHandlers = {};

//Submit button
Request_CancelSubscription_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    //alert(event.data.action);
    Request_CancelSubscription_Approve.CustomMethods.AjaxCall.TakeAction(Request_CancelSubscription_Approve.EmpID, Request_CancelSubscription_Approve.Year, Request_CancelSubscription_Approve.Serial, $('#' + Request_CancelSubscription_Approve.uiElements.txtNotes).val().trim(), event.data.action);


};

//Navigate button
Request_CancelSubscription_Approve.EventHandlers.Navigate_onclick = function (event) {

    Request_CancelSubscription_Approve.CustomMethods.AjaxCall.Navigate(Request_CancelSubscription_Approve.EmpID, Request_CancelSubscription_Approve.Year, Request_CancelSubscription_Approve.Serial, event.data.direction);


};













