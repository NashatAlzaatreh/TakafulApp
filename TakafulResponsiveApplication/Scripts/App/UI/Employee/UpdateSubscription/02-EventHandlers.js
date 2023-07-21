
//Check for main namespace
if (typeof Employee_UpdateSubscription === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_UpdateSubscription = {};
}

//Add the event handlers container object to the main namespace
Employee_UpdateSubscription.EventHandlers = {};


//Master employees checkbox
Employee_UpdateSubscription.EventHandlers.chkEmployees_onchange = function () {

    var selection = $("#" + Employee_UpdateSubscription.uiElements.chkEmployees).prop('checked');

    for (var i = 0; i < Employee_UpdateSubscription.Employees.length; i++) {
        Employee_UpdateSubscription.Employees[i].IsSelected = selection;
    }

    //Refresh the ui table
    Employee_UpdateSubscription.CustomMethods.LocalOperations.PopulateEmployeesTable();

};

//Employee checkbox
Employee_UpdateSubscription.EventHandlers.chkApprove_onchange = function (index) {

    //Check if the entered amount has been changed
    if ($("#chk_" + index.toString()).prop('checked') == true) {
        //Get the entered subscription amount
        var amount = $("#txt_" + index.toString()).val().trim();
        if (amount == '') {
            amount = 0;
        }

        amount *= 1;

        if (amount == Employee_UpdateSubscription.Employees[index].CurrentSubscription) {
            Takaful.CommonMethods.ShowInfoMsg("قيمة الاشتراك المحتسب هى بالفعل قيمة الاشتراك الحالى.", null, null, "error");
            $("#chk_" + index.toString()).prop('checked', false);
            Employee_UpdateSubscription.Employees[index].IsSelected = false;
            return;
        }
    }

    //Update the registration flag in the memory object
    Employee_UpdateSubscription.Employees[index].IsSelected = $("#chk_" + index.toString()).prop('checked');

    //Update the master checkbox
    if (Employee_UpdateSubscription.Employees[index].IsSelected == false) {
        $("#" + Employee_UpdateSubscription.uiElements.chkEmployees).prop('checked', false);
    }

};

//Subscription textbox
Employee_UpdateSubscription.EventHandlers.txtSubscription_onchange = function (index) {

    //Get the entered subscription amount
    var amount = $("#txt_" + index.toString()).val().trim();
    if (amount == '') {
        amount = 0;
    }

    amount *= 1;

    if (amount < Employee_UpdateSubscription.Employees[index].MinimumSubscription) {
        $("#txt_" + index.toString()).val(Employee_UpdateSubscription.Employees[index].CalculatedSubscription);
        $("#txt_" + index.toString()).focus();
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن أن يقل مبلغ الاشتراك عن : " + Employee_UpdateSubscription.Employees[index].MinimumSubscription, null, null, "error");
        return;
    }

    if (amount > Employee_UpdateSubscription.Employees[index].MaximumSubscription) {
        $("#txt_" + index.toString()).val(Employee_UpdateSubscription.Employees[index].CalculatedSubscription);
        $("#txt_" + index.toString()).focus();
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن أن يزيد مبلغ الاشتراك عن : " + Employee_UpdateSubscription.Employees[index].MaximumSubscription, null, null, "error");
        return;
    }

    //Update the calculated amount in the memory object
    Employee_UpdateSubscription.Employees[index].CalculatedSubscription = amount;

    //Check if the entered amount is the current amount
    if (amount == Employee_UpdateSubscription.Employees[index].CurrentSubscription) {
        $("#chk_" + index.toString()).prop('checked', false);
        Employee_UpdateSubscription.Employees[index].IsSelected = false;
    }

};

//Save
Employee_UpdateSubscription.EventHandlers.btnSave_onclick = function () {

    //Input validation
    var isDataToSave = false;
    //Check if selected employees
    for (var i = 0; i < Employee_UpdateSubscription.Employees.length; i++) {
        if (Employee_UpdateSubscription.Employees[i].IsSelected == true) {  //Some employees are selected, terminate the loop
            isDataToSave = true;
            break;
        }
    }

    if (isDataToSave == false) {
        Takaful.CommonMethods.ShowInfoMsg("لم يتم إختيار أى موظفين.", null, null, "error");
        return;
    }

    //Save
    Employee_UpdateSubscription.CustomMethods.AjaxCall.Save();


};

//Export button
Employee_UpdateSubscription.EventHandlers.btnExport_onclick = function () {

    if (Employee_UpdateSubscription.Employees.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Employee_UpdateSubscription.CustomMethods.AjaxCall.ExportData();


};


