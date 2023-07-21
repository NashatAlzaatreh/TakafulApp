
if (typeof Request_CommitteeDecisionApproval === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CommitteeDecisionApproval = {};
}

//Add the event handlers container object to the main namespace
Request_CommitteeDecisionApproval.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_CommitteeDecisionApproval.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_CommitteeDecisionApproval.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Request_CommitteeDecisionApproval.uiElements.txtSerial).val('');
    $('#' + Request_CommitteeDecisionApproval.uiElements.txtDate).val('');
    $('#' + Request_CommitteeDecisionApproval.uiElements.tblRequests).empty();


};

//Populate the all requests UI table with the array data
Request_CommitteeDecisionApproval.CustomMethods.LocalOperations.PopulateRequestsTable = function () {

    var htmlData = '';

    if (Request_CommitteeDecisionApproval.Requests.length > 0) {
        for (var i = 0; i < Request_CommitteeDecisionApproval.Requests.length; i++) {
            var detailsPage = '';

            switch (Request_CommitteeDecisionApproval.Requests[i].TypeID) {
                case 1:
                    detailsPage = 'CommitteeNewSubscription_Reset.html';
                    break;
                case 2:
                    detailsPage = 'CommitteeEditSubscription_Reset.html';
                    break;
                case 3:
                    detailsPage = 'CommitteeCancelSubscription_Reset.html';
                    break;
                case 4:
                    detailsPage = 'CommitteeNewLoan_Reset.html';
                    break;
                case 5:
                    detailsPage = 'CommitteeEditLoan_Reset.html';
                    break;
                case 6:
                    detailsPage = 'CommitteeCancelLoan_Reset.html';
                    break;
            }

            var parms = 'empID=' + Request_CommitteeDecisionApproval.Requests[i].EmployeeNumber.toString() + '&year=' + Request_CommitteeDecisionApproval.Requests[i].Year.toString() + '&serial=' + Request_CommitteeDecisionApproval.Requests[i].Serial.toString();
            var parms2 = 'empID=' + Request_CommitteeDecisionApproval.Requests[i].EmployeeNumber.toString() + '&year=' + Request_CommitteeDecisionApproval.Requests[i].Year.toString() + '&serial=' + Request_CommitteeDecisionApproval.Requests[i].Serial.toString() + '&type=' + Request_CommitteeDecisionApproval.Requests[i].TypeID.toString();
            htmlData += '<tr>' +
                '<td ><a href="' + detailsPage + '?' + parms + '">' + Request_CommitteeDecisionApproval.Requests[i].EmployeeNumber + '</a></td>' +
                '<td class="hide-for-small">' + Request_CommitteeDecisionApproval.Requests[i].Name + '</td>' +
                '<td class="hide-for-small">' + Request_CommitteeDecisionApproval.Requests[i].Department + '</td>' +
                '<td class="hide-for-small">' + Request_CommitteeDecisionApproval.Requests[i].Position + '</td>' +
                '<td>' + Request_CommitteeDecisionApproval.Requests[i].Type + '</td>' +
                '<td class="hide-for-small">' + Takaful.CommonMethods.GetFormattedDate(Request_CommitteeDecisionApproval.Requests[i].RequestDate) + '</td>' +
                '<td class="text-center"><a href="CommitteeDecisionDetails.html?' + parms2 + '">' + Request_CommitteeDecisionApproval.Requests[i].Decision + '</a></td>' +
                '</tr>';
        }
    } else {
        htmlData = '<tr>' +
        '<td class="text-center" colspan="7">لايوجد بيانات</td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '</tr>';
    }

    Takaful.CommonMethods.TerminateDataTable('mainTable');  //Terminate table object

    $('#' + Request_CommitteeDecisionApproval.uiElements.tblRequests).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Prepare data for export
Request_CommitteeDecisionApproval.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];

    //Add header
    dataArr.push([
        "الرقم الوظيفى",
        "الاسم",
        "الإدارة",
        "الوظيفة",
        "نوع الطلب",
        "تاريخ الطلب",
        "قرار اللجنة"
    ]);

    if (Request_CommitteeDecisionApproval.Requests.length > 0) {
        for (var i = 0; i < Request_CommitteeDecisionApproval.Requests.length; i++) {
            var arrElement = [
                Request_CommitteeDecisionApproval.Requests[i].EmployeeNumber,
                Request_CommitteeDecisionApproval.Requests[i].Name,
                Request_CommitteeDecisionApproval.Requests[i].Department,
                Request_CommitteeDecisionApproval.Requests[i].Position,
                Request_CommitteeDecisionApproval.Requests[i].Type,
                Takaful.CommonMethods.GetFormattedDate(Request_CommitteeDecisionApproval.Requests[i].RequestDate),
                Request_CommitteeDecisionApproval.Requests[i].Decision
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
Request_CommitteeDecisionApproval.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CommitteeDecisionApproval.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_CommitteeDecisionApproval.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_CommitteeDecisionApproval.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_CommitteeDecisionApproval.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
Request_CommitteeDecisionApproval.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = Request_CommitteeDecisionApproval.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CommitteeDecisionApproval.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = Request_CommitteeDecisionApproval.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = Request_CommitteeDecisionApproval.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = Request_CommitteeDecisionApproval.CustomMethods.Callback.ExportData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save
Request_CommitteeDecisionApproval.CustomMethods.AjaxCall.Save = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CommitteeDecisionApproval.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = Request_CommitteeDecisionApproval.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = Request_CommitteeDecisionApproval.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = Request_CommitteeDecisionApproval.CustomMethods.Callback.Save_Completed;

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
Request_CommitteeDecisionApproval.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (jsonObj && jsonObj.Requests) {
        Request_CommitteeDecisionApproval.Requests = jsonObj.Requests;

        $('#' + Request_CommitteeDecisionApproval.uiElements.txtSerial).val(jsonObj.FormattedSerial);
        $('#' + Request_CommitteeDecisionApproval.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.Date));

        //Fill the requests table
        Request_CommitteeDecisionApproval.CustomMethods.LocalOperations.PopulateRequestsTable();
    }


    Request_CommitteeDecisionApproval.InitialDataReady = true;

};

Request_CommitteeDecisionApproval.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_CommitteeDecisionApproval.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Export data
Request_CommitteeDecisionApproval.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.URL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + Request_CommitteeDecisionApproval.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Request_CommitteeDecisionApproval.uiElements.btnExport).show();

    }, 5000);


};

Request_CommitteeDecisionApproval.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

Request_CommitteeDecisionApproval.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};

//Save
Request_CommitteeDecisionApproval.CustomMethods.Callback.Save_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم اعتماد قرارات اللجنة", null, 0, "success");
        setTimeout(function () {
            location.reload();
        }, 5000);
    } else {
        var msg = "";
        switch (jsonObj) {
            case "NoActiveMeeting":
                msg = "لا يوجد إجتماع فعال.";
                break;
            case "StillOpenForEvaluation":
                msg = "الطلبات لاتزال تحت التصويت من قبل أعضاء اللجنة.";
                break;
            case "NoRequestsExist":
                msg = "لا توجد طلبات تحتاج للاعتماد.";
                break;
            default:

                break;
        }
        Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
    }


};

Request_CommitteeDecisionApproval.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {
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

Request_CommitteeDecisionApproval.CustomMethods.Callback.Save_Completed = function (xhr, status) {

};


