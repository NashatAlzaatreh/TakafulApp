
//Check for main namespace
if (typeof Request_CommitteeCancelLoan_Reset === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeCancelLoan_Reset = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeCancelLoan_Reset.EventHandlers = {};

//Submit button
Request_CommitteeCancelLoan_Reset.EventHandlers.btnReset_onclick = function (event) {

    Request_CommitteeCancelLoan_Reset.CustomMethods.AjaxCall.Reset(Request_CommitteeCancelLoan_Reset.EmpID, Request_CommitteeCancelLoan_Reset.Year, Request_CommitteeCancelLoan_Reset.Serial);


};








