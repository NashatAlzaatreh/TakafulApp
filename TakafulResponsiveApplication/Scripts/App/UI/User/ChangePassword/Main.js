


$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof User_ChangePassword === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_ChangePassword.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_ChangePassword.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_ChangePassword.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    User_ChangePassword.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/User_ChangePassword";

    //Reset UI elements
    User_ChangePassword.CustomMethods.LocalOperations.ResetUI();

    //Bind event handlers

    //Enter press
    $('#' + User_ChangePassword.uiElements.txtConfirmPassword).keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#' + User_ChangePassword.uiElements.btnSubmit).click();
            return false;
        }
    });

    //Submit button
    $('#' + User_ChangePassword.uiElements.btnSubmit).bind("click", User_ChangePassword.EventHandlers.btnSubmit_onclick);

    //History back button
    $("#" + User_ChangePassword.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });


    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);

});


