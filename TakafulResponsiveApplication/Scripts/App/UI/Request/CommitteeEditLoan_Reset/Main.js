

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_CommitteeEditLoan_Reset === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeEditLoan_Reset.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeEditLoan_Reset.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeEditLoan_Reset.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_CommitteeEditLoan_Reset.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_CommitteeEditLoan_Reset";
    Request_CommitteeEditLoan_Reset.InitialDataReady = false;
    Request_CommitteeEditLoan_Reset.EmpID = 0;
    Request_CommitteeEditLoan_Reset.Year = 0;
    Request_CommitteeEditLoan_Reset.Serial = 0;
    Request_CommitteeEditLoan_Reset.InitialData = {};
    Request_CommitteeEditLoan_Reset.IsTakingAction = false;


    //Check query string parameters
    var empID = Takaful.CommonMethods.GetQueryStringParameter('empID');
    var year = Takaful.CommonMethods.GetQueryStringParameter('year');
    var serial = Takaful.CommonMethods.GetQueryStringParameter('serial');

    if (empID.trim() == '' || isNaN(empID.trim() * 1) || year.trim() == '' || isNaN(year.trim() * 1) || serial.trim() == '' || isNaN(serial.trim() * 1)) {
        //Throw error message
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
        return;
    } else {
        Request_CommitteeEditLoan_Reset.EmpID = empID.trim() * 1;
        Request_CommitteeEditLoan_Reset.Year = year.trim() * 1;
        Request_CommitteeEditLoan_Reset.Serial = serial.trim() * 1;
    }

    //Reset UI elements
    Request_CommitteeEditLoan_Reset.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Request_CommitteeEditLoan_Reset.CustomMethods.AjaxCall.GetInitialData(Request_CommitteeEditLoan_Reset.EmpID, Request_CommitteeEditLoan_Reset.Year, Request_CommitteeEditLoan_Reset.Serial);

    //Reset button
    $("#" + Request_CommitteeEditLoan_Reset.uiElements.btnReset).bind("click", { action: 1 }, Request_CommitteeEditLoan_Reset.EventHandlers.btnReset_onclick);

    //History back button
    $("#" + Request_CommitteeEditLoan_Reset.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Request_CommitteeEditLoan_Reset.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


