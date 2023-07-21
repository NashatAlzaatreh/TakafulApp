

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_CancelSubscription_Submit === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CancelSubscription_Submit.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CancelSubscription_Submit.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CancelSubscription_Submit.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_CancelSubscription_Submit.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_CancelSubscription_Submit";
    Request_CancelSubscription_Submit.InitialDataReady = false;
    //Request_CancelSubscription_Submit.EmpID = '';
    Request_CancelSubscription_Submit.InitialData = {};


    ////Check query string parameters
    //var empID = Takaful.CommonMethods.GetQueryStringParameter('EmpID');

    //if (empID.trim() == '') {
    //    //Throw error message
    //    Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    //    return;
    //} else {
    //    Request_CancelSubscription_Submit.EmpID = empID;
    //}

    //Reset UI elements
    Request_CancelSubscription_Submit.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Request_CancelSubscription_Submit.CustomMethods.AjaxCall.GetInitialData();

    //Submit button
    $("#" + Request_CancelSubscription_Submit.uiElements.btnSubmit).bind("click", Request_CancelSubscription_Submit.EventHandlers.btnSubmit_onclick);

    //History back button
    $("#" + Request_CancelSubscription_Submit.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Request_CancelSubscription_Submit.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


