
//Check for main namespace
if (typeof Request_EditLoan_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_EditLoan_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_EditLoan_Approve.EventHandlers = {};

//Submit button
Request_EditLoan_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    Request_EditLoan_Approve.CustomMethods.AjaxCall.TakeAction(Request_EditLoan_Approve.EmpID, Request_EditLoan_Approve.Year, Request_EditLoan_Approve.Serial, $('#' + Request_EditLoan_Approve.uiElements.txtNotes).val().trim(), event.data.action);


};

//Navigate button
Request_EditLoan_Approve.EventHandlers.Navigate_onclick = function (event) {

    Request_EditLoan_Approve.CustomMethods.AjaxCall.Navigate(Request_EditLoan_Approve.EmpID, Request_EditLoan_Approve.Year, Request_EditLoan_Approve.Serial, event.data.direction);


};













