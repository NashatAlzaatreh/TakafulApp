

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Employee_UpdatePaidInstallments === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_UpdatePaidInstallments.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_UpdatePaidInstallments.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_UpdatePaidInstallments.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Employee_UpdatePaidInstallments.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Employee_UpdatePaidInstallments";
    Employee_UpdatePaidInstallments.InitialDataReady = false;
    Employee_UpdatePaidInstallments.Employees = [];


    //Reset UI elements
    Employee_UpdatePaidInstallments.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Employee_UpdatePaidInstallments.CustomMethods.AjaxCall.GetInitialData();

    //Search button
    $('#' + Employee_UpdatePaidInstallments.uiElements.btnSearch).bind("click", Employee_UpdatePaidInstallments.EventHandlers.btnSearch_onclick);

    //Master employee checkbox
    $('#' + Employee_UpdatePaidInstallments.uiElements.chkEmployees).bind("change", Employee_UpdatePaidInstallments.EventHandlers.chkEmployees_onchange);

    //Save button
    $('#' + Employee_UpdatePaidInstallments.uiElements.btnSave).bind("click", Employee_UpdatePaidInstallments.EventHandlers.btnSave_onclick);

    //Export button
    $('#' + Employee_UpdatePaidInstallments.uiElements.btnExport).bind("click", Employee_UpdatePaidInstallments.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + Employee_UpdatePaidInstallments.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Employee_UpdatePaidInstallments.InitialDataReady == true) {
            //Initialize date picker plugin
            $('#' + Employee_UpdatePaidInstallments.uiElements.txtDate).fdatepicker({ format: 'yyyy-mm-dd' });
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


