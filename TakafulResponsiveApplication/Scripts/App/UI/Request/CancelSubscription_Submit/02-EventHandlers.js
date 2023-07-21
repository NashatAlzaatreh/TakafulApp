
//Check for main namespace
if (typeof Request_CancelSubscription_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CancelSubscription_Submit = {};
}

//Add the event handlers container object to the main namespace
Request_CancelSubscription_Submit.EventHandlers = {};

//Submit button
Request_CancelSubscription_Submit.EventHandlers.btnSubmit_onclick = function () {

    Request_CancelSubscription_Submit.CustomMethods.AjaxCall.Submit($('#' + Request_CancelSubscription_Submit.uiElements.txtNotes).val().trim());


};














