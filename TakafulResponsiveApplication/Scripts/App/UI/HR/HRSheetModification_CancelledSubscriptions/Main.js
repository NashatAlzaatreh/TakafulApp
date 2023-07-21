

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof HR_HRSheetModification_CancelledSubscriptions === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_CancelledSubscriptions.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_CancelledSubscriptions.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_CancelledSubscriptions.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    HR_HRSheetModification_CancelledSubscriptions.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/HR_HRSheetModification_CancelledSubscriptions";
    HR_HRSheetModification_CancelledSubscriptions.InitialDataReady = false;
    HR_HRSheetModification_CancelledSubscriptions.Sheets = [];
    //HR_HRSheetModification_CancelledSubscriptions.AllRequests = [];
    HR_HRSheetModification_CancelledSubscriptions.Employees = [];
    HR_HRSheetModification_CancelledSubscriptions.CurrentSheetIndex = -1;


    //Reset UI elements
    HR_HRSheetModification_CancelledSubscriptions.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    HR_HRSheetModification_CancelledSubscriptions.CustomMethods.AjaxCall.GetInitialData();

    //Sheet dropdown list
    $('#' + HR_HRSheetModification_CancelledSubscriptions.uiElements.lstSheets).bind("change", HR_HRSheetModification_CancelledSubscriptions.EventHandlers.lstSheets_onchange);

    //Master employee checkbox
    $('#' + HR_HRSheetModification_CancelledSubscriptions.uiElements.chkEmployees).bind("change", HR_HRSheetModification_CancelledSubscriptions.EventHandlers.chkEmployees_onchange);

    //Approve button
    $('#' + HR_HRSheetModification_CancelledSubscriptions.uiElements.btnSubmit).bind("click", HR_HRSheetModification_CancelledSubscriptions.EventHandlers.btnSubmit_onclick);

    //Save button
    $('#' + HR_HRSheetModification_CancelledSubscriptions.uiElements.btnSave).bind("click", HR_HRSheetModification_CancelledSubscriptions.EventHandlers.btnSave_onclick);

    //Export button
    $("#" + HR_HRSheetModification_CancelledSubscriptions.uiElements.btnExport).bind("click", HR_HRSheetModification_CancelledSubscriptions.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + HR_HRSheetModification_CancelledSubscriptions.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && HR_HRSheetModification_CancelledSubscriptions.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


