

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Report_AdminDecisions === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Report_AdminDecisions.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Report_AdminDecisions.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Report_AdminDecisions.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Report_AdminDecisions.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Report_AdminDecisions";
    //Report_AdminDecisions.InitialDataReady = false;


    //Reset UI elements
    Report_AdminDecisions.CustomMethods.LocalOperations.ResetUI();

    ////Get initial data
    //Report_AdminDecisions.CustomMethods.AjaxCall.GetInitialData();

    //Export button
    $("#" + Report_AdminDecisions.uiElements.btnExport).bind("click", Report_AdminDecisions.EventHandlers.btnExport_click);

    //History back button
    $("#" + Report_AdminDecisions.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true /*&& Report_AdminDecisions.InitialDataReady == true*/) {
            //Initialize foundation
            $(document).foundation();
            //Initialize date picker plugin
            $('#' + Report_AdminDecisions.uiElements.txtDateFrom).fdatepicker({ format: 'yyyy-mm-dd' });
            $('#' + Report_AdminDecisions.uiElements.txtDateTo).fdatepicker({ format: 'yyyy-mm-dd' });
            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


