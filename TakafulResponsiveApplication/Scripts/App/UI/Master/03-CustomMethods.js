
if (typeof MasterPage === 'undefined') {
    // Namespace does not exist, create a new one
    var MasterPage = {};
}

//Add the event handlers container object to the main namespace
MasterPage.CustomMethods = {};

//Add the event handlers container object to the main namespace
MasterPage.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
MasterPage.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + MasterPage.uiElements.ulInternalMenu_Small).empty();
    $('#' + MasterPage.uiElements.ulInternalMenu_Large).empty();


};


//Ajax functions
//--------------

//Load internal menues
MasterPage.CustomMethods.AjaxCall.GetInternalMenus = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = MasterPage.ServiceUrl + '/InternalMenus';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = MasterPage.CustomMethods.Callback.GetInternalMenus_Success;
    requestOptions.ErrorCallback = MasterPage.CustomMethods.Callback.GetInternalMenus_Error;
    requestOptions.CompletedCallback = MasterPage.CustomMethods.Callback.GetInternalMenus_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Logout
MasterPage.CustomMethods.AjaxCall.Logout = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = MasterPage.ServiceUrl + '/Logout';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = MasterPage.CustomMethods.Callback.Logout_Success;
    requestOptions.ErrorCallback = MasterPage.CustomMethods.Callback.Logout_Error;
    requestOptions.CompletedCallback = MasterPage.CustomMethods.Callback.Logout_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};


//Callback functions
//------------------

//Load internal menues
MasterPage.CustomMethods.Callback.GetInternalMenus_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    $("#" + MasterPage.uiElements.ulInternalMenu_Small).html(jsonObj.Small);
    $("#" + MasterPage.uiElements.ulInternalMenu_Large).html(jsonObj.Large);

    MasterPage.IsLoadingMenus = false;

};

MasterPage.CustomMethods.Callback.GetInternalMenus_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");


};

MasterPage.CustomMethods.Callback.GetInternalMenus_Completed = function (xhr, status) {

};

//Logout
MasterPage.CustomMethods.Callback.Logout_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    window.location.href = "../../UI/Home/Main.html";

};

MasterPage.CustomMethods.Callback.Logout_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    Takaful.CommonMethods.ShowInfoMsg("لايمكن إتمام طلبك الأن.", null, null, "error");


};

MasterPage.CustomMethods.Callback.Logout_Completed = function (xhr, status) {

};





