



$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Misc_ContactUs === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Misc_ContactUs.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Misc_ContactUs.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Misc_ContactUs.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Misc_ContactUs.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Misc_ContactUs";


    //Reset UI elements
    Misc_ContactUs.CustomMethods.LocalOperations.ResetUI();


    //Button register
    $('#' + Misc_ContactUs.uiElements.btnSend).on('click', Misc_ContactUs.EventHandlers.btnSend_onclick);




    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true) {
            //Initialize foundation plugin
            $(document).foundation();
            

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);

});


