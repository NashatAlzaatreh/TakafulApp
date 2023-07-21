

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_HelpDeskCancelSubscription_Submit === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_HelpDeskCancelSubscription_Submit.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_HelpDeskCancelSubscription_Submit.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_HelpDeskCancelSubscription_Submit.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_HelpDeskCancelSubscription_Submit.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_HelpDeskCancelSubscription_Submit";
    Request_HelpDeskCancelSubscription_Submit.InitialDataReady = false;
    //Request_HelpDeskCancelSubscription_Submit.EmpID = '';
    Request_HelpDeskCancelSubscription_Submit.InitialData = {};
    Request_HelpDeskCancelSubscription_Submit.EmployeeNumber = 0;


    ////Check query string parameters
    //var empID = Takaful.CommonMethods.GetQueryStringParameter('EmpID');

    //if (empID.trim() == '') {
    //    //Throw error message
    //    Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    //    return;
    //} else {
    //    Request_HelpDeskCancelSubscription_Submit.EmpID = empID;
    //}

    //Reset UI elements
    Request_HelpDeskCancelSubscription_Submit.CustomMethods.LocalOperations.ResetUI();

    ////Get initial data
    //Request_HelpDeskCancelSubscription_Submit.CustomMethods.AjaxCall.GetInitialData();

    //Submit button
    $("#" + Request_HelpDeskCancelSubscription_Submit.uiElements.btnSubmit).bind("click", Request_HelpDeskCancelSubscription_Submit.EventHandlers.btnSubmit_onclick);

    //Search textbox
    $('#' + Request_HelpDeskCancelSubscription_Submit.uiElements.txtEmployeeNumber).keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            Request_HelpDeskCancelSubscription_Submit.EventHandlers.btnSearch_onclick();
            return false;
        }
    });

    //Search button
    $("#" + Request_HelpDeskCancelSubscription_Submit.uiElements.btnSearch).bind("click", Request_HelpDeskCancelSubscription_Submit.EventHandlers.btnSearch_onclick);

    //History back button
    $("#" + Request_HelpDeskCancelSubscription_Submit.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

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


