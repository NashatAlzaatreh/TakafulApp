

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Home_HelpDesk === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Home_HelpDesk.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Home_HelpDesk.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Home_HelpDesk.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Home_HelpDesk.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Home_HelpDesk";
    Home_HelpDesk.InitialDataReady = false;


    //Reset UI elements
    Home_HelpDesk.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Home_HelpDesk.CustomMethods.AjaxCall.GetInitialData();


    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Home_HelpDesk.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();
            

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);

});


