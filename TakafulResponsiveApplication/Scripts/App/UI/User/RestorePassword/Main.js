


$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof User_RestorePassword === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_RestorePassword.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_RestorePassword.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_RestorePassword.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    User_RestorePassword.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/User_RestorePassword";

    //Reset UI elements
    User_RestorePassword.CustomMethods.LocalOperations.ResetUI();

    //Bind event handlers

    //Enter press for login controls
    $('#' + User_RestorePassword.uiElements.txtEmployeeNumber).keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            //$('#' + User_RestorePassword.uiElements.btnLoginSubmit).click();
            $("#" + User_RestorePassword.uiElements.txtEmail).focus();
            return false;
        }
    });

    $('#' + User_RestorePassword.uiElements.txtEmail).keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#' + User_RestorePassword.uiElements.btnSend).click();
            return false;
        }
    });

    //Send button
    $('#' + User_RestorePassword.uiElements.btnSend).bind("click", User_RestorePassword.EventHandlers.btnSend_onclick);

    //History back button
    $("#" + User_RestorePassword.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });


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


