


$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof User_Login === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_Login.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_Login.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_Login.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    User_Login.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/User_Login";

    User_Login.ServiceMainUrl = Takaful.Config.ServiceUrl_Main + "/Home_Main";

    //Reset UI elements
    User_Login.CustomMethods.LocalOperations.ResetUI();

    User_Login.CustomMethods.AjaxCall.GetInitialData();

    //Bind event handlers

    //Login button
    $('#' + User_Login.uiElements.btnLoginSubmit).bind("click", User_Login.EventHandlers.btnLoginSubmit_onclick);

    $('#' + User_Login.uiElements.btnApprovalRules).bind("click", User_Login.EventHandlers.btnApprovalRules_onclick);

    //Enter press for login controls
    $('#' + User_Login.uiElements.txtLoginUserName).keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            //$('#' + User_Login.uiElements.btnLoginSubmit).click();
            $("#" + User_Login.uiElements.txtLoginPassword).focus();
            return false;
        }
    });

    $('#' + User_Login.uiElements.txtLoginPassword).keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#' + User_Login.uiElements.btnLoginSubmit).click();
            return false;
        }
    });

    //Remember me button
    $('#' + User_Login.uiElements.btnRememberMe).bind("click", User_Login.EventHandlers.btnRememberMe_onclick);

    

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


