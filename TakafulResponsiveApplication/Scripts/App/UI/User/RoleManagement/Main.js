

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof User_RoleManagement === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_RoleManagement.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_RoleManagement.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_RoleManagement.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    User_RoleManagement.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/User_RoleManagement";
    User_RoleManagement.InitialDataReady = false;
    //User_RoleManagement.EmpID = '';
    User_RoleManagement.Employees = [];
    User_RoleManagement.EmployeesTableNodes = [];



    //Reset UI elements
    User_RoleManagement.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    User_RoleManagement.CustomMethods.AjaxCall.GetInitialData();

    //Search textbox
    $('#' + User_RoleManagement.uiElements.txtEmployeeNumber).keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#' + User_RoleManagement.uiElements.btnSearch).click();
            return false;
        }
    });

    //Search button
    $('#' + User_RoleManagement.uiElements.btnSearch).bind("click", User_RoleManagement.EventHandlers.btnSearch_onclick);

    //Export button
    $("#" + User_RoleManagement.uiElements.btnExport).bind("click", User_RoleManagement.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + User_RoleManagement.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && User_RoleManagement.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


