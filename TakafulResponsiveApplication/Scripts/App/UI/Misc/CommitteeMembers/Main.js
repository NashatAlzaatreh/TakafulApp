



$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Misc_CommitteeMembers === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Misc_CommitteeMembers.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Misc_CommitteeMembers.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Misc_CommitteeMembers.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Misc_CommitteeMembers.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Misc_CommitteeMembers";
    Misc_CommitteeMembers.InitialDataReady = false;


    //Reset UI elements
    Misc_CommitteeMembers.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Misc_CommitteeMembers.CustomMethods.AjaxCall.GetInitialData();

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Misc_CommitteeMembers.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();

            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);

});


