

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_CommitteeCancelLoan_Approve === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeCancelLoan_Approve.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeCancelLoan_Approve.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeCancelLoan_Approve.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_CommitteeCancelLoan_Approve.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_CommitteeCancelLoan_Approve";
    Request_CommitteeCancelLoan_Approve.InitialDataReady = false;
    Request_CommitteeCancelLoan_Approve.EmpID = 0;
    Request_CommitteeCancelLoan_Approve.Year = 0;
    Request_CommitteeCancelLoan_Approve.Serial = 0;
    Request_CommitteeCancelLoan_Approve.InitialData = {};
    Request_CommitteeCancelLoan_Approve.IsTakingAction = false;


    //Check query string parameters
    var empID = Takaful.CommonMethods.GetQueryStringParameter('empID');
    var year = Takaful.CommonMethods.GetQueryStringParameter('year');
    var serial = Takaful.CommonMethods.GetQueryStringParameter('serial');

    if (empID.trim() == '' || isNaN(empID.trim() * 1) || year.trim() == '' || isNaN(year.trim() * 1) || serial.trim() == '' || isNaN(serial.trim() * 1)) {
        //Throw error message
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
        return;
    } else {
        Request_CommitteeCancelLoan_Approve.EmpID = empID.trim() * 1;
        Request_CommitteeCancelLoan_Approve.Year = year.trim() * 1;
        Request_CommitteeCancelLoan_Approve.Serial = serial.trim() * 1;
    }

    //Reset UI elements
    Request_CommitteeCancelLoan_Approve.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Request_CommitteeCancelLoan_Approve.CustomMethods.AjaxCall.GetInitialData(Request_CommitteeCancelLoan_Approve.EmpID, Request_CommitteeCancelLoan_Approve.Year, Request_CommitteeCancelLoan_Approve.Serial);

    //Next button
    $("#" + Request_CommitteeCancelLoan_Approve.uiElements.btnNext).bind("click", { direction: 1 }, Request_CommitteeCancelLoan_Approve.EventHandlers.Navigate_onclick);

    //Previous button
    $("#" + Request_CommitteeCancelLoan_Approve.uiElements.btnPrevious).bind("click", { direction: 2 }, Request_CommitteeCancelLoan_Approve.EventHandlers.Navigate_onclick);

    //Approve button
    $("#" + Request_CommitteeCancelLoan_Approve.uiElements.btnApprove).bind("click", { action: 1 }, Request_CommitteeCancelLoan_Approve.EventHandlers.btnSubmit_onclick);

    //Transfer button
    $("#" + Request_CommitteeCancelLoan_Approve.uiElements.btnExit).bind("click", Request_CommitteeCancelLoan_Approve.EventHandlers.btnExit_onclick);

    //Reject button
    $("#" + Request_CommitteeCancelLoan_Approve.uiElements.btnReject).bind("click", { action: 3 }, Request_CommitteeCancelLoan_Approve.EventHandlers.btnSubmit_onclick);

    //History back button
    $("#" + Request_CommitteeCancelLoan_Approve.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Request_CommitteeCancelLoan_Approve.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


