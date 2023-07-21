

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof User_RoleManagementNonEmployees === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_RoleManagementNonEmployees.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_RoleManagementNonEmployees.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_RoleManagementNonEmployees.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    User_RoleManagementNonEmployees.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/User_RoleManagementNonEmployees";
    User_RoleManagementNonEmployees.InitialDataReady = false;
    //User_RoleManagementNonEmployees.EmpID = '';
    User_RoleManagementNonEmployees.Employees = [];


    //Reset UI elements
    User_RoleManagementNonEmployees.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    User_RoleManagementNonEmployees.CustomMethods.AjaxCall.GetInitialData();

    //Search textbox
    $('#' + User_RoleManagementNonEmployees.uiElements.txtEmployeeNumber).keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#' + User_RoleManagementNonEmployees.uiElements.btnSearch).click();
            return false;
        }
    });

    //Search button
    $('#' + User_RoleManagementNonEmployees.uiElements.btnSearch).bind("click", User_RoleManagementNonEmployees.EventHandlers.btnSearch_onclick);

    //Export button
    $("#" + User_RoleManagementNonEmployees.uiElements.btnExport).bind("click", User_RoleManagementNonEmployees.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + User_RoleManagementNonEmployees.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && User_RoleManagementNonEmployees.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


