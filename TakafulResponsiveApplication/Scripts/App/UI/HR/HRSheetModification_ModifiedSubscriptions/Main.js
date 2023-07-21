

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof HR_HRSheetModification_ModifiedSubscriptions === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_ModifiedSubscriptions.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_ModifiedSubscriptions.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_ModifiedSubscriptions.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    HR_HRSheetModification_ModifiedSubscriptions.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/HR_HRSheetModification_ModifiedSubscriptions";
    HR_HRSheetModification_ModifiedSubscriptions.InitialDataReady = false;
    HR_HRSheetModification_ModifiedSubscriptions.Sheets = [];
    //HR_HRSheetModification_ModifiedSubscriptions.AllRequests = [];
    HR_HRSheetModification_ModifiedSubscriptions.Employees = [];
    HR_HRSheetModification_ModifiedSubscriptions.CurrentSheetIndex = -1;


    //Reset UI elements
    HR_HRSheetModification_ModifiedSubscriptions.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    HR_HRSheetModification_ModifiedSubscriptions.CustomMethods.AjaxCall.GetInitialData();

    //Sheet dropdown list
    $('#' + HR_HRSheetModification_ModifiedSubscriptions.uiElements.lstSheets).bind("change", HR_HRSheetModification_ModifiedSubscriptions.EventHandlers.lstSheets_onchange);

    //Master employee checkbox
    $('#' + HR_HRSheetModification_ModifiedSubscriptions.uiElements.chkEmployees).bind("change", HR_HRSheetModification_ModifiedSubscriptions.EventHandlers.chkEmployees_onchange);

    //Approve button
    $('#' + HR_HRSheetModification_ModifiedSubscriptions.uiElements.btnSubmit).bind("click", HR_HRSheetModification_ModifiedSubscriptions.EventHandlers.btnSubmit_onclick);

    //Save button
    $('#' + HR_HRSheetModification_ModifiedSubscriptions.uiElements.btnSave).bind("click", HR_HRSheetModification_ModifiedSubscriptions.EventHandlers.btnSave_onclick);

    //Export button
    $("#" + HR_HRSheetModification_ModifiedSubscriptions.uiElements.btnExport).bind("click", HR_HRSheetModification_ModifiedSubscriptions.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + HR_HRSheetModification_ModifiedSubscriptions.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && HR_HRSheetModification_ModifiedSubscriptions.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


