
//Check for main namespace
if (typeof Employee_LoanClosing === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_LoanClosing = {};
}

//Add the event handlers container object to the main namespace
Employee_LoanClosing.EventHandlers = {};


//Master employees checkbox
Employee_LoanClosing.EventHandlers.chkEmployees_onchange = function () {

    var selection = $("#" + Employee_LoanClosing.uiElements.chkEmployees).prop('checked');

    for (var i = 0; i < Employee_LoanClosing.Employees.length; i++) {
        Employee_LoanClosing.Employees[i].IsSelected = selection;
    }

    //Refresh the ui table
    Employee_LoanClosing.CustomMethods.LocalOperations.PopulateEmployeesTable();

};

//Master employees checkbox
Employee_LoanClosing.EventHandlers.chkEmployees2_onchange = function () {

    var selection = $("#" + Employee_LoanClosing.uiElements.chkEmployees2).prop('checked');

    for (var i = 0; i < Employee_LoanClosing.Employees2.length; i++) {
        Employee_LoanClosing.Employees2[i].IsSelected = selection;
    }

    //Refresh the ui table
    Employee_LoanClosing.CustomMethods.LocalOperations.PopulateEmployeesTable2();

};

//Employee checkbox
Employee_LoanClosing.EventHandlers.chkApprove_onchange = function (index) {

    //Update the selection flag in the memory object
    Employee_LoanClosing.Employees[index].IsSelected = $("#chk_" + index.toString()).prop('checked');

    //Update the master checkbox
    if (Employee_LoanClosing.Employees[index].IsSelected == false) {
        $("#" + Employee_LoanClosing.uiElements.chkEmployees).prop('checked', false);
    }

};

//Employee checkbox 2
Employee_LoanClosing.EventHandlers.chkApprove2_onchange = function (index) {

    //Update the selection flag in the memory object
    Employee_LoanClosing.Employees2[index].IsSelected = $("#chk2_" + index.toString()).prop('checked');

    //Update the master checkbox
    if (Employee_LoanClosing.Employees2[index].IsSelected == false) {
        $("#" + Employee_LoanClosing.uiElements.chkEmployees2).prop('checked', false);
    }

};

//Save
Employee_LoanClosing.EventHandlers.btnSave_onclick = function () {

    //Input validation
    var isDataToSave = false;
    //Check if selected employees
    for (var i = 0; i < Employee_LoanClosing.Employees.length; i++) {
        if (Employee_LoanClosing.Employees[i].IsSelected == true) {  //Some employees are selected, terminate the loop
            isDataToSave = true;
            break;
        }
    }

    if (isDataToSave == false) {
        Takaful.CommonMethods.ShowInfoMsg("لم يتم إختيار أى موظفين.", null, null, "error");
        return;
    }

    //Confirm loan cloasing
    var yesResult = function () {
        //Save
        Employee_LoanClosing.CustomMethods.AjaxCall.Save(1);
    };

    //Confirmation alert
    Takaful.CommonMethods.ShowConfirmMsg("اغلاق هذه القروض؟", yesResult);

};

//Save 2
Employee_LoanClosing.EventHandlers.btnSave2_onclick = function () {

    //Input validation
    var isDataToSave = false;
    //Check if selected employees
    for (var i = 0; i < Employee_LoanClosing.Employees2.length; i++) {
        if (Employee_LoanClosing.Employees2[i].IsSelected == true) {  //Some employees are selected, terminate the loop
            isDataToSave = true;
            break;
        }
    }

    if (isDataToSave == false) {
        Takaful.CommonMethods.ShowInfoMsg("لم يتم إختيار أى موظفين.", null, null, "error");
        return;
    }

    //Confirm loan cloasing
    var yesResult = function () {
        //Save
        Employee_LoanClosing.CustomMethods.AjaxCall.Save(2);
    };

    //Confirmation alert
    Takaful.CommonMethods.ShowConfirmMsg("هذه القروض غير متوازنة الرصيد ، هل أنت متأكد من اغلاقها؟", yesResult);
    

};

//Export button
Employee_LoanClosing.EventHandlers.btnExport_onclick = function () {

    if (Employee_LoanClosing.Employees.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Employee_LoanClosing.CustomMethods.AjaxCall.ExportData(1);


};

//Export button 2
Employee_LoanClosing.EventHandlers.btnExport2_onclick = function () {

    if (Employee_LoanClosing.Employees2.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Employee_LoanClosing.CustomMethods.AjaxCall.ExportData(2);


};


