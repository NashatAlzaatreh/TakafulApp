
//Check for main namespace
if (typeof MasterPage === 'undefined') {
    // Namespace does not exist, create a new one
    var MasterPage = {};
}

//Add the event handlers container object to the main namespace
MasterPage.EventHandlers = {};


//Search event button
MasterPage.EventHandlers.btnLogout_onclick = function () {

    MasterPage.CustomMethods.AjaxCall.Logout();


};













