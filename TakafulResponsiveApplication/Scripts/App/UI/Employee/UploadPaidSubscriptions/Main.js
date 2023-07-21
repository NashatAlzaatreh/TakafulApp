

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Employee_UploadPaidSubscriptions === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_UploadPaidSubscriptions.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_UploadPaidSubscriptions.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_UploadPaidSubscriptions.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Employee_UploadPaidSubscriptions.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Employee_UploadPaidSubscriptions";
    //Employee_UploadPaidSubscriptions.InitialDataReady = false;
    Employee_UploadPaidSubscriptions.Employees = [];


    //Reset UI elements
    Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.ResetUI();

    ////Get initial data
    //Employee_UploadPaidSubscriptions.CustomMethods.AjaxCall.GetInitialData();
    //Fill the employees table
    Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.PopulateEmployeesTable();    //No data exists, but to format the table

    //Search button
    $('#' + Employee_UploadPaidSubscriptions.uiElements.btnSearch).bind("click", Employee_UploadPaidSubscriptions.EventHandlers.btnSearch_onclick);

    //Master employee checkbox
    $('#' + Employee_UploadPaidSubscriptions.uiElements.chkEmployees).bind("change", Employee_UploadPaidSubscriptions.EventHandlers.chkEmployees_onchange);

    //Save button
    $('#' + Employee_UploadPaidSubscriptions.uiElements.btnSave).bind("click", Employee_UploadPaidSubscriptions.EventHandlers.btnSave_onclick);

    //File upload button
    $("#" + Employee_UploadPaidSubscriptions.uiElements.btnUpload).bind("click", Employee_UploadPaidSubscriptions.EventHandlers.btnUpload_onclick);

    //Export button
    $('#' + Employee_UploadPaidSubscriptions.uiElements.btnExport).bind("click", Employee_UploadPaidSubscriptions.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + Employee_UploadPaidSubscriptions.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true /*&& Employee_UploadPaidSubscriptions.InitialDataReady == true*/) {
            //Initialize date picker plugin
            $('#' + Employee_UploadPaidSubscriptions.uiElements.txtDate).fdatepicker({ format: 'yyyy-mm-dd' });
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


