
//Check for main namespace
if (typeof Home_Main === 'undefined') {
    // Namespace does not exist, create a new one
    var Home_Main = {};
}

//Add the event handlers container object to the main namespace
Home_Main.EventHandlers = {};


//Button join us
Home_Main.EventHandlers.btnJoinUs_onclick = function() {
    
    //$('#myModal').removeClass('toback').foundation('reveal', 'close').foundation('reveal', 'open');

    $('#myModal').foundation('reveal', 'open');

};

//Register button
Home_Main.EventHandlers.btnRegister_onclick = function () {


    //Input validation
    var employeeID = $("#" + Home_Main.uiElements.txtEmployeeNumber).val().trim();

    if (employeeID == "") {
        //Hide modal window
        $("#" + Home_Main.uiElements.txtEmployeeNumber).focus();
        //Show error msg
        $('#' + Home_Main.uiElements.divMsg).removeClass("success warning error").addClass("error");
        $('#' + Home_Main.uiElements.divMsg).html("من فضلك أدخل رقم.");
        $('#' + Home_Main.uiElements.divMsg).show();
        setTimeout(function () {
            $('#' + Home_Main.uiElements.divMsg).hide();
        }, 5000);

        return;
    }

    if (Takaful.CommonMethods.isPositiveInteger(employeeID, false) != true) {
        //Hide modal window
        $("#" + Home_Main.uiElements.txtEmployeeNumber).focus();
        //Show error msg
        $('#' + Home_Main.uiElements.divMsg).removeClass("success warning error").addClass("error");
        $('#' + Home_Main.uiElements.divMsg).html("من فضلك أدخل رقم.");
        $('#' + Home_Main.uiElements.divMsg).show();
        setTimeout(function () {
            $('#' + Home_Main.uiElements.divMsg).hide();
        }, 5000);

        return;
    }

    //Send registration request
    Home_Main.CustomMethods.AjaxCall.Register(employeeID);


};













