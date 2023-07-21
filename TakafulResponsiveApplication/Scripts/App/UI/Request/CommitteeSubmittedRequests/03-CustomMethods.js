
if (typeof Request_CommitteeSubmittedRequests === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeSubmittedRequests = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeSubmittedRequests.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_CommitteeSubmittedRequests.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_CommitteeSubmittedRequests.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Request_CommitteeSubmittedRequests.uiElements.txtSerial).val('');
    $('#' + Request_CommitteeSubmittedRequests.uiElements.txtDate).val('');
    $('#' + Request_CommitteeSubmittedRequests.uiElements.tblRequests).empty();
    $('#' + Request_CommitteeSubmittedRequests.uiElements.txtNotes).val('');


};

//Populate the all requests UI table with the array data
Request_CommitteeSubmittedRequests.CustomMethods.LocalOperations.PopulateRequestsTable = function () {

    var htmlData = '';

    if (Request_CommitteeSubmittedRequests.Requests.length > 0) {
        for (var i = 0; i < Request_CommitteeSubmittedRequests.Requests.length; i++) {
            var detailsPage = '';

            switch (Request_CommitteeSubmittedRequests.Requests[i].TypeID) {
                case 1:
                    detailsPage = 'CommitteeNewSubscription_Approve.html';
                    break;
                case 2:
                    detailsPage = 'CommitteeEditSubscription_Approve.html';
                    break;
                case 3:
                    detailsPage = 'CommitteeCancelSubscription_Approve.html';
                    break;
                case 4:
                    detailsPage = 'CommitteeNewLoan_Approve.html';
                    break;
                case 5:
                    detailsPage = 'CommitteeEditLoan_Approve.html';
                    break;
                case 6:
                    detailsPage = 'CommitteeCancelLoan_Approve.html';
                    break;
            }

            var parms = 'empID=' + Request_CommitteeSubmittedRequests.Requests[i].EmployeeNumber.toString() + '&year=' + Request_CommitteeSubmittedRequests.Requests[i].Year.toString() + '&serial=' + Request_CommitteeSubmittedRequests.Requests[i].Serial.toString();
            htmlData += '<tr>' +
                '<td ><a href="' + detailsPage + '?' + parms + '">' + Request_CommitteeSubmittedRequests.Requests[i].EmployeeNumber + '</a></td>' +
                '<td class="hide-for-small">' + Request_CommitteeSubmittedRequests.Requests[i].Name + '</td>' +
                '<td class="hide-for-small">' + Request_CommitteeSubmittedRequests.Requests[i].Department + '</td>' +
                '<td class="hide-for-small">' + Takaful.CommonMethods.GetFormattedDate(Request_CommitteeSubmittedRequests.Requests[i].JoinDate) + '</td>' +
                '<td class="hide-for-small">' + Takaful.CommonMethods.GetFormattedDate(Request_CommitteeSubmittedRequests.Requests[i].RequestDate) + '</td>' +
                '<td>' + Request_CommitteeSubmittedRequests.Requests[i].Type + '</td>' +
                '<td class="text-center">' +
                '<div class="row collapse">' +
                '<div class="large-12 columns " onclick="Request_CommitteeSubmittedRequests.EventHandlers.btnAdd_click(' + i.toString() + ')"><a  data-reveal-id=""><div class="subscribe-btn3"><i class="fa fa-newspaper-o"></i></div></a></div>' +
                '</div>' +
                '</td>' +
                '<td>' + Request_CommitteeSubmittedRequests.Requests[i].Decision + '</td>' +
                '<td class="hide-for-small">' + Request_CommitteeSubmittedRequests.Requests[i].DecisionEntry + '</td>' +
                '</tr>';
        }
    } else {
        htmlData = '<tr>' +
        '<td class="text-center" colspan="9">لايوجد بيانات</td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '</tr>';
    }

    Takaful.CommonMethods.TerminateDataTable('mainTable');  //Terminate table object

    $('#' + Request_CommitteeSubmittedRequests.uiElements.tblRequests).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Prepare data for export
Request_CommitteeSubmittedRequests.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];

    //Add header
    dataArr.push([
        "الرقم الوظيفى",
        "الاسم",
        "الإدارة",
        "تاريخ التعيين",
        "تاريخ الطلب",
        "نوع الطلب",
        "ملاحظات",
        "القرار",
        "ادخل القرار"
    ]);

    if (Request_CommitteeSubmittedRequests.Requests.length > 0) {
        for (var i = 0; i < Request_CommitteeSubmittedRequests.Requests.length; i++) {
            var arrElement = [
                Request_CommitteeSubmittedRequests.Requests[i].EmployeeNumber,
                Request_CommitteeSubmittedRequests.Requests[i].Name,
                Request_CommitteeSubmittedRequests.Requests[i].Department,
                Takaful.CommonMethods.GetFormattedDate(Request_CommitteeSubmittedRequests.Requests[i].JoinDate),
                Takaful.CommonMethods.GetFormattedDate(Request_CommitteeSubmittedRequests.Requests[i].RequestDate),
                Request_CommitteeSubmittedRequests.Requests[i].Type,
                Request_CommitteeSubmittedRequests.Requests[i].Notes,
                Request_CommitteeSubmittedRequests.Requests[i].Decision,
                Request_CommitteeSubmittedRequests.Requests[i].DecisionEntry
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
Request_CommitteeSubmittedRequests.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CommitteeSubmittedRequests.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_CommitteeSubmittedRequests.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_CommitteeSubmittedRequests.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_CommitteeSubmittedRequests.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
Request_CommitteeSubmittedRequests.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = Request_CommitteeSubmittedRequests.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CommitteeSubmittedRequests.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = Request_CommitteeSubmittedRequests.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = Request_CommitteeSubmittedRequests.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = Request_CommitteeSubmittedRequests.CustomMethods.Callback.ExportData_Completed;

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
Request_CommitteeSubmittedRequests.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (jsonObj && jsonObj.Requests) {
        Request_CommitteeSubmittedRequests.Requests = jsonObj.Requests;

        $('#' + Request_CommitteeSubmittedRequests.uiElements.txtSerial).val(jsonObj.FormattedSerial);
        $('#' + Request_CommitteeSubmittedRequests.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.Date));

        //Fill the requests table
        Request_CommitteeSubmittedRequests.CustomMethods.LocalOperations.PopulateRequestsTable();
    }

    Request_CommitteeSubmittedRequests.InitialDataReady = true;

};

Request_CommitteeSubmittedRequests.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_CommitteeSubmittedRequests.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Export data
Request_CommitteeSubmittedRequests.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.URL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + Request_CommitteeSubmittedRequests.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Request_CommitteeSubmittedRequests.uiElements.btnExport).show();

    }, 5000);


};

Request_CommitteeSubmittedRequests.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

Request_CommitteeSubmittedRequests.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};


