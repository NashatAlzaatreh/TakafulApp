
//Check for main namespace
if (typeof Request_HelpDeskCancelLoan_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_HelpDeskCancelLoan_Submit = {};
}

//Add the event handlers container object to the main namespace
Request_HelpDeskCancelLoan_Submit.EventHandlers = {};

//Submit button
Request_HelpDeskCancelLoan_Submit.EventHandlers.btnSubmit_onclick = function () {

    if (!Request_HelpDeskCancelLoan_Submit.EmployeeNumber || Request_HelpDeskCancelLoan_Submit.EmployeeNumber == 0) {
        Takaful.CommonMethods.ShowInfoMsg("من فضلك حدد الموظف أولاً.", null, null, "error");
        return;
    }

    Request_HelpDeskCancelLoan_Submit.CustomMethods.AjaxCall.Submit(Request_HelpDeskCancelLoan_Submit.EmployeeNumber, $('#' + Request_HelpDeskCancelLoan_Submit.uiElements.txtNotes).val().trim());


};

//Search button
Request_HelpDeskCancelLoan_Submit.EventHandlers.btnSearch_onclick = function () {

    var empNumber = $("#" + Request_HelpDeskCancelLoan_Submit.uiElements.txtEmployeeNumber).val().trim();

    //Clear the ui elements
    Request_HelpDeskCancelLoan_Submit.CustomMethods.LocalOperations.ResetUI();

    //Input validation
    $("#" + Request_HelpDeskCancelLoan_Submit.uiElements.txtEmployeeNumber).val(empNumber);

    if (Takaful.CommonMethods.isPositiveInteger(empNumber, false) == false) {
        $("#" + Request_HelpDeskCancelLoan_Submit.uiElements.txtEmployeeNumber).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل الرقم الوظيفى برقم صحيح.", null, null, "error");
        return;
    }

    empNumber *= 1;
    Request_HelpDeskCancelLoan_Submit.EmployeeNumber = 0;

    //Get the data
    Request_HelpDeskCancelLoan_Submit.CustomMethods.AjaxCall.GetInitialData(empNumber);


};












