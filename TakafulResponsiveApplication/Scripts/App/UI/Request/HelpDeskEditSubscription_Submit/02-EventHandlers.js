
//Check for main namespace
if (typeof Request_HelpDeskEditSubscription_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_HelpDeskEditSubscription_Submit = {};
}

//Add the event handlers container object to the main namespace
Request_HelpDeskEditSubscription_Submit.EventHandlers = {};

//Submit button
Request_HelpDeskEditSubscription_Submit.EventHandlers.btnSubmit_onclick = function () {

    //Input validation
    if (!Request_HelpDeskEditSubscription_Submit.EmployeeNumber || Request_HelpDeskEditSubscription_Submit.EmployeeNumber == 0) {
        Takaful.CommonMethods.ShowInfoMsg("من فضلك حدد الموظف أولاً.", null, null, "error");
        return;
    }

    var currentAmount = ($('#' + Request_HelpDeskEditSubscription_Submit.uiElements.txtCurrentAmount).val().trim()) * 1;
    var amount = ($('#' + Request_HelpDeskEditSubscription_Submit.uiElements.txtRequiredAmount).val().trim()) * 1;
    var maxAmount = Request_HelpDeskEditSubscription_Submit.InitialData.SubscriptionBoundaries.MaximumAmount;
    var minAmount = Request_HelpDeskEditSubscription_Submit.InitialData.SubscriptionBoundaries.MinimumAmount;

    if (Takaful.CommonMethods.isPositiveInteger(currentAmount, false) == false) {
        Takaful.CommonMethods.ShowInfoMsg("لايمكن إتمام طلبك الأن.", null, null, "error");
        return;
    }

    //Check if number
    if (Takaful.CommonMethods.isPositiveInteger(amount, false) == false) {
        $('#' + Request_HelpDeskEditSubscription_Submit.uiElements.txtRequiredAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل مبلغ الاشتراك المطلوب.", null, null, "error");
        return;
    }

    if (amount < minAmount) {
        $('#' + Request_HelpDeskEditSubscription_Submit.uiElements.txtRequiredAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن أن تقل قيمة الاشتراك المطلوب عن : " + minAmount.toString(), null, null, "error");
        return;
    }

    if (amount > maxAmount) {
        $('#' + Request_HelpDeskEditSubscription_Submit.uiElements.txtRequiredAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن أن تزيد قيمة الاشتراك المطلوب عن : " + maxAmount.toString(), null, null, "error");
        return;
    }


    Request_HelpDeskEditSubscription_Submit.CustomMethods.AjaxCall.Submit(Request_HelpDeskEditSubscription_Submit.EmployeeNumber, amount, $('#' + Request_HelpDeskEditSubscription_Submit.uiElements.txtNotes).val().trim());


};

//Search button
Request_HelpDeskEditSubscription_Submit.EventHandlers.btnSearch_onclick = function () {

    var empNumber = $("#" + Request_HelpDeskEditSubscription_Submit.uiElements.txtEmployeeNumber).val().trim();

    //Clear the ui elements
    Request_HelpDeskEditSubscription_Submit.CustomMethods.LocalOperations.ResetUI();

    //Input validation
    $("#" + Request_HelpDeskEditSubscription_Submit.uiElements.txtEmployeeNumber).val(empNumber);

    if (Takaful.CommonMethods.isPositiveInteger(empNumber, false) == false) {
        $("#" + Request_HelpDeskEditSubscription_Submit.uiElements.txtEmployeeNumber).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل الرقم الوظيفى برقم صحيح.", null, null, "error");
        return;
    }

    empNumber *= 1;
    Request_HelpDeskEditSubscription_Submit.EmployeeNumber = 0;

    //Get the data
    Request_HelpDeskEditSubscription_Submit.CustomMethods.AjaxCall.GetInitialData(empNumber);


};












