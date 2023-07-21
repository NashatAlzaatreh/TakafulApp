
if (typeof Request_AdminCommitteeSubmittedRequests === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_AdminCommitteeSubmittedRequests = {};
}

//Add the event handlers container object to the main namespace
Request_AdminCommitteeSubmittedRequests.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_AdminCommitteeSubmittedRequests.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_AdminCommitteeSubmittedRequests.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.txtSerial).val('');
    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.txtDate).val('');
    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.lstMembers).empty();
    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.tblRequests).empty();
    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.txtNotes).val('');


};

//Populate the all requests UI table with the array data
Request_AdminCommitteeSubmittedRequests.CustomMethods.LocalOperations.PopulateRequestsTable = function () {

    var htmlData = '';

    if (Request_AdminCommitteeSubmittedRequests.Requests.length > 0) {
        for (var i = 0; i < Request_AdminCommitteeSubmittedRequests.Requests.length; i++) {
            var detailsPage = '';

            switch (Request_AdminCommitteeSubmittedRequests.Requests[i].TypeID) {
                case 1:
                    detailsPage = 'AdminCommitteeNewSubscription_Approve.html';
                    break;
                case 2:
                    detailsPage = 'AdminCommitteeEditSubscription_Approve.html';
                    break;
                case 3:
                    detailsPage = 'AdminCommitteeCancelSubscription_Approve.html';
                    break;
                case 4:
                    detailsPage = 'AdminCommitteeNewLoan_Approve.html';
                    break;
                case 5:
                    detailsPage = 'AdminCommitteeEditLoan_Approve.html';
                    break;
                case 6:
                    detailsPage = 'AdminCommitteeCancelLoan_Approve.html';
                    break;
            }

            var parms = 'empID=' + Request_AdminCommitteeSubmittedRequests.Requests[i].EmployeeNumber.toString() + '&year=' + Request_AdminCommitteeSubmittedRequests.Requests[i].Year.toString() + '&serial=' + Request_AdminCommitteeSubmittedRequests.Requests[i].Serial.toString() + '&memberID=' + Request_AdminCommitteeSubmittedRequests.SelectedMemberID;
            htmlData += '<tr>' +
                '<td ><a href="' + detailsPage + '?' + parms + '">' + Request_AdminCommitteeSubmittedRequests.Requests[i].EmployeeNumber + '</a></td>' +
                '<td class="hide-for-small">' + Request_AdminCommitteeSubmittedRequests.Requests[i].Name + '</td>' +
                '<td class="hide-for-small">' + Request_AdminCommitteeSubmittedRequests.Requests[i].Department + '</td>' +
                '<td class="hide-for-small">' + Takaful.CommonMethods.GetFormattedDate(Request_AdminCommitteeSubmittedRequests.Requests[i].JoinDate) + '</td>' +
                '<td class="hide-for-small">' + Takaful.CommonMethods.GetFormattedDate(Request_AdminCommitteeSubmittedRequests.Requests[i].RequestDate) + '</td>' +
                '<td>' + Request_AdminCommitteeSubmittedRequests.Requests[i].Type + '</td>' +
                '<td class="text-center">' +
                '<div class="row collapse">' +
                '<div class="large-12 columns " onclick="Request_AdminCommitteeSubmittedRequests.EventHandlers.btnAdd_click(' + i.toString() + ')"><a  data-reveal-id=""><div class="subscribe-btn3"><i class="fa fa-newspaper-o"></i></div></a></div>' +
                '</div>' +
                '</td>' +
                '<td>' + Request_AdminCommitteeSubmittedRequests.Requests[i].Decision + '</td>' +
                '<td class="hide-for-small">' + Request_AdminCommitteeSubmittedRequests.Requests[i].DecisionEntry + '</td>' +
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

    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.tblRequests).html(htmlData);

    Takaful.CommonMethods.InitializeDataTable('mainTable'); //Initialize data table



};

//Prepare data for export
Request_AdminCommitteeSubmittedRequests.CustomMethods.LocalOperations.PrepareDataForExport = function () {

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

    if (Request_AdminCommitteeSubmittedRequests.Requests.length > 0) {
        for (var i = 0; i < Request_AdminCommitteeSubmittedRequests.Requests.length; i++) {
            var arrElement = [
                Request_AdminCommitteeSubmittedRequests.Requests[i].EmployeeNumber,
                Request_AdminCommitteeSubmittedRequests.Requests[i].Name,
                Request_AdminCommitteeSubmittedRequests.Requests[i].Department,
                Takaful.CommonMethods.GetFormattedDate(Request_AdminCommitteeSubmittedRequests.Requests[i].JoinDate),
                Takaful.CommonMethods.GetFormattedDate(Request_AdminCommitteeSubmittedRequests.Requests[i].RequestDate),
                Request_AdminCommitteeSubmittedRequests.Requests[i].Type,
                Request_AdminCommitteeSubmittedRequests.Requests[i].Notes,
                Request_AdminCommitteeSubmittedRequests.Requests[i].Decision,
                Request_AdminCommitteeSubmittedRequests.Requests[i].DecisionEntry
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
Request_AdminCommitteeSubmittedRequests.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_AdminCommitteeSubmittedRequests.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Get requests
Request_AdminCommitteeSubmittedRequests.CustomMethods.AjaxCall.GetRequests = function (committeeMemberID) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_AdminCommitteeSubmittedRequests.ServiceUrl + '/Requests?memberID=' + committeeMemberID;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.GetRequests_Success;
    requestOptions.ErrorCallback = Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.GetRequests_Error;
    requestOptions.CompletedCallback = Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.GetRequests_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
Request_AdminCommitteeSubmittedRequests.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = Request_AdminCommitteeSubmittedRequests.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_AdminCommitteeSubmittedRequests.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.ExportData_Completed;

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
Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj.Meeting != null) {
        $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.txtSerial).val(jsonObj.Meeting.FormattedSerial);
        $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.Meeting.Date));
    }

    //Fill the committee members dropdown list
    var empList = "";
    for (var i = 0; i < jsonObj.CommitteeMembers.length; i++) {
        var id = jsonObj.CommitteeMembers[i].EmployeeNumber;
        var name = jsonObj.CommitteeMembers[i].Name;
        empList += '<option value="' + id + '">' + name + '</option>';
    }

    if (empList != '') {
        $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.lstMembers).html(empList);
        $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.lstMembers).val('');
    }

    //Fill the requests table (to add empty row)
    Request_AdminCommitteeSubmittedRequests.CustomMethods.LocalOperations.PopulateRequestsTable();

    Request_AdminCommitteeSubmittedRequests.InitialDataReady = true;

};

Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Get requests
Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.GetRequests_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Request_AdminCommitteeSubmittedRequests.Requests = jsonObj;

    //Fill the requests table
    Request_AdminCommitteeSubmittedRequests.CustomMethods.LocalOperations.PopulateRequestsTable();

    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.lstMembers).removeAttr("disabled");
    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.lstMembers).focus();


};

Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.GetRequests_Error = function (xhr, status, errorThrown) {
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


    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.lstMembers).removeAttr("disabled");
    $('#' + Request_AdminCommitteeSubmittedRequests.uiElements.lstMembers).focus();

};

Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.GetRequests_Completed = function (xhr, status) {

};

//Export data
Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.URL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + Request_AdminCommitteeSubmittedRequests.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Request_AdminCommitteeSubmittedRequests.uiElements.btnExport).show();

    }, 5000);


};

Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

Request_AdminCommitteeSubmittedRequests.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};


