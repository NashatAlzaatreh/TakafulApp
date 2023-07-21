
//Check for main namespace
if (typeof Request_UserRequests === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_UserRequests = {};
}

//Add the event handlers container object to the main namespace
Request_UserRequests.EventHandlers = {};

//Cancellation button
Request_UserRequests.EventHandlers.btnCancel_click = function (year, serial) {

    //alert(year + '__' + serial);

    var yesResult = function () {

        //Delete exception
        Request_UserRequests.CustomMethods.AjaxCall.Withdraw(year, serial);

    };

    //Confirmation alert
    Takaful.CommonMethods.ShowConfirmMsg("سوف يتم إلغاء هذا الطلب ، هل أنت متأكد؟", yesResult);

};












