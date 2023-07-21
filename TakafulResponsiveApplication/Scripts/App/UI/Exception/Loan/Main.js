

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Exception_Loan_Submit === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Exception_Loan_Submit.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Exception_Loan_Submit.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Exception_Loan_Submit.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Exception_Loan_Submit.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Exception_Loan_Submit";
    Exception_Loan_Submit.InitialDataReady = false;
    //Exception_Loan_Submit.EmpID = '';
    Exception_Loan_Submit.InitialData = {};


    //Reset UI elements
    Exception_Loan_Submit.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Exception_Loan_Submit.CustomMethods.AjaxCall.GetInitialData();

    //Employee dropdown list
    $('#' + Exception_Loan_Submit.uiElements.lstEmployees).bind("change", Exception_Loan_Submit.EventHandlers.lstEmployees_onchange);

    //Edit cancellation button
    $("#" + Exception_Loan_Submit.uiElements.btnCancel).bind("click", Exception_Loan_Submit.EventHandlers.btnCancelEditException_click);

    //Save button
    $("#" + Exception_Loan_Submit.uiElements.btnSave).bind("click", Exception_Loan_Submit.EventHandlers.btnSave_click);

    //Export button
    $("#" + Exception_Loan_Submit.uiElements.btnExport).bind("click", Exception_Loan_Submit.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + Exception_Loan_Submit.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Exception_Loan_Submit.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


