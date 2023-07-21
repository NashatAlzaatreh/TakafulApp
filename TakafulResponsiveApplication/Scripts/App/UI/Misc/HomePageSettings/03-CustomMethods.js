
if (typeof Misc_HomePageSettings === 'undefined') {
    // Namespace does not exist, create a new one
    var Misc_HomePageSettings = {};
}

//Add the event handlers container object to the main namespace
Misc_HomePageSettings.CustomMethods = {};

//Add the event handlers container object to the main namespace
Misc_HomePageSettings.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Misc_HomePageSettings.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Misc_HomePageSettings.uiElements.txtTitle1).val('');
    $('#' + Misc_HomePageSettings.uiElements.txtTitle2).val('');
    $('#' + Misc_HomePageSettings.uiElements.txtTitle3).val('');

    $('#' + Misc_HomePageSettings.uiElements.filUpload1).wrap('<form>').closest('form').get(0).reset(); //For file input control
    $('#' + Misc_HomePageSettings.uiElements.filUpload1).unwrap();  //For file input control
    $('#' + Misc_HomePageSettings.uiElements.progUpload1).hide();
    $('#' + Misc_HomePageSettings.uiElements.btnCancelUpload1).hide();

    $('#' + Misc_HomePageSettings.uiElements.filUpload2).wrap('<form>').closest('form').get(0).reset(); //For file input control
    $('#' + Misc_HomePageSettings.uiElements.filUpload2).unwrap();  //For file input control
    $('#' + Misc_HomePageSettings.uiElements.progUpload2).hide();
    $('#' + Misc_HomePageSettings.uiElements.btnCancelUpload2).hide();

    $('#' + Misc_HomePageSettings.uiElements.filUpload3).wrap('<form>').closest('form').get(0).reset(); //For file input control
    $('#' + Misc_HomePageSettings.uiElements.filUpload3).unwrap();  //For file input control
    $('#' + Misc_HomePageSettings.uiElements.progUpload3).hide();
    $('#' + Misc_HomePageSettings.uiElements.btnCancelUpload3).hide();

    $('#' + Misc_HomePageSettings.uiElements.filUpload4).wrap('<form>').closest('form').get(0).reset(); //For file input control
    $('#' + Misc_HomePageSettings.uiElements.filUpload4).unwrap();  //For file input control
    $('#' + Misc_HomePageSettings.uiElements.progUpload4).hide();
    $('#' + Misc_HomePageSettings.uiElements.btnCancelUpload4).hide();

    $('#' + Misc_HomePageSettings.uiElements.filUpload5).wrap('<form>').closest('form').get(0).reset(); //For file input control
    $('#' + Misc_HomePageSettings.uiElements.filUpload5).unwrap();  //For file input control
    $('#' + Misc_HomePageSettings.uiElements.progUpload5).hide();
    $('#' + Misc_HomePageSettings.uiElements.btnCancelUpload5).hide();

    $('#' + Misc_HomePageSettings.uiElements.filUpload6).wrap('<form>').closest('form').get(0).reset(); //For file input control
    $('#' + Misc_HomePageSettings.uiElements.filUpload6).unwrap();  //For file input control
    $('#' + Misc_HomePageSettings.uiElements.progUpload6).hide();
    $('#' + Misc_HomePageSettings.uiElements.btnCancelUpload6).hide();

};


//Ajax functions
//--------------

//Get initial data
Misc_HomePageSettings.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Misc_HomePageSettings.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Misc_HomePageSettings.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Misc_HomePageSettings.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Misc_HomePageSettings.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save
Misc_HomePageSettings.CustomMethods.AjaxCall.Save = function (title1, title2, title3) {

    var subscriptionData = {};
    subscriptionData.Title1 = title1;
    subscriptionData.Title2 = title2;
    subscriptionData.Title3 = title3;
    var obj = JSON.stringify(subscriptionData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Misc_HomePageSettings.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Misc_HomePageSettings.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = Misc_HomePageSettings.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = Misc_HomePageSettings.CustomMethods.Callback.Save_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save file
Misc_HomePageSettings.CustomMethods.AjaxCall.SaveFile = function (fileName) {

    var subscriptionData = {};
    subscriptionData.Index = Misc_HomePageSettings.FileIndex;
    subscriptionData.FileName = fileName;
    var obj = JSON.stringify(subscriptionData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Misc_HomePageSettings.ServiceUrl + '/SaveFile';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Misc_HomePageSettings.CustomMethods.Callback.SaveFile_Success;
    requestOptions.ErrorCallback = Misc_HomePageSettings.CustomMethods.Callback.SaveFile_Error;
    requestOptions.CompletedCallback = Misc_HomePageSettings.CustomMethods.Callback.SaveFile_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Callback functions
//------------------

//Get initial data
Misc_HomePageSettings.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    $('#' + Misc_HomePageSettings.uiElements.txtTitle1).val(jsonObj.Title1);
    $('#' + Misc_HomePageSettings.uiElements.txtTitle2).val(jsonObj.Title2);
    $('#' + Misc_HomePageSettings.uiElements.txtTitle3).val(jsonObj.Title3);

    //Hide loading
    Takaful.CommonMethods.HideLoading();

};

Misc_HomePageSettings.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    //Hide loading
    Takaful.CommonMethods.HideLoading();

    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../User/Login.html");
    } else {
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    }



};

Misc_HomePageSettings.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save
Misc_HomePageSettings.CustomMethods.Callback.Save_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    //Hide loading
    Takaful.CommonMethods.HideLoading();

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, null, "success");
    }


};

Misc_HomePageSettings.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    //Hide loading
    Takaful.CommonMethods.HideLoading();

    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../User/Login.html");
    } else {
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام طلبك الأن.", null, 0, "error");
    }




};

Misc_HomePageSettings.CustomMethods.Callback.Save_Completed = function (xhr, status) {

};

//Save image
Misc_HomePageSettings.CustomMethods.Callback.SaveFile_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    $("#" + Misc_HomePageSettings.uiElements.btnUpload1).show();
    $("#" + Misc_HomePageSettings.uiElements.btnUpload2).show();
    $("#" + Misc_HomePageSettings.uiElements.btnUpload3).show();
    $("#" + Misc_HomePageSettings.uiElements.btnUpload4).show();
    $("#" + Misc_HomePageSettings.uiElements.btnUpload5).show();
    $("#" + Misc_HomePageSettings.uiElements.btnUpload6).show();

    //Hide loading
    Takaful.CommonMethods.HideLoading();

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم تعديل الملف.", null, null, "success");
    }

    Misc_HomePageSettings.FileIndex = 0;

    setTimeout(function () { location.reload(); }, 1500);

};

Misc_HomePageSettings.CustomMethods.Callback.SaveFile_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    //Hide loading
    Takaful.CommonMethods.HideLoading();

    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../User/Login.html");
    } else {
        $("#" + Misc_HomePageSettings.uiElements.btnUpload1).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload2).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload3).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload4).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload5).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload6).show();
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام طلبك الأن.", null, 0, "error");
    }




};

Misc_HomePageSettings.CustomMethods.Callback.SaveFile_Completed = function (xhr, status) {

};

