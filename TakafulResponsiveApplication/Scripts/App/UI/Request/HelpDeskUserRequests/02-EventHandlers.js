
//Check for main namespace
if (typeof Request_HelpDeskUserRequests === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_HelpDeskUserRequests = {};
}

//Add the event handlers container object to the main namespace
Request_HelpDeskUserRequests.EventHandlers = {};

//Search button
Request_HelpDeskUserRequests.EventHandlers.btnSearch_onclick = function () {

    var empNumber = $("#" + Request_HelpDeskUserRequests.uiElements.txtEmployeeNumber).val().trim();

    //Clear the ui elements
    Request_HelpDeskUserRequests.CustomMethods.LocalOperations.ResetUI();

    //Input validation
    $("#" + Request_HelpDeskUserRequests.uiElements.txtEmployeeNumber).val(empNumber);

    if (Takaful.CommonMethods.isPositiveInteger(empNumber, false) == false) {
        $("#" + Request_HelpDeskUserRequests.uiElements.txtEmployeeNumber).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل الرقم الوظيفى برقم صحيح.", null, null, "error");
        return;
    }

    empNumber *= 1;
    Request_HelpDeskUserRequests.EmployeeNumber = empNumber;

    //Get the data
    Request_HelpDeskUserRequests.CustomMethods.AjaxCall.GetInitialData(empNumber);


};

//Cancellation button
Request_HelpDeskUserRequests.EventHandlers.btnCancel_click = function (year, serial) {

    //alert(year + '__' + serial);

    var yesResult = function () {

        //Delete exception
        Request_HelpDeskUserRequests.CustomMethods.AjaxCall.Withdraw(Request_HelpDeskUserRequests.EmployeeNumber, year, serial);

    };

    //Confirmation alert
    Takaful.CommonMethods.ShowConfirmMsg("سوف يتم إلغاء هذا الطلب ، هل أنت متأكد؟", yesResult);

};










