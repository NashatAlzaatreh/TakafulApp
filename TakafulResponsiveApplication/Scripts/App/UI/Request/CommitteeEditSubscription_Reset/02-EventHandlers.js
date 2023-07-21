
//Check for main namespace
if (typeof Request_CommitteeEditSubscription_Reset === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeEditSubscription_Reset = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeEditSubscription_Reset.EventHandlers = {};

//Reset button
Request_CommitteeEditSubscription_Reset.EventHandlers.btnReset_onclick = function (event) {

    //alert(event.data.action);
    Request_CommitteeEditSubscription_Reset.CustomMethods.AjaxCall.Reset(Request_CommitteeEditSubscription_Reset.EmpID, Request_CommitteeEditSubscription_Reset.Year, Request_CommitteeEditSubscription_Reset.Serial);


};














