
//Check for main namespace
if (typeof User_Login === 'undefined') {
    // Namespace does not exist, create a new one
    var User_Login = {};
}


//Add the event handlers container object to the main namespace
User_Login.EventHandlers = {};

//Add the event handlers to the ui elements

//Login submit button
User_Login.EventHandlers.btnLoginSubmit_onclick = function () {

    //Validate input
    //User name
    if ($("#" + User_Login.uiElements.txtLoginUserName).val().trim() == "") {
        $("#" + User_Login.uiElements.txtLoginUserName).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل اسم المستخدم", null, null, "error");
        return;
    }

    //Password
    if ($("#" + User_Login.uiElements.txtLoginPassword).val() == "") {
        $("#" + User_Login.uiElements.txtLoginPassword).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل كلمة السر", null, null, "error");
        return;
    }

    //Takaful.CommonMethods.ShowInfoMsg('جارى تسجيل الدخول ، من فضلك انتظر...', null, 0, "info");
    

    User_Login.CustomMethods.LogInUser($("#" + User_Login.uiElements.txtLoginUserName).val(), $("#" + User_Login.uiElements.txtLoginPassword).val());

    
};

User_Login.EventHandlers.btnApprovalRules_onclick = function () {
    debugger;
    var EmpID = $("#" + User_Login.uiElements.txtLoginUserName).val().trim();

    var isApproval = false;
    if ($("#" + User_Login.uiElements.chkApprovalNewRole).prop('checked')) {
        isApproval = true;
    } else {
        isApproval = false;
    }

    //var istrue = $("#" + User_Login.uiElements.chkApprovalNewRole).val().trim(); //User_Login.uiElements.chkApprovalNewRole;
    if (isApproval)
        User_Login.CustomMethods.IsApprovalNewRule(EmpID, isApproval);
};

//Remember me button
User_Login.EventHandlers.btnRememberMe_onclick = function () {

    if ($("#" + User_Login.uiElements.chkLoginRememberMe).prop('checked') == true) {
        $("#" + User_Login.uiElements.chkLoginRememberMe).prop('checked', false);
    } else {
        $("#" + User_Login.uiElements.chkLoginRememberMe).prop('checked', true);
    }

};







