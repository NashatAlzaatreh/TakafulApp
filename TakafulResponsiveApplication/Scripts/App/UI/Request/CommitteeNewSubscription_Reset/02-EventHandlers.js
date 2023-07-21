
//Check for main namespace
if (typeof Request_CommitteeNewSubscription_Reset === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeNewSubscription_Reset = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeNewSubscription_Reset.EventHandlers = {};

//Reset button
Request_CommitteeNewSubscription_Reset.EventHandlers.btnReset_onclick = function (event) {

    Request_CommitteeNewSubscription_Reset.CustomMethods.AjaxCall.Reset(Request_CommitteeNewSubscription_Reset.EmpID, Request_CommitteeNewSubscription_Reset.Year, Request_CommitteeNewSubscription_Reset.Serial);


};







