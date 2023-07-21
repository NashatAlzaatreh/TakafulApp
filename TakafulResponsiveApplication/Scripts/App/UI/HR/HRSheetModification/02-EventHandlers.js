
//Check for main namespace
if (typeof HR_HRSheetModification === 'undefined') {
    // Namespace does not exist, create a new one
    var HR_HRSheetModification = {};
}

//Add the event handlers container object to the main namespace
HR_HRSheetModification.EventHandlers = {};


//Sheets dropdown list selection event
HR_HRSheetModification.EventHandlers.lstSheets_onchange = function () {

    if ($('#' + HR_HRSheetModification.uiElements.lstSheets)[0].selectedIndex < 0) {
        return;
    }

    $('#' + HR_HRSheetModification.uiElements.lstSheets).attr("disabled", "disabled");

    //Load the date & month of the selected sheet
    var sheetID = $('#' + HR_HRSheetModification.uiElements.lstSheets + ' option:selected').val();

    //Fill the employees dropdown list
    for (var i = 0; i < HR_HRSheetModification.Sheets.length; i++) {
        if (HR_HRSheetModification.Sheets[i].ID == sheetID) {
            HR_HRSheetModification.CurrentSheetIndex = i;
            $('#' + HR_HRSheetModification.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(HR_HRSheetModification.Sheets[i].Date));
            $('#' + HR_HRSheetModification.uiElements.txtMonth).val(HR_HRSheetModification.Sheets[i].Month);
            $('#' + HR_HRSheetModification.uiElements.txtNotes).val(HR_HRSheetModification.Sheets[i].Notes);
            //Get the employees assigned to this sheet
            HR_HRSheetModification.CustomMethods.AjaxCall.GetSheetEmployees(sheetID);
            return;
        }
    }


};

//Master employees checkbox
HR_HRSheetModification.EventHandlers.chkEmployees_onchange = function () {

    var selection = $("#" + HR_HRSheetModification.uiElements.chkEmployees).prop('checked');

    for (var i = 0; i < HR_HRSheetModification.Employees.length; i++) {
        HR_HRSheetModification.Employees[i].IsIncluded = selection;
    }

    //Refresh the ui table
    HR_HRSheetModification.CustomMethods.LocalOperations.PopulateEmployeesTable();

};

//Employee checkbox
HR_HRSheetModification.EventHandlers.chkApprove_onchange = function (index) {

    //Update the registration flag in the memory object
    HR_HRSheetModification.Employees[index].IsIncluded = $("#chk_" + index.toString()).prop('checked');

    //Update the master checkbox
    if (HR_HRSheetModification.Employees[index].IsIncluded == false) {
        $("#" + HR_HRSheetModification.uiElements.chkEmployees).prop('checked', false);
    }




};

//Save
HR_HRSheetModification.EventHandlers.btnSave_onclick = function () {

    //Input validation
    if ($('#' + HR_HRSheetModification.uiElements.lstSheets)[0].selectedIndex < 0) {
        $('#' + HR_HRSheetModification.uiElements.lstSheets).focus();
        Takaful.CommonMethods.ShowInfoMsg("إختر الكشف أولاً.", null, null, "error");
        return;
    }

    var sheetID = $('#' + HR_HRSheetModification.uiElements.lstSheets + ' option:selected').val();

    //Get the selected employees IDs
    var selectedIDs = "";
    for (var i = 0; i < HR_HRSheetModification.Employees.length; i++) {
        if (HR_HRSheetModification.Employees[i].IsIncluded == true) {
            if (selectedIDs.trim() == "") {
                selectedIDs = HR_HRSheetModification.Employees[i].ID.toString();
            } else {
                selectedIDs += "," + HR_HRSheetModification.Employees[i].ID.toString();
            }
        }
    }

    //Save
    HR_HRSheetModification.CustomMethods.AjaxCall.Save(sheetID, selectedIDs);


};

//Approve
HR_HRSheetModification.EventHandlers.btnSubmit_onclick = function () {

    //Input validation
    if ($('#' + HR_HRSheetModification.uiElements.lstSheets)[0].selectedIndex < 0) {
        $('#' + HR_HRSheetModification.uiElements.lstSheets).focus();
        Takaful.CommonMethods.ShowInfoMsg("إختر الكشف أولاً.", null, null, "error");
        return;
    }

    var yesResult = function () {
        var sheetID = $('#' + HR_HRSheetModification.uiElements.lstSheets + ' option:selected').val();
        //Get the selected employees IDs
        var selectedIDs = "";
        for (var i = 0; i < HR_HRSheetModification.Employees.length; i++) {
            if (HR_HRSheetModification.Employees[i].IsIncluded == true) {
                if (selectedIDs.trim() == "") {
                    selectedIDs = HR_HRSheetModification.Employees[i].ID.toString();
                } else {
                    selectedIDs += "," + HR_HRSheetModification.Employees[i].ID.toString();
                }
            }
        }
        //Save
        HR_HRSheetModification.CustomMethods.AjaxCall.Approve(sheetID, selectedIDs);
    };

    //Confirmation alert
    Takaful.CommonMethods.ShowConfirmMsg("اعتماد الكشف نهائياً؟", yesResult, "تأكيد");


};

//Export button
HR_HRSheetModification.EventHandlers.btnExport_onclick = function () {

    if (HR_HRSheetModification.Employees.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    HR_HRSheetModification.CustomMethods.AjaxCall.ExportData();

};

