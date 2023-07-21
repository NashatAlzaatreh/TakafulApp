
if (typeof Request_SubmittedRequests === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_SubmittedRequests = {};
}

//Add the event handlers container object to the main namespace
Request_SubmittedRequests.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_SubmittedRequests.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_SubmittedRequests.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    //$('#' + Request_SubmittedRequests.uiElements.divTitle).empty();
    $('#' + Request_SubmittedRequests.uiElements.txtDateFrom).val('');
    $('#' + Request_SubmittedRequests.uiElements.txtDateTo).val('');
    $('#' + Request_SubmittedRequests.uiElements.tblRequests).empty();

};

//Populate the UI table with the array data
Request_SubmittedRequests.CustomMethods.LocalOperations.PopulateRequestsTable = function () {

    var htmlData = '';
    var detailsPage = '';


    switch (Request_SubmittedRequests.type) {
        case "1":
            detailsPage = 'NewSubscription_Approve.html';
            break;
        case "2":
            detailsPage = 'EditSubscription_Approve.html';
            break;
        case "3":
            detailsPage = 'CancelSubscription_Approve.html';
            break;
        case "4":
            detailsPage = 'NewLoan_Approve.html';
            break;
        case "5":
            detailsPage = 'EditLoan_Approve.html';
            break;
        case "6":
            detailsPage = 'CancelLoan_Approve.html';
            break;
    }

    if (Request_SubmittedRequests.Requests.length > 0) {
        for (var i = 0; i < Request_SubmittedRequests.Requests.length; i++) {
            var parms = 'empID=' + Request_SubmittedRequests.Requests[i].EmployeeNumber.toString() + '&year=' + Request_SubmittedRequests.Requests[i].Year.toString() + '&serial=' + Request_SubmittedRequests.Requests[i].Serial.toString();
            htmlData += '<tr>' +
                '<td ><a href="' + detailsPage + '?' + parms + '">' + Request_SubmittedRequests.Requests[i].EmployeeNumber + '</a></td>' +
                '<td>' + Request_SubmittedRequests.Requests[i].Name + '</td>' +
                '<td class="hidden-for-small">' + Request_SubmittedRequests.Requests[i].Department + '</td>' +
                '<td class="hidden-for-small">' + Request_SubmittedRequests.Requests[i].Position + '</td>' +
                '<td class="hidden-for-small">' + Takaful.CommonMethods.GetFormattedDate(Request_SubmittedRequests.Requests[i].JoinDate) + '</td>' +
                '<td>' + Takaful.CommonMethods.GetFormattedDate(Request_SubmittedRequests.Requests[i].RequestDate) + '</td>' +
                '</tr>';
        }
    } else {
        htmlData = '<tr>' +
        '<td class="text-center" colspan="6">لايوجد بيانات</td>' +
        '<td class="hide "></td>' +
        '<td class="hide "></td>' +
        '<td class="hide "></td>' +
        '<td class="hide "></td>' +
        '<td class="hide "></td>' +
        '</tr>';
    }

    Takaful.CommonMethods.TerminateDataTable('mainTable');  //Terminate table object

    $('#' + Request_SubmittedRequests.uiElements.tblRequests).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Prepare data for export
Request_SubmittedRequests.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];



    //Add header
    dataArr.push([
        "الرقم الوظيفى",
        "الاسم",
        "الإدارة",
        "الوظيفة",
        "تاريخ التعيين",
        "تاريخ تقديم الطلب"
    ]);

    if (Request_SubmittedRequests.Requests.length > 0) {
        for (var i = 0; i < Request_SubmittedRequests.Requests.length; i++) {
            var arrElement = [
                Request_SubmittedRequests.Requests[i].EmployeeNumber,
                Request_SubmittedRequests.Requests[i].Name,
                Request_SubmittedRequests.Requests[i].Department,
                Request_SubmittedRequests.Requests[i].Position,
                Takaful.CommonMethods.GetFormattedDate(Request_SubmittedRequests.Requests[i].JoinDate),
                Takaful.CommonMethods.GetFormattedDate(Request_SubmittedRequests.Requests[i].RequestDate)
            ];

            dataArr.push(arrElement);
        }
    }

    var jObj = JSON.stringify(dataArr);


    return jObj;
};


//Ajax functions
//--------------

//Get initial data
Request_SubmittedRequests.CustomMethods.AjaxCall.GetInitialData = function (type, fromDate, toDate) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_SubmittedRequests.ServiceUrl + '/InitialData?type=' + type + '&fromDate=' + fromDate + '&toDate=' + toDate;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_SubmittedRequests.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_SubmittedRequests.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_SubmittedRequests.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
Request_SubmittedRequests.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = Request_SubmittedRequests.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_SubmittedRequests.ServiceUrl + '/Export?type=' + Request_SubmittedRequests.type;
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = Request_SubmittedRequests.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = Request_SubmittedRequests.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = Request_SubmittedRequests.CustomMethods.Callback.ExportData_Completed;

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
Request_SubmittedRequests.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Request_SubmittedRequests.Requests = jsonObj.Requests;  //Store the data to local object
    Request_SubmittedRequests.CustomMethods.LocalOperations.PopulateRequestsTable();    //Populate the data to UI table

    Request_SubmittedRequests.InitialDataReady = true;

};

Request_SubmittedRequests.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_SubmittedRequests.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Export data
Request_SubmittedRequests.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.URL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + Request_SubmittedRequests.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Request_SubmittedRequests.uiElements.btnExport).show();

    }, 5000);


};

Request_SubmittedRequests.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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
    } else if (xhr.responseText == "NoDataToExport") {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, 0, "error");
    } else {
        Takaful.CommonMethods.ShowInfoMsg("لايمكن إتمام طلبك الأن.", null, 0, "error");
    }




};

Request_SubmittedRequests.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};








