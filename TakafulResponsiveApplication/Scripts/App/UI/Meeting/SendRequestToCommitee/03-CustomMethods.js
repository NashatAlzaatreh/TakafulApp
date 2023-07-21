
if (typeof Meeting_SendRequestToCommitee === 'undefined') {
    // Namespace does not exist, create a new one
    var Meeting_SendRequestToCommitee = {};
}

//Add the event handlers container object to the main namespace
Meeting_SendRequestToCommitee.CustomMethods = {};

//Add the event handlers container object to the main namespace
Meeting_SendRequestToCommitee.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Meeting_SendRequestToCommitee.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Meeting_SendRequestToCommitee.uiElements.txtSerial).val('');
    $('#' + Meeting_SendRequestToCommitee.uiElements.txtDate).val('');
    $('#' + Meeting_SendRequestToCommitee.uiElements.tblRequests).empty();
    $('#' + Meeting_SendRequestToCommitee.uiElements.txtNotes).val('');


};

//Populate the all requests UI table with the array data
Meeting_SendRequestToCommitee.CustomMethods.LocalOperations.PopulateRequestsTable = function () {

    var htmlData = '';

    if (Meeting_SendRequestToCommitee.Requests.length > 0) {
        for (var i = 0; i < Meeting_SendRequestToCommitee.Requests.length; i++) {
            htmlData += '<tr>' +
                '<td>' + Meeting_SendRequestToCommitee.Requests[i].EmployeeNumber + '</td>' +
                '<td class="hide-for-small">' + Meeting_SendRequestToCommitee.Requests[i].Name + '</td>' +
                '<td class="hide-for-small">' + Meeting_SendRequestToCommitee.Requests[i].Department + '</td>' +
                '<td class="hide-for-small">' + Takaful.CommonMethods.GetFormattedDate(Meeting_SendRequestToCommitee.Requests[i].RequestDate) + '</td>' +
                '<td>' + Meeting_SendRequestToCommitee.Requests[i].Type + '</td>' +
                '<td class="text-center">' +
                '<div class="row collapse">' +
                '<div class="large-12 columns " onclick="Meeting_SendRequestToCommitee.EventHandlers.btnAdd_click(' + i.toString() + ')"><a  data-reveal-id=""><div class="subscribe-btn3"><i class="fa fa-newspaper-o"></i></div></a></div>' +
                '</div>' +
                '</td>' +
                '</tr>';
        }
    } else {
        htmlData = '<tr>' +
        '<td class="text-center" colspan="6">لايوجد بيانات</td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '</tr>';
    }

    Takaful.CommonMethods.TerminateDataTable('mainTable');  //Terminate table object

    $('#' + Meeting_SendRequestToCommitee.uiElements.tblRequests).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Prepare data for export
Meeting_SendRequestToCommitee.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];

    //Add header
    dataArr.push([
        "الرقم الوظيفى",
        "الاسم",
        "الإدارة",
        "تاريخ الطلب",
        "نوع الطلب",
        "ملاحظات"
    ]);

    if (Meeting_SendRequestToCommitee.Requests.length > 0) {
        for (var i = 0; i < Meeting_SendRequestToCommitee.Requests.length; i++) {
            var arrElement = [
                Meeting_SendRequestToCommitee.Requests[i].EmployeeNumber,
                Meeting_SendRequestToCommitee.Requests[i].Name,
                Meeting_SendRequestToCommitee.Requests[i].Department,
                Takaful.CommonMethods.GetFormattedDate(Meeting_SendRequestToCommitee.Requests[i].RequestDate),
                Meeting_SendRequestToCommitee.Requests[i].Type,
                Meeting_SendRequestToCommitee.Requests[i].Notes
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
Meeting_SendRequestToCommitee.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_SendRequestToCommitee.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Meeting_SendRequestToCommitee.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Meeting_SendRequestToCommitee.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Meeting_SendRequestToCommitee.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save notes
Meeting_SendRequestToCommitee.CustomMethods.AjaxCall.SaveNotes = function (empID, year, serial, typeID, notes) {

    var submittedData = {};
    submittedData.EmpID = empID;
    submittedData.Year = year;
    submittedData.Serial = serial;
    submittedData.TypeID = typeID;
    submittedData.Notes = notes;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_SendRequestToCommitee.ServiceUrl + '/AddNotes';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Meeting_SendRequestToCommitee.CustomMethods.Callback.SaveNotes_Success;
    requestOptions.ErrorCallback = Meeting_SendRequestToCommitee.CustomMethods.Callback.SaveNotes_Error;
    requestOptions.CompletedCallback = Meeting_SendRequestToCommitee.CustomMethods.Callback.SaveNotes_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
Meeting_SendRequestToCommitee.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = Meeting_SendRequestToCommitee.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_SendRequestToCommitee.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = Meeting_SendRequestToCommitee.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = Meeting_SendRequestToCommitee.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = Meeting_SendRequestToCommitee.CustomMethods.Callback.ExportData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Send email notifications
Meeting_SendRequestToCommitee.CustomMethods.AjaxCall.Send = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_SendRequestToCommitee.ServiceUrl + '/SendNotifications';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Meeting_SendRequestToCommitee.CustomMethods.Callback.Send_Success;
    requestOptions.ErrorCallback = Meeting_SendRequestToCommitee.CustomMethods.Callback.Send_Error;
    requestOptions.CompletedCallback = Meeting_SendRequestToCommitee.CustomMethods.Callback.Send_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    ////Show loading
    //Takaful.CommonMethods.ShowLoading();
    //Show progress loading
    Takaful.CommonMethods.ShowProgressLoading('جارى ارسال التنبيهات لأعضاء اللجنة ، من فضلك انتظر...');

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};


//Callback functions
//------------------

//Get initial data
Meeting_SendRequestToCommitee.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (jsonObj && jsonObj.Requests) {
        Meeting_SendRequestToCommitee.Requests = jsonObj.Requests;
        if (jsonObj.Requests.length > 0 && jsonObj.IsNotificationSent != true) {
            $("#" + Meeting_SendRequestToCommitee.uiElements.btnSend).show();
        } else {
            $("#" + Meeting_SendRequestToCommitee.uiElements.btnSend).hide();
        }

        $('#' + Meeting_SendRequestToCommitee.uiElements.txtSerial).val(jsonObj.FormattedSerial);
        $('#' + Meeting_SendRequestToCommitee.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.Date));

        //Fill the requests table
        Meeting_SendRequestToCommitee.CustomMethods.LocalOperations.PopulateRequestsTable();
    }


    Meeting_SendRequestToCommitee.InitialDataReady = true;

};

Meeting_SendRequestToCommitee.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Meeting_SendRequestToCommitee.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save notes
Meeting_SendRequestToCommitee.CustomMethods.Callback.SaveNotes_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Meeting_SendRequestToCommitee.Requests[Meeting_SendRequestToCommitee.SelectedIndex].Notes = $('#' + Meeting_SendRequestToCommitee.uiElements.txtNotes).val().trim();
    Meeting_SendRequestToCommitee.SelectedIndex = -1;

    //Close the modal window
    $('#' + Meeting_SendRequestToCommitee.uiElements.NoteIn).foundation('reveal', 'close');

    //Show message
    setTimeout(function () {    //Delay before showing the message
        Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, 0, "success");
    }, 500);


};

