

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Meeting_MeetingRequestsDecisions === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_MeetingRequestsDecisions.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_MeetingRequestsDecisions.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_MeetingRequestsDecisions.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Meeting_MeetingRequestsDecisions.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Meeting_MeetingRequestsDecisions";
    Meeting_MeetingRequestsDecisions.InitialDataReady = false;
    Meeting_MeetingRequestsDecisions.Meetings = [];
    Meeting_MeetingRequestsDecisions.MeetingRequests = [];


    //Reset UI elements
    Meeting_MeetingRequestsDecisions.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Meeting_MeetingRequestsDecisions.CustomMethods.AjaxCall.GetInitialData();

    //Meeting dropdown list
    $('#' + Meeting_MeetingRequestsDecisions.uiElements.lstMeetings).bind("change", Meeting_MeetingRequestsDecisions.EventHandlers.lstMeetings_onchange);

    //History back button
    $("#" + Meeting_MeetingRequestsDecisions.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Meeting_MeetingRequestsDecisions.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


