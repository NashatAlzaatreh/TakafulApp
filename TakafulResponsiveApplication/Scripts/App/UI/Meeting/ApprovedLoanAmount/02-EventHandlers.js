
//Check for main namespace
if (typeof Meeting_ApprovedLoanAmount === 'undefined') {
    // Namespace does not exist, create a new one
    var Meeting_ApprovedLoanAmount = {};
}

//Add the event handlers container object to the main namespace
Meeting_ApprovedLoanAmount.EventHandlers = {};


//Load the amount for the selected request
Meeting_ApprovedLoanAmount.EventHandlers.btnAdd_click = function (index) {

    Meeting_ApprovedLoanAmount.SelectedIndex = -1;
    $('#' + Meeting_ApprovedLoanAmount.uiElements.txtAmount).val('');

    if (index >= 0) {
        //Get the selected request data
        if (Meeting_ApprovedLoanAmount.Requests[index].ApprovedAmount != null) {
            $('#' + Meeting_ApprovedLoanAmount.uiElements.txtAmount).val(Meeting_ApprovedLoanAmount.Requests[index].ApprovedAmount);
        }

        Meeting_ApprovedLoanAmount.SelectedIndex = index;

        //Open the modal window
        $('#' + Meeting_ApprovedLoanAmount.uiElements.NoteIn).foundation('reveal', 'open');
    }

};

//Save amount to the request
Meeting_ApprovedLoanAmount.EventHandlers.btnSave_click = function () {

    if (Meeting_ApprovedLoanAmount.SelectedIndex == null || Meeting_ApprovedLoanAmount.SelectedIndex == -1) {
        return;
    }

    var index = Meeting_ApprovedLoanAmount.SelectedIndex;

    //Get the selected request data
    var empID = Meeting_ApprovedLoanAmount.Requests[index].EmployeeNumber;
    var year = Meeting_ApprovedLoanAmount.Requests[index].Year;
    var serial = Meeting_ApprovedLoanAmount.Requests[index].Serial;
    var amount = $('#' + Meeting_ApprovedLoanAmount.uiElements.txtAmount).val().trim();

    if (!amount || amount == '' || isNaN(amount)) {
        $('#' + Meeting_ApprovedLoanAmount.uiElements.txtAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("ادخل المبلغ المعتمد.", null, null, "error");
        return;
    }

    amount *= 1;

    if (amount < 1) {
        $('#' + Meeting_ApprovedLoanAmount.uiElements.txtAmount).focus();
        Takaful.CommonMethods.ShowInfoMsg("ادخل المبلغ المعتمد.", null, null, "error");
        return;
    }

    //Save 
    Meeting_ApprovedLoanAmount.CustomMethods.AjaxCall.SaveAmount(empID, year, serial, amount);

};

//Close modal window
Meeting_ApprovedLoanAmount.EventHandlers.btnClose_click = function (index) {

    Meeting_ApprovedLoanAmount.SelectedIndex = -1;
    $('#' + Meeting_ApprovedLoanAmount.uiElements.txtNotes).val('');
    $('#' + Meeting_ApprovedLoanAmount.uiElements.NoteIn).foundation('reveal', 'close');


};

//Export button
Meeting_ApprovedLoanAmount.EventHandlers.btnExport_onclick = function () {

    if (Meeting_ApprovedLoanAmount.Requests.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Meeting_ApprovedLoanAmount.CustomMethods.AjaxCall.ExportData();


};



