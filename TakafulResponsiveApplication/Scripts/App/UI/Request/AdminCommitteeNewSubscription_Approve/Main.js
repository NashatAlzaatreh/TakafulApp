

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_AdminCommitteeNewSubscription_Approve === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_AdminCommitteeNewSubscription_Approve.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_AdminCommitteeNewSubscription_Approve.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_AdminCommitteeNewSubscription_Approve.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_AdminCommitteeNewSubscription_Approve.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_AdminCommitteeNewSubscription_Approve";
    Request_AdminCommitteeNewSubscription_Approve.InitialDataReady = false;
    Request_AdminCommitteeNewSubscription_Approve.EmpID = 0;
    Request_AdminCommitteeNewSubscription_Approve.Year = 0;
    Request_AdminCommitteeNewSubscription_Approve.Serial = 0;
    Request_AdminCommitteeNewSubscription_Approve.MemberID = 0;
    Request_AdminCommitteeNewSubscription_Approve.InitialData = {};
    Request_AdminCommitteeNewSubscription_Approve.IsTakingAction = false;


    //Check query string parameters
    var empID = Takaful.CommonMethods.GetQueryStringParameter('empID');
    var year = Takaful.CommonMethods.GetQueryStringParameter('year');
    var serial = Takaful.CommonMethods.GetQueryStringParameter('serial');
    var memberID = Takaful.CommonMethods.GetQueryStringParameter('memberID');

    if (empID.trim() == '' || isNaN(empID.trim() * 1) || year.trim() == '' || isNaN(year.trim() * 1) || serial.trim() == '' || isNaN(serial.trim() * 1) || memberID.trim() == '' || isNaN(memberID.trim() * 1)) {
        //Throw error message
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
        return;
    } else {
        Request_AdminCommitteeNewSubscription_Approve.EmpID = empID.trim() * 1;
        Request_AdminCommitteeNewSubscription_Approve.Year = year.trim() * 1;
        Request_AdminCommitteeNewSubscription_Approve.Serial = serial.trim() * 1;
        Request_AdminCommitteeNewSubscription_Approve.MemberID = memberID.trim() * 1;
    }

    //Reset UI elements
    Request_AdminCommitteeNewSubscription_Approve.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Request_AdminCommitteeNewSubscription_Approve.CustomMethods.AjaxCall.GetInitialData(Request_AdminCommitteeNewSubscription_Approve.EmpID, Request_AdminCommitteeNewSubscription_Approve.Year, Request_AdminCommitteeNewSubscription_Approve.Serial);

    //Approve button
    $("#" + Request_AdminCommitteeNewSubscription_Approve.uiElements.btnApprove).bind("click", { action: 1 }, Request_AdminCommitteeNewSubscription_Approve.EventHandlers.btnSubmit_onclick);

    //Transfer button
    $("#" + Request_AdminCommitteeNewSubscription_Approve.uiElements.btnExit).bind("click", function () { window.history.back(); });

    //Reject button
    $("#" + Request_AdminCommitteeNewSubscription_Approve.uiElements.btnReject).bind("click", { action: 3 }, Request_AdminCommitteeNewSubscription_Approve.EventHandlers.btnSubmit_onclick);

    //History back button
    $("#" + Request_AdminCommitteeNewSubscription_Approve.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Request_AdminCommitteeNewSubscription_Approve.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


