

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Report_CommitteeMeetingDecisions === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Report_CommitteeMeetingDecisions.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Report_CommitteeMeetingDecisions.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Report_CommitteeMeetingDecisions.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Report_CommitteeMeetingDecisions.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Report_CommitteeMeetingDecisions";
    Report_CommitteeMeetingDecisions.InitialDataReady = false;
    //Report_CommitteeMeetingDecisions.EmpID = '';
    Report_CommitteeMeetingDecisions.Meetings = [];


    //Reset UI elements
    Report_CommitteeMeetingDecisions.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Report_CommitteeMeetingDecisions.CustomMethods.AjaxCall.GetInitialData();

    //Meeting dropdown list
    $('#' + Report_CommitteeMeetingDecisions.uiElements.lstMeetings).bind("change", Report_CommitteeMeetingDecisions.EventHandlers.lstMeetings_onchange);

    //Export button
    $("#" + Report_CommitteeMeetingDecisions.uiElements.btnExport).bind("click", Report_CommitteeMeetingDecisions.EventHandlers.btnExport_click);

    //History back button
    $("#" + Report_CommitteeMeetingDecisions.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Report_CommitteeMeetingDecisions.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


