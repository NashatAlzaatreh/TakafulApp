

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof HR_HRSheetModification_NewSubscriptions === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_NewSubscriptions.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_NewSubscriptions.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_NewSubscriptions.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    HR_HRSheetModification_NewSubscriptions.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/HR_HRSheetModification_NewSubscriptions";
    HR_HRSheetModification_NewSubscriptions.InitialDataReady = false;
    HR_HRSheetModification_NewSubscriptions.Sheets = [];
    //HR_HRSheetModification_NewSubscriptions.AllRequests = [];
    HR_HRSheetModification_NewSubscriptions.Employees = [];
    HR_HRSheetModification_NewSubscriptions.CurrentSheetIndex = -1;


    //Reset UI elements
    HR_HRSheetModification_NewSubscriptions.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    HR_HRSheetModification_NewSubscriptions.CustomMethods.AjaxCall.GetInitialData();

    //Sheet dropdown list
    $('#' + HR_HRSheetModification_NewSubscriptions.uiElements.lstSheets).bind("change", HR_HRSheetModification_NewSubscriptions.EventHandlers.lstSheets_onchange);

    //Master employee checkbox
    $('#' + HR_HRSheetModification_NewSubscriptions.uiElements.chkEmployees).bind("change", HR_HRSheetModification_NewSubscriptions.EventHandlers.chkEmployees_onchange);

    //Approve button
    $('#' + HR_HRSheetModification_NewSubscriptions.uiElements.btnSubmit).bind("click", HR_HRSheetModification_NewSubscriptions.EventHandlers.btnSubmit_onclick);

    //Save button
    $('#' + HR_HRSheetModification_NewSubscriptions.uiElements.btnSave).bind("click", HR_HRSheetModification_NewSubscriptions.EventHandlers.btnSave_onclick);

    //Export button
    $("#" + HR_HRSheetModification_NewSubscriptions.uiElements.btnExport).bind("click", HR_HRSheetModification_NewSubscriptions.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + HR_HRSheetModification_NewSubscriptions.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && HR_HRSheetModification_NewSubscriptions.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


