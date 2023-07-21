
//Check for main namespace
if (typeof User_ChangePassword === 'undefined') {
    // Namespace does not exist, create a new one
    var User_ChangePassword = {};
}


//Add the event handlers container object to the main namespace
User_ChangePassword.EventHandlers = {};

//Add the event handlers to the ui elements

//Submit button
User_ChangePassword.EventHandlers.btnSubmit_onclick = function () {

    //Input validation
    //Old password
    var oldPass = $("#" + User_ChangePassword.uiElements.txtOldPassword).val();
    if (oldPass == "") {
        $("#" + User_ChangePassword.uiElements.txtOldPassword).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل كلمة المرور الحالية.", null, null, "error");
        return;
    }

    //New password
    var newPass = $("#" + User_ChangePassword.uiElements.txtNewPassword).val();
    if (newPass == "") {
        $("#" + User_ChangePassword.uiElements.txtNewPassword).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل كلمة المرور الجديدة.", null, null, "error");
        return;
    }

    //Confirm new password
    var confPass = $("#" + User_ChangePassword.uiElements.txtConfirmPassword).val();
    if (confPass == "") {
        $("#" + User_ChangePassword.uiElements.txtConfirmPassword).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل كلمة المرور الجديدة مرة أخرى.", null, null, "error");
        return;
    }

    if (confPass != newPass) {
        $("#" + User_ChangePassword.uiElements.txtConfirmPassword).focus();
        Takaful.CommonMethods.ShowInfoMsg("كلمة المرور الجديدة غير متطابقة.", null, null, "error");
        return;
    }

    $("#" + User_ChangePassword.uiElements.btnSubmit).hide(); //Hide button

    User_ChangePassword.CustomMethods.Submit(oldPass, newPass);


};




