

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Employee_UpdateSubscription === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_UpdateSubscription.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_UpdateSubscription.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_UpdateSubscription.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Employee_UpdateSubscription.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Employee_UpdateSubscription";
    Employee_UpdateSubscription.InitialDataReady = false;
    Employee_UpdateSubscription.Employees = [];


    //Reset UI elements
    Employee_UpdateSubscription.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Employee_UpdateSubscription.CustomMethods.AjaxCall.GetInitialData();

    //Master employee checkbox
    $('#' + Employee_UpdateSubscription.uiElements.chkEmployees).bind("change", Employee_UpdateSubscription.EventHandlers.chkEmployees_onchange);

    //Save button
    $('#' + Employee_UpdateSubscription.uiElements.btnSave).bind("click", Employee_UpdateSubscription.EventHandlers.btnSave_onclick);

    //Export button
    $('#' + Employee_UpdateSubscription.uiElements.btnExport).bind("click", Employee_UpdateSubscription.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + Employee_UpdateSubscription.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Employee_UpdateSubscription.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


