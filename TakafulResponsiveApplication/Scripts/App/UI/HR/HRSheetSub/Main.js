

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof HR_HRSheetSub === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetSub.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetSub.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheetSub.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    HR_HRSheetSub.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/HR_HRSheetSub";
    HR_HRSheetSub.InitialDataReady = false;
    HR_HRSheetSub.Sheets = [];
    HR_HRSheetSub.from = '';
    HR_HRSheetSub.to = '';
    HR_HRSheetSub.SelectedSheetIndex = -1;
    HR_HRSheetSub.InitialData = {};

    //Check query string parameters
    var fromDate = Takaful.CommonMethods.GetFormattedDate(Takaful.CommonMethods.GetQueryStringParameter('from'));

    if (fromDate.trim() == '') {
        fromDate = '1900/01/01';
    } else {
        HR_HRSheetSub.from = fromDate;
    }

    var toDate = Takaful.CommonMethods.GetFormattedDate(Takaful.CommonMethods.GetQueryStringParameter('to'));

    if (toDate.trim() == '') {
        toDate = '2099/12/31';
    } else {
        HR_HRSheetSub.to = toDate;
    }

    //Reset UI elements
    HR_HRSheetSub.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    HR_HRSheetSub.CustomMethods.AjaxCall.GetInitialData(fromDate, toDate);

    //Search button
    $("#" + HR_HRSheetSub.uiElements.btnSearch).bind("click", HR_HRSheetSub.EventHandlers.btnSearch_onclick);

    //Save button
    $("#" + HR_HRSheetSub.uiElements.btnSave).bind("click", HR_HRSheetSub.EventHandlers.btnSave_click);

    //Edit cancellation button
    $("#" + HR_HRSheetSub.uiElements.btnCancel).bind("click", HR_HRSheetSub.EventHandlers.btnCancelEdit_click);

    //Export button
    $("#" + HR_HRSheetSub.uiElements.btnExport).bind("click", HR_HRSheetSub.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + HR_HRSheetSub.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && HR_HRSheetSub.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();
            //Initialize date picker plugin
            $('#' + HR_HRSheetSub.uiElements.txtDateFrom).fdatepicker({ format: 'yyyy-mm-dd' });
            $('#' + HR_HRSheetSub.uiElements.txtDateTo).fdatepicker({ format: 'yyyy-mm-dd' });
            $('#' + HR_HRSheetSub.uiElements.txtSheetDate).fdatepicker({ format: 'yyyy-mm-dd' });
            $('#' + HR_HRSheetSub.uiElements.txtMonth).fdatepicker({ format: 'yyyy-mm' });
            if (HR_HRSheetSub.from.trim() != '') {
                $('#' + HR_HRSheetSub.uiElements.txtDateFrom).fdatepicker('update', HR_HRSheetSub.from.trim());
            }
            if (HR_HRSheetSub.to.trim() != '') {
                $('#' + HR_HRSheetSub.uiElements.txtDateTo).fdatepicker('update', HR_HRSheetSub.to.trim());
            }

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);

});