Meeting_SendRequestToCommitee.CustomMethods.Callback.SaveNotes_Error = function (xhr, status, errorThrown) {
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
        //Close the modal window
        $('#' + Meeting_SendRequestToCommitee.uiElements.NoteIn).foundation('reveal', 'close');

        //Show message
        setTimeout(function () {    //Delay before showing the message
            Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام طلبك الأن.", null, 0, "error");
        }, 500);

    }




};

Meeting_SendRequestToCommitee.CustomMethods.Callback.SaveNotes_Completed = function (xhr, status) {

};

//Export data
Meeting_SendRequestToCommitee.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.URL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + Meeting_SendRequestToCommitee.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Meeting_SendRequestToCommitee.uiElements.btnExport).show();

    }, 5000);


};

Meeting_SendRequestToCommitee.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

Meeting_SendRequestToCommitee.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};

//Send email notifications
Meeting_SendRequestToCommitee.CustomMethods.Callback.Send_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    ////Hide loading
    //Takaful.CommonMethods.HideLoading();
    //Hide progress loading
    Takaful.CommonMethods.HideProgressLoading();

    $("#" + Meeting_SendRequestToCommitee.uiElements.btnSend).hide();

    Takaful.CommonMethods.ShowInfoMsg("تم ارسال التنبيهات الى اعضاء اللجنة لاعتماد الطلبات.", null, 0, "success");


};

Meeting_SendRequestToCommitee.CustomMethods.Callback.Send_Error = function (xhr, status, errorThrown) {
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
        ////Hide loading
        //Takaful.CommonMethods.HideLoading();
        //Hide progress loading
        Takaful.CommonMethods.HideProgressLoading();
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام طلبك الأن.", null, 0, "error");

    }




};

Meeting_SendRequestToCommitee.CustomMethods.Callback.Send_Completed = function (xhr, status) {

};

