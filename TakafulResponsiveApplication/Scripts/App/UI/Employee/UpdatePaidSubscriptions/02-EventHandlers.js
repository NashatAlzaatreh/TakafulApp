
//Check for main namespace
if (typeof Employee_UpdatePaidSubscriptions === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_UpdatePaidSubscriptions = {};
}

//Add the event handlers container object to the main namespace
Employee_UpdatePaidSubscriptions.EventHandlers = {};


//Search for employee
Employee_UpdatePaidSubscriptions.EventHandlers.btnSearch_onclick = function () {

    //Input validation
    var empNumber = $("#" + Employee_UpdatePaidSubscriptions.uiElements.txtEmployeeNumber).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(empNumber, false) == false) {
        $("#" + Employee_UpdatePaidSubscriptions.uiElements.txtEmployeeNumber).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل الرقم الوظيفى.", null, null, "error");
        return;
    }

    empNumber *= 1;

    //Check if employee exists
    if (Employee_UpdatePaidSubscriptions.CustomMethods.LocalOperations.IsEmployeeExists(empNumber) == true) {
        //Redirect to the finance transaction page
        window.location.href = "../Employee/FinancialTransactionsManagement.html?empID=" + empNumber;

    } else {
        Takaful.CommonMethods.ShowInfoMsg("هذا الرقم الوظيفى غير موجود.", null, null, "error");
        return;
    }



};

//Master employees checkbox
Employee_UpdatePaidSubscriptions.EventHandlers.chkEmployees_onchange = function () {

    var selection = $("#" + Employee_UpdatePaidSubscriptions.uiElements.chkEmployees).prop('checked');

    for (var i = 0; i < Employee_UpdatePaidSubscriptions.Employees.length; i++) {
        Employee_UpdatePaidSubscriptions.Employees[i].IsSelected = selection;

        if (selection == true) {
            //Employee_UpdatePaidSubscriptions.Employees[i].IsSelected = Employee_UpdatePaidSubscriptions.CustomMethods.LocalOperations.IsValidAmount($("#txt_" + i.toString()).val());
            Employee_UpdatePaidSubscriptions.Employees[i].IsSelected = selection;
        }
    }

    //Refresh the ui table
    Employee_UpdatePaidSubscriptions.CustomMethods.LocalOperations.PopulateEmployeesTable();

};

//Employee checkbox
Employee_UpdatePaidSubscriptions.EventHandlers.chkApprove_onchange = function (index) {

    //Check if the entered amount has been changed
    if ($("#chk_" + index.toString()).prop('checked') == true) {
        //Get the entered amount
        var amount = $("#txt_" + index.toString()).val().trim();
        if (amount == '') {
            amount = 0;
        }

        amount *= 1;

        if (isNaN(amount) || amount == 0) {
            Takaful.CommonMethods.ShowInfoMsg("أدخل المبلغ المسدد.", null, null, "error");
            $("#txt_" + index.toString()).focus();
            $("#chk_" + index.toString()).prop('checked', false);
            Employee_UpdatePaidSubscriptions.Employees[index].IsSelected = false;
            return;
        }
    }

    //Update the selection flag in the memory object
    Employee_UpdatePaidSubscriptions.Employees[index].IsSelected = $("#chk_" + index.toString()).prop('checked');

    //Update the master checkbox
    if (Employee_UpdatePaidSubscriptions.Employees[index].IsSelected == false) {
        $("#" + Employee_UpdatePaidSubscriptions.uiElements.chkEmployees).prop('checked', false);
    }

};

//Amount textbox
Employee_UpdatePaidSubscriptions.EventHandlers.txtAmount_onchange = function (index) {

    //Get the entered subscription amount
    //var amount = $("#txt_" + index.toString()).val().trim();
    var amount = $("#txt_" + index.toString()).val();
    if (isNaN(amount) || amount == '') {
        amount = 0;
    }

    amount *= 1;

    if (amount == 0) {
        $("#chk_" + index.toString()).prop('checked', false);
        Employee_UpdatePaidSubscriptions.Employees[index].IsSelected = false;
        $("#txt_" + index.toString()).val(Employee_UpdatePaidSubscriptions.Employees[index].CurrentPaidAmount);
        return;
    }

    //Update the paid amount in the memory object
    Employee_UpdatePaidSubscriptions.Employees[index].CurrentPaidAmount = amount;

};

//Save
Employee_UpdatePaidSubscriptions.EventHandlers.btnSave_onclick = function () {

    //Input validation
    //Transaction date
    var tDate = Takaful.CommonMethods.GetFormattedDate($('#' + Employee_UpdatePaidSubscriptions.uiElements.txtDate).val());
    if (tDate == "") {
        $('#' + Employee_UpdatePaidSubscriptions.uiElements.txtDate).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل تاريخ الإحتساب.", null, null, "error");
        return;
    }

    var isDataToSave = false;
    //Check if selected employees
    for (var i = 0; i < Employee_UpdatePaidSubscriptions.Employees.length; i++) {
        if (Employee_UpdatePaidSubscriptions.Employees[i].IsSelected == true) {  //Some employees are selected, terminate the loop
            isDataToSave = true;
            break;
        }
    }

    if (isDataToSave == false) {
        Takaful.CommonMethods.ShowInfoMsg("لم يتم إختيار أى موظفين.", null, null, "error");
        return;
    }

    //Save
    Employee_UpdatePaidSubscriptions.CustomMethods.AjaxCall.Save();


};

//Export button
Employee_UpdatePaidSubscriptions.EventHandlers.btnExport_onclick = function () {

    if (Employee_UpdatePaidSubscriptions.Employees.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Employee_UpdatePaidSubscriptions.CustomMethods.AjaxCall.ExportData();


};

