

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof HR_HRSheetModification_ModifiedSubscriptionsSub === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_ModifiedSubscriptionsSub.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_ModifiedSubscriptionsSub.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_ModifiedSubscriptionsSub.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    HR_HRSheetModification_ModifiedSubscriptionsSub.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/HR_HRSheetModification_ModifiedSubscriptionsSub";
    HR_HRSheetModification_ModifiedSubscriptionsSub.InitialDataReady = false;
    HR_HRSheetModification_ModifiedSubscriptionsSub.Sheets = [];
    //HR_HRSheetModification_ModifiedSubscriptionsSub.AllRequests = [];
    HR_HRSheetModification_ModifiedSubscriptionsSub.Employees = [];
    HR_HRSheetModification_ModifiedSubscriptionsSub.CurrentSheetIndex = -1;


    //Reset UI elements
    HR_HRSheetModification_ModifiedSubscriptionsSub.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    HR_HRSheetModification_ModifiedSubscriptionsSub.CustomMethods.AjaxCall.GetInitialData();

    //Sheet dropdown list
    $('#' + HR_HRSheetModification_ModifiedSubscriptionsSub.uiElements.lstSheets).bind("change", HR_HRSheetModification_ModifiedSubscriptionsSub.EventHandlers.lstSheets_onchange);

    //Master employee checkbox
    $('#' + HR_HRSheetModification_ModifiedSubscriptionsSub.uiElements.chkEmployees).bind("change", HR_HRSheetModification_ModifiedSubscriptionsSub.EventHandlers.chkEmployees_onchange);

    //Approve button
    $('#' + HR_HRSheetModification_ModifiedSubscriptionsSub.uiElements.btnSubmit).bind("click", HR_HRSheetModification_ModifiedSubscriptionsSub.EventHandlers.btnSubmit_onclick);

    //Save button
    $('#' + HR_HRSheetModification_ModifiedSubscriptionsSub.uiElements.btnSave).bind("click", HR_HRSheetModification_ModifiedSubscriptionsSub.EventHandlers.btnSave_onclick);

    //Export button
    $("#" + HR_HRSheetModification_ModifiedSubscriptionsSub.uiElements.btnExport).bind("click", HR_HRSheetModification_ModifiedSubscriptionsSub.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + HR_HRSheetModification_ModifiedSubscriptionsSub.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && HR_HRSheetModification_ModifiedSubscriptionsSub.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


