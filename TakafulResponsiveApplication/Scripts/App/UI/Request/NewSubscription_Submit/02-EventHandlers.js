
//Check for main namespace
if (typeof Request_NewSubscription_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_NewSubscription_Submit = {};
}

//Add the event handlers container object to the main namespace
Request_NewSubscription_Submit.EventHandlers = {};

//Submit button
Request_NewSubscription_Submit.EventHandlers.btnSubmit_onclick = function () {

    //Input validation
    var calcAmount = ($('#' + Request_NewSubscription_Submit.uiElements.txtCalculatedAmount).val().trim()) * 1;
    var amount = ($('#' + Request_NewSubscription_Submit.uiElements.txtRequiredAmount).val().trim()) * 1;
    var maxAmount = Request_NewSubscription_Submit.InitialData.SubscriptionBoundaries.MaximumAmount;

    if (Takaful.CommonMethods.isPositiveInteger(calcAmount, false) == false) {
        Takaful.CommonMethods.ShowInfoMsg("لايمكن إتمام طلبك الأن.", null, null, "error");
        return;
    }

    //Check if number
    if (Takaful.CommonMethods.isPositiveInteger(amount, false) == false) {
        $('#' + Request_NewSubscription_Submit.uiElements.txtRequiredAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل مبلغ الاشتراك المطلوب.", null, null, "error");
        return;
    }

    if (amount < calcAmount) {
        $('#' + Request_NewSubscription_Submit.uiElements.txtRequiredAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن أن تقل قيمة الاشتراك المطلوب عن : " + calcAmount.toString(), null, null, "error");
        return;
    }

    if (amount > maxAmount) {
        $('#' + Request_NewSubscription_Submit.uiElements.txtRequiredAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن أن تزيد قيمة الاشتراك المطلوب عن : " + maxAmount.toString(), null, null, "error");
        return;
    }


    Request_NewSubscription_Submit.CustomMethods.AjaxCall.Submit(Request_NewSubscription_Submit.EmpID, amount, $('#' + Request_NewSubscription_Submit.uiElements.txtNotes).val().trim());


};














