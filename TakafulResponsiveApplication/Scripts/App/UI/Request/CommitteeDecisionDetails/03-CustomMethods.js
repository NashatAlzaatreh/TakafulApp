
if (typeof Request_CommitteeDecisionDetails === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeDecisionDetails = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeDecisionDetails.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_CommitteeDecisionDetails.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_CommitteeDecisionDetails.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Request_CommitteeDecisionDetails.uiElements.tblMembers).empty();


};


//Ajax functions
//--------------

//Get initial data
Request_CommitteeDecisionDetails.CustomMethods.AjaxCall.GetInitialData = function (empID, year, serial, typeID) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CommitteeDecisionDetails.ServiceUrl + '/InitialData?empID=' + empID + '&year=' + year + '&serial=' + serial + '&type=' + typeID;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_CommitteeDecisionDetails.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_CommitteeDecisionDetails.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_CommitteeDecisionDetails.CustomMethods.Callback.GetInitialData_Completed;

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
Request_CommitteeDecisionDetails.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    $("#" + Request_CommitteeDecisionDetails.uiElements.tblMembers).html(jsonObj);

    Request_CommitteeDecisionDetails.InitialDataReady = true;

};

Request_CommitteeDecisionDetails.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_CommitteeDecisionDetails.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};




