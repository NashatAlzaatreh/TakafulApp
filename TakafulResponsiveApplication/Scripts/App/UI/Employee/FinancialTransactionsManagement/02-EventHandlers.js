
//Check for main namespace
if (typeof Employee_FinancialTransactionsManagement === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_FinancialTransactionsManagement = {};
}

//Add the event handlers container object to the main namespace
Employee_FinancialTransactionsManagement.EventHandlers = {};

//Employee selection in dropdown list
Employee_FinancialTransactionsManagement.EventHandlers.lstEmployees_onchange = function () {

    //Reset ui elements
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtEmployeeNumber).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtDepartment).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtPosition).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtSubscriptionAmount).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTotalSubscription).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLoanAmount).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtInstallmentAmount).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtPaidLoanAmount).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtRemainingLoanAmount).val('');

    $('#' + Employee_FinancialTransactionsManagement.uiElements.rdoCredit).prop('checked', false);
    $('#' + Employee_FinancialTransactionsManagement.uiElements.rdoDebit).prop('checked', false);
    $('#' + Employee_FinancialTransactionsManagement.uiElements.rdoSubscription).prop('checked', false);
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Subscription).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Subscription).attr('disabled', 'disabled');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionDate_Subscription).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionAmount_Subscription).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionType_Subscription).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.rdoLoan).prop('checked', false);
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Loan).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Loan).attr('disabled', 'disabled');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionDate_Loan).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionAmount_Loan).val('');
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionType_Loan).val('');

    //Get the selected index
    if ($('#' + Employee_FinancialTransactionsManagement.uiElements.lstEmployees)[0].selectedIndex < 0) {
        return;
    }

    var index = $('#' + Employee_FinancialTransactionsManagement.uiElements.lstEmployees)[0].selectedIndex;

    //Load the employee data to ui elements
    var employee = Employee_FinancialTransactionsManagement.Employees[index];
    Employee_FinancialTransactionsManagement.CustomMethods.AjaxCall.GetEmployeeData(employee.EmployeeNumber);
    //$('#' + Employee_FinancialTransactionsManagement.uiElements.txtDepartment).val(employee.Department);
    //$('#' + Employee_FinancialTransactionsManagement.uiElements.txtPosition).val(employee.Position);
    //if (employee.CurrentSubscriptionAmount != null) {
    //    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtSubscriptionAmount).val(employee.CurrentSubscriptionAmount);
    //}
    //if (employee.TotalSubscriptionAmount != null) {
    //    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTotalSubscription).val(employee.TotalSubscriptionAmount);
    //}

    //$('#' + Employee_FinancialTransactionsManagement.uiElements.txtLoanAmount).val(employee.LoanAmount);
    //$('#' + Employee_FinancialTransactionsManagement.uiElements.txtInstallmentAmount).val(employee.LoanInstallmentAmount);
    //$('#' + Employee_FinancialTransactionsManagement.uiElements.txtPaidLoanAmount).val(employee.PaidLoanAmount);
    //$('#' + Employee_FinancialTransactionsManagement.uiElements.txtRemainingLoanAmount).val(employee.RemainingLoanAmount);

    ////Last recorded subscription transaction
    //if (employee.LastSubscriptionTransaction != null) {
    //    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionDate_Subscription).val(Takaful.CommonMethods.GetFormattedDate(employee.LastSubscriptionTransaction.Date));
    //    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionAmount_Subscription).val(employee.LastSubscriptionTransaction.Amount);
    //    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionType_Subscription).val(employee.LastSubscriptionTransaction.Type);
    //}

    ////Last recorded loan installment transaction
    //if (employee.LastLoanTransaction != null) {
    //    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionDate_Loan).val(Takaful.CommonMethods.GetFormattedDate(employee.LastLoanTransaction.Date));
    //    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionAmount_Loan).val(employee.LastLoanTransaction.Amount);
    //    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtLastTransactionType_Loan).val(employee.LastLoanTransaction.Type);
    //}


};

