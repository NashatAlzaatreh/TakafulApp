

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof HR_HRSheetModification_ModifiedInstallments === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_ModifiedInstallments.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_ModifiedInstallments.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_ModifiedInstallments.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    HR_HRSheetModification_ModifiedInstallments.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/HR_HRSheetModification_ModifiedInstallments";
    HR_HRSheetModification_ModifiedInstallments.InitialDataReady = false;
    HR_HRSheetModification_ModifiedInstallments.Sheets = [];
    //HR_HRSheetModification_ModifiedInstallments.AllRequests = [];
    HR_HRSheetModification_ModifiedInstallments.Employees = [];
    HR_HRSheetModification_ModifiedInstallments.CurrentSheetIndex = -1;


    //Reset UI elements
    HR_HRSheetModification_ModifiedInstallments.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    HR_HRSheetModification_ModifiedInstallments.CustomMethods.AjaxCall.GetInitialData();

    //Sheet dropdown list
    $('#' + HR_HRSheetModification_ModifiedInstallments.uiElements.lstSheets).bind("change", HR_HRSheetModification_ModifiedInstallments.EventHandlers.lstSheets_onchange);

    //Master employee checkbox
    $('#' + HR_HRSheetModification_ModifiedInstallments.uiElements.chkEmployees).bind("change", HR_HRSheetModification_ModifiedInstallments.EventHandlers.chkEmployees_onchange);

    //Approve button
    $('#' + HR_HRSheetModification_ModifiedInstallments.uiElements.btnSubmit).bind("click", HR_HRSheetModification_ModifiedInstallments.EventHandlers.btnSubmit_onclick);

    //Save button
    $('#' + HR_HRSheetModification_ModifiedInstallments.uiElements.btnSave).bind("click", HR_HRSheetModification_ModifiedInstallments.EventHandlers.btnSave_onclick);

    //Export button
    $("#" + HR_HRSheetModification_ModifiedInstallments.uiElements.btnExport).bind("click", HR_HRSheetModification_ModifiedInstallments.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + HR_HRSheetModification_ModifiedInstallments.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && HR_HRSheetModification_ModifiedInstallments.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


