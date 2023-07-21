


$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof User_AuditManagement === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_AuditManagement.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_AuditManagement.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof User_AuditManagement.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    User_AuditManagement.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/User_AuditManagement";

    //Reset UI elements
    User_AuditManagement.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    User_AuditManagement.CustomMethods.AjaxCall.GetInitialData();

    //Bind event handlers

    //Submit button
    $('#' + User_AuditManagement.uiElements.btnSave).bind("click", User_AuditManagement.EventHandlers.btnSave_onclick);

    //History back button
    $("#" + User_AuditManagement.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });


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


