
//Check for main namespace
if (typeof Request_CommitteeNewLoan_Reset === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeNewLoan_Reset = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeNewLoan_Reset.EventHandlers = {};


//Calculate button
Request_CommitteeNewLoan_Reset.EventHandlers.btnCalculate_onclick = function () {

    //Input validation
    var sAmount = $("#" + Request_CommitteeNewLoan_Reset.uiElements.txtSuggestedLoanAmount).val().trim();

    sAmount *= 1;


    //Calculate installment amount
    var installment = Math.round(sAmount / Request_CommitteeNewLoan_Reset.InitialData.LoanInstallmentsCount);
    var totalInstallments = Request_CommitteeNewLoan_Reset.InitialData.LoanInstallmentsCount;

    if (installment < Request_CommitteeNewLoan_Reset.InitialData.MinimumLoanInstallmentAmount) {
        installment = Request_CommitteeNewLoan_Reset.InitialData.MinimumLoanInstallmentAmount;

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

    $("#" + Request_CommitteeNewLoan_Reset.uiElements.txtLoanPayment).val(installment.toString() + "   /   " + totalInstallments.toString() + "   شهر");

};


//Reset button
Request_CommitteeNewLoan_Reset.EventHandlers.btnReset_onclick = function (event) {

    ////Input validation
    //var sAmount = 0;
    //sAmount = $("#" + Request_CommitteeNewLoan_Reset.uiElements.txtSuggestedLoanAmount).val().trim();

    //sAmount *= 1;

    ////Calculate installment amount
    //var installment = Math.round(sAmount / Request_CommitteeNewLoan_Reset.InitialData.LoanInstallmentsCount);
    //var totalInstallments = Request_CommitteeNewLoan_Reset.InitialData.LoanInstallmentsCount;

    //if (installment < Request_CommitteeNewLoan_Reset.InitialData.MinimumLoanInstallmentAmount) {
    //    installment = Request_CommitteeNewLoan_Reset.InitialData.MinimumLoanInstallmentAmount;

    //    //Recalculating the installments count
    //    totalInstallments = sAmount / installment;
    //    //Rounding installments
    //    if (Math.round(totalInstallments) < totalInstallments) {
    //        totalInstallments = Math.round(totalInstallments + 1);
    //    }
    //    else {
    //        totalInstallments = Math.round(totalInstallments);
    //    }
    //}

    //$("#" + Request_CommitteeNewLoan_Reset.uiElements.txtLoanPayment).val(installment.toString() + "   /   " + totalInstallments.toString() + "   شهر");


    Request_CommitteeNewLoan_Reset.CustomMethods.AjaxCall.Reset(Request_CommitteeNewLoan_Reset.EmpID, Request_CommitteeNewLoan_Reset.Year, Request_CommitteeNewLoan_Reset.Serial);


};











