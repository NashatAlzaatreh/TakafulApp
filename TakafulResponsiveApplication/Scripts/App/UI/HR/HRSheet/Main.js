

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof HR_HRSheet === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheet.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheet.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof HR_HRSheet.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    HR_HRSheet.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/HR_HRSheet";
    HR_HRSheet.InitialDataReady = false;
    HR_HRSheet.Sheets = [];
    HR_HRSheet.from = '';
    HR_HRSheet.to = '';
    HR_HRSheet.SelectedSheetIndex = -1;
    HR_HRSheet.InitialData = {};

    //Check query string parameters
    var fromDate = Takaful.CommonMethods.GetFormattedDate(Takaful.CommonMethods.GetQueryStringParameter('from'));

    if (fromDate.trim() == '') {
        fromDate = '1900/01/01';
    } else {
        HR_HRSheet.from = fromDate;
    }

    var toDate = Takaful.CommonMethods.GetFormattedDate(Takaful.CommonMethods.GetQueryStringParameter('to'));

    if (toDate.trim() == '') {
        toDate = '2099/12/31';
    } else {
        HR_HRSheet.to = toDate;
    }

    //Reset UI elements
    HR_HRSheet.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    HR_HRSheet.CustomMethods.AjaxCall.GetInitialData(fromDate, toDate);

    //Search button
    $("#" + HR_HRSheet.uiElements.btnSearch).bind("click", HR_HRSheet.EventHandlers.btnSearch_onclick);

    //Save button
    $("#" + HR_HRSheet.uiElements.btnSave).bind("click", HR_HRSheet.EventHandlers.btnSave_click);

    //Edit cancellation button
    $("#" + HR_HRSheet.uiElements.btnCancel).bind("click", HR_HRSheet.EventHandlers.btnCancelEdit_click);

    //Export button
    $("#" + HR_HRSheet.uiElements.btnExport).bind("click", HR_HRSheet.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + HR_HRSheet.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && HR_HRSheet.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();
            //Initialize date picker plugin
            $('#' + HR_HRSheet.uiElements.txtDateFrom).fdatepicker({ format: 'yyyy-mm-dd' });
            $('#' + HR_HRSheet.uiElements.txtDateTo).fdatepicker({ format: 'yyyy-mm-dd' });
            $('#' + HR_HRSheet.uiElements.txtSheetDate).fdatepicker({ format: 'yyyy-mm-dd' });
            //$('#' + HR_HRSheet.uiElements.txtMonth).fdatepicker({ format: 'yyyy-mm' });
            if (HR_HRSheet.from.trim() != '') {
                $('#' + HR_HRSheet.uiElements.txtDateFrom).fdatepicker('update', HR_HRSheet.from.trim());
            }
            if (HR_HRSheet.to.trim() != '') {
                $('#' + HR_HRSheet.uiElements.txtDateTo).fdatepicker('update', HR_HRSheet.to.trim());
            }

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);

});


