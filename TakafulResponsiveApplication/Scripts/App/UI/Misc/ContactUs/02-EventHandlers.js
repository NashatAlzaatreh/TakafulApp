
//Check for main namespace
if (typeof Misc_ContactUs === 'undefined') {
    // Namespace does not exist, create a new one
    var Misc_ContactUs = {};
}

//Add the event handlers container object to the main namespace
Misc_ContactUs.EventHandlers = {};


//Send button
Misc_ContactUs.EventHandlers.btnSend_onclick = function () {


    //Input validation
    //Name
    if ($("#" + Misc_ContactUs.uiElements.txtName).val().trim() == "") {
        $("#" + Misc_ContactUs.uiElements.txtName).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل الاسم.", null, null, "error");
        return;
    }

    //Mobile
    if ($("#" + Misc_ContactUs.uiElements.txtMobile).val().trim() == "") {
        $("#" + Misc_ContactUs.uiElements.txtMobile).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل رقم الهاتف.", null, null, "error");
        return;
    }

    //Message
    if ($("#" + Misc_ContactUs.uiElements.txtMessage).val().trim() == "") {
        $("#" + Misc_ContactUs.uiElements.txtMessage).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل الرسالة.", null, null, "error");
        return;
    }


    //Send inquiry
    Misc_ContactUs.CustomMethods.AjaxCall.SendInquiry();


};













