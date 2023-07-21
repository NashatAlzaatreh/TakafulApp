
//Check for main namespace
if (typeof User_RoleManagementNonEmployees === 'undefined') {
    // Namespace does not exist, create a new one
    var User_RoleManagementNonEmployees = {};
}

//Add the event handlers container object to the main namespace
User_RoleManagementNonEmployees.EventHandlers = {};


//Search for employee
User_RoleManagementNonEmployees.EventHandlers.btnSearch_onclick = function () {

    //Input validation
    var empNumber = $("#" + User_RoleManagementNonEmployees.uiElements.txtEmployeeNumber).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(empNumber, false) == false) {
        $("#" + User_RoleManagementNonEmployees.uiElements.txtEmployeeNumber).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل الرقم الوظيفى.", null, null, "error");
        return;
    }

    empNumber *= 1;

    //Check if employee exists
    var index = User_RoleManagementNonEmployees.CustomMethods.LocalOperations.GetEmployeeIndex(empNumber);
    if (index == -1) {
        Takaful.CommonMethods.ShowInfoMsg("هذا الرقم الوظيفى غير موجود.", null, null, "error");
        return;
    }

    //Load the employee data to the popup window
    User_RoleManagementNonEmployees.CustomMethods.LocalOperations.LoadEmployee(index);


};

//Admin checkbox
User_RoleManagementNonEmployees.EventHandlers.chkAdmin_onchange = function (index) {

    if (!(index >= 0)) {
        return;
    }

    var checked = $('#chkAdmin_' + index.toString()).prop('checked');

    User_RoleManagementNonEmployees.CustomMethods.AjaxCall.Set(User_RoleManagementNonEmployees.Employees[index].EmployeeNumber, 1, checked);

};

//Admin checkbox 2
User_RoleManagementNonEmployees.EventHandlers.chkAdmin2_onchange = function (index) {

    if (!(index >= 0)) {
        return;
    }

    var checked = $('#chkAdmin2_' + index.toString()).prop('checked');
    $('#chkAdmin_' + index.toString()).prop('checked', checked);

    User_RoleManagementNonEmployees.CustomMethods.AjaxCall.Set(User_RoleManagementNonEmployees.Employees[index].EmployeeNumber, 1, checked);

};

//Committee member checkbox
User_RoleManagementNonEmployees.EventHandlers.chkCommittee_onchange = function (index) {

    if (!(index >= 0)) {
        return;
    }

    var checked = $('#chkCommittee_' + index.toString()).prop('checked');

    User_RoleManagementNonEmployees.CustomMethods.AjaxCall.Set(User_RoleManagementNonEmployees.Employees[index].EmployeeNumber, 2, checked);


};

//Committee member checkbox 2
User_RoleManagementNonEmployees.EventHandlers.chkCommittee2_onchange = function (index) {

    if (!(index >= 0)) {
        return;
    }

    var checked = $('#chkCommittee2_' + index.toString()).prop('checked');
    $('#chkCommittee_' + index.toString()).prop('checked', checked);

    User_RoleManagementNonEmployees.CustomMethods.AjaxCall.Set(User_RoleManagementNonEmployees.Employees[index].EmployeeNumber, 2, checked);


};

//Help desk checkbox
User_RoleManagementNonEmployees.EventHandlers.chkHelpDesk_onchange = function (index) {

    if (!(index >= 0)) {
        return;
    }

    var checked = $('#chkHelpDesk_' + index.toString()).prop('checked');

    User_RoleManagementNonEmployees.CustomMethods.AjaxCall.Set(User_RoleManagementNonEmployees.Employees[index].EmployeeNumber, 3, checked);



};

//Help desk checkbox 2
User_RoleManagementNonEmployees.EventHandlers.chkHelpDesk2_onchange = function (index) {

    if (!(index >= 0)) {
        return;
    }

    var checked = $('#chkHelpDesk2_' + index.toString()).prop('checked');
    $('#chkHelpDesk_' + index.toString()).prop('checked', checked);

    User_RoleManagementNonEmployees.CustomMethods.AjaxCall.Set(User_RoleManagementNonEmployees.Employees[index].EmployeeNumber, 3, checked);



};

//Active checkbox
User_RoleManagementNonEmployees.EventHandlers.chkActive_onchange = function (index) {

    if (!(index >= 0)) {
        return;
    }

    var checked = $('#chkActive_' + index.toString()).prop('checked');

    User_RoleManagementNonEmployees.CustomMethods.AjaxCall.Set(User_RoleManagementNonEmployees.Employees[index].EmployeeNumber, 4, checked);



};

//Active checkbox 2
User_RoleManagementNonEmployees.EventHandlers.chkActive2_onchange = function (index) {

    if (!(index >= 0)) {
        return;
    }

    var checked = $('#chkActive2_' + index.toString()).prop('checked');
    $('#chkActive_' + index.toString()).prop('checked', checked);

    User_RoleManagementNonEmployees.CustomMethods.AjaxCall.Set(User_RoleManagementNonEmployees.Employees[index].EmployeeNumber, 4, checked);



};

//Export button
User_RoleManagementNonEmployees.EventHandlers.btnExport_onclick = function () {

    if (User_RoleManagementNonEmployees.Employees.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    User_RoleManagementNonEmployees.CustomMethods.AjaxCall.ExportData();


};





