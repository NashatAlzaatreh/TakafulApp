

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_CommitteeDecisionApproval === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeDecisionApproval.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeDecisionApproval.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeDecisionApproval.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_CommitteeDecisionApproval.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_CommitteeDecisionApproval";
    Request_CommitteeDecisionApproval.InitialDataReady = false;
    Request_CommitteeDecisionApproval.Requests = [];
    Request_CommitteeDecisionApproval.SelectedIndex = -1;


    //Reset UI elements
    Request_CommitteeDecisionApproval.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Request_CommitteeDecisionApproval.CustomMethods.AjaxCall.GetInitialData();

    //Export button
    $("#" + Request_CommitteeDecisionApproval.uiElements.btnExport).bind("click", Request_CommitteeDecisionApproval.EventHandlers.btnExport_onclick);

    //Save button
    $("#" + Request_CommitteeDecisionApproval.uiElements.btnSave).bind("click", Request_CommitteeDecisionApproval.EventHandlers.btnSave_onclick);

    //History back button
    $("#" + Request_CommitteeDecisionApproval.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Request_CommitteeDecisionApproval.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