//Subscription / Loan readio buttons
Employee_FinancialTransactionsManagement.EventHandlers.SubscriptionAndLoan_onchange = function () {

    if ($("#" + Employee_FinancialTransactionsManagement.uiElements.rdoSubscription).prop('checked') == true) {
        $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Subscription).removeAttr('disabled');
        $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Loan).attr('disabled', 'disabled');
        $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Loan).val('');
    } else if ($("#" + Employee_FinancialTransactionsManagement.uiElements.rdoLoan).prop('checked') == true) {
        $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Subscription).attr('disabled', 'disabled');
        $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Subscription).val('');
        $('#' + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Loan).removeAttr('disabled');
    }

};

//Search button
Employee_FinancialTransactionsManagement.EventHandlers.btnSearch_onclick = function () {


    //Input validation
    var empNumber = $("#" + Employee_FinancialTransactionsManagement.uiElements.txtEmployeeNumber).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(empNumber, false) == false) {
        $("#" + Employee_FinancialTransactionsManagement.uiElements.txtEmployeeNumber).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل الرقم الوظيفى برقم صحيح.", null, null, "error");
        return;
    }

    empNumber *= 1;

    //Get employee (if exists)
    $('#' + Employee_FinancialTransactionsManagement.uiElements.lstEmployees).val(empNumber);
    Employee_FinancialTransactionsManagement.EventHandlers.lstEmployees_onchange();


};

//Save button
Employee_FinancialTransactionsManagement.EventHandlers.btnSave_onclick = function () {

    var type = 0, category = 0;

    //Input validation
    //Selected employee
    if ($('#' + Employee_FinancialTransactionsManagement.uiElements.lstEmployees)[0].selectedIndex < 0) {
        $('#' + Employee_FinancialTransactionsManagement.uiElements.lstEmployees).focus();
        Takaful.CommonMethods.ShowInfoMsg("إختر الموظف أولاً.", null, null, "error");
        return;
    }

    var empID = $('#' + Employee_FinancialTransactionsManagement.uiElements.lstEmployees + ' option:selected').val();
    Employee_FinancialTransactionsManagement.EmployeeID = empID * 1;

    //Transaction type (credit - debit)
    if ($("#" + Employee_FinancialTransactionsManagement.uiElements.rdoCredit).prop('checked') == true) {
        type = 1;
    } else if ($("#" + Employee_FinancialTransactionsManagement.uiElements.rdoDebit).prop('checked') == true) {
        type = 2;
    } else {
        Takaful.CommonMethods.ShowInfoMsg("حدد نوع الحركة.", null, null, "error");
        return;
    }


    //Monthly subscription or loan installment
    var amount = 0;
    if ($("#" + Employee_FinancialTransactionsManagement.uiElements.rdoSubscription).prop('checked') == true) { //Subscription
        //Check amount
        amount = $("#" + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Subscription).val().trim();
        if (amount == "" || Takaful.CommonMethods.isPositiveInteger(amount, true) == false) {
            $("#" + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Subscription).focus();
            Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل المبلغ برقم صحيح.", null, null, "error");
            return;
        }
        amount *= 1;
        category = 1;
    } else if ($("#" + Employee_FinancialTransactionsManagement.uiElements.rdoLoan).prop('checked') == true) {  //Loan
        //Check amount
        amount = $("#" + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Loan).val().trim();
        if (amount == "" || Takaful.CommonMethods.isPositiveInteger(amount, true) == false) {
            $("#" + Employee_FinancialTransactionsManagement.uiElements.txtTransactionAmount_Loan).focus();
            Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل المبلغ برقم صحيح.", null, null, "error");
            return;
        }
        amount *= 1;
        category = 2;
    } else {
        Takaful.CommonMethods.ShowInfoMsg("حدد نوع المعاملة (اشتراك شهرى - قسط قرض).", null, null, "error");
        return;
    }


    //Save data
    Employee_FinancialTransactionsManagement.CustomMethods.AjaxCall.SaveData(Employee_FinancialTransactionsManagement.EmployeeID, type, category, amount);

    $('#' + Employee_FinancialTransactionsManagement.uiElements.btnSave).hide();

};












