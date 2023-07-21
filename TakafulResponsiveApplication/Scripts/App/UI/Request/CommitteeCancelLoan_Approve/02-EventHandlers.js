
//Check for main namespace
if (typeof Request_CommitteeCancelLoan_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeCancelLoan_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeCancelLoan_Approve.EventHandlers = {};

//Submit button
Request_CommitteeCancelLoan_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    Request_CommitteeCancelLoan_Approve.CustomMethods.AjaxCall.TakeAction(Request_CommitteeCancelLoan_Approve.EmpID, Request_CommitteeCancelLoan_Approve.Year, Request_CommitteeCancelLoan_Approve.Serial, event.data.action);


};

//Navigate button
Request_CommitteeCancelLoan_Approve.EventHandlers.Navigate_onclick = function (event) {

    Request_CommitteeCancelLoan_Approve.CustomMethods.AjaxCall.Navigate(Request_CommitteeCancelLoan_Approve.EmpID, Request_CommitteeCancelLoan_Approve.Year, Request_CommitteeCancelLoan_Approve.Serial, event.data.direction);


};

//Postpone button
Request_CommitteeCancelLoan_Approve.EventHandlers.btnExit_onclick = function (event) {

    Request_CommitteeCancelLoan_Approve.IsTakingAction = true;
    Request_CommitteeCancelLoan_Approve.CustomMethods.AjaxCall.Navigate(Request_CommitteeCancelLoan_Approve.EmpID, Request_CommitteeCancelLoan_Approve.Year, Request_CommitteeCancelLoan_Approve.Serial, event.data.direction);

};



