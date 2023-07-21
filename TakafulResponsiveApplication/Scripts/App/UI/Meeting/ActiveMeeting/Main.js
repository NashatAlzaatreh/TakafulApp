

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Meeting_ActiveMeeting === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_ActiveMeeting.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_ActiveMeeting.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_ActiveMeeting.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Meeting_ActiveMeeting.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Meeting_ActiveMeeting";
    Meeting_ActiveMeeting.InitialDataReady = false;
    //Meeting_ActiveMeeting.EmpID = '';
    Meeting_ActiveMeeting.Meetings = [];


    //Reset UI elements
    Meeting_ActiveMeeting.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Meeting_ActiveMeeting.CustomMethods.AjaxCall.GetInitialData();

    //Meeting dropdown list
    $('#' + Meeting_ActiveMeeting.uiElements.lstMeetings).bind("change", Meeting_ActiveMeeting.EventHandlers.lstMeetings_onchange);

    //Save button
    $("#" + Meeting_ActiveMeeting.uiElements.btnSave).bind("click", Meeting_ActiveMeeting.EventHandlers.btnSave_click);

    //History back button
    $("#" + Meeting_ActiveMeeting.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Meeting_ActiveMeeting.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


