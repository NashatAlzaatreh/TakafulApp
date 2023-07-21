
//Check for main namespace
if (typeof Request_CommitteeEditSubscription_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeEditSubscription_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeEditSubscription_Approve.EventHandlers = {};

//Submit button
Request_CommitteeEditSubscription_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    //alert(event.data.action);
    Request_CommitteeEditSubscription_Approve.CustomMethods.AjaxCall.TakeAction(Request_CommitteeEditSubscription_Approve.EmpID, Request_CommitteeEditSubscription_Approve.Year, Request_CommitteeEditSubscription_Approve.Serial, event.data.action);


};


//Navigate button
Request_CommitteeEditSubscription_Approve.EventHandlers.Navigate_onclick = function (event) {

    Request_CommitteeEditSubscription_Approve.CustomMethods.AjaxCall.Navigate(Request_CommitteeEditSubscription_Approve.EmpID, Request_CommitteeEditSubscription_Approve.Year, Request_CommitteeEditSubscription_Approve.Serial, event.data.direction);


};

//Postpone button
Request_CommitteeEditSubscription_Approve.EventHandlers.btnExit_onclick = function (event) {

    Request_CommitteeEditSubscription_Approve.IsTakingAction = true;
    Request_CommitteeEditSubscription_Approve.CustomMethods.AjaxCall.Navigate(Request_CommitteeEditSubscription_Approve.EmpID, Request_CommitteeEditSubscription_Approve.Year, Request_CommitteeEditSubscription_Approve.Serial, 1);

};









