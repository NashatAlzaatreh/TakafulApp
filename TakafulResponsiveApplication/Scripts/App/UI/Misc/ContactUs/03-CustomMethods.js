
if (typeof Misc_ContactUs === 'undefined') {
    // Namespace does not exist, create a new one
    var Misc_ContactUs = {};
}

//Add the event handlers container object to the main namespace
Misc_ContactUs.CustomMethods = {};

//Add the event handlers container object to the main namespace
Misc_ContactUs.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Misc_ContactUs.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Misc_ContactUs.uiElements.txtName).val('');
    $('#' + Misc_ContactUs.uiElements.txtName).focus();
    $('#' + Misc_ContactUs.uiElements.txtMobile).val('');
    $('#' + Misc_ContactUs.uiElements.txtEmail).val('');
    $('#' + Misc_ContactUs.uiElements.txtMessage).val('');


};

//Create the json object for the request to send
Misc_ContactUs.CustomMethods.LocalOperations.CreateJsonObject = function () {


    var obj = {};

    obj.Name = $('#' + Misc_ContactUs.uiElements.txtName).val().trim();
    obj.Mobile = $('#' + Misc_ContactUs.uiElements.txtMobile).val().trim();
    obj.Email = $('#' + Misc_ContactUs.uiElements.txtEmail).val().trim();
    obj.Message = $('#' + Misc_ContactUs.uiElements.txtMessage).val().trim();

    return JSON.stringify(obj);

};


//Ajax functions
//--------------

//Send registration request
Misc_ContactUs.CustomMethods.AjaxCall.SendInquiry = function (employeeID) {

    //Get json object to be sent
    var obj = Misc_ContactUs.CustomMethods.LocalOperations.CreateJsonObject();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Misc_ContactUs.ServiceUrl + '/PostInquiry';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Misc_ContactUs.CustomMethods.Callback.SendInquiry_Success;
    requestOptions.ErrorCallback = Misc_ContactUs.CustomMethods.Callback.SendInquiry_Error;
    requestOptions.CompletedCallback = Misc_ContactUs.CustomMethods.Callback.SendInquiry_Completed;

    //requestOptions.RequestHeaderAdd = [{hkey:'userid',hvalue:'135'}];

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Callback functions
//------------------

//Send registration request
Misc_ContactUs.CustomMethods.Callback.SendInquiry_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Takaful.CommonMethods.ShowInfoMsg("شكراً لك ، سوف يتم مراجعة الرسالة والرد عليك فى أقرب وقت.", null, 0, "success");

    //Reset UI
    Misc_ContactUs.CustomMethods.LocalOperations.ResetUI();

};

Misc_ContactUs.CustomMethods.Callback.SendInquiry_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    Takaful.CommonMethods.ShowInfoMsg("عفواً ، لا يمكن إرسال رسالتك الأن ، برجاء المحاولة فى وقت لاحق.", null, 0, "error");


};

Misc_ContactUs.CustomMethods.Callback.SendInquiry_Completed = function (xhr, status) {

};








