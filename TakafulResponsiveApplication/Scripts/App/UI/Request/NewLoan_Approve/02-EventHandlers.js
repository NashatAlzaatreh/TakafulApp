
//Check for main namespace
if (typeof Request_NewLoan_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_NewLoan_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_NewLoan_Approve.EventHandlers = {};


//Calculate button
Request_NewLoan_Approve.EventHandlers.btnCalculate_onclick = function (event) {

    //Input validation
    var sAmount = $("#" + Request_NewLoan_Approve.uiElements.txtSuggestedLoanAmount).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(sAmount, false) == false) {
        $("#" + Request_NewLoan_Approve.uiElements.txtSuggestedLoanAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل مبلغ القرض المقترح برقم صحيح.", null, null, "error");
        return;
    }

    sAmount *= 1;

    //Max amount
    //if (sAmount > Request_NewLoan_Approve.InitialData.TotalLoanAmount) {
    if (sAmount > Request_NewLoan_Approve.InitialData.RequestedLoanAmount) {
        $("#" + Request_NewLoan_Approve.uiElements.txtSuggestedLoanAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("الحد الأقصى لمبلغ القرض المقترح هو: " + Request_NewLoan_Approve.InitialData.RequestedLoanAmount, null, null, "error");
        return;
    }

    //Calculate installment amount
    var installment = Math.round(sAmount / Request_NewLoan_Approve.InitialData.LoanInstallmentsCount);
    var totalInstallments = Request_NewLoan_Approve.InitialData.LoanInstallmentsCount;

    if (installment < Request_NewLoan_Approve.InitialData.MinimumLoanInstallmentAmount) {
        installment = Request_NewLoan_Approve.InitialData.MinimumLoanInstallmentAmount;

        //Recalculating the installments count
        totalInstallments = sAmount / installment;
        //Rounding installments
        if (Math.round(totalInstallments) < totalInstallments) {
            totalInstallments = Math.round(totalInstallments + 1);
        }
        else {
            totalInstallments = Math.round(totalInstallments);
        }
    }

    $("#" + Request_NewLoan_Approve.uiElements.txtLoanPayment).val(installment.toString() + "   /   " + totalInstallments.toString() + "   شهر");

};

//Navigate button
Request_NewLoan_Approve.EventHandlers.Navigate_onclick = function (event) {

    Request_NewLoan_Approve.CustomMethods.AjaxCall.Navigate(Request_NewLoan_Approve.EmpID, Request_NewLoan_Approve.Year, Request_NewLoan_Approve.Serial, event.data.direction);


};

//Submit button
Request_NewLoan_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    //Input validation
    var sAmount = 0;
    if (event.data.action == 2) {
        sAmount = $("#" + Request_NewLoan_Approve.uiElements.txtSuggestedLoanAmount).val().trim();

        if (Takaful.CommonMethods.isPositiveInteger(sAmount, false) == false) {
            $("#" + Request_NewLoan_Approve.uiElements.txtSuggestedLoanAmount).focus();
            Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل مبلغ القرض المقترح برقم صحيح.", null, null, "error");
            return;
        }

        sAmount *= 1;

        //Max amount
        //if (sAmount > Request_NewLoan_Approve.InitialData.TotalLoanAmount) {
        if (sAmount > Request_NewLoan_Approve.InitialData.RequestedLoanAmount) {
            $("#" + Request_NewLoan_Approve.uiElements.txtSuggestedLoanAmount).focus();
            Takaful.CommonMethods.ShowInfoMsg("الحد الأقصى لمبلغ القرض المقترح هو: " + Request_NewLoan_Approve.InitialData.RequestedLoanAmount, null, null, "error");
            return;
        }

        //Calculate installment amount
        var installment = Math.round(sAmount / Request_NewLoan_Approve.InitialData.LoanInstallmentsCount);
        var totalInstallments = Request_NewLoan_Approve.InitialData.LoanInstallmentsCount;

        if (installment < Request_NewLoan_Approve.InitialData.MinimumLoanInstallmentAmount) {
            installment = Request_NewLoan_Approve.InitialData.MinimumLoanInstallmentAmount;

            //Recalculating the installments count
            totalInstallments = sAmount / installment;
            //Rounding installments
            if (Math.round(totalInstallments) < totalInstallments) {
                totalInstallments = Math.round(totalInstallments + 1);
            }
            else {
                totalInstallments = Math.round(totalInstallments);
            }
        }

        $("#" + Request_NewLoan_Approve.uiElements.txtLoanPayment).val(installment.toString() + "   /   " + totalInstallments.toString() + "   شهر");
    }


    Request_NewLoan_Approve.CustomMethods.AjaxCall.TakeAction(Request_NewLoan_Approve.EmpID, Request_NewLoan_Approve.Year, Request_NewLoan_Approve.Serial, sAmount, $('#' + Request_NewLoan_Approve.uiElements.txtNotes).val().trim(), event.data.action);


};











