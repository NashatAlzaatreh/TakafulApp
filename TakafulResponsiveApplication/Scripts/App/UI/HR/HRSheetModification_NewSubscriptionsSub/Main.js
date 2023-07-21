

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof HR_HRSheetModification_NewSubscriptionsSub === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_NewSubscriptionsSub.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_NewSubscriptionsSub.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_NewSubscriptionsSub.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    HR_HRSheetModification_NewSubscriptionsSub.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/HR_HRSheetModification_NewSubscriptionsSub";
    HR_HRSheetModification_NewSubscriptionsSub.InitialDataReady = false;
    HR_HRSheetModification_NewSubscriptionsSub.Sheets = [];
    //HR_HRSheetModification_NewSubscriptionsSub.AllRequests = [];
    HR_HRSheetModification_NewSubscriptionsSub.Employees = [];
    HR_HRSheetModification_NewSubscriptionsSub.CurrentSheetIndex = -1;


    //Reset UI elements
    HR_HRSheetModification_NewSubscriptionsSub.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    HR_HRSheetModification_NewSubscriptionsSub.CustomMethods.AjaxCall.GetInitialData();

    //Sheet dropdown list
    $('#' + HR_HRSheetModification_NewSubscriptionsSub.uiElements.lstSheets).bind("change", HR_HRSheetModification_NewSubscriptionsSub.EventHandlers.lstSheets_onchange);

    //Master employee checkbox
    $('#' + HR_HRSheetModification_NewSubscriptionsSub.uiElements.chkEmployees).bind("change", HR_HRSheetModification_NewSubscriptionsSub.EventHandlers.chkEmployees_onchange);

    //Approve button
    $('#' + HR_HRSheetModification_NewSubscriptionsSub.uiElements.btnSubmit).bind("click", HR_HRSheetModification_NewSubscriptionsSub.EventHandlers.btnSubmit_onclick);

    //Save button
    $('#' + HR_HRSheetModification_NewSubscriptionsSub.uiElements.btnSave).bind("click", HR_HRSheetModification_NewSubscriptionsSub.EventHandlers.btnSave_onclick);

    //Export button
    $("#" + HR_HRSheetModification_NewSubscriptionsSub.uiElements.btnExport).bind("click", HR_HRSheetModification_NewSubscriptionsSub.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + HR_HRSheetModification_NewSubscriptionsSub.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && HR_HRSheetModification_NewSubscriptionsSub.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


