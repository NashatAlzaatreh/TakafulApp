
if (typeof Home_HelpDesk === 'undefined') {
    // Namespace does not exist, create a new one
    var Home_HelpDesk = {};
}

//Add the event handlers container object to the main namespace
Home_HelpDesk.CustomMethods = {};

//Add the event handlers container object to the main namespace
Home_HelpDesk.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Home_HelpDesk.CustomMethods.LocalOperations.ResetUI = function () {

    //////UI elements
    //$('#' + Home_HelpDesk.uiElements.Requests_Subscription_New).html('اشتراك جديد: 0');
    //$('#' + Home_HelpDesk.uiElements.Requests_Subscription_Modification).html('تعديل قيمة الاشتراك: 0');
    //$('#' + Home_HelpDesk.uiElements.Requests_Subscription_Cancellation).html('انسحاب من الصندوق: 0');
    //$('#' + Home_HelpDesk.uiElements.Requests_Loan_New).html('قرض جديد: 0');
    //$('#' + Home_HelpDesk.uiElements.Requests_Loan_Modification).html('تعديل قسط القرض: 0');
    //$('#' + Home_HelpDesk.uiElements.Requests_Loan_Cancellation).html('سداد القرض بالكامل: 0');


};


//Ajax functions
//--------------

//Get initial data
Home_HelpDesk.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Home_HelpDesk.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Home_HelpDesk.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Home_HelpDesk.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Home_HelpDesk.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};


//Callback functions
//------------------

//Get initial data
Home_HelpDesk.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    //Info files URL
    //$("#" + Home_HelpDesk.uiElements.InfoFile_1).attr("href", jsonObj.InfoFile1);
    //$("#" + Home_HelpDesk.uiElements.InfoFile_2).attr("href", jsonObj.InfoFile2);
    //$("#" + Home_HelpDesk.uiElements.InfoFile_3).attr("href", jsonObj.InfoFile3);

    //Open files in new window
    $("#" + Home_HelpDesk.uiElements.InfoFile_1).bind('click', function () { window.open(jsonObj.InfoFile1, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });
    $("#" + Home_HelpDesk.uiElements.InfoFile_2).bind('click', function () { window.open(jsonObj.InfoFile2, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });
    $("#" + Home_HelpDesk.uiElements.InfoFile_3).bind('click', function () { window.open(jsonObj.InfoFile3, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });


    Home_HelpDesk.InitialDataReady = true;

};

Home_HelpDesk.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../User/Login.html");
    } else {
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    }




};

Home_HelpDesk.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};









