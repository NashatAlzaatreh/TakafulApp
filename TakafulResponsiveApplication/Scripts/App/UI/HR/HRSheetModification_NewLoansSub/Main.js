

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof HR_HRSheetModification_NewLoansSub === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_NewLoansSub.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_NewLoansSub.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetModification_NewLoansSub.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    HR_HRSheetModification_NewLoansSub.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/HR_HRSheetModification_NewLoansSub";
    HR_HRSheetModification_NewLoansSub.InitialDataReady = false;
    HR_HRSheetModification_NewLoansSub.Sheets = [];
    //HR_HRSheetModification_NewLoansSub.AllRequests = [];
    HR_HRSheetModification_NewLoansSub.Employees = [];
    HR_HRSheetModification_NewLoansSub.CurrentSheetIndex = -1;


    //Reset UI elements
    HR_HRSheetModification_NewLoansSub.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    HR_HRSheetModification_NewLoansSub.CustomMethods.AjaxCall.GetInitialData();

    //Sheet dropdown list
    $('#' + HR_HRSheetModification_NewLoansSub.uiElements.lstSheets).bind("change", HR_HRSheetModification_NewLoansSub.EventHandlers.lstSheets_onchange);

    //Master employee checkbox
    $('#' + HR_HRSheetModification_NewLoansSub.uiElements.chkEmployees).bind("change", HR_HRSheetModification_NewLoansSub.EventHandlers.chkEmployees_onchange);

    //Approve button
    $('#' + HR_HRSheetModification_NewLoansSub.uiElements.btnSubmit).bind("click", HR_HRSheetModification_NewLoansSub.EventHandlers.btnSubmit_onclick);

    //Save button
    $('#' + HR_HRSheetModification_NewLoansSub.uiElements.btnSave).bind("click", HR_HRSheetModification_NewLoansSub.EventHandlers.btnSave_onclick);

    //Export button
    $("#" + HR_HRSheetModification_NewLoansSub.uiElements.btnExport).bind("click", HR_HRSheetModification_NewLoansSub.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + HR_HRSheetModification_NewLoansSub.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && HR_HRSheetModification_NewLoansSub.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


