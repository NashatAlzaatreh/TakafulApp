

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Employee_CommitteeManagement === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_CommitteeManagement.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_CommitteeManagement.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_CommitteeManagement.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Employee_CommitteeManagement.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Employee_CommitteeManagement";
    Employee_CommitteeManagement.InitialDataReady = false;
    //Employee_CommitteeManagement.EmpID = '';
    Employee_CommitteeManagement.Members = [];
    Employee_CommitteeManagement.CurrentIndex = -1;


    //Reset UI elements
    Employee_CommitteeManagement.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Employee_CommitteeManagement.CustomMethods.AjaxCall.GetInitialData();

    //Edit cancellation button
    $("#" + Employee_CommitteeManagement.uiElements.btnCancel).bind("click", Employee_CommitteeManagement.EventHandlers.btnCancelEdit_click);

    //Save button
    $("#" + Employee_CommitteeManagement.uiElements.btnSave).bind("click", Employee_CommitteeManagement.EventHandlers.btnSave_click);

    //History back button
    $("#" + Employee_CommitteeManagement.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Employee_CommitteeManagement.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


