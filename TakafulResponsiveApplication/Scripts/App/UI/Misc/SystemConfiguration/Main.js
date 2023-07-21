

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Misc_SystemConfiguration === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Misc_SystemConfiguration.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Misc_SystemConfiguration.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Misc_SystemConfiguration.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Misc_SystemConfiguration.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Misc_SystemConfiguration";
    Misc_SystemConfiguration.InitialDataReady = false;
    //Misc_SystemConfiguration.EmpID = '';
    Misc_SystemConfiguration.InitialData = {};


    //Reset UI elements
    Misc_SystemConfiguration.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Misc_SystemConfiguration.CustomMethods.AjaxCall.GetInitialData();

    //Save button
    $("#" + Misc_SystemConfiguration.uiElements.btnSave).bind("click", Misc_SystemConfiguration.EventHandlers.btnSave_onclick);

    //History back button
    $("#" + Misc_SystemConfiguration.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Misc_SystemConfiguration.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


