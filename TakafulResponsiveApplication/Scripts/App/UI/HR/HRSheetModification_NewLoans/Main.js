

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof HR_HRSheetModification_NewLoans === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_NewLoans.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_NewLoans.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_NewLoans.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    HR_HRSheetModification_NewLoans.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/HR_HRSheetModification_NewLoans";
    HR_HRSheetModification_NewLoans.InitialDataReady = false;
    HR_HRSheetModification_NewLoans.Sheets = [];
    //HR_HRSheetModification_NewLoans.AllRequests = [];
    HR_HRSheetModification_NewLoans.Employees = [];
    HR_HRSheetModification_NewLoans.CurrentSheetIndex = -1;


    //Reset UI elements
    HR_HRSheetModification_NewLoans.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    HR_HRSheetModification_NewLoans.CustomMethods.AjaxCall.GetInitialData();

    //Sheet dropdown list
    $('#' + HR_HRSheetModification_NewLoans.uiElements.lstSheets).bind("change", HR_HRSheetModification_NewLoans.EventHandlers.lstSheets_onchange);

    //Master employee checkbox
    $('#' + HR_HRSheetModification_NewLoans.uiElements.chkEmployees).bind("change", HR_HRSheetModification_NewLoans.EventHandlers.chkEmployees_onchange);

    //Approve button
    $('#' + HR_HRSheetModification_NewLoans.uiElements.btnSubmit).bind("click", HR_HRSheetModification_NewLoans.EventHandlers.btnSubmit_onclick);

    //Save button
    $('#' + HR_HRSheetModification_NewLoans.uiElements.btnSave).bind("click", HR_HRSheetModification_NewLoans.EventHandlers.btnSave_onclick);

    //Export button
    $("#" + HR_HRSheetModification_NewLoans.uiElements.btnExport).bind("click", HR_HRSheetModification_NewLoans.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + HR_HRSheetModification_NewLoans.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && HR_HRSheetModification_NewLoans.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


