
//Check for main namespace
if (typeof Exception_Loan_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Exception_Loan_Submit = {};
}

//Add the event handlers container object to the main namespace
Exception_Loan_Submit.EventHandlers = {};


//Employees dropdown list selection event
Exception_Loan_Submit.EventHandlers.lstEmployees_onchange = function () {

    if ($('#' + Exception_Loan_Submit.uiElements.lstEmployees)[0].selectedIndex < 0) {
        return;
    }

    $('#' + Exception_Loan_Submit.uiElements.lstEmployees).attr("disabled", "disabled");

    //Load the department of the selected employee
    var empID = $('#' + Exception_Loan_Submit.uiElements.lstEmployees + ' option:selected').val();

    //Fill the employees dropdown list
    for (var i = 0; i < Exception_Loan_Submit.InitialData.Employees.length; i++) {
        if (Exception_Loan_Submit.InitialData.Employees[i].EmployeeNumber == empID) {
            $('#' + Exception_Loan_Submit.uiElements.txtDepartment).val(Exception_Loan_Submit.InitialData.Employees[i].Department);
            $('#' + Exception_Loan_Submit.uiElements.lstEmployees).removeAttr("disabled");
            return;
        }
    }


};

//Load the selected employee exception in edit mode
Exception_Loan_Submit.EventHandlers.btnEditException_click = function (index) {

    if (index >= 0) {
        //Employee number & name
        $('#' + Exception_Loan_Submit.uiElements.lstEmployees).val(Exception_Loan_Submit.InitialData.Exceptions[index].EmpID);
        $('#' + Exception_Loan_Submit.uiElements.lstEmployees).attr("disabled", "disabled");

        //Department
        $('#' + Exception_Loan_Submit.uiElements.txtDepartment).val(Exception_Loan_Submit.InitialData.Exceptions[index].Department);

        //Amount
        $('#' + Exception_Loan_Submit.uiElements.txtAmount).val(Exception_Loan_Submit.InitialData.Exceptions[index].Amount);

        //Minimum subscription period
        $('#' + Exception_Loan_Submit.uiElements.chkMinimumSubscriptionPerion).prop('checked', Exception_Loan_Submit.InitialData.Exceptions[index].MinimumSubscriptionPeriod);

        //Loan request with active loan ability
        $('#' + Exception_Loan_Submit.uiElements.chkLoanWithLoanAbility).prop('checked', Exception_Loan_Submit.InitialData.Exceptions[index].LoanRequestWithActiveLoan);

        //Notes
        $('#' + Exception_Loan_Submit.uiElements.txtNotes).val(Exception_Loan_Submit.InitialData.Exceptions[index].Notes);

        //Is used validation
        if (Exception_Loan_Submit.InitialData.Exceptions[index].IsUsed == true) {
            $('#' + Exception_Loan_Submit.uiElements.txtAmount).attr('readonly', 'readonly');
        }

        //Cancellation buton
        $('#' + Exception_Loan_Submit.uiElements.btnCancel).show();
    }

};

//Load the selected employee exception in edit mode
Exception_Loan_Submit.EventHandlers.btnCancelEditException_click = function () {


    $('#' + Exception_Loan_Submit.uiElements.lstEmployees).val('');
    $('#' + Exception_Loan_Submit.uiElements.lstEmployees).removeAttr("disabled");
    $('#' + Exception_Loan_Submit.uiElements.txtDepartment).val('');
    $('#' + Exception_Loan_Submit.uiElements.txtAmount).val('0');
    $('#' + Exception_Loan_Submit.uiElements.txtAmount).removeAttr("readonly");
    $('#' + Exception_Loan_Submit.uiElements.chkMinimumSubscriptionPerion).prop('checked', false);
    $('#' + Exception_Loan_Submit.uiElements.chkLoanWithLoanAbility).prop('checked', false);
    $('#' + Exception_Loan_Submit.uiElements.txtNotes).val('');
    $('#' + Exception_Loan_Submit.uiElements.btnSave).show();
    $('#' + Exception_Loan_Submit.uiElements.btnCancel).hide();

};

//Delete the employee exception
Exception_Loan_Submit.EventHandlers.btnDeleteException_click = function (index) {


    var yesResult = function () {
        var empID = Exception_Loan_Submit.InitialData.Exceptions[index].EmpID;

        //Delete exception
        Exception_Loan_Submit.CustomMethods.AjaxCall.Delete(empID);
    };

    //Confirmation alert
    Takaful.CommonMethods.ShowConfirmMsg("سوف يتم حذف هذا الإستثناء ، هل أنت متأكد؟", yesResult);



};

//Save the employee exception
Exception_Loan_Submit.EventHandlers.btnSave_click = function () {

    //Input validation
    //Selected employee
    if ($('#' + Exception_Loan_Submit.uiElements.lstEmployees)[0].selectedIndex < 0) {
        $('#' + Exception_Loan_Submit.uiElements.lstEmployees).focus();
        Takaful.CommonMethods.ShowInfoMsg('من فضلك إختر الموظف.', null, null, "error");
        return;
    }

    var empID = $('#' + Exception_Loan_Submit.uiElements.lstEmployees + ' option:selected').val();

    //Amount
    var amount = $("#" + Exception_Loan_Submit.uiElements.txtAmount).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(amount, true) == false) {
        //$("#" + Exception_Loan_Submit.uiElements.txtAmount).focus();
        //Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل مبلغ الإستثناء برقم صحيح.", null, null, "error");
        //return;
        $("#" + Exception_Loan_Submit.uiElements.txtAmount).val('0');
        amount = 0;
    }

    amount *= 1;

    //Min subs period
    var minSubsPeriod = $('#' + Exception_Loan_Submit.uiElements.chkMinimumSubscriptionPerion).prop('checked');

    //Loan with loan
    var loanWithLoan = $('#' + Exception_Loan_Submit.uiElements.chkLoanWithLoanAbility).prop('checked');

    //Notes
    var notes = $("#" + Exception_Loan_Submit.uiElements.txtNotes).val().trim();

    //Check exception data
    if (amount == 0 && minSubsPeriod == false && loanWithLoan == false && notes == "") {
        Takaful.CommonMethods.ShowInfoMsg("لايوجد أى بيانات تم إدخالها للإستثناء.", null, null, "error");
        return;
    }

    //Save data
    Exception_Loan_Submit.CustomMethods.AjaxCall.Save(empID, amount, minSubsPeriod, loanWithLoan, notes);

    $('#' + Exception_Loan_Submit.uiElements.btnSave).hide();

};

//Export button
Exception_Loan_Submit.EventHandlers.btnExport_onclick = function () {

    if (Exception_Loan_Submit.InitialData.Exceptions.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Exception_Loan_Submit.CustomMethods.AjaxCall.ExportData();


};







