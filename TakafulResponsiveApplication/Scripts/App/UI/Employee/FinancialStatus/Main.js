

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Employee_FinancialStatus === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_FinancialStatus.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_FinancialStatus.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_FinancialStatus.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Employee_FinancialStatus.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Employee_FinancialStatus";


    //Reset UI elements
    Employee_FinancialStatus.CustomMethods.LocalOperations.ResetUI();

    //Search textbox
    $('#' + Employee_FinancialStatus.uiElements.txtEmployeeNumber).keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            Employee_FinancialStatus.EventHandlers.btnSearch_onclick();
            return false;
        }
    });

    //Search button
    $("#" + Employee_FinancialStatus.uiElements.btnSearch).bind("click", Employee_FinancialStatus.EventHandlers.btnSearch_onclick);

    //History back button
    $("#" + Employee_FinancialStatus.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

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


