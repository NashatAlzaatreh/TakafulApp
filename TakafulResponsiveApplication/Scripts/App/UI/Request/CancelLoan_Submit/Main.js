

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_CancelLoan_Submit === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CancelLoan_Submit.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CancelLoan_Submit.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_CancelLoan_Submit.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_CancelLoan_Submit.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_CancelLoan_Submit";
    Request_CancelLoan_Submit.InitialDataReady = false;
    //Request_CancelLoan_Submit.EmpID = '';
    Request_CancelLoan_Submit.InitialData = {};


    ////Check query string parameters
    //var empID = Takaful.CommonMethods.GetQueryStringParameter('EmpID');

    //if (empID.trim() == '') {
    //    //Throw error message
    //    Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    //    return;
    //} else {
    //    Request_CancelLoan_Submit.EmpID = empID;
    //}

    //Reset UI elements
    Request_CancelLoan_Submit.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Request_CancelLoan_Submit.CustomMethods.AjaxCall.GetInitialData();

    //Submit button
    $("#" + Request_CancelLoan_Submit.uiElements.btnSubmit).bind("click", Request_CancelLoan_Submit.EventHandlers.btnSubmit_onclick);

    //History back button
    $("#" + Request_CancelLoan_Submit.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Request_CancelLoan_Submit.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


