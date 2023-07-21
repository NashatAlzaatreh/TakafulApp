

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof HR_HRSheetModification_CancelledSubscriptionsSub === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_CancelledSubscriptionsSub.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_CancelledSubscriptionsSub.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_CancelledSubscriptionsSub.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    HR_HRSheetModification_CancelledSubscriptionsSub.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/HR_HRSheetModification_CancelledSubscriptionsSub";
    HR_HRSheetModification_CancelledSubscriptionsSub.InitialDataReady = false;
    HR_HRSheetModification_CancelledSubscriptionsSub.Sheets = [];
    //HR_HRSheetModification_CancelledSubscriptionsSub.AllRequests = [];
    HR_HRSheetModification_CancelledSubscriptionsSub.Employees = [];
    HR_HRSheetModification_CancelledSubscriptionsSub.CurrentSheetIndex = -1;


    //Reset UI elements
    HR_HRSheetModification_CancelledSubscriptionsSub.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    HR_HRSheetModification_CancelledSubscriptionsSub.CustomMethods.AjaxCall.GetInitialData();

    //Sheet dropdown list
    $('#' + HR_HRSheetModification_CancelledSubscriptionsSub.uiElements.lstSheets).bind("change", HR_HRSheetModification_CancelledSubscriptionsSub.EventHandlers.lstSheets_onchange);

    //Master employee checkbox
    $('#' + HR_HRSheetModification_CancelledSubscriptionsSub.uiElements.chkEmployees).bind("change", HR_HRSheetModification_CancelledSubscriptionsSub.EventHandlers.chkEmployees_onchange);

    //Approve button
    $('#' + HR_HRSheetModification_CancelledSubscriptionsSub.uiElements.btnSubmit).bind("click", HR_HRSheetModification_CancelledSubscriptionsSub.EventHandlers.btnSubmit_onclick);

    //Save button
    $('#' + HR_HRSheetModification_CancelledSubscriptionsSub.uiElements.btnSave).bind("click", HR_HRSheetModification_CancelledSubscriptionsSub.EventHandlers.btnSave_onclick);

    //Export button
    $("#" + HR_HRSheetModification_CancelledSubscriptionsSub.uiElements.btnExport).bind("click", HR_HRSheetModification_CancelledSubscriptionsSub.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + HR_HRSheetModification_CancelledSubscriptionsSub.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && HR_HRSheetModification_CancelledSubscriptionsSub.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


