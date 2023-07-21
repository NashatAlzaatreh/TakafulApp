
//Check for main namespace
if (typeof Employee_FinancialStatus === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_FinancialStatus = {};
}

//Add the event handlers container object to the main namespace
Employee_FinancialStatus.EventHandlers = {};

//Search button
Employee_FinancialStatus.EventHandlers.btnSearch_onclick = function () {

    //Clear the ui elements
    $('#' + Employee_FinancialStatus.uiElements.txtName).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtDepartment).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtPosition).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtJoinDate).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtSalary).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtSubscriptionAmount).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtTotalSubscription).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtLoanAmount).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtInstallmentAmount).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtPaidLoanAmount).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtRemainingLoanAmount).val('');
    $('#' + Employee_FinancialStatus.uiElements.txtZakahAmount).val('');

    //Input validation
    var empNumber = $("#" + Employee_FinancialStatus.uiElements.txtEmployeeNumber).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(empNumber, false) == false) {
        $("#" + Employee_FinancialStatus.uiElements.txtEmployeeNumber).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل الرقم الوظيفى برقم صحيح.", null, null, "error");
        return;
    }

    empNumber *= 1;

    //Get the data
    Employee_FinancialStatus.CustomMethods.AjaxCall.GetData(empNumber);


};














