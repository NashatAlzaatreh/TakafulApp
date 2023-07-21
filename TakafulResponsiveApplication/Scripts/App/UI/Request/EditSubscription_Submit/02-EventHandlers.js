
//Check for main namespace
if (typeof Request_EditSubscription_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_EditSubscription_Submit = {};
}

//Add the event handlers container object to the main namespace
Request_EditSubscription_Submit.EventHandlers = {};

//Submit button
Request_EditSubscription_Submit.EventHandlers.btnSubmit_onclick = function () {

    //Input validation
    var currentAmount = ($('#' + Request_EditSubscription_Submit.uiElements.txtCurrentAmount).val().trim()) * 1;
    var amount = ($('#' + Request_EditSubscription_Submit.uiElements.txtRequiredAmount).val().trim()) * 1;
    var maxAmount = Request_EditSubscription_Submit.InitialData.SubscriptionBoundaries.MaximumAmount;
    var minAmount = Request_EditSubscription_Submit.InitialData.SubscriptionBoundaries.MinimumAmount;

    if (Takaful.CommonMethods.isPositiveInteger(currentAmount, false) == false) {
        Takaful.CommonMethods.ShowInfoMsg("لايمكن إتمام طلبك الأن.", null, null, "error");
        return;
    }

    //Check if number
    if (Takaful.CommonMethods.isPositiveInteger(amount, false) == false) {
        $('#' + Request_EditSubscription_Submit.uiElements.txtRequiredAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل مبلغ الاشتراك المطلوب.", null, null, "error");
        return;
    }

    if (amount < minAmount) {
        $('#' + Request_EditSubscription_Submit.uiElements.txtRequiredAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن أن تقل قيمة الاشتراك المطلوب عن : " + minAmount.toString(), null, null, "error");
        return;
    }

    if (amount > maxAmount) {
        $('#' + Request_EditSubscription_Submit.uiElements.txtRequiredAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن أن تزيد قيمة الاشتراك المطلوب عن : " + maxAmount.toString(), null, null, "error");
        return;
    }


    Request_EditSubscription_Submit.CustomMethods.AjaxCall.Submit(amount, $('#' + Request_EditSubscription_Submit.uiElements.txtNotes).val().trim());


};














