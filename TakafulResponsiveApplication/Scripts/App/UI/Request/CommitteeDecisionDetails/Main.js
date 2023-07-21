

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_CommitteeDecisionDetails === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeDecisionDetails.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeDecisionDetails.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CommitteeDecisionDetails.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_CommitteeDecisionDetails.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_CommitteeDecisionDetails";
    Request_CommitteeDecisionDetails.EmpID = 0;
    Request_CommitteeDecisionDetails.Year = 0;
    Request_CommitteeDecisionDetails.Serial = 0;
    Request_CommitteeDecisionDetails.Type = 0;
    Request_CommitteeDecisionDetails.InitialDataReady = false;


    //Check query string parameters
    var empID = Takaful.CommonMethods.GetQueryStringParameter('empID');
    var year = Takaful.CommonMethods.GetQueryStringParameter('year');
    var serial = Takaful.CommonMethods.GetQueryStringParameter('serial');
    var typeID = Takaful.CommonMethods.GetQueryStringParameter('type');

    if (empID.trim() == '' || isNaN(empID.trim() * 1) || year.trim() == '' || isNaN(year.trim() * 1) || serial.trim() == '' || isNaN(serial.trim() * 1) || typeID.trim() == '' || isNaN(typeID.trim() * 1)) {
        //Throw error message
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
        return;
    } else {
        Request_CommitteeDecisionDetails.EmpID = empID.trim() * 1;
        Request_CommitteeDecisionDetails.Year = year.trim() * 1;
        Request_CommitteeDecisionDetails.Serial = serial.trim() * 1;
        Request_CommitteeDecisionDetails.Type = typeID.trim() * 1;
    }

    //Reset UI elements
    Request_CommitteeDecisionDetails.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Request_CommitteeDecisionDetails.CustomMethods.AjaxCall.GetInitialData(Request_CommitteeDecisionDetails.EmpID, Request_CommitteeDecisionDetails.Year, Request_CommitteeDecisionDetails.Serial, Request_CommitteeDecisionDetails.Type);

    //History back button
    $("#" + Request_CommitteeDecisionDetails.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Request_CommitteeDecisionDetails.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);

});


