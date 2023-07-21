

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Employee_UpdatePaidSubscriptions === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_UpdatePaidSubscriptions.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_UpdatePaidSubscriptions.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_UpdatePaidSubscriptions.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Employee_UpdatePaidSubscriptions.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Employee_UpdatePaidSubscriptions";
    Employee_UpdatePaidSubscriptions.InitialDataReady = false;
    Employee_UpdatePaidSubscriptions.Employees = [];


    //Reset UI elements
    Employee_UpdatePaidSubscriptions.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Employee_UpdatePaidSubscriptions.CustomMethods.AjaxCall.GetInitialData();

    //Search button
    $('#' + Employee_UpdatePaidSubscriptions.uiElements.btnSearch).bind("click", Employee_UpdatePaidSubscriptions.EventHandlers.btnSearch_onclick);

    //Master employee checkbox
    $('#' + Employee_UpdatePaidSubscriptions.uiElements.chkEmployees).bind("change", Employee_UpdatePaidSubscriptions.EventHandlers.chkEmployees_onchange);

    //Save button
    $('#' + Employee_UpdatePaidSubscriptions.uiElements.btnSave).bind("click", Employee_UpdatePaidSubscriptions.EventHandlers.btnSave_onclick);

    //Export button
    $('#' + Employee_UpdatePaidSubscriptions.uiElements.btnExport).bind("click", Employee_UpdatePaidSubscriptions.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + Employee_UpdatePaidSubscriptions.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Employee_UpdatePaidSubscriptions.InitialDataReady == true) {
            //Initialize date picker plugin
            $('#' + Employee_UpdatePaidSubscriptions.uiElements.txtDate).fdatepicker({ format: 'yyyy-mm-dd' });
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


