

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Employee_LoanClosing === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_LoanClosing.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_LoanClosing.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_LoanClosing.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Employee_LoanClosing.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Employee_LoanClosing";
    Employee_LoanClosing.InitialDataReady = false;
    Employee_LoanClosing.Employees = [];
    Employee_LoanClosing.Employees2 = [];


    //Reset UI elements
    Employee_LoanClosing.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Employee_LoanClosing.CustomMethods.AjaxCall.GetInitialData();

    //Search button
    $('#' + Employee_LoanClosing.uiElements.btnSearch).bind("click", Employee_LoanClosing.EventHandlers.btnSearch_onclick);

    //Master employee checkbox
    $('#' + Employee_LoanClosing.uiElements.chkEmployees).bind("change", Employee_LoanClosing.EventHandlers.chkEmployees_onchange);

    //Master employee checkbox 2
    $('#' + Employee_LoanClosing.uiElements.chkEmployees2).bind("change", Employee_LoanClosing.EventHandlers.chkEmployees2_onchange);

    //Save button
    $('#' + Employee_LoanClosing.uiElements.btnSave).bind("click", Employee_LoanClosing.EventHandlers.btnSave_onclick);

    //Save button 2
    $('#' + Employee_LoanClosing.uiElements.btnSave2).bind("click", Employee_LoanClosing.EventHandlers.btnSave2_onclick);

    //Export button
    $('#' + Employee_LoanClosing.uiElements.btnExport).bind("click", Employee_LoanClosing.EventHandlers.btnExport_onclick);

    //Export button2
    $('#' + Employee_LoanClosing.uiElements.btnExport2).bind("click", Employee_LoanClosing.EventHandlers.btnExport2_onclick);

    //History back button
    $("#" + Employee_LoanClosing.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Employee_LoanClosing.InitialDataReady == true) {
            //Initialize date picker plugin
            $('#' + Employee_LoanClosing.uiElements.txtDate).fdatepicker({ format: 'yyyy-mm-dd' });
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


