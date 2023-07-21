
//Check for main namespace
if (typeof Employee_UploadPaidSubscriptions === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_UploadPaidSubscriptions = {};
}

//Add the event handlers container object to the main namespace
Employee_UploadPaidSubscriptions.EventHandlers = {};


//Search for employee
Employee_UploadPaidSubscriptions.EventHandlers.btnSearch_onclick = function () {

    //Input validation
    var empNumber = $("#" + Employee_UploadPaidSubscriptions.uiElements.txtEmployeeNumber).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(empNumber, false) == false) {
        $("#" + Employee_UploadPaidSubscriptions.uiElements.txtEmployeeNumber).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل الرقم الوظيفى.", null, null, "error");
        return;
    }

    empNumber *= 1;

    //Check if employee exists
    if (Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.IsEmployeeExists(empNumber) == true) {
        //Redirect to the finance transaction page
        window.location.href = "../Employee/FinancialTransactionsManagement.html?empID=" + empNumber;

    } else {
        Takaful.CommonMethods.ShowInfoMsg("هذا الرقم الوظيفى غير موجود.", null, null, "error");
        return;
    }



};

//Master employees checkbox
Employee_UploadPaidSubscriptions.EventHandlers.chkEmployees_onchange = function () {

    var selection = $("#" + Employee_UploadPaidSubscriptions.uiElements.chkEmployees).prop('checked');

    for (var i = 0; i < Employee_UploadPaidSubscriptions.Employees.length; i++) {
        Employee_UploadPaidSubscriptions.Employees[i].IsSelected = selection;
        if (selection == true) {
            //Employee_UploadPaidSubscriptions.Employees[i].IsSelected = Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.IsValidAmount($("#txt_" + i.toString()).val());
            Employee_UploadPaidSubscriptions.Employees[i].IsSelected = selection;
        }
    }

    //Refresh the ui table
    Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.PopulateEmployeesTable();

    //Update total paid amount
    Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.UpdateTotalPaidAmount();

};

//Employee checkbox
Employee_UploadPaidSubscriptions.EventHandlers.chkApprove_onchange = function (index) {

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
            Employee_UploadPaidSubscriptions.Employees[index].IsSelected = false;
            return;
        }
    }

    //Update the selection flag in the memory object
    Employee_UploadPaidSubscriptions.Employees[index].IsSelected = $("#chk_" + index.toString()).prop('checked');

    //Update the master checkbox
    if (Employee_UploadPaidSubscriptions.Employees[index].IsSelected == false) {
        $("#" + Employee_UploadPaidSubscriptions.uiElements.chkEmployees).prop('checked', false);
    }

    //Update total paid amount
    Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.UpdateTotalPaidAmount();

};

//Amount textbox
Employee_UploadPaidSubscriptions.EventHandlers.txtAmount_onchange = function (index) {

    //Get the entered subscription amount
    //var amount = $("#txt_" + index.toString()).val().trim();
    var amount = $("#txt_" + index.toString()).val();
    if (isNaN(amount) || amount == '') {
        amount = 0;
    }

    amount *= 1;

    if (amount == 0) {
        $("#chk_" + index.toString()).prop('checked', false);
        Employee_UploadPaidSubscriptions.Employees[index].IsSelected = false;
        $("#txt_" + index.toString()).val(Employee_UploadPaidSubscriptions.Employees[index].CurrentPaidAmount);
        return;
    }

    //Update the paid amount in the memory object
    Employee_UploadPaidSubscriptions.Employees[index].CurrentPaidAmount = amount;

    //Update total paid amount
    Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.UpdateTotalPaidAmount();
};

//Save
Employee_UploadPaidSubscriptions.EventHandlers.btnSave_onclick = function () {

    //Input validation
    //Transaction date
    var tDate = Takaful.CommonMethods.GetFormattedDate($('#' + Employee_UploadPaidSubscriptions.uiElements.txtDate).val());
    if (tDate == "") {
        $('#' + Employee_UploadPaidSubscriptions.uiElements.txtDate).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل تاريخ الإحتساب.", null, null, "error");
        return;
    }

    var isDataToSave = false;
    //Check if selected employees
    for (var i = 0; i < Employee_UploadPaidSubscriptions.Employees.length; i++) {
        if (Employee_UploadPaidSubscriptions.Employees[i].IsSelected == true) {  //Some employees are selected, terminate the loop
            isDataToSave = true;
            break;
        }
    }

    if (isDataToSave == false) {
        Takaful.CommonMethods.ShowInfoMsg("لم يتم إختيار أى موظفين.", null, null, "error");
        return;
    }

    //Save
    Employee_UploadPaidSubscriptions.CustomMethods.AjaxCall.Save();


};

//Export button
Employee_UploadPaidSubscriptions.EventHandlers.btnExport_onclick = function () {

    if (Employee_UploadPaidSubscriptions.Employees.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Employee_UploadPaidSubscriptions.CustomMethods.AjaxCall.ExportData();


};

//File upload button
Employee_UploadPaidSubscriptions.EventHandlers.btnUpload_onclick = function () {

    //Input validation
    //Check if file is selected
    var file = $('#' + Employee_UploadPaidSubscriptions.uiElements.filUpload)[0].files[0];
    if (file == undefined) { //No file attached
        Takaful.CommonMethods.ShowInfoMsg("من فضلك إختر الملف أولاً.", null, null, "error");
        return;
    }

    //Check file size
    if (file.size > (5 * 1024 * 1024)) {
        Takaful.CommonMethods.ShowInfoMsg("أقصى حجم للملف هو 5 ميجابايت.", null, null, "error");
        return;
    }

    //Callback functions
    var uploadComplete = function (e) {

    };

    var uploadError = function (e) {

        //Show the upload button
        $("#" + Employee_UploadPaidSubscriptions.uiElements.btnUpload).show();

        //Show error notification
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_Error, null, 0, "error");

    };

    var uploadCancelled = function (e) {

        //Show the upload button
        $("#" + Employee_UploadPaidSubscriptions.uiElements.btnUpload).show();
    };

    var uploadAjaxSuccessResult = function (e) {

        Employee_UploadPaidSubscriptions.CustomMethods.AjaxCall.GetUploadedData(e);

    };

    var uploadAjaxErrorResult = function (xhr, status, errorThrowni) {

        //Show the upload button
        $("#" + Employee_UploadPaidSubscriptions.uiElements.btnUpload).show();

        //Show error notification
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_Error, null, 0, "error");

    };


    //Hide the upload button until upload complete, aborted or error
    $("#" + Employee_UploadPaidSubscriptions.uiElements.btnUpload).hide();

    //Upload the file
    Takaful.CommonMethods.UploadFile(
        file,
        Employee_UploadPaidSubscriptions.uiElements.progUpload,
        Employee_UploadPaidSubscriptions.uiElements.btnCancelUpload,
        uploadComplete,
        uploadError,
        uploadCancelled,
        uploadAjaxSuccessResult,
        uploadAjaxErrorResult
    );



};



