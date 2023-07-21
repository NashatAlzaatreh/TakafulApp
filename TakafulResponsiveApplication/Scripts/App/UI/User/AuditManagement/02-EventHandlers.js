
//Check for main namespace
if (typeof User_AuditManagement === 'undefined') {
    // Namespace does not exist, create a new one
    var User_AuditManagement = {};
}


//Add the event handlers container object to the main namespace
User_AuditManagement.EventHandlers = {};

//Add the event handlers to the ui elements

//Submit button
User_AuditManagement.EventHandlers.btnSave_onclick = function () {

    //Input validation
    //User name
    var userName = $("#" + User_AuditManagement.uiElements.txtUserName).val().trim();
    if (userName == "") {
        $("#" + User_AuditManagement.uiElements.txtUserName).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل اسم المستخدم", null, null, "error");
        return;
    }

    //Password
    var password = $("#" + User_AuditManagement.uiElements.txtPassword).val();
    if (password == "") {
        $("#" + User_AuditManagement.uiElements.txtPassword).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل كلمة المرور", null, null, "error");
        return;
    }


    User_AuditManagement.CustomMethods.Save(userName, password);


};




