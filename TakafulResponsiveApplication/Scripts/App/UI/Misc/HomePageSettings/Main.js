

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Misc_HomePageSettings === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Misc_HomePageSettings.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Misc_HomePageSettings.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Misc_HomePageSettings.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Misc_HomePageSettings.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Misc_HomePageSettings";
    Misc_HomePageSettings.InitialDataReady = false;
    Misc_HomePageSettings.FileIndex = 0;


    //Reset UI elements
    Misc_HomePageSettings.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Misc_HomePageSettings.CustomMethods.AjaxCall.GetInitialData();

    //Save button
    $('#' + Misc_HomePageSettings.uiElements.btnSave).bind("click", Misc_HomePageSettings.EventHandlers.btnSave_onclick);

    //File upload button 1
    $("#" + Misc_HomePageSettings.uiElements.btnUpload1).bind("click", { index: 1 }, Misc_HomePageSettings.EventHandlers.btnUpload_onclick);
    //File upload button 2
    $("#" + Misc_HomePageSettings.uiElements.btnUpload2).bind("click", { index: 2 }, Misc_HomePageSettings.EventHandlers.btnUpload_onclick);
    //File upload button 3
    $("#" + Misc_HomePageSettings.uiElements.btnUpload3).bind("click", { index: 3 }, Misc_HomePageSettings.EventHandlers.btnUpload_onclick);

    //File upload button 4
    $("#" + Misc_HomePageSettings.uiElements.btnUpload4).bind("click", { index: 4 }, Misc_HomePageSettings.EventHandlers.btnUpload_onclick);
    //File upload button 5
    $("#" + Misc_HomePageSettings.uiElements.btnUpload5).bind("click", { index: 5 }, Misc_HomePageSettings.EventHandlers.btnUpload_onclick);
    //File upload button 6
    $("#" + Misc_HomePageSettings.uiElements.btnUpload6).bind("click", { index: 6 }, Misc_HomePageSettings.EventHandlers.btnUpload_onclick);

    //History back button
    $("#" + Misc_HomePageSettings.uiElements.btnHistoryBack).bind("click", function () { window.history.back(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Misc_HomePageSettings.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);


});


