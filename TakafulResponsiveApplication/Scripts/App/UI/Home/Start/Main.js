

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Home_Start === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Home_Start.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Home_Start.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Home_Start.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Home_Start.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Home_Start";
    Home_Start.InitialDataReady = false;


    //Reset UI elements
    Home_Start.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Home_Start.CustomMethods.AjaxCall.GetInitialData();


    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Home_Start.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();
            

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);

});


