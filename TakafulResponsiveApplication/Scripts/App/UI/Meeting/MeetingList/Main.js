

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Meeting_MeetingList === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_MeetingList.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_MeetingList.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Meeting_MeetingList.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Meeting_MeetingList.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Meeting_MeetingList";
    Meeting_MeetingList.InitialDataReady = false;
    Meeting_MeetingList.Meetings = [];
    Meeting_MeetingList.from = '';
    Meeting_MeetingList.to = '';
    Meeting_MeetingList.SelectedMeetingIndex = -1;

    //Check query string parameters
    var fromDate = Takaful.CommonMethods.GetFormattedDate(Takaful.CommonMethods.GetQueryStringParameter('from'));

    if (fromDate.trim() == '') {
        fromDate = '1900/01/01';
    } else {
        Meeting_MeetingList.from = fromDate;
    }

    var toDate = Takaful.CommonMethods.GetFormattedDate(Takaful.CommonMethods.GetQueryStringParameter('to'));

    if (toDate.trim() == '') {
        toDate = '2099/12/31';
    } else {
        Meeting_MeetingList.to = toDate;
    }

    //Reset UI elements
    Meeting_MeetingList.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Meeting_MeetingList.CustomMethods.AjaxCall.GetInitialData(fromDate, toDate);

    //Search button
    $("#" + Meeting_MeetingList.uiElements.btnSearch).bind("click", Meeting_MeetingList.EventHandlers.btnSearch_onclick);

    //Save button
    $("#" + Meeting_MeetingList.uiElements.btnSave).bind("click", Meeting_MeetingList.EventHandlers.btnSave_click);

    //Edit cancellation button
    $("#" + Meeting_MeetingList.uiElements.btnCancel).bind("click", Meeting_MeetingList.EventHandlers.btnCancelEdit_click);

    //Export button
    $("#" + Meeting_MeetingList.uiElements.btnExport).bind("click", Meeting_MeetingList.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + Meeting_MeetingList.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Meeting_MeetingList.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();
            //Initialize date picker plugin
            $('#' + Meeting_MeetingList.uiElements.txtDateFrom).fdatepicker({ format: 'yyyy-mm-dd' });
            $('#' + Meeting_MeetingList.uiElements.txtDateTo).fdatepicker({ format: 'yyyy-mm-dd' });
            $('#' + Meeting_MeetingList.uiElements.txtMeetingDate).fdatepicker({ format: 'yyyy-mm-dd' });
            if (Meeting_MeetingList.from.trim() != '') {
                $('#' + Meeting_MeetingList.uiElements.txtDateFrom).fdatepicker('update', Meeting_MeetingList.from.trim());
            }
            if (Meeting_MeetingList.to.trim() != '') {
                $('#' + Meeting_MeetingList.uiElements.txtDateTo).fdatepicker('update', Meeting_MeetingList.to.trim());
            }

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);

});


