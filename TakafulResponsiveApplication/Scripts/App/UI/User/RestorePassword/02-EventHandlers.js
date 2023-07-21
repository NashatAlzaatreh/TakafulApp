
//Check for main namespace
if (typeof User_RestorePassword === 'undefined') {
    // Namespace does not exist, create a new one
    var User_RestorePassword = {};
}


//Add the event handlers container object to the main namespace
User_RestorePassword.EventHandlers = {};

//Add the event handlers to the ui elements

//Send button
User_RestorePassword.EventHandlers.btnSend_onclick = function () {

    //Input validation
    //Employee number
    var empNumber = $("#" + User_RestorePassword.uiElements.txtEmployeeNumber).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(empNumber, false) == false) {
        $("#" + User_RestorePassword.uiElements.txtEmployeeNumber).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل الرقم الوظيفى برقم صحيح.", null, null, "error");
        return;
    }

    empNumber *= 1;

    //Email
    var email = $("#" + User_RestorePassword.uiElements.txtEmail).val().trim();
    if (email == "") {
        $("#" + User_RestorePassword.uiElements.txtEmail).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل البريد الإلكترونى.", null, null, "error");
        return;
    }



    User_RestorePassword.CustomMethods.Send(empNumber, email);

};




