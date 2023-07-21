
//Check for main namespace
if (typeof Request_CommitteeNewLoan_Approve === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeNewLoan_Approve = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeNewLoan_Approve.EventHandlers = {};


//Calculate button
Request_CommitteeNewLoan_Approve.EventHandlers.btnCalculate_onclick = function () {

    //Input validation
    var sAmount = $("#" + Request_CommitteeNewLoan_Approve.uiElements.txtSuggestedLoanAmount).val().trim();

    sAmount *= 1;


    //Calculate installment amount
    var installment = Math.round(sAmount / Request_CommitteeNewLoan_Approve.InitialData.LoanInstallmentsCount);
    var totalInstallments = Request_CommitteeNewLoan_Approve.InitialData.LoanInstallmentsCount;

    if (installment < Request_CommitteeNewLoan_Approve.InitialData.MinimumLoanInstallmentAmount) {
        installment = Request_CommitteeNewLoan_Approve.InitialData.MinimumLoanInstallmentAmount;

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

    $("#" + Request_CommitteeNewLoan_Approve.uiElements.txtLoanPayment).val(installment.toString() + "   /   " + totalInstallments.toString() + "   شهر");

};


//Submit button
Request_CommitteeNewLoan_Approve.EventHandlers.btnSubmit_onclick = function (event) {

    ////Input validation
    //var sAmount = 0;
    //sAmount = $("#" + Request_CommitteeNewLoan_Approve.uiElements.txtSuggestedLoanAmount).val().trim();

    //sAmount *= 1;

    ////Calculate installment amount
    //var installment = Math.round(sAmount / Request_CommitteeNewLoan_Approve.InitialData.LoanInstallmentsCount);
    //var totalInstallments = Request_CommitteeNewLoan_Approve.InitialData.LoanInstallmentsCount;

    //if (installment < Request_CommitteeNewLoan_Approve.InitialData.MinimumLoanInstallmentAmount) {
    //    installment = Request_CommitteeNewLoan_Approve.InitialData.MinimumLoanInstallmentAmount;

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

    //$("#" + Request_CommitteeNewLoan_Approve.uiElements.txtLoanPayment).val(installment.toString() + "   /   " + totalInstallments.toString() + "   شهر");


    Request_CommitteeNewLoan_Approve.CustomMethods.AjaxCall.TakeAction(Request_CommitteeNewLoan_Approve.EmpID, Request_CommitteeNewLoan_Approve.Year, Request_CommitteeNewLoan_Approve.Serial, event.data.action);


};


//Navigate button
Request_CommitteeNewLoan_Approve.EventHandlers.Navigate_onclick = function (event) {

    Request_CommitteeNewLoan_Approve.CustomMethods.AjaxCall.Navigate(Request_CommitteeNewLoan_Approve.EmpID, Request_CommitteeNewLoan_Approve.Year, Request_CommitteeNewLoan_Approve.Serial, event.data.direction);


};

//Postpone button
Request_CommitteeNewLoan_Approve.EventHandlers.btnExit_onclick = function (event) {

    Request_CommitteeNewLoan_Approve.IsTakingAction = true;
    Request_CommitteeNewLoan_Approve.CustomMethods.AjaxCall.Navigate(Request_CommitteeNewLoan_Approve.EmpID, Request_CommitteeNewLoan_Approve.Year, Request_CommitteeNewLoan_Approve.Serial, 1);

};




