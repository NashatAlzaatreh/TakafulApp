
if (typeof Report_AdminDecisions === 'undefined') {
    // Namespace does not exist, create a new one
    var Report_AdminDecisions = {};
}

//Add the event handlers container object to the main namespace
Report_AdminDecisions.CustomMethods = {};

//Add the event handlers container object to the main namespace
Report_AdminDecisions.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Report_AdminDecisions.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Report_AdminDecisions.uiElements.lstEmployees).empty();
    $('#' + Report_AdminDecisions.uiElements.txtDate).val('');


};


//Ajax functions
//--------------

//Save data
Report_AdminDecisions.CustomMethods.AjaxCall.Export = function (from, to) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Report_AdminDecisions.ServiceUrl + '/Export?from=' + from + '&to=' + to;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Report_AdminDecisions.CustomMethods.Callback.Export_Success;
    requestOptions.ErrorCallback = Report_AdminDecisions.CustomMethods.Callback.Export_Error;
    requestOptions.CompletedCallback = Report_AdminDecisions.CustomMethods.Callback.Export_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};


//Callback functions
//------------------

//Export data
Report_AdminDecisions.CustomMethods.Callback.Export_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.FullURL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    Takaful.CommonMethods.ShowInfoMsg('تم استخراج الملف.', null, null, "success");

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Report_AdminDecisions.uiElements.btnExport).show();

    }, 5000);




};

Report_AdminDecisions.CustomMethods.Callback.Export_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    //Show export button
    $("#" + Report_AdminDecisions.uiElements.btnExport).show();

    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../User/Login.html");
    } else if (xhr.responseText == "NoDataToExport") {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, 0, "error");
    } else {
        Takaful.CommonMethods.ShowInfoMsg("لايمكن إتمام طلبك الأن.", null, 0, "error");
    }




};

Report_AdminDecisions.CustomMethods.Callback.Export_Completed = function (xhr, status) {

};





