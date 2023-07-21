

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Exception_Subscription_Submit === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Exception_Subscription_Submit.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Exception_Subscription_Submit.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Exception_Subscription_Submit.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Exception_Subscription_Submit.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Exception_Subscription_Submit";
    Exception_Subscription_Submit.InitialDataReady = false;
    //Exception_Subscription_Submit.EmpID = '';
    Exception_Subscription_Submit.InitialData = {};


    //Reset UI elements
    Exception_Subscription_Submit.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Exception_Subscription_Submit.CustomMethods.AjaxCall.GetInitialData();

    //Employee dropdown list
    $('#' + Exception_Subscription_Submit.uiElements.lstEmployees).bind("change", Exception_Subscription_Submit.EventHandlers.lstEmployees_onchange);

    //Edit cancellation button
    $("#" + Exception_Subscription_Submit.uiElements.btnCancel).bind("click", Exception_Subscription_Submit.EventHandlers.btnCancelEditException_click);

    //Save button
    $("#" + Exception_Subscription_Submit.uiElements.btnSave).bind("click", Exception_Subscription_Submit.EventHandlers.btnSave_click);

    //Export button
    $("#" + Exception_Subscription_Submit.uiElements.btnExport).bind("click", Exception_Subscription_Submit.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + Exception_Subscription_Submit.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Exception_Subscription_Submit.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


