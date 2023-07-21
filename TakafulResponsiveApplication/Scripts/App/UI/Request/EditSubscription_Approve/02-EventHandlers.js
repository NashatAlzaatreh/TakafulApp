
//Check for main namespace
if (typeof Request_EditSubscription_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_EditSubscription_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_EditSubscription_Approve.EventHandlers = {};

//Submit button
Request_EditSubscription_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    //alert(event.data.action);
    Request_EditSubscription_Approve.CustomMethods.AjaxCall.TakeAction(Request_EditSubscription_Approve.EmpID, Request_EditSubscription_Approve.Year, Request_EditSubscription_Approve.Serial, $('#' + Request_EditSubscription_Approve.uiElements.txtNotes).val().trim(), event.data.action);


};

//Navigate button
Request_EditSubscription_Approve.EventHandlers.Navigate_onclick = function (event) {

    Request_EditSubscription_Approve.CustomMethods.AjaxCall.Navigate(Request_EditSubscription_Approve.EmpID, Request_EditSubscription_Approve.Year, Request_EditSubscription_Approve.Serial, event.data.direction);


};













