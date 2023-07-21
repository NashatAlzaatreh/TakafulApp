

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Employee_UploadPaidInstallments === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_UploadPaidInstallments.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_UploadPaidInstallments.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Employee_UploadPaidInstallments.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Employee_UploadPaidInstallments.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Employee_UploadPaidInstallments";
    //Employee_UploadPaidInstallments.InitialDataReady = false;
    Employee_UploadPaidInstallments.Employees = [];


    //Reset UI elements
    Employee_UploadPaidInstallments.CustomMethods.LocalOperations.ResetUI();

    ////Get initial data
    //Employee_UploadPaidInstallments.CustomMethods.AjaxCall.GetInitialData();
    //Fill the employees table
    Employee_UploadPaidInstallments.CustomMethods.LocalOperations.PopulateEmployeesTable();    //No data exists, but to format the table

    //Search button
    $('#' + Employee_UploadPaidInstallments.uiElements.btnSearch).bind("click", Employee_UploadPaidInstallments.EventHandlers.btnSearch_onclick);

    //Master employee checkbox
    $('#' + Employee_UploadPaidInstallments.uiElements.chkEmployees).bind("change", Employee_UploadPaidInstallments.EventHandlers.chkEmployees_onchange);

    //Save button
    $('#' + Employee_UploadPaidInstallments.uiElements.btnSave).bind("click", Employee_UploadPaidInstallments.EventHandlers.btnSave_onclick);

    //File upload button
    $("#" + Employee_UploadPaidInstallments.uiElements.btnUpload).bind("click", Employee_UploadPaidInstallments.EventHandlers.btnUpload_onclick);

    //Export button
    $('#' + Employee_UploadPaidInstallments.uiElements.btnExport).bind("click", Employee_UploadPaidInstallments.EventHandlers.btnExport_onclick);

    //History back button
    $("#" + Employee_UploadPaidInstallments.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true /*&& Employee_UploadPaidInstallments.InitialDataReady == true*/) {
            //Initialize date picker plugin
            $('#' + Employee_UploadPaidInstallments.uiElements.txtDate).fdatepicker({ format: 'yyyy-mm-dd' });
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


