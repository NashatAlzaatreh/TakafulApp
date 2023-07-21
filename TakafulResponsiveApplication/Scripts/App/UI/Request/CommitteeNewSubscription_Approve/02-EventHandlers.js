
//Check for main namespace
if (typeof Request_CommitteeNewSubscription_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeNewSubscription_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeNewSubscription_Approve.EventHandlers = {};

//Submit button
Request_CommitteeNewSubscription_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    Request_CommitteeNewSubscription_Approve.CustomMethods.AjaxCall.TakeAction(Request_CommitteeNewSubscription_Approve.EmpID, Request_CommitteeNewSubscription_Approve.Year, Request_CommitteeNewSubscription_Approve.Serial, event.data.action);


};


//Navigate button
Request_CommitteeNewSubscription_Approve.EventHandlers.Navigate_onclick = function (event) {

    Request_CommitteeNewSubscription_Approve.CustomMethods.AjaxCall.Navigate(Request_CommitteeNewSubscription_Approve.EmpID, Request_CommitteeNewSubscription_Approve.Year, Request_CommitteeNewSubscription_Approve.Serial, event.data.direction);


};

//Postpone button
Request_CommitteeNewSubscription_Approve.EventHandlers.btnExit_onclick = function (event) {

    Request_CommitteeNewSubscription_Approve.IsTakingAction = true;
    Request_CommitteeNewSubscription_Approve.CustomMethods.AjaxCall.Navigate(Request_CommitteeNewSubscription_Approve.EmpID, Request_CommitteeNewSubscription_Approve.Year, Request_CommitteeNewSubscription_Approve.Serial, 1);

};


