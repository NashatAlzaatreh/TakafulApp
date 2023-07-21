

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_HelpDeskCancelLoan_Submit === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_HelpDeskCancelLoan_Submit.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_HelpDeskCancelLoan_Submit.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_HelpDeskCancelLoan_Submit.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_HelpDeskCancelLoan_Submit.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_HelpDeskCancelLoan_Submit";
    Request_HelpDeskCancelLoan_Submit.InitialDataReady = false;
    //Request_HelpDeskCancelLoan_Submit.EmpID = '';
    Request_HelpDeskCancelLoan_Submit.InitialData = {};
    Request_HelpDeskCancelLoan_Submit.EmployeeNumber = 0;


    ////Check query string parameters
    //var empID = Takaful.CommonMethods.GetQueryStringParameter('EmpID');

    //if (empID.trim() == '') {
    //    //Throw error message
    //    Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    //    return;
    //} else {
    //    Request_HelpDeskCancelLoan_Submit.EmpID = empID;
    //}

    //Reset UI elements
    Request_HelpDeskCancelLoan_Submit.CustomMethods.LocalOperations.ResetUI();

    ////Get initial data
    //Request_HelpDeskCancelLoan_Submit.CustomMethods.AjaxCall.GetInitialData();

    //Submit button
    $("#" + Request_HelpDeskCancelLoan_Submit.uiElements.btnSubmit).bind("click", Request_HelpDeskCancelLoan_Submit.EventHandlers.btnSubmit_onclick);

    //Search textbox
    $('#' + Request_HelpDeskCancelLoan_Submit.uiElements.txtEmployeeNumber).keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            Request_HelpDeskCancelLoan_Submit.EventHandlers.btnSearch_onclick();
            return false;
        }
    });

    //Search button
    $("#" + Request_HelpDeskCancelLoan_Submit.uiElements.btnSearch).bind("click", Request_HelpDeskCancelLoan_Submit.EventHandlers.btnSearch_onclick);

    //History back button
    $("#" + Request_HelpDeskCancelLoan_Submit.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


