
//Check for main namespace
if (typeof HR_HRSheetModification_NewSubscriptions === 'undefined') {
    // Namespace does not exist, create a new one
    var HR_HRSheetModification_NewSubscriptions = {};
}

//Add the event handlers container object to the main namespace
HR_HRSheetModification_NewSubscriptions.EventHandlers = {};


//Sheets dropdown list selection event
HR_HRSheetModification_NewSubscriptions.EventHandlers.lstSheets_onchange = function () {

    if ($('#' + HR_HRSheetModification_NewSubscriptions.uiElements.lstSheets)[0].selectedIndex < 0) {
        return;
    }

    $('#' + HR_HRSheetModification_NewSubscriptions.uiElements.lstSheets).attr("disabled", "disabled");

    //Load the date & month of the selected sheet
    var sheetID = $('#' + HR_HRSheetModification_NewSubscriptions.uiElements.lstSheets + ' option:selected').val();

    //Fill the employees dropdown list
    for (var i = 0; i < HR_HRSheetModification_NewSubscriptions.Sheets.length; i++) {
        if (HR_HRSheetModification_NewSubscriptions.Sheets[i].ID == sheetID) {
            HR_HRSheetModification_NewSubscriptions.CurrentSheetIndex = i;
            $('#' + HR_HRSheetModification_NewSubscriptions.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(HR_HRSheetModification_NewSubscriptions.Sheets[i].Date));
            $('#' + HR_HRSheetModification_NewSubscriptions.uiElements.txtMonth).val(HR_HRSheetModification_NewSubscriptions.Sheets[i].Month);
            $('#' + HR_HRSheetModification_NewSubscriptions.uiElements.txtNotes).val(HR_HRSheetModification_NewSubscriptions.Sheets[i].Notes);
            //Get the employees assigned to this sheet
            HR_HRSheetModification_NewSubscriptions.CustomMethods.AjaxCall.GetSheetEmployees(sheetID);
            return;
        }
    }


};

//Master employees checkbox
HR_HRSheetModification_NewSubscriptions.EventHandlers.chkEmployees_onchange = function () {

    var selection = $("#" + HR_HRSheetModification_NewSubscriptions.uiElements.chkEmployees).prop('checked');

    for (var i = 0; i < HR_HRSheetModification_NewSubscriptions.Employees.length; i++) {
        HR_HRSheetModification_NewSubscriptions.Employees[i].IsIncluded = selection;
    }

    //Refresh the ui table
    HR_HRSheetModification_NewSubscriptions.CustomMethods.LocalOperations.PopulateEmployeesTable();

};

//Employee checkbox
HR_HRSheetModification_NewSubscriptions.EventHandlers.chkApprove_onchange = function (index) {

    //Update the registration flag in the memory object
    HR_HRSheetModification_NewSubscriptions.Employees[index].IsIncluded = $("#chk_" + index.toString()).prop('checked');

    //Update the master checkbox
    if (HR_HRSheetModification_NewSubscriptions.Employees[index].IsIncluded == false) {
        $("#" + HR_HRSheetModification_NewSubscriptions.uiElements.chkEmployees).prop('checked', false);
    }




};

//Save
HR_HRSheetModification_NewSubscriptions.EventHandlers.btnSave_onclick = function () {

    //Input validation
    if ($('#' + HR_HRSheetModification_NewSubscriptions.uiElements.lstSheets)[0].selectedIndex < 0) {
        $('#' + HR_HRSheetModification_NewSubscriptions.uiElements.lstSheets).focus();
        Takaful.CommonMethods.ShowInfoMsg("إختر الكشف أولاً.", null, null, "error");
        return;
    }

    var sheetID = $('#' + HR_HRSheetModification_NewSubscriptions.uiElements.lstSheets + ' option:selected').val();

    //Get the selected employees IDs
    var selectedIDs = "";
    for (var i = 0; i < HR_HRSheetModification_NewSubscriptions.Employees.length; i++) {
        if (HR_HRSheetModification_NewSubscriptions.Employees[i].IsIncluded == true) {
            if (selectedIDs.trim() == "") {
                selectedIDs = HR_HRSheetModification_NewSubscriptions.Employees[i].ID.toString();
            } else {
                selectedIDs += "," + HR_HRSheetModification_NewSubscriptions.Employees[i].ID.toString();
            }
        }
    }

    //Save
    HR_HRSheetModification_NewSubscriptions.CustomMethods.AjaxCall.Save(sheetID, selectedIDs);


};

//Approve
HR_HRSheetModification_NewSubscriptions.EventHandlers.btnSubmit_onclick = function () {

    //Input validation
    if ($('#' + HR_HRSheetModification_NewSubscriptions.uiElements.lstSheets)[0].selectedIndex < 0) {
        $('#' + HR_HRSheetModification_NewSubscriptions.uiElements.lstSheets).focus();
        Takaful.CommonMethods.ShowInfoMsg("إختر الكشف أولاً.", null, null, "error");
        return;
    }

    var yesResult = function () {
        var sheetID = $('#' + HR_HRSheetModification_NewSubscriptions.uiElements.lstSheets + ' option:selected').val();
        //Get the selected employees IDs
        var selectedIDs = "";
        for (var i = 0; i < HR_HRSheetModification_NewSubscriptions.Employees.length; i++) {
            if (HR_HRSheetModification_NewSubscriptions.Employees[i].IsIncluded == true) {
                if (selectedIDs.trim() == "") {
                    selectedIDs = HR_HRSheetModification_NewSubscriptions.Employees[i].ID.toString();
                } else {
                    selectedIDs += "," + HR_HRSheetModification_NewSubscriptions.Employees[i].ID.toString();
                }
            }
        }
        //Save
        HR_HRSheetModification_NewSubscriptions.CustomMethods.AjaxCall.Approve(sheetID, selectedIDs);
    };

    //Confirmation alert
    Takaful.CommonMethods.ShowConfirmMsg("اعتماد الكشف نهائياً؟", yesResult, "تأكيد");


};

//Export button
HR_HRSheetModification_NewSubscriptions.EventHandlers.btnExport_onclick = function () {

    if (HR_HRSheetModification_NewSubscriptions.Employees.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    HR_HRSheetModification_NewSubscriptions.CustomMethods.AjaxCall.ExportData();

};

