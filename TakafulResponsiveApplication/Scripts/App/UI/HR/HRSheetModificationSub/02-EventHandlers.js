
//Check for main namespace
if (typeof HR_HRSheetModificationSub === 'undefined') {
    // Namespace does not exist, create a new one
    var HR_HRSheetModificationSub = {};
}

//Add the event handlers container object to the main namespace
HR_HRSheetModificationSub.EventHandlers = {};


//Sheets dropdown list selection event
HR_HRSheetModificationSub.EventHandlers.lstSheets_onchange = function () {

    if ($('#' + HR_HRSheetModificationSub.uiElements.lstSheets)[0].selectedIndex < 0) {
        return;
    }

    $('#' + HR_HRSheetModificationSub.uiElements.lstSheets).attr("disabled", "disabled");

    //Load the date & month of the selected sheet
    var sheetID = $('#' + HR_HRSheetModificationSub.uiElements.lstSheets + ' option:selected').val();

    //Fill the employees dropdown list
    for (var i = 0; i < HR_HRSheetModificationSub.Sheets.length; i++) {
        if (HR_HRSheetModificationSub.Sheets[i].ID == sheetID) {
            HR_HRSheetModificationSub.CurrentSheetIndex = i;
            $('#' + HR_HRSheetModificationSub.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(HR_HRSheetModificationSub.Sheets[i].Date));
            $('#' + HR_HRSheetModificationSub.uiElements.txtMonth).val(HR_HRSheetModificationSub.Sheets[i].Month);
            $('#' + HR_HRSheetModificationSub.uiElements.txtNotes).val(HR_HRSheetModificationSub.Sheets[i].Notes);
            //Get the employees assigned to this sheet
            HR_HRSheetModificationSub.CustomMethods.AjaxCall.GetSheetEmployees(sheetID);
            return;
        }
    }


};

//Master employees checkbox
HR_HRSheetModificationSub.EventHandlers.chkEmployees_onchange = function () {

    var selection = $("#" + HR_HRSheetModificationSub.uiElements.chkEmployees).prop('checked');

    for (var i = 0; i < HR_HRSheetModificationSub.Employees.length; i++) {
        HR_HRSheetModificationSub.Employees[i].IsIncluded = selection;
    }

    //Refresh the ui table
    HR_HRSheetModificationSub.CustomMethods.LocalOperations.PopulateEmployeesTable();

};

//Employee checkbox
HR_HRSheetModificationSub.EventHandlers.chkApprove_onchange = function (index) {

    //Update the registration flag in the memory object
    HR_HRSheetModificationSub.Employees[index].IsIncluded = $("#chk_" + index.toString()).prop('checked');

    //Update the master checkbox
    if (HR_HRSheetModificationSub.Employees[index].IsIncluded == false) {
        $("#" + HR_HRSheetModificationSub.uiElements.chkEmployees).prop('checked', false);
    }




};

//Save
HR_HRSheetModificationSub.EventHandlers.btnSave_onclick = function () {

    //Input validation
    if ($('#' + HR_HRSheetModificationSub.uiElements.lstSheets)[0].selectedIndex < 0) {
        $('#' + HR_HRSheetModificationSub.uiElements.lstSheets).focus();
        Takaful.CommonMethods.ShowInfoMsg("إختر الكشف أولاً.", null, null, "error");
        return;
    }

    var sheetID = $('#' + HR_HRSheetModificationSub.uiElements.lstSheets + ' option:selected').val();

    //Get the selected employees IDs
    var selectedIDs = "";
    for (var i = 0; i < HR_HRSheetModificationSub.Employees.length; i++) {
        if (HR_HRSheetModificationSub.Employees[i].IsIncluded == true) {
            if (selectedIDs.trim() == "") {
                selectedIDs = HR_HRSheetModificationSub.Employees[i].ID.toString();
            } else {
                selectedIDs += "," + HR_HRSheetModificationSub.Employees[i].ID.toString();
            }
        }
    }

    //Save
    HR_HRSheetModificationSub.CustomMethods.AjaxCall.Save(sheetID, selectedIDs);


};

//Approve
HR_HRSheetModificationSub.EventHandlers.btnSubmit_onclick = function () {

    //Input validation
    if ($('#' + HR_HRSheetModificationSub.uiElements.lstSheets)[0].selectedIndex < 0) {
        $('#' + HR_HRSheetModificationSub.uiElements.lstSheets).focus();
        Takaful.CommonMethods.ShowInfoMsg("إختر الكشف أولاً.", null, null, "error");
        return;
    }

    var yesResult = function () {
        var sheetID = $('#' + HR_HRSheetModificationSub.uiElements.lstSheets + ' option:selected').val();
        //Get the selected employees IDs
        var selectedIDs = "";
        for (var i = 0; i < HR_HRSheetModificationSub.Employees.length; i++) {
            if (HR_HRSheetModificationSub.Employees[i].IsIncluded == true) {
                if (selectedIDs.trim() == "") {
                    selectedIDs = HR_HRSheetModificationSub.Employees[i].ID.toString();
                } else {
                    selectedIDs += "," + HR_HRSheetModificationSub.Employees[i].ID.toString();
                }
            }
        }
        //Save
        HR_HRSheetModificationSub.CustomMethods.AjaxCall.Approve(sheetID, selectedIDs);
    };

    //Confirmation alert
    Takaful.CommonMethods.ShowConfirmMsg("اعتماد الكشف نهائياً؟", yesResult, "تأكيد");


};

//Export button
HR_HRSheetModificationSub.EventHandlers.btnExport_onclick = function () {

    if (HR_HRSheetModificationSub.Employees.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    HR_HRSheetModificationSub.CustomMethods.AjaxCall.ExportData();

};

