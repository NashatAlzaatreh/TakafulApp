

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_HelpDeskNewLoan_Submit === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_HelpDeskNewLoan_Submit.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_HelpDeskNewLoan_Submit.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_HelpDeskNewLoan_Submit.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_HelpDeskNewLoan_Submit.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_HelpDeskNewLoan_Submit";
    Request_HelpDeskNewLoan_Submit.InitialDataReady = false;
    //Request_HelpDeskNewLoan_Submit.EmpID = '';
    Request_HelpDeskNewLoan_Submit.InitialData = {};
    Request_HelpDeskNewLoan_Submit.EmployeeNumber = 0;


    ////Check query string parameters
    //var empID = Takaful.CommonMethods.GetQueryStringParameter('EmpID');

    //if (empID.trim() == '') {
    //    //Throw error message
    //    Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    //    return;
    //} else {
    //    Request_HelpDeskNewLoan_Submit.EmpID = empID;
    //}

    //Reset UI elements
    Request_HelpDeskNewLoan_Submit.CustomMethods.LocalOperations.ResetUI();

    ////Get initial data
    //Request_HelpDeskNewLoan_Submit.CustomMethods.AjaxCall.GetInitialData();

    //Calculate total loan amount
    $("#" + Request_HelpDeskNewLoan_Submit.uiElements.txtAmount).bind("change", Request_HelpDeskNewLoan_Submit.EventHandlers.txtAmount_onchange);

    //Calculate installment button
    $("#" + Request_HelpDeskNewLoan_Submit.uiElements.btnCalculateInstallment).bind("click", Request_HelpDeskNewLoan_Submit.EventHandlers.btnCalculateInstallment_onclick);

    //Submit button
    $("#" + Request_HelpDeskNewLoan_Submit.uiElements.btnSubmit).bind("click", Request_HelpDeskNewLoan_Submit.EventHandlers.btnSubmit_onclick);

    //Search textbox
    $('#' + Request_HelpDeskNewLoan_Submit.uiElements.txtEmployeeNumber).keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            Request_HelpDeskNewLoan_Submit.EventHandlers.btnSearch_onclick();
            return false;
        }
    });

    //Search button
    $("#" + Request_HelpDeskNewLoan_Submit.uiElements.btnSearch).bind("click", Request_HelpDeskNewLoan_Submit.EventHandlers.btnSearch_onclick);

    //History back button
    $("#" + Request_HelpDeskNewLoan_Submit.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true ) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


