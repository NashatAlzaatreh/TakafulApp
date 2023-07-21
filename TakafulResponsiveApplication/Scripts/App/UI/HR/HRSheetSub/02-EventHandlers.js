
//Check for main namespace
if (typeof HR_HRSheetSub === 'undefined') {
    // Namespace does not exist, create a new one
    var HR_HRSheetSub = {};
}

//Add the event handlers container object to the main namespace
HR_HRSheetSub.EventHandlers = {};

//Search button
HR_HRSheetSub.EventHandlers.btnSearch_onclick = function () {

    //Build parameter string
    var param = "";
    var from = Takaful.CommonMethods.GetFormattedDate($('#' + HR_HRSheetSub.uiElements.txtDateFrom).val());
    if (from.trim() != '') {
        param += 'from=' + from;
    }
    var to = Takaful.CommonMethods.GetFormattedDate($('#' + HR_HRSheetSub.uiElements.txtDateTo).val());
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
HR_HRSheetSub.EventHandlers.btnSave_click = function () {

    //Input validation
    //Sheet month
    var month = Takaful.CommonMethods.GetFormattedDate($('#' + HR_HRSheetSub.uiElements.txtMonth).val());
    if (month.trim() == '') {
        $("#" + HR_HRSheetSub.uiElements.txtMonth).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل الشهر الخاص بالكشف.", null, null, "error");
        return;
    }

    //Notes
    var notes = $("#" + HR_HRSheetSub.uiElements.txtNotes).val();

    //Get sheet ID
    var sheetID = 0;
    if (HR_HRSheetSub.SelectedSheetIndex >= 0) {
        sheetID = HR_HRSheetSub.Sheets[HR_HRSheetSub.SelectedSheetIndex].ID;
    }

    //Save data
    HR_HRSheetSub.CustomMethods.AjaxCall.Save(sheetID, notes, $('#' + HR_HRSheetSub.uiElements.txtMonth).val());

    $('#' + HR_HRSheetSub.uiElements.btnSave).hide();

};

//Delete sheet
HR_HRSheetSub.EventHandlers.btnDelete_click = function (index) {


    var yesResult = function () {
        var sheetID = HR_HRSheetSub.Sheets[index].ID;

        //Delete exception
        HR_HRSheetSub.CustomMethods.AjaxCall.Delete(sheetID);
    };

    //Confirmation alert
    Takaful.CommonMethods.ShowConfirmMsg("سوف يتم حذف هذا الكشف نهائياً ، هل أنت متأكد؟", yesResult);



};

//Load the selected sheet in edit mode
HR_HRSheetSub.EventHandlers.btnEdit_click = function (index) {

    if (index >= 0) {

        //Serial
        $('#' + HR_HRSheetSub.uiElements.txtSerial).val(HR_HRSheetSub.Sheets[index].Serial);

        //Date
        $('#' + HR_HRSheetSub.uiElements.txtSheetDate).fdatepicker('update', new Date(HR_HRSheetSub.Sheets[index].Date));

        //Month
        $('#' + HR_HRSheetSub.uiElements.txtMonth).val(HR_HRSheetSub.Sheets[index].Month);

        //Notes
        $('#' + HR_HRSheetSub.uiElements.txtNotes).val(HR_HRSheetSub.Sheets[index].Notes);

        HR_HRSheetSub.SelectedSheetIndex = index;   //Set selected index

        //Cancellation buton
        $('#' + HR_HRSheetSub.uiElements.btnCancel).show();
    }

};

//Cancel the edit mode
HR_HRSheetSub.EventHandlers.btnCancelEdit_click = function () {

    HR_HRSheetSub.SelectedSheetIndex = -1;
    $('#' + HR_HRSheetSub.uiElements.txtSerial).val('');
    $('#' + HR_HRSheetSub.uiElements.txtSheetDate).val('');
    $('#' + HR_HRSheetSub.uiElements.txtMonth).val('');
    $('#' + HR_HRSheetSub.uiElements.txtNotes).val('');
    $('#' + HR_HRSheetSub.uiElements.btnSave).show();
    $('#' + HR_HRSheetSub.uiElements.btnCancel).hide();

    $('#' + HR_HRSheetSub.uiElements.txtSerial).val(HR_HRSheetSub.InitialData.NewSerial);
    $('#' + HR_HRSheetSub.uiElements.txtSheetDate).val(Takaful.CommonMethods.GetFormattedDate(HR_HRSheetSub.InitialData.Date));
    $('#' + HR_HRSheetSub.uiElements.txtMonth).val(HR_HRSheetSub.InitialData.Month);

};

//Export button
HR_HRSheetSub.EventHandlers.btnExport_onclick = function () {

    if (HR_HRSheetSub.Meetings.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    HR_HRSheetSub.CustomMethods.AjaxCall.ExportData();


};












