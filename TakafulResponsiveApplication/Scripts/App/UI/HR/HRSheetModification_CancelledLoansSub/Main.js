

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof HR_HRSheetModification_CancelledLoansSub === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_CancelledLoansSub.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_CancelledLoansSub.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_CancelledLoansSub.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    HR_HRSheetModification_CancelledLoansSub.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/HR_HRSheetModification_CancelledLoansSub";
    HR_HRSheetModification_CancelledLoansSub.InitialDataReady = false;
    HR_HRSheetModification_CancelledLoansSub.Sheets = [];
    //HR_HRSheetModification_CancelledLoansSub.AllRequests = [];
    HR_HRSheetModification_CancelledLoansSub.Employees = [];
    HR_HRSheetModification_CancelledLoansSub.CurrentSheetIndex = -1;


    //Reset UI elements
    HR_HRSheetModification_CancelledLoansSub.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    HR_HRSheetModification_CancelledLoansSub.CustomMethods.AjaxCall.GetInitialData();

    //Sheet dropdown list
    $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.lstSheets).bind("change", HR_HRSheetModification_CancelledLoansSub.EventHandlers.lstSheets_onchange);

    //Master employee checkbox
    $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.chkEmployees).bind("change", HR_HRSheetModification_CancelledLoansSub.EventHandlers.chkEmployees_onchange);

    //Approve button
    $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.btnSubmit).bind("click", HR_HRSheetModification_CancelledLoansSub.EventHandlers.btnSubmit_onclick);

    //Save button
    $('#' + HR_HRSheetModification_CancelledLoansSub.uiElements.btnSave).bind("click", HR_HRSheetModification_CancelledLoansSub.EventHandlers.btnSave_onclick);

    //Export button
    $("#" + HR_HRSheetModification_CancelledLoansSub.uiElements.btnExport).bind("click", HR_HRSheetModification_CancelledLoansSub.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + HR_HRSheetModification_CancelledLoansSub.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && HR_HRSheetModification_CancelledLoansSub.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


