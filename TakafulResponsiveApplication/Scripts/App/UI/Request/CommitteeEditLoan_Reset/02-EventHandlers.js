
//Check for main namespace
if (typeof Request_CommitteeEditLoan_Reset === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeEditLoan_Reset = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeEditLoan_Reset.EventHandlers = {};

//Submit button
Request_CommitteeEditLoan_Reset.EventHandlers.btnReset_onclick = function (event) {

    Request_CommitteeEditLoan_Reset.CustomMethods.AjaxCall.Reset(Request_CommitteeEditLoan_Reset.EmpID, Request_CommitteeEditLoan_Reset.Year, Request_CommitteeEditLoan_Reset.Serial);


};














