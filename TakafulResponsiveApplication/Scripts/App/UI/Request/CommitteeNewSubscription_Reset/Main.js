

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_CommitteeNewSubscription_Reset === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeNewSubscription_Reset.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeNewSubscription_Reset.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeNewSubscription_Reset.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_CommitteeNewSubscription_Reset.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_CommitteeNewSubscription_Reset";
    Request_CommitteeNewSubscription_Reset.InitialDataReady = false;
    Request_CommitteeNewSubscription_Reset.EmpID = 0;
    Request_CommitteeNewSubscription_Reset.Year = 0;
    Request_CommitteeNewSubscription_Reset.Serial = 0;
    Request_CommitteeNewSubscription_Reset.InitialData = {};
    Request_CommitteeNewSubscription_Reset.IsTakingAction = false;


    //Check query string parameters
    var empID = Takaful.CommonMethods.GetQueryStringParameter('empID');
    var year = Takaful.CommonMethods.GetQueryStringParameter('year');
    var serial = Takaful.CommonMethods.GetQueryStringParameter('serial');

    if (empID.trim() == '' || isNaN(empID.trim() * 1) || year.trim() == '' || isNaN(year.trim() * 1) || serial.trim() == '' || isNaN(serial.trim() * 1)) {
        //Throw error message
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
        return;
    } else {
        Request_CommitteeNewSubscription_Reset.EmpID = empID.trim() * 1;
        Request_CommitteeNewSubscription_Reset.Year = year.trim() * 1;
        Request_CommitteeNewSubscription_Reset.Serial = serial.trim() * 1;
    }

    //Reset UI elements
    Request_CommitteeNewSubscription_Reset.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Request_CommitteeNewSubscription_Reset.CustomMethods.AjaxCall.GetInitialData(Request_CommitteeNewSubscription_Reset.EmpID, Request_CommitteeNewSubscription_Reset.Year, Request_CommitteeNewSubscription_Reset.Serial);

    //Reset button
    $("#" + Request_CommitteeNewSubscription_Reset.uiElements.btnReset).bind("click", { action: 1 }, Request_CommitteeNewSubscription_Reset.EventHandlers.btnReset_onclick);

    //History back button
    $("#" + Request_CommitteeNewSubscription_Reset.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Request_CommitteeNewSubscription_Reset.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


