

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof HR_HRSheetModification === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    HR_HRSheetModification.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/HR_HRSheetModification";
    HR_HRSheetModification.InitialDataReady = false;
    HR_HRSheetModification.Sheets = [];
    //HR_HRSheetModification.AllRequests = [];
    HR_HRSheetModification.Employees = [];
    HR_HRSheetModification.CurrentSheetIndex = -1;


    //Reset UI elements
    HR_HRSheetModification.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    HR_HRSheetModification.CustomMethods.AjaxCall.GetInitialData();

    //Sheet dropdown list
    $('#' + HR_HRSheetModification.uiElements.lstSheets).bind("change", HR_HRSheetModification.EventHandlers.lstSheets_onchange);

    //Master employee checkbox
    $('#' + HR_HRSheetModification.uiElements.chkEmployees).bind("change", HR_HRSheetModification.EventHandlers.chkEmployees_onchange);

    //Approve button
    $('#' + HR_HRSheetModification.uiElements.btnSubmit).bind("click", HR_HRSheetModification.EventHandlers.btnSubmit_onclick);

    //Save button
    $('#' + HR_HRSheetModification.uiElements.btnSave).bind("click", HR_HRSheetModification.EventHandlers.btnSave_onclick);

    //Export button
    $("#" + HR_HRSheetModification.uiElements.btnExport).bind("click", HR_HRSheetModification.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + HR_HRSheetModification.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && HR_HRSheetModification.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


