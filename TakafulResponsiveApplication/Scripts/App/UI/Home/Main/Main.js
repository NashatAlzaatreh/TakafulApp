



$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Home_Main === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Home_Main.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Home_Main.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Home_Main.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Home_Main.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Home_Main";
    Home_Main.InitialDataReady = false;


    //Reset UI elements
    Home_Main.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Home_Main.CustomMethods.AjaxCall.GetInitialData();

    //Button Join us
    $('#' + Home_Main.uiElements.JoinUs1).on('click', Home_Main.EventHandlers.btnJoinUs_onclick);
    $('#' + Home_Main.uiElements.JoinUs2).on('click', Home_Main.EventHandlers.btnJoinUs_onclick);
    $('#' + Home_Main.uiElements.JoinUs3).on('click', Home_Main.EventHandlers.btnJoinUs_onclick);

    //Button register
    $('#' + Home_Main.uiElements.btnRegister).on('click', Home_Main.EventHandlers.btnRegister_onclick);




    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Home_Main.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();
            //Show slider
            $(document).foundation({
                orbit: {
                    animation: 'fade',
                    timer_speed: 9000,
                    pause_on_hover: false,
                    animation_speed: 500,
                    navigation_arrows: false,
                    bullets: false
                }
            });

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);

});


