

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Employee_DataManagement === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_DataManagement.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_DataManagement.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_DataManagement.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Employee_DataManagement.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Employee_DataManagement";
    Employee_DataManagement.InitialDataReady = false;
    //Employee_DataManagement.EmpID = '';
    Employee_DataManagement.Employees = [];
    Employee_DataManagement.CurrentIndex = -1;


    //Reset UI elements
    Employee_DataManagement.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Employee_DataManagement.CustomMethods.AjaxCall.GetInitialData();

    //Edit cancellation button
    $("#" + Employee_DataManagement.uiElements.btnCancel).bind("click", Employee_DataManagement.EventHandlers.btnCancelEdit_click);

    //Search textbox
    $('#' + Employee_DataManagement.uiElements.txtEmployeeNumber).keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            Employee_DataManagement.CustomMethods.LocalOperations.SearchForEmployee();
            return false;
        }
    });

    //Search button
    $("#" + Employee_DataManagement.uiElements.btnSearch).bind("click", Employee_DataManagement.CustomMethods.LocalOperations.SearchForEmployee);

    //Update from GRP button
    $("#" + Employee_DataManagement.uiElements.btnUpdateFromGRP).bind("click", Employee_DataManagement.EventHandlers.btnUpdateFromGRP_click);

    //Save button
    $("#" + Employee_DataManagement.uiElements.btnSave).bind("click", Employee_DataManagement.EventHandlers.btnSave_click);

    //File upload button
    $("#" + Employee_DataManagement.uiElements.btnUpload).bind("click", Employee_DataManagement.EventHandlers.btnUpload_onclick);

    //Export button
    $("#" + Employee_DataManagement.uiElements.btnExport).bind("click", Employee_DataManagement.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + Employee_DataManagement.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Employee_DataManagement.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Initialize date picker plugin
            $('#' + Employee_DataManagement.uiElements.txtJoinDate).fdatepicker({ format: 'yyyy-mm-dd' });
            $('#' + Employee_DataManagement.uiElements.txtBirthDate).fdatepicker({ format: 'yyyy-mm-dd' });

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


