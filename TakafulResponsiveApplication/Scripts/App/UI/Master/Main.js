


$(document).ready(function () {

    if (localStorage) {
        if (localStorage.getItem("refreshPage")) {
            localStorage.removeItem('refreshPage');
        } else {
            localStorage.setItem('refreshPage', '1');
            window.location.reload();
            return;
        }
    }

    //Namespaces
    (function () {

        if (typeof MasterPage === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof MasterPage.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof MasterPage.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof MasterPage.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    MasterPage.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Master";
    //MasterPage.CurrentDateTime = "";
    MasterPage.IsLoadingMenus = true;
    MasterPage.IsReady = false;


    //Reset UI elements
    MasterPage.CustomMethods.LocalOperations.ResetUI();

    //Load internal menus
    MasterPage.CustomMethods.AjaxCall.GetInternalMenus();

    ////Initialize user environment
    //MasterPage.CustomMethods.LocalOperations.InitializeUserEnvironment();

    ////Load initial data to the ui elements
    ////Load all 'Events' that have event instances (for search purposes)
    //DGEP_TMS.CommonMethods.GetAllEventsWhichHaveInstances(MasterPage.CustomMethods.Callback.GetAllEventInstances_Success, MasterPage.CustomMethods.Callback.GetAllEventInstances_Error, MasterPage.CustomMethods.Callback.GetAllEventInstances_Completed);

    ////Load all the event types for search dropdown list
    //DGEP_TMS.CommonMethods.GetAllEventTypes(MasterPage.CustomMethods.Callback.GetAllEventTypes_Success, MasterPage.CustomMethods.Callback.GetAllEventTypes_Error, MasterPage.CustomMethods.Callback.GetAllEventTypes_Completed);

    ////Load all the events for search dropdown list (when no event type is selected)
    //DGEP_TMS.CommonMethods.GetAllEvents(MasterPage.CustomMethods.Callback.GetAllEvents_Success, MasterPage.CustomMethods.Callback.GetAllEvents_Error, MasterPage.CustomMethods.Callback.GetAllEvents_Completed);

    ////Get current date time from server
    //DGEP_TMS.CommonMethods.GetCurrentDateTime(
    //    function (jsonObj) {
    //        MasterPage.CurrentDateTime = DGEP_TMS.CommonMethods.GetFormattedDateTime(jsonObj);
    //    },
    //    function () {
    //        DGEP_TMS.CommonMethods.ShowInfoMsg("لم يتم مزامنة التوقيت مع الخادم.");
    //    });

    ////Bind event handlers
    ////Search button
    //$('#' + MasterPage.uiElements.btnSearchEvents).bind("click", MasterPage.EventHandlers.btnSearchEvents_onclick);

    ////Search from textbox
    //$('#' + MasterPage.uiElements.txtEventSearchFrom).bind("focus", MasterPage.EventHandlers.txtEventSearchFrom_onfocus);

    ////Search to textbox
    //$('#' + MasterPage.uiElements.txtEventSearchTo).bind("focus", MasterPage.EventHandlers.txtEventSearchTo_onfocus);

    ////Login button
    //$('#' + MasterPage.uiElements.btnLoginSubmit).bind("click", MasterPage.EventHandlers.btnLoginSubmit_onclick);

    ////Logout button
    //$('#' + MasterPage.uiElements.btnLogOut).bind("click", MasterPage.EventHandlers.btnLogOut_onclick);

    ////Enter press for login controls
    //$('#' + MasterPage.uiElements.txtLoginUserName).keypress(function (e) {
    //    var key = e.which;
    //    if (key == 13)  // the enter key code
    //    {
    //        $('#' + MasterPage.uiElements.btnLoginSubmit).click();
    //        return false;
    //    }
    //});

    //$('#' + MasterPage.uiElements.txtLoginPassword).keypress(function (e) {
    //    var key = e.which;
    //    if (key == 13)  // the enter key code
    //    {
    //        $('#' + MasterPage.uiElements.btnLoginSubmit).click();
    //        return false;
    //    }
    //});

    ////Reset password button
    //$('#' + MasterPage.uiElements.btnResetPassword).bind("click", function () {
    //    window.location.href = "/UI/User/Actions/ResetPassword.aspx";
    //});

    ////History back button
    //$('#' + MasterPage.uiElements.btnPreviousPage).bind("click", function () {
    //    window.history.back();
    //    //window.history.back();
    //    //window.location.reload(history.go(-1));
    //});

    //$(document).foundation();

    //$(document).foundation({
    //    orbit: {
    //        animation: 'fade',
    //        timer_speed: 9000,
    //        pause_on_hover: false,
    //        animation_speed: 500,
    //        navigation_arrows: false,
    //        bullets: false
    //    }
    //});

    $(document).foundation('tooltip', 'reflow');

    //MasterPage.IsReady = true;   //  WILL BE REMOVED.......................

    //Check if all procedures completed
    var masterPageTimerHndler = setInterval(function () {
        if (MasterPage.IsLoadingMenus == false) {
            MasterPage.IsReady = true;
            //Terminate the timer
            clearInterval(masterPageTimerHndler);
        }

    }, 500);

    
});



