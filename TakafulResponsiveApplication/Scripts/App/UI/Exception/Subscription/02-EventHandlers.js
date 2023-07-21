
//Check for main namespace
if (typeof Exception_Subscription_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Exception_Subscription_Submit = {};
}

//Add the event handlers container object to the main namespace
Exception_Subscription_Submit.EventHandlers = {};


//Employees dropdown list selection event
Exception_Subscription_Submit.EventHandlers.lstEmployees_onchange = function () {

    if ($('#' + Exception_Subscription_Submit.uiElements.lstEmployees)[0].selectedIndex < 0) {
        return;
    }

    $('#' + Exception_Subscription_Submit.uiElements.lstEmployees).attr("disabled", "disabled");

    //Load the department of the selected employee
    var empID = $('#' + Exception_Subscription_Submit.uiElements.lstEmployees + ' option:selected').val();

    //Fill the employees dropdown list
    for (var i = 0; i < Exception_Subscription_Submit.InitialData.Employees.length; i++) {
        if (Exception_Subscription_Submit.InitialData.Employees[i].EmployeeNumber == empID) {
            $('#' + Exception_Subscription_Submit.uiElements.txtDepartment).val(Exception_Subscription_Submit.InitialData.Employees[i].Department);
            $('#' + Exception_Subscription_Submit.uiElements.lstEmployees).removeAttr("disabled");
            return;
        }
    }


};

//Load the selected employee exception in edit mode
Exception_Subscription_Submit.EventHandlers.btnEditException_click = function (index) {

    if (index >= 0) {
        //Employee number & name
        $('#' + Exception_Subscription_Submit.uiElements.lstEmployees).val(Exception_Subscription_Submit.InitialData.Exceptions[index].EmpID);
        $('#' + Exception_Subscription_Submit.uiElements.lstEmployees).attr("disabled", "disabled");

        //Department
        $('#' + Exception_Subscription_Submit.uiElements.txtDepartment).val(Exception_Subscription_Submit.InitialData.Exceptions[index].Department);

        //Amount
        $('#' + Exception_Subscription_Submit.uiElements.txtAmount).val(Exception_Subscription_Submit.InitialData.Exceptions[index].Amount);

        //Notes
        $('#' + Exception_Subscription_Submit.uiElements.txtNotes).val(Exception_Subscription_Submit.InitialData.Exceptions[index].Notes);

        //Is used validation
        if (Exception_Subscription_Submit.InitialData.Exceptions[index].IsUsed == true) {
            $('#' + Exception_Subscription_Submit.uiElements.btnSave).hide();
        }

        //Cancellation buton
        $('#' + Exception_Subscription_Submit.uiElements.btnCancel).show();
    }

};

//Cancel the edit mode
Exception_Subscription_Submit.EventHandlers.btnCancelEditException_click = function () {


    $('#' + Exception_Subscription_Submit.uiElements.lstEmployees).val('');
    $('#' + Exception_Subscription_Submit.uiElements.lstEmployees).removeAttr("disabled");
    $('#' + Exception_Subscription_Submit.uiElements.txtDepartment).val('');
    $('#' + Exception_Subscription_Submit.uiElements.txtAmount).val('0');
    $('#' + Exception_Subscription_Submit.uiElements.txtNotes).val('');
    $('#' + Exception_Subscription_Submit.uiElements.btnSave).show();
    $('#' + Exception_Subscription_Submit.uiElements.btnCancel).hide();

};

//Delete the employee exception
Exception_Subscription_Submit.EventHandlers.btnDeleteException_click = function (index) {


    var yesResult = function () {
        var empID = Exception_Subscription_Submit.InitialData.Exceptions[index].EmpID;

        //Delete exception
        Exception_Subscription_Submit.CustomMethods.AjaxCall.Delete(empID);
    };

    //Confirmation alert
    Takaful.CommonMethods.ShowConfirmMsg("سوف يتم حذف هذا الإستثناء ، هل أنت متأكد؟", yesResult);



};

//Save the employee exception
Exception_Subscription_Submit.EventHandlers.btnSave_click = function () {

    //Input validation
    //Selected employee
    if ($('#' + Exception_Subscription_Submit.uiElements.lstEmployees)[0].selectedIndex < 0) {
        $('#' + Exception_Subscription_Submit.uiElements.lstEmployees).focus();
        Takaful.CommonMethods.ShowInfoMsg('من فضلك إختر الموظف.', null, null, "error");
        return;
    }

    var empID = $('#' + Exception_Subscription_Submit.uiElements.lstEmployees + ' option:selected').val();

    //Amount
    var amount = $("#" + Exception_Subscription_Submit.uiElements.txtAmount).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(amount, false) == false) {
        $("#" + Exception_Subscription_Submit.uiElements.txtAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل مبلغ الإستثناء برقم صحيح.", null, null, "error");
        return;
    }

    amount *= 1;

    //Notes
    var notes = $("#" + Exception_Subscription_Submit.uiElements.txtNotes).val();

    //Save data
    Exception_Subscription_Submit.CustomMethods.AjaxCall.Save(empID, amount, notes);

    $('#' + Exception_Subscription_Submit.uiElements.btnSave).hide();

};

//Export button
Exception_Subscription_Submit.EventHandlers.btnExport_onclick = function () {

    if (Exception_Subscription_Submit.InitialData.Exceptions.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Exception_Subscription_Submit.CustomMethods.AjaxCall.ExportData();


};







