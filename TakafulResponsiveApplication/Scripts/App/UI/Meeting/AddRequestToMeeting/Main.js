

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Meeting_AddRequestToMeeting === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_AddRequestToMeeting.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_AddRequestToMeeting.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_AddRequestToMeeting.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Meeting_AddRequestToMeeting.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Meeting_AddRequestToMeeting";
    Meeting_AddRequestToMeeting.InitialDataReady = false;
    Meeting_AddRequestToMeeting.Meetings = [];
    Meeting_AddRequestToMeeting.AllRequests = [];
    Meeting_AddRequestToMeeting.MeetingRequests = [];


    //Reset UI elements
    Meeting_AddRequestToMeeting.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Meeting_AddRequestToMeeting.CustomMethods.AjaxCall.GetInitialData();

    //Meeting dropdown list
    $('#' + Meeting_AddRequestToMeeting.uiElements.lstMeetings).bind("change", Meeting_AddRequestToMeeting.EventHandlers.lstMeetings_onchange);

    //History back button
    $("#" + Meeting_AddRequestToMeeting.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Meeting_AddRequestToMeeting.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


