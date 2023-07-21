
//Check for main namespace
if (typeof Request_EditLoan_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_EditLoan_Submit = {};
}

//Add the event handlers container object to the main namespace
Request_EditLoan_Submit.EventHandlers = {};

//Submit button
Request_EditLoan_Submit.EventHandlers.btnSubmit_onclick = function () {

    //Input validation
    var currentAmount = ($('#' + Request_EditLoan_Submit.uiElements.txtCurrentAmount).val().trim()) * 1;
    var amount = ($('#' + Request_EditLoan_Submit.uiElements.txtRequiredAmount).val().trim()) * 1;
    var maxAmount = Request_EditLoan_Submit.InitialData.MaximumLoanInstallmentAmount;
    var minAmount = Request_EditLoan_Submit.InitialData.MinimumLoanInstallmentAmount;

    if (Takaful.CommonMethods.isPositiveInteger(currentAmount, false) == false) {
        Takaful.CommonMethods.ShowInfoMsg("لايمكن إتمام طلبك الأن.", null, null, "error");
        return;
    }

    //Check if number
    if (Takaful.CommonMethods.isPositiveInteger(amount, false) == false) {
        $('#' + Request_EditLoan_Submit.uiElements.txtRequiredAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل مبلغ القسط المطلوب.", null, null, "error");
        return;
    }

    if (amount < minAmount) {
        $('#' + Request_EditLoan_Submit.uiElements.txtRequiredAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن أن تقل قيمة القسط المطلوب عن : " + minAmount.toString(), null, null, "error");
        return;
    }

    if (amount > maxAmount) {
        $('#' + Request_EditLoan_Submit.uiElements.txtRequiredAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن أن تزيد قيمة القسط المطلوب عن : " + maxAmount.toString(), null, null, "error");
        return;
    }


    Request_EditLoan_Submit.CustomMethods.AjaxCall.Submit(amount, $('#' + Request_EditLoan_Submit.uiElements.txtNotes).val().trim());


};














