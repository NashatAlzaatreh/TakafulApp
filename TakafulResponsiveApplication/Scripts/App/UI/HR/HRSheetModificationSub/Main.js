

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof HR_HRSheetModificationSub === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModificationSub.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModificationSub.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModificationSub.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    HR_HRSheetModificationSub.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/HR_HRSheetModificationSub";
    HR_HRSheetModificationSub.InitialDataReady = false;
    HR_HRSheetModificationSub.Sheets = [];
    //HR_HRSheetModificationSub.AllRequests = [];
    HR_HRSheetModificationSub.Employees = [];
    HR_HRSheetModificationSub.CurrentSheetIndex = -1;


    //Reset UI elements
    HR_HRSheetModificationSub.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    HR_HRSheetModificationSub.CustomMethods.AjaxCall.GetInitialData();

    //Sheet dropdown list
    $('#' + HR_HRSheetModificationSub.uiElements.lstSheets).bind("change", HR_HRSheetModificationSub.EventHandlers.lstSheets_onchange);

    //Master employee checkbox
    $('#' + HR_HRSheetModificationSub.uiElements.chkEmployees).bind("change", HR_HRSheetModificationSub.EventHandlers.chkEmployees_onchange);

    //Approve button
    $('#' + HR_HRSheetModificationSub.uiElements.btnSubmit).bind("click", HR_HRSheetModificationSub.EventHandlers.btnSubmit_onclick);

    //Save button
    $('#' + HR_HRSheetModificationSub.uiElements.btnSave).bind("click", HR_HRSheetModificationSub.EventHandlers.btnSave_onclick);

    //Export button
    $("#" + HR_HRSheetModificationSub.uiElements.btnExport).bind("click", HR_HRSheetModificationSub.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + HR_HRSheetModificationSub.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && HR_HRSheetModificationSub.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


