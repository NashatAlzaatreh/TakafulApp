

$(document).ready(function () {

    //Namespaces
    (function () {

        if (typeof Home_CommitteeMember === 'undefined') {
            // The master namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Home_CommitteeMember.uiElements === 'undefined') {
            // The 'UI elements' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Home_CommitteeMember.EventHandlers === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

        if (typeof Home_CommitteeMember.CustomMethods === 'undefined') {
            // The 'event handlers' namespace of the page does not exist, the page can not run
            alert('This page has scripting errors and cannot be run.');
            return;
        }

    }());

    Home_CommitteeMember.ServiceUrl = Takaful.Config.ServiceUrl_Main + "/Home_CommitteeMember";
    Home_CommitteeMember.InitialDataReady = false;


    //Reset UI elements
    Home_CommitteeMember.CustomMethods.LocalOperations.ResetUI();

    //Get initial data
    Home_CommitteeMember.CustomMethods.AjaxCall.GetInitialData();

    $("#OpenNotifi-page").click(function () { $("#Notifi-page").toggle(); });

    //Check if all procedures completed
    var mainTimerHndler = setInterval(function () {
        if (MasterPage.IsReady == true && Home_CommitteeMember.InitialDataReady == true) {
            //Initialize foundation
            $(document).foundation();
            
            //Hide loading screen
            Takaful.CommonMethods.HideLoading();

            //Terminate the timer
            clearInterval(mainTimerHndler);
        }

    }, 100);

});


