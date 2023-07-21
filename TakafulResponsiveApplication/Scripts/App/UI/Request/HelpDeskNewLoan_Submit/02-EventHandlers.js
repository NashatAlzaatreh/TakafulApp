
//Check for main namespace
if (typeof Request_HelpDeskNewLoan_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_HelpDeskNewLoan_Submit = {};
}

//Add the event handlers container object to the main namespace
Request_HelpDeskNewLoan_Submit.EventHandlers = {};


//Calculate total loan amount
Request_HelpDeskNewLoan_Submit.EventHandlers.txtAmount_onchange = function () {

    var amount = $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtAmount).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(amount, true) == false) {
        return;
    }

    amount *= 1;

    $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtTotalLoanAmount).val(amount + Request_HelpDeskNewLoan_Submit.InitialData.RemainingLoanAmount);

};

//Calculate installment button
Request_HelpDeskNewLoan_Submit.EventHandlers.btnCalculateInstallment_onclick = function () {

    //Input validation
    var amount = $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtAmount).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(amount, false) == false) {
        $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل مبلغ القرض برقم صحيح.", null, null, "error");
        return;
    }

    amount *= 1;

    var loanAmount = amount + Request_HelpDeskNewLoan_Submit.InitialData.RemainingLoanAmount;

    //Max amount
    if (loanAmount > Request_HelpDeskNewLoan_Submit.InitialData.MaximumAllowedLoanAmount) {
        $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("الحد الأقصى لمبلغ القرض هو: " + Request_HelpDeskNewLoan_Submit.InitialData.MaximumAllowedLoanAmount, null, null, "error");
        return;
    }

    //Calculate installment amount
    var installment = Math.round(loanAmount / Request_HelpDeskNewLoan_Submit.InitialData.LoanInstallmentsCount);

    if (installment < Request_HelpDeskNewLoan_Submit.InitialData.MinimumLoanInstallmentAmount) {
        installment = Request_HelpDeskNewLoan_Submit.InitialData.MinimumLoanInstallmentAmount;
    }

    $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtInstallment).val(installment);


};

//Submit button
Request_HelpDeskNewLoan_Submit.EventHandlers.btnSubmit_onclick = function () {

    //Input validation
    if (!Request_HelpDeskNewLoan_Submit.EmployeeNumber || Request_HelpDeskNewLoan_Submit.EmployeeNumber == 0) {
        Takaful.CommonMethods.ShowInfoMsg("من فضلك حدد الموظف أولاً.", null, null, "error");
        return;
    }

    //Loan amount validation
    var amount = $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtAmount).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(amount, false) == false) {
        $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل مبلغ القرض برقم صحيح.", null, null, "error");
        return;
    }

    amount *= 1;

    //Max amount
    if ((amount + Request_HelpDeskNewLoan_Submit.InitialData.RemainingLoanAmount) > Request_HelpDeskNewLoan_Submit.InitialData.MaximumAllowedLoanAmount) {
        $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("الحد الأقصى لمبلغ القرض هو: " + Request_HelpDeskNewLoan_Submit.InitialData.MaximumAllowedLoanAmount, null, null, "error");
        return;
    }

    //Installment amount validation
    var installment = $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtInstallment).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(installment, false) == false) {
        $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtInstallment).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل قسط القرض برقم صحيح.", null, null, "error");
        return;
    }

    installment *= 1;

    //Maximum installment
    if (installment > Request_HelpDeskNewLoan_Submit.InitialData.MaximumLoanInstallmentAmount) {
        $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtInstallment).focus();
        Takaful.CommonMethods.ShowInfoMsg("الحد الأقصى لقيمة القسط هو: " + Request_HelpDeskNewLoan_Submit.InitialData.MaximumLoanInstallmentAmount, null, null, "error");
        return;
    }

    //Minimum installment
    var calcInstallment = Math.round((amount + Request_HelpDeskNewLoan_Submit.InitialData.RemainingLoanAmount) / Request_HelpDeskNewLoan_Submit.InitialData.LoanInstallmentsCount);

    if (calcInstallment < Request_HelpDeskNewLoan_Submit.InitialData.MinimumLoanInstallmentAmount) {
        calcInstallment = Request_HelpDeskNewLoan_Submit.InitialData.MinimumLoanInstallmentAmount;
    }

    if (installment < calcInstallment) {
        $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtInstallment).focus();
        Takaful.CommonMethods.ShowInfoMsg("الحد الأدنى لقيمة القسط هو: " + calcInstallment, null, null, "error");
        return;
    }

    //Notes
    var notes = $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtNotes).val().trim();

    if (notes == '') {
        $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtNotes).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل سبب القرض.", null, null, "error");
        return;
    }

    //Submit the request
    Request_HelpDeskNewLoan_Submit.CustomMethods.AjaxCall.Submit(Request_HelpDeskNewLoan_Submit.EmployeeNumber, amount, installment, notes);



};

//Search button
Request_HelpDeskNewLoan_Submit.EventHandlers.btnSearch_onclick = function () {

    var empNumber = $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtEmployeeNumber).val().trim();

    //Clear the ui elements
    Request_HelpDeskNewLoan_Submit.CustomMethods.LocalOperations.ResetUI();

    //Input validation
    $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtEmployeeNumber).val(empNumber);

    if (Takaful.CommonMethods.isPositiveInteger(empNumber, false) == false) {
        $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtEmployeeNumber).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل الرقم الوظيفى برقم صحيح.", null, null, "error");
        return;
    }

    empNumber *= 1;
    Request_HelpDeskNewLoan_Submit.EmployeeNumber = 0;

    //Get the data
    Request_HelpDeskNewLoan_Submit.CustomMethods.AjaxCall.GetInitialData(empNumber);


};








