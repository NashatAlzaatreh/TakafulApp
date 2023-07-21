
//Check for main namespace
if (typeof Request_CommitteeEditLoan_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeEditLoan_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeEditLoan_Approve.EventHandlers = {};

//Submit button
Request_CommitteeEditLoan_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    Request_CommitteeEditLoan_Approve.CustomMethods.AjaxCall.TakeAction(Request_CommitteeEditLoan_Approve.EmpID, Request_CommitteeEditLoan_Approve.Year, Request_CommitteeEditLoan_Approve.Serial, event.data.action);


};


//Navigate button
Request_CommitteeEditLoan_Approve.EventHandlers.Navigate_onclick = function (event) {

    Request_CommitteeEditLoan_Approve.CustomMethods.AjaxCall.Navigate(Request_CommitteeEditLoan_Approve.EmpID, Request_CommitteeEditLoan_Approve.Year, Request_CommitteeEditLoan_Approve.Serial, event.data.direction);


};

//Postpone button
Request_CommitteeEditLoan_Approve.EventHandlers.btnExit_onclick = function (event) {

    Request_CommitteeEditLoan_Approve.IsTakingAction = true;
    Request_CommitteeEditLoan_Approve.CustomMethods.AjaxCall.Navigate(Request_CommitteeEditLoan_Approve.EmpID, Request_CommitteeEditLoan_Approve.Year, Request_CommitteeEditLoan_Approve.Serial, 1);

};









