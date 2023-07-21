

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_AdminCommitteeSubmittedRequests === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_AdminCommitteeSubmittedRequests.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_AdminCommitteeSubmittedRequests.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_AdminCommitteeSubmittedRequests.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_AdminCommitteeSubmittedRequests.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_AdminCommitteeSubmittedRequests";
    Request_AdminCommitteeSubmittedRequests.InitialDataReady = false;
    Request_AdminCommitteeSubmittedRequests.SelectedMemberID = 0;
    Request_AdminCommitteeSubmittedRequests.Requests = [];
    Request_AdminCommitteeSubmittedRequests.SelectedIndex = -1;


    //Reset UI elements
    Request_AdminCommitteeSubmittedRequests.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Request_AdminCommitteeSubmittedRequests.CustomMethods.AjaxCall.GetInitialData();

    //Committee members dropdown list
    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.lstMembers).bind("change", Request_AdminCommitteeSubmittedRequests.EventHandlers.lstMembers_onchange);

    //Close notes modal window
    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.btnClose).bind("click", Request_AdminCommitteeSubmittedRequests.EventHandlers.btnClose_click);

    //Export button
    $("#" + Request_AdminCommitteeSubmittedRequests.uiElements.btnExport).bind("click", Request_AdminCommitteeSubmittedRequests.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + Request_AdminCommitteeSubmittedRequests.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Request_AdminCommitteeSubmittedRequests.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


