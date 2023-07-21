

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_NewLoan_Submit === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_NewLoan_Submit.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_NewLoan_Submit.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_NewLoan_Submit.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_NewLoan_Submit.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_NewLoan_Submit";
    Request_NewLoan_Submit.InitialDataReady = false;
    //Request_NewLoan_Submit.EmpID = '';
    Request_NewLoan_Submit.InitialData = {};


    ////Check query string parameters
    //var empID = Takaful.CommonMethods.GetQueryStringParameter('EmpID');

    //if (empID.trim() == '') {
    //    //Throw error message
    //    Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    //    return;
    //} else {
    //    Request_NewLoan_Submit.EmpID = empID;
    //}

    //Reset UI elements
    Request_NewLoan_Submit.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Request_NewLoan_Submit.CustomMethods.AjaxCall.GetInitialData();

    //Calculate total loan amount
    $("#" + Request_NewLoan_Submit.uiElements.txtAmount).bind("change", Request_NewLoan_Submit.EventHandlers.txtAmount_onchange);

    //Calculate installment button
    $("#" + Request_NewLoan_Submit.uiElements.btnCalculateInstallment).bind("click", Request_NewLoan_Submit.EventHandlers.btnCalculateInstallment_onclick);

    //Submit button
    $("#" + Request_NewLoan_Submit.uiElements.btnSubmit).bind("click", Request_NewLoan_Submit.EventHandlers.btnSubmit_onclick);

    //History back button
    $("#" + Request_NewLoan_Submit.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Request_NewLoan_Submit.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


