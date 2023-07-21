

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_HelpDeskUserRequests === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_HelpDeskUserRequests.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_HelpDeskUserRequests.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_HelpDeskUserRequests.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_HelpDeskUserRequests.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_HelpDeskUserRequests";
    Request_HelpDeskUserRequests.InitialDataReady = false;
    Request_HelpDeskUserRequests.EmployeeNumber = 0;


    //Reset UI elements
    Request_HelpDeskUserRequests.CustomMethods.LocalOperations.ResetUI();

    ////Get initial data
    //Request_HelpDeskUserRequests.CustomMethods.AjaxCall.GetInitialData();

    //Search textbox
    $('#' + Request_HelpDeskUserRequests.uiElements.txtEmployeeNumber).keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            Request_HelpDeskUserRequests.EventHandlers.btnSearch_onclick();
            return false;
        }
    });

    //Search button
    $("#" + Request_HelpDeskUserRequests.uiElements.btnSearch).bind("click", Request_HelpDeskUserRequests.EventHandlers.btnSearch_onclick);

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true ) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);

});


