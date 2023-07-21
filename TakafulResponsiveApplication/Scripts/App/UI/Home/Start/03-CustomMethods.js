
if (typeof Home_Start === 'undefined') {
    // Namespace does not exist, create a new one
    var Home_Start = {};
}

//Add the event handlers container object to the main namespace
Home_Start.CustomMethods = {};

//Add the event handlers container object to the main namespace
Home_Start.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Home_Start.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements



};


//Ajax functions
//--------------

//Get initial data
Home_Start.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Home_Start.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Home_Start.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Home_Start.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Home_Start.CustomMethods.Callback.GetInitialData_Completed;

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
Home_Start.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    //Check roles
    if (jsonObj.IsAdmin == true) {
        $("#" + Home_Start.uiElements.divAdmin).show();
    }

    if (jsonObj.IsCommitteeMember == true) {
        $("#" + Home_Start.uiElements.divCommitteeMember).show();
    }

    if (jsonObj.IsHelpDesk == true) {
        $("#" + Home_Start.uiElements.divHelpDesk).show();
    }

    if (jsonObj.IsEmployee == true) {
        $("#" + Home_Start.uiElements.divEmployee).show();
    }

    if (jsonObj.IsAuditor == true) {
        location.replace("../Report/CommitteeMeetingDecisions.html");
    }

    //.attr("href", jsonObj.InfoFile1);
    //$("#" + Home_Start.uiElements.InfoFile_2).attr("href", jsonObj.InfoFile2);
    //$("#" + Home_Start.uiElements.InfoFile_3).attr("href", jsonObj.InfoFile3);


    Home_Start.InitialDataReady = true;

};

Home_Start.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");
    debugger;
    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../../UI/User/Login.html");
    } else {
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    }




};

Home_Start.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};









