

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Employee_FinancialTransactionsManagement === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_FinancialTransactionsManagement.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_FinancialTransactionsManagement.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_FinancialTransactionsManagement.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Employee_FinancialTransactionsManagement.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Employee_FinancialTransactionsManagement";
    Employee_FinancialTransactionsManagement.Employees = [];
    Employee_FinancialTransactionsManagement.EmployeeID = 0;

    //Check if employee id supplied in query string
    var empID = Takaful.CommonMethods.GetQueryStringParameter('empID');
    if (empID.trim() != '' && isNaN(empID.trim() * 1) == false) {
        Employee_FinancialTransactionsManagement.EmployeeID = empID * 1;
    }

    //Reset UI elements
    Employee_FinancialTransactionsManagement.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Employee_FinancialTransactionsManagement.CustomMethods.AjaxCall.GetInitialData();

    //Employee selection in dropdown list
    $("#" + Employee_FinancialTransactionsManagement.uiElements.lstEmployees).bind("change", Employee_FinancialTransactionsManagement.EventHandlers.lstEmployees_onchange);

    //Subscription / Loan readio buttons
    $("#" + Employee_FinancialTransactionsManagement.uiElements.rdoSubscription).bind("change", Employee_FinancialTransactionsManagement.EventHandlers.SubscriptionAndLoan_onchange);
    $("#" + Employee_FinancialTransactionsManagement.uiElements.rdoLoan).bind("change", Employee_FinancialTransactionsManagement.EventHandlers.SubscriptionAndLoan_onchange);

    //Search textbox
    $('#' + Employee_FinancialTransactionsManagement.uiElements.txtEmployeeNumber).keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            Employee_FinancialTransactionsManagement.EventHandlers.btnSearch_onclick();
            return false;
        }
    });

    //Search button
    $("#" + Employee_FinancialTransactionsManagement.uiElements.btnSearch).bind("click", Employee_FinancialTransactionsManagement.EventHandlers.btnSearch_onclick);

    //Save button
    $("#" + Employee_FinancialTransactionsManagement.uiElements.btnSave).bind("click", Employee_FinancialTransactionsManagement.EventHandlers.btnSave_onclick);

    //History back button
    $("#" + Employee_FinancialTransactionsManagement.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Employee_FinancialTransactionsManagement.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


