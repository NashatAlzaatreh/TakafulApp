

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_CommitteeSubmittedRequests === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeSubmittedRequests.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeSubmittedRequests.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeSubmittedRequests.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_CommitteeSubmittedRequests.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_CommitteeSubmittedRequests";
    Request_CommitteeSubmittedRequests.InitialDataReady = false;
    Request_CommitteeSubmittedRequests.Requests = [];
    Request_CommitteeSubmittedRequests.SelectedIndex = -1;


    //Reset UI elements
    Request_CommitteeSubmittedRequests.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Request_CommitteeSubmittedRequests.CustomMethods.AjaxCall.GetInitialData();

    //Close modal window
    $('#' + Request_CommitteeSubmittedRequests.uiElements.btnClose).bind("click", Request_CommitteeSubmittedRequests.EventHandlers.btnClose_click);

    //Export button
    $("#" + Request_CommitteeSubmittedRequests.uiElements.btnExport).bind("click", Request_CommitteeSubmittedRequests.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + Request_CommitteeSubmittedRequests.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Request_CommitteeSubmittedRequests.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


