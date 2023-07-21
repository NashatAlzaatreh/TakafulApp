
//Check for main namespace
if (typeof Request_AdminCommitteeNewLoan_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_AdminCommitteeNewLoan_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_AdminCommitteeNewLoan_Approve.EventHandlers = {};


//Calculate button
Request_AdminCommitteeNewLoan_Approve.EventHandlers.btnCalculate_onclick = function () {

    //Input validation
    var sAmount = $("#" + Request_AdminCommitteeNewLoan_Approve.uiElements.txtSuggestedLoanAmount).val().trim();

    sAmount *= 1;


    //Calculate installment amount
    var installment = Math.round(sAmount / Request_AdminCommitteeNewLoan_Approve.InitialData.LoanInstallmentsCount);
    var totalInstallments = Request_AdminCommitteeNewLoan_Approve.InitialData.LoanInstallmentsCount;

    if (installment < Request_AdminCommitteeNewLoan_Approve.InitialData.MinimumLoanInstallmentAmount) {
        installment = Request_AdminCommitteeNewLoan_Approve.InitialData.MinimumLoanInstallmentAmount;

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

    $("#" + Request_AdminCommitteeNewLoan_Approve.uiElements.txtLoanPayment).val(installment.toString() + "   /   " + totalInstallments.toString() + "   شهر");

};


//Submit button
Request_AdminCommitteeNewLoan_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    ////Input validation
    //var sAmount = 0;
    //sAmount = $("#" + Request_AdminCommitteeNewLoan_Approve.uiElements.txtSuggestedLoanAmount).val().trim();

    //sAmount *= 1;

    ////Calculate installment amount
    //var installment = Math.round(sAmount / Request_AdminCommitteeNewLoan_Approve.InitialData.LoanInstallmentsCount);
    //var totalInstallments = Request_AdminCommitteeNewLoan_Approve.InitialData.LoanInstallmentsCount;

    //if (installment < Request_AdminCommitteeNewLoan_Approve.InitialData.MinimumLoanInstallmentAmount) {
    //    installment = Request_AdminCommitteeNewLoan_Approve.InitialData.MinimumLoanInstallmentAmount;

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

    //$("#" + Request_AdminCommitteeNewLoan_Approve.uiElements.txtLoanPayment).val(installment.toString() + "   /   " + totalInstallments.toString() + "   شهر");


    Request_AdminCommitteeNewLoan_Approve.CustomMethods.AjaxCall.TakeAction(Request_AdminCommitteeNewLoan_Approve.EmpID, Request_AdminCommitteeNewLoan_Approve.Year, Request_AdminCommitteeNewLoan_Approve.Serial, Request_AdminCommitteeNewLoan_Approve.MemberID, event.data.action);


};











