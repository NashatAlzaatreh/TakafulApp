
if (typeof Request_UserRequests === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_UserRequests = {};
}

//Add the event handlers container object to the main namespace
Request_UserRequests.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_UserRequests.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_UserRequests.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Request_UserRequests.uiElements.tblRequests).empty();


};

//Populate the requests UI table with the array data
Request_UserRequests.CustomMethods.LocalOperations.PopulateRequestsTable = function (requests) {

    var htmlData = '';

    if (requests.length > 0) {
        for (var i = 0; i < requests.length; i++) {
            var cancellationButton = '';

            if (requests[i].CancellationKey != null) {

                cancellationButton = '&nbsp;&nbsp;&nbsp;<a onclick="Request_UserRequests.EventHandlers.btnCancel_click(' + requests[i].CancellationKey.Year.toString() + ',' + requests[i].CancellationKey.Serial.toString() + ')" >( إلغاء الطلب )</a>';
            }

            htmlData += '<tr>' +
                '<td >' + requests[i].Type + cancellationButton + '</td>' +
                '<td >' + requests[i].Date + '</td>' +
                '<td >' + requests[i].Status + '</td>' +
                '<td >' + requests[i].Amount + '</td>' +
                '</tr>';
        }
    } else {
        htmlData = '<tr>' +
            '<td class="text-center" colspan="4">لايوجد بيانات</td>' +
            '<td class="hide"></td>' +
            '<td class="hide"></td>' +
            '<td class="hide"></td>' +
            '</tr>';
    }

    //Takaful.CommonMethods.TerminateDataTable('mainTable');  //Terminate table object

    $('#' + Request_UserRequests.uiElements.tblRequests).html(htmlData);

    //Takaful.CommonMethods.InitializeDataTable('mainTable'); //Initialize data table



};


//Ajax functions
//--------------

//Get initial data
Request_UserRequests.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_UserRequests.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_UserRequests.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_UserRequests.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_UserRequests.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Withdraw request
Request_UserRequests.CustomMethods.AjaxCall.Withdraw = function (year, serial) {

    var submittedData = {};
    submittedData.Year = year;
    submittedData.Serial = serial;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_UserRequests.ServiceUrl + '/Withdraw';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Request_UserRequests.CustomMethods.Callback.Withdraw_Success;
    requestOptions.ErrorCallback = Request_UserRequests.CustomMethods.Callback.Withdraw_Error;
    requestOptions.CompletedCallback = Request_UserRequests.CustomMethods.Callback.Withdraw_Completed;

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
Request_UserRequests.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    //$("#" + Request_UserRequests.uiElements.tblRequests).html(jsonObj);
    Request_UserRequests.CustomMethods.LocalOperations.PopulateRequestsTable(jsonObj);

    Request_UserRequests.InitialDataReady = true;

};

Request_UserRequests.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, 0, "error");


};

Request_UserRequests.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Withdraw request
Request_UserRequests.CustomMethods.Callback.Withdraw_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj == "True") {

        setTimeout(function () {
            location.reload();
        }, 3000);

        Takaful.CommonMethods.ShowInfoMsg("تم إلغاء الطلب", null, 0, "success");

    } else {
        var msg = "";
        switch (jsonObj) {
            case "NotFound":
                msg = "الطلب غير موجود.";
                break;
            case "StateChanged":
                msg = "تم تغيير حالة الطلب ولا يمكن إلغائه إلا بواسطة إدارى النظام.";
                break;
        }

        Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
    }


};

Request_UserRequests.CustomMethods.Callback.Withdraw_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, 0, "error");


};

Request_UserRequests.CustomMethods.Callback.Withdraw_Completed = function (xhr, status) {

};


