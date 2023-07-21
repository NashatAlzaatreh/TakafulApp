
//Check for main namespace
if (typeof HR_HRSheet === 'undefined') {
    // Namespace does not exist, create a new one
    var HR_HRSheet = {};
}

//Add the event handlers container object to the main namespace
HR_HRSheet.EventHandlers = {};

//Search button
HR_HRSheet.EventHandlers.btnSearch_onclick = function () {

    //Build parameter string
    var param = "";
    var from = Takaful.CommonMethods.GetFormattedDate($('#' + HR_HRSheet.uiElements.txtDateFrom).val());
    if (from.trim() != '') {
        param += 'from=' + from;
    }
    var to = Takaful.CommonMethods.GetFormattedDate($('#' + HR_HRSheet.uiElements.txtDateTo).val());
    if (to.trim() != '') {
        if (param.trim() == "") {
            param += 'to=' + to;
        } else {
            param += '&to=' + to;
        }

    }

    if (param.trim() != "") {
        param = "?" + param;
    }

    //Reload page with the selected dates
    window.location.replace('HRSheet.html' + param);


};

//Save the sheet
HR_HRSheet.EventHandlers.btnSave_click = function () {

    //Input validation
    ////Sheet month
    //var month = Takaful.CommonMethods.GetFormattedDate($('#' + HR_HRSheet.uiElements.txtMonth).val());
    //if (month.trim() == '') {
    //    $("#" + HR_HRSheet.uiElements.txtMonth).focus();
    //    Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل الشهر الخاص بالكشف.", null, null, "error");
    //    return;
    //}

    //Notes
    var notes = $("#" + HR_HRSheet.uiElements.txtNotes).val();

    //Get sheet ID
    var sheetID = 0;
    if (HR_HRSheet.SelectedSheetIndex >= 0) {
        sheetID = HR_HRSheet.Sheets[HR_HRSheet.SelectedSheetIndex].ID;
    }

    //Save data
    HR_HRSheet.CustomMethods.AjaxCall.Save(sheetID, notes);

    $('#' + HR_HRSheet.uiElements.btnSave).hide();

};

//Delete sheet
HR_HRSheet.EventHandlers.btnDelete_click = function (index) {


    var yesResult = function () {
        var sheetID = HR_HRSheet.Sheets[index].ID;

        //Delete exception
        HR_HRSheet.CustomMethods.AjaxCall.Delete(sheetID);
    };

    //Confirmation alert
    Takaful.CommonMethods.ShowConfirmMsg("سوف يتم حذف هذا الكشف نهائياً ، هل أنت متأكد؟", yesResult);



};

//Load the selected sheet in edit mode
HR_HRSheet.EventHandlers.btnEdit_click = function (index) {

    if (index >= 0) {

        //Serial
        $('#' + HR_HRSheet.uiElements.txtSerial).val(HR_HRSheet.Sheets[index].Serial);

        //Date
        $('#' + HR_HRSheet.uiElements.txtSheetDate).fdatepicker('update', new Date(HR_HRSheet.Sheets[index].Date));

        //Month
        $('#' + HR_HRSheet.uiElements.txtMonth).val(HR_HRSheet.Sheets[index].Month);

        //Notes
        $('#' + HR_HRSheet.uiElements.txtNotes).val(HR_HRSheet.Sheets[index].Notes);

        HR_HRSheet.SelectedSheetIndex = index;   //Set selected index

        //Cancellation buton
        $('#' + HR_HRSheet.uiElements.btnCancel).show();
    }

};

//Cancel the edit mode
HR_HRSheet.EventHandlers.btnCancelEdit_click = function () {

    HR_HRSheet.SelectedSheetIndex = -1;
    $('#' + HR_HRSheet.uiElements.txtSerial).val('');
    $('#' + HR_HRSheet.uiElements.txtSheetDate).val('');
    $('#' + HR_HRSheet.uiElements.txtMonth).val('');
    $('#' + HR_HRSheet.uiElements.txtNotes).val('');
    $('#' + HR_HRSheet.uiElements.btnSave).show();
    $('#' + HR_HRSheet.uiElements.btnCancel).hide();

    $('#' + HR_HRSheet.uiElements.txtSerial).val(HR_HRSheet.InitialData.NewSerial);
    $('#' + HR_HRSheet.uiElements.txtSheetDate).val(Takaful.CommonMethods.GetFormattedDate(HR_HRSheet.InitialData.Date));
    $('#' + HR_HRSheet.uiElements.txtMonth).val(HR_HRSheet.InitialData.Month);

};

//Export button
HR_HRSheet.EventHandlers.btnExport_onclick = function () {

    if (HR_HRSheet.Meetings.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    HR_HRSheet.CustomMethods.AjaxCall.ExportData();


};












