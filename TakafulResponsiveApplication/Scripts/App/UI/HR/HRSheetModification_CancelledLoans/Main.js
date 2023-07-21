

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof HR_HRSheetModification_CancelledLoans === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_CancelledLoans.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_CancelledLoans.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_CancelledLoans.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    HR_HRSheetModification_CancelledLoans.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/HR_HRSheetModification_CancelledLoans";
    HR_HRSheetModification_CancelledLoans.InitialDataReady = false;
    HR_HRSheetModification_CancelledLoans.Sheets = [];
    //HR_HRSheetModification_CancelledLoans.AllRequests = [];
    HR_HRSheetModification_CancelledLoans.Employees = [];
    HR_HRSheetModification_CancelledLoans.CurrentSheetIndex = -1;


    //Reset UI elements
    HR_HRSheetModification_CancelledLoans.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    HR_HRSheetModification_CancelledLoans.CustomMethods.AjaxCall.GetInitialData();

    //Sheet dropdown list
    $('#' + HR_HRSheetModification_CancelledLoans.uiElements.lstSheets).bind("change", HR_HRSheetModification_CancelledLoans.EventHandlers.lstSheets_onchange);

    //Master employee checkbox
    $('#' + HR_HRSheetModification_CancelledLoans.uiElements.chkEmployees).bind("change", HR_HRSheetModification_CancelledLoans.EventHandlers.chkEmployees_onchange);

    //Approve button
    $('#' + HR_HRSheetModification_CancelledLoans.uiElements.btnSubmit).bind("click", HR_HRSheetModification_CancelledLoans.EventHandlers.btnSubmit_onclick);

    //Save button
    $('#' + HR_HRSheetModification_CancelledLoans.uiElements.btnSave).bind("click", HR_HRSheetModification_CancelledLoans.EventHandlers.btnSave_onclick);

    //Export button
    $("#" + HR_HRSheetModification_CancelledLoans.uiElements.btnExport).bind("click", HR_HRSheetModification_CancelledLoans.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + HR_HRSheetModification_CancelledLoans.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && HR_HRSheetModification_CancelledLoans.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


