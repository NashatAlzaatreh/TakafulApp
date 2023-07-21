

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Meeting_ApprovedLoanAmount === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_ApprovedLoanAmount.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_ApprovedLoanAmount.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_ApprovedLoanAmount.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Meeting_ApprovedLoanAmount.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Meeting_ApprovedLoanAmount";
    Meeting_ApprovedLoanAmount.InitialDataReady = false;
    Meeting_ApprovedLoanAmount.Requests = [];
    Meeting_ApprovedLoanAmount.SelectedIndex = -1;


    //Reset UI elements
    Meeting_ApprovedLoanAmount.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Meeting_ApprovedLoanAmount.CustomMethods.AjaxCall.GetInitialData();

    //Save button
    $('#' + Meeting_ApprovedLoanAmount.uiElements.btnSave).bind("click", Meeting_ApprovedLoanAmount.EventHandlers.btnSave_click);

    //Close modal window
    $('#' + Meeting_ApprovedLoanAmount.uiElements.btnClose).bind("click", Meeting_ApprovedLoanAmount.EventHandlers.btnClose_click);

    //Export button
    $("#" + Meeting_ApprovedLoanAmount.uiElements.btnExport).bind("click", Meeting_ApprovedLoanAmount.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + Meeting_ApprovedLoanAmount.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Meeting_ApprovedLoanAmount.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


