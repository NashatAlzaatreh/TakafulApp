
if (typeof Misc_CommitteeMembers === 'undefined') {
    // Namespace does not exist, create a new one
    var Misc_CommitteeMembers = {};
}

//Add the event handlers container object to the main namespace
Misc_CommitteeMembers.CustomMethods = {};

//Add the event handlers container object to the main namespace
Misc_CommitteeMembers.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Misc_CommitteeMembers.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Misc_CommitteeMembers.uiElements.tblMembers).empty();


};


//Ajax functions
//--------------

//Get initial data
Misc_CommitteeMembers.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Misc_CommitteeMembers.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Misc_CommitteeMembers.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Misc_CommitteeMembers.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Misc_CommitteeMembers.CustomMethods.Callback.GetInitialData_Completed;

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
Misc_CommitteeMembers.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    $("#" + Misc_CommitteeMembers.uiElements.tblMembers).html(jsonObj);

    Misc_CommitteeMembers.InitialDataReady = true;

};

Misc_CommitteeMembers.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, 0, "error");


};

Misc_CommitteeMembers.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};




