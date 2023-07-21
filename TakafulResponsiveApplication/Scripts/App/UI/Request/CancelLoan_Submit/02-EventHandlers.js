
//Check for main namespace
if (typeof Request_CancelLoan_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CancelLoan_Submit = {};
}

//Add the event handlers container object to the main namespace
Request_CancelLoan_Submit.EventHandlers = {};

//Submit button
Request_CancelLoan_Submit.EventHandlers.btnSubmit_onclick = function () {

    Request_CancelLoan_Submit.CustomMethods.AjaxCall.Submit($('#' + Request_CancelLoan_Submit.uiElements.txtNotes).val().trim());


};














