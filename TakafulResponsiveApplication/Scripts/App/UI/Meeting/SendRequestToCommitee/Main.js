

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Meeting_SendRequestToCommitee === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_SendRequestToCommitee.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_SendRequestToCommitee.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_SendRequestToCommitee.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Meeting_SendRequestToCommitee.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Meeting_SendRequestToCommitee";
    Meeting_SendRequestToCommitee.InitialDataReady = false;
    Meeting_SendRequestToCommitee.Requests = [];
    Meeting_SendRequestToCommitee.SelectedIndex = -1;


    //Reset UI elements
    Meeting_SendRequestToCommitee.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Meeting_SendRequestToCommitee.CustomMethods.AjaxCall.GetInitialData();

    //Meeting dropdown list
    $('#' + Meeting_SendRequestToCommitee.uiElements.btnSave).bind("click", Meeting_SendRequestToCommitee.EventHandlers.btnSave_click);

    //Close modal window
    $('#' + Meeting_SendRequestToCommitee.uiElements.btnClose).bind("click", Meeting_SendRequestToCommitee.EventHandlers.btnClose_click);

    //Export button
    $("#" + Meeting_SendRequestToCommitee.uiElements.btnExport).bind("click", Meeting_SendRequestToCommitee.EventHandlers.btnExport_onclick);

    //Send button
    $("#" + Meeting_SendRequestToCommitee.uiElements.btnSend).bind("click", Meeting_SendRequestToCommitee.EventHandlers.btnSend_onclick);

    //History back button
    $("#" + Meeting_SendRequestToCommitee.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Meeting_SendRequestToCommitee.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


