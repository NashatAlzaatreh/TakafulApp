
//Check for main namespace
if (typeof User_ChangePassword === 'undefined') {
    // Namespace does not exist, create a new one
    var User_ChangePassword = {};
}


//Add the ui elements container object to the main namespace
User_ChangePassword.uiElements = {};

//Map each ui element to a variable
User_ChangePassword.uiElements.txtOldPassword = "txtOldPassword";
User_ChangePassword.uiElements.txtNewPassword = "txtNewPassword";
User_ChangePassword.uiElements.txtConfirmPassword = "txtConfirmPassword";
User_ChangePassword.uiElements.btnSubmit = "btnSubmit";
User_ChangePassword.uiElements.btnHistoryBack = "btnHistoryBack";





