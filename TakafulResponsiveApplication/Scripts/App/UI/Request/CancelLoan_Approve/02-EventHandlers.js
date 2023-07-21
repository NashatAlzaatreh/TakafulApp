
//Check for main namespace
if (typeof Request_CancelLoan_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CancelLoan_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_CancelLoan_Approve.EventHandlers = {};

//Is paid checkbox
Request_CancelLoan_Approve.EventHandlers.chkIsPaid_onchange = function () {

    var checked = $("#" + Request_CancelLoan_Approve.uiElements.chkIsPaid).prop('checked');

    if (checked == true) {
        $("#" + Request_CancelLoan_Approve.uiElements.chkIsPaid).prop('checked', false);
        var yesResult = function () {
            $("#" + Request_CancelLoan_Approve.uiElements.chkIsPaid).prop('checked', true);
            $("#" + Request_CancelLoan_Approve.uiElements.btnApprove).removeClass('disable_btn').addClass('subscribe-btn2');
        };

        //Confirmation alert
        Takaful.CommonMethods.ShowConfirmMsg("هل تم سداد القرض بالكامل؟", yesResult, "تأكيد");

    } else {
        $("#" + Request_CancelLoan_Approve.uiElements.btnApprove).removeClass('subscribe-btn2').addClass('disable_btn');
    }

};

//Submit button
Request_CancelLoan_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    var checked = $("#" + Request_CancelLoan_Approve.uiElements.chkIsPaid).prop('checked');

    if (checked == false) {
        return;
    }

    Request_CancelLoan_Approve.CustomMethods.AjaxCall.TakeAction(Request_CancelLoan_Approve.EmpID, Request_CancelLoan_Approve.Year, Request_CancelLoan_Approve.Serial, $('#' + Request_CancelLoan_Approve.uiElements.txtNotes).val().trim(), event.data.action);


};

//Navigate button
Request_CancelLoan_Approve.EventHandlers.Navigate_onclick = function (event) {

    Request_CancelLoan_Approve.CustomMethods.AjaxCall.Navigate(Request_CancelLoan_Approve.EmpID, Request_CancelLoan_Approve.Year, Request_CancelLoan_Approve.Serial, event.data.direction);


};













