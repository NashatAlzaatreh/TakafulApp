
//Check for main namespace
if (typeof Request_NewSubscription_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_NewSubscription_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_NewSubscription_Approve.EventHandlers = {};

//Submit button
Request_NewSubscription_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    //alert(event.data.action);
    Request_NewSubscription_Approve.CustomMethods.AjaxCall.TakeAction(Request_NewSubscription_Approve.EmpID, Request_NewSubscription_Approve.Year, Request_NewSubscription_Approve.Serial, $('#' + Request_NewSubscription_Approve.uiElements.txtNotes).val().trim(), event.data.action);


};

//Navigate button
Request_NewSubscription_Approve.EventHandlers.Navigate_onclick = function (event) {

    Request_NewSubscription_Approve.CustomMethods.AjaxCall.Navigate(Request_NewSubscription_Approve.EmpID, Request_NewSubscription_Approve.Year, Request_NewSubscription_Approve.Serial, event.data.direction);


};













