

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Request_SubmittedRequests === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_SubmittedRequests.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_SubmittedRequests.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Request_SubmittedRequests.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Request_SubmittedRequests.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Request_SubmittedRequests";
    Request_SubmittedRequests.InitialDataReady = false;
    Request_SubmittedRequests.Requests = [];
    Request_SubmittedRequests.type = '';
    Request_SubmittedRequests.from = '';
    Request_SubmittedRequests.to = '';


    //Check query string parameters
    Request_SubmittedRequests.type = Takaful.CommonMethods.GetQueryStringParameter('type');

    switch (Request_SubmittedRequests.type) {
        case '1':
            $('#' + Request_SubmittedRequests.uiElements.divTitle).html('طلبات الاشتراك');
            break;
        case '2':
            $('#' + Request_SubmittedRequests.uiElements.divTitle).html('طلبات تعديل الاشتراك');
            break;
        case '3':
            $('#' + Request_SubmittedRequests.uiElements.divTitle).html('طلبات إلغاء الاشتراك');
            break;
        case '4':
            $('#' + Request_SubmittedRequests.uiElements.divTitle).html('طلبات الحصول على قرض');
            break;
        case '5':
            $('#' + Request_SubmittedRequests.uiElements.divTitle).html('طلبات تعديل قسط القرض');
            break;
        case '6':
            $('#' + Request_SubmittedRequests.uiElements.divTitle).html('طلبات سداد القرض');
            break;
    }

    //if (type != '1' && type != '2' && type != '3' && type != '4' && type != '5' && type != '6') {

    //}

    var fromDate = Takaful.CommonMethods.GetFormattedDate(Takaful.CommonMethods.GetQueryStringParameter('from'));

    if (fromDate.trim() == '') {
        fromDate = '1900/01/01';
    } else {
        Request_SubmittedRequests.from = fromDate;
    }

    var toDate = Takaful.CommonMethods.GetFormattedDate(Takaful.CommonMethods.GetQueryStringParameter('to'));

    if (toDate.trim() == '') {
        toDate = '2099/12/31';
    } else {
        Request_SubmittedRequests.to = toDate;
    }

    //Reset UI elements
    Request_SubmittedRequests.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Request_SubmittedRequests.CustomMethods.AjaxCall.GetInitialData(Request_SubmittedRequests.type, fromDate, toDate);

    //Search button
    $("#" + Request_SubmittedRequests.uiElements.btnSearch).bind("click", Request_SubmittedRequests.EventHandlers.btnSearch_onclick);

    //Export button
    $("#" + Request_SubmittedRequests.uiElements.btnExport).bind("click", Request_SubmittedRequests.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + Request_SubmittedRequests.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Request_SubmittedRequests.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();
            //Initialize date picker plugin
            $('#' + Request_SubmittedRequests.uiElements.txtDateFrom).fdatepicker({ format: 'yyyy-mm-dd' });
            $('#' + Request_SubmittedRequests.uiElements.txtDateTo).fdatepicker({ format: 'yyyy-mm-dd' });
            if (Request_SubmittedRequests.from.trim() != '') {
                $('#' + Request_SubmittedRequests.uiElements.txtDateFrom).fdatepicker('update', Request_SubmittedRequests.from.trim());
            }
            if (Request_SubmittedRequests.to.trim() != '') {
                $('#' + Request_SubmittedRequests.uiElements.txtDateTo).fdatepicker('update', Request_SubmittedRequests.to.trim());
            }

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);

});


