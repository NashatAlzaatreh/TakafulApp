
//Check for main namespace
if (typeof Misc_SystemConfiguration === 'undefined') {
    // Namespace does not exist, create a new one
    var Misc_SystemConfiguration = {};
}

//Add the event handlers container object to the main namespace
Misc_SystemConfiguration.EventHandlers = {};

//Save button
Misc_SystemConfiguration.EventHandlers.btnSave_onclick = function () {

    //Input validation
    var subscriptionPercentage = ($('#' + Misc_SystemConfiguration.uiElements.txtSubscriptionPercentage).val().trim()) * 1;
    //Check if number
    if (Takaful.CommonMethods.isPositiveInteger(subscriptionPercentage, false) == false) {
        $('#' + Misc_SystemConfiguration.uiElements.txtSubscriptionPercentage).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل نسبة الاشتراك من الراتب.", null, null, "error");
        return;
    }

    var minSubscriptionAmount = ($('#' + Misc_SystemConfiguration.uiElements.txtMinSubscriptionAmount).val().trim()) * 1;
    //Check if number
    if (Takaful.CommonMethods.isPositiveInteger(minSubscriptionAmount, false) == false) {
        $('#' + Misc_SystemConfiguration.uiElements.txtMinSubscriptionAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل الحد الأدنى لقيمة الاشتراك.", null, null, "error");
        return;
    }

    var maxSubscriptionAmount = ($('#' + Misc_SystemConfiguration.uiElements.txtMaxSubscriptionAmount).val().trim()) * 1;
    //Check if number
    if (Takaful.CommonMethods.isPositiveInteger(maxSubscriptionAmount, false) == false) {
        $('#' + Misc_SystemConfiguration.uiElements.txtMaxSubscriptionAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل الحد الأقصى لقيمة الاشتراك.", null, null, "error");
        return;
    }

    var maxInstallmentsCount = ($('#' + Misc_SystemConfiguration.uiElements.txtMaxInstallmentsCount).val().trim()) * 1;
    //Check if number
    if (Takaful.CommonMethods.isPositiveInteger(maxInstallmentsCount, false) == false) {
        $('#' + Misc_SystemConfiguration.uiElements.txtMaxInstallmentsCount).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل الحد الأقصى لعدد أقساط القرض.", null, null, "error");
        return;
    }

    var minSubscriptionPeriod = ($('#' + Misc_SystemConfiguration.uiElements.txtMinSubscriptionPeriod).val().trim()) * 1;
    //Check if number
    if (Takaful.CommonMethods.isPositiveInteger(minSubscriptionPeriod, false) == false) {
        $('#' + Misc_SystemConfiguration.uiElements.txtMinSubscriptionPeriod).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل الحد الأدنى لفترة الاشتراك اللازمة للحصول على قرض.", null, null, "error");
        return;
    }

    var maxLoanAmount1 = ($('#' + Misc_SystemConfiguration.uiElements.txtMaxLoanAmount1).val().trim()) * 1;
    //Check if number
    if (Takaful.CommonMethods.isPositiveInteger(maxLoanAmount1, false) == false) {
        $('#' + Misc_SystemConfiguration.uiElements.txtMaxLoanAmount1).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل الحد الأول لمبلغ القرض.", null, null, "error");
        return;
    }

    var maxLoanAmount2 = ($('#' + Misc_SystemConfiguration.uiElements.txtMaxLoanAmount2).val().trim()) * 1;
    //Check if number
    if (Takaful.CommonMethods.isPositiveInteger(maxLoanAmount2, false) == false) {
        $('#' + Misc_SystemConfiguration.uiElements.txtMaxLoanAmount2).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل الحد الأقصى لمبلغ القرض.", null, null, "error");
        return;
    }

    var totalSubscriptionForMaxLoanAmount = ($('#' + Misc_SystemConfiguration.uiElements.txtTotalSubscriptionForMaxLoanAmount).val().trim()) * 1;
    //Check if number
    if (Takaful.CommonMethods.isPositiveInteger(totalSubscriptionForMaxLoanAmount, false) == false) {
        $('#' + Misc_SystemConfiguration.uiElements.txtTotalSubscriptionForMaxLoanAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل رصيد الاشتراكات اللازم للحصول على الحد الأقصى للقرض.", null, null, "error");
        return;
    }

    var minPeriodBetweenLoans = ($('#' + Misc_SystemConfiguration.uiElements.txtMinPeriodBetweenLoans).val().trim()) * 1;
    //Check if number
    if (Takaful.CommonMethods.isPositiveInteger(minPeriodBetweenLoans, true) == false) {
        $('#' + Misc_SystemConfiguration.uiElements.txtMinPeriodBetweenLoans).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل الحد الأدنى لفترة مابين القرضين.", null, null, "error");
        return;
    }

    //Max deduction percentage
    var maxDeductionPercentage = ($('#' + Misc_SystemConfiguration.uiElements.txtMaxDeductionPercentage).val().trim()) * 1;
    //Check if number
    if (Takaful.CommonMethods.isPositiveInteger(maxDeductionPercentage, false) == false) {
        $('#' + Misc_SystemConfiguration.uiElements.txtMaxDeductionPercentage).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل الحد الأقصى لنسبة الخصم من الراتب الشهرى.", null, null, "error");
        return;
    }

    var email = $('#' + Misc_SystemConfiguration.uiElements.txtEmail).val().trim();
    if (email == '') {
        $('#' + Misc_SystemConfiguration.uiElements.txtEmail).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل البريد الإلكترونى الخاص باستلام التنبيهات ورسائل النظام.", null, null, "error");
        return;
    }

    var SuI_LessPeriodForReSbubscrition = $('#' + Misc_SystemConfiguration.uiElements.txtSuI_LessPeriodForReSbubscrition).val().trim();
    if (SuI_LessPeriodForReSbubscrition == '') {
        $('#' + Misc_SystemConfiguration.uiElements.txtSuI_LessPeriodForReSbubscrition).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل الحد الادنى لفترة إعادة طلب الاشتراك من اخر الغاء\من تاريخ الموافقة على الإلغاء.", null, null, "error");
        return;
    }

    var SuI_LessPeriodForLoan4ReSubscriber = $('#' + Misc_SystemConfiguration.uiElements.txtSuI_LessPeriodForLoan4ReSubscriber).val().trim();
    if (SuI_LessPeriodForLoan4ReSubscriber == '') {
        $('#' + Misc_SystemConfiguration.uiElements.txtSuI_LessPeriodForLoan4ReSubscriber).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل الحد الادنى لفترة طلب القرض عند إعادة الاشتراك \للمنسحب.", null, null, "error");
        return;
    }

    var SuI_LessPeriodForLoanNewEmployee = $('#' + Misc_SystemConfiguration.uiElements.txtSuI_LessPeriodForLoanNewEmployee).val().trim();
    if (SuI_LessPeriodForLoanNewEmployee == '') {
        $('#' + Misc_SystemConfiguration.uiElements.txtSuI_LessPeriodForLoanNewEmployee).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل الحد الادنى لطلب القرض من تاريخ التعيين للمشترك الجديد.", null, null, "error");
        return;
    }

    Misc_SystemConfiguration.CustomMethods.AjaxCall.Save(subscriptionPercentage, minSubscriptionAmount, maxSubscriptionAmount, maxInstallmentsCount, minSubscriptionPeriod, maxLoanAmount1, maxLoanAmount2, totalSubscriptionForMaxLoanAmount, minPeriodBetweenLoans, maxDeductionPercentage, email, SuI_LessPeriodForLoan4ReSubscriber, SuI_LessPeriodForReSbubscrition, SuI_LessPeriodForLoanNewEmployee);

};














