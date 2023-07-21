
if (typeof Meeting_ApprovedLoanAmount === 'undefined') {
    // Namespace does not exist, create a new one
    var Meeting_ApprovedLoanAmount = {};
}

//Add the event handlers container object to the main namespace
Meeting_ApprovedLoanAmount.CustomMethods = {};

//Add the event handlers container object to the main namespace
Meeting_ApprovedLoanAmount.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Meeting_ApprovedLoanAmount.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Meeting_ApprovedLoanAmount.uiElements.txtSerial).val('');
    $('#' + Meeting_ApprovedLoanAmount.uiElements.txtDate).val('');
    $('#' + Meeting_ApprovedLoanAmount.uiElements.tblRequests).empty();
    $('#' + Meeting_ApprovedLoanAmount.uiElements.txtNotes).val('');


};

//Populate the all requests UI table with the array data
Meeting_ApprovedLoanAmount.CustomMethods.LocalOperations.PopulateRequestsTable = function () {

    var htmlData = '';

    if (Meeting_ApprovedLoanAmount.Requests.length > 0) {
        for (var i = 0; i < Meeting_ApprovedLoanAmount.Requests.length; i++) {
            htmlData += '<tr>' +
                '<td>' + Meeting_ApprovedLoanAmount.Requests[i].EmployeeNumber + '</td>' +
                '<td class="hide-for-small">' + Meeting_ApprovedLoanAmount.Requests[i].Name + '</td>' +
                '<td class="hide-for-small">' + Meeting_ApprovedLoanAmount.Requests[i].Department + '</td>' +
                '<td class="hide-for-small">' + Takaful.CommonMethods.GetFormattedDate(Meeting_ApprovedLoanAmount.Requests[i].RequestDate) + '</td>' +
                '<td class="hide-for-small">' + Meeting_ApprovedLoanAmount.Requests[i].PreviousRemainingAmount + '</td>' +
                '<td>' + Meeting_ApprovedLoanAmount.Requests[i].RequestedAmount + '</td>' +
                '<td>' + Meeting_ApprovedLoanAmount.Requests[i].SuggestedAmount + '</td>' +
                '<td class="text-center">' +
                '<div class="row collapse">' +
                '<div class="large-12 columns " onclick="Meeting_ApprovedLoanAmount.EventHandlers.btnAdd_click(' + i.toString() + ')"><a  data-reveal-id="">' + Meeting_ApprovedLoanAmount.Requests[i].ApprovedAmount + '</a></div>' +
                '</div>' +
                '</td>' +
                '</tr>';
        }
    } else {
        htmlData = '<tr>' +
        '<td class="text-center" colspan="8">لايوجد بيانات</td>' +
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

    $('#' + Meeting_ApprovedLoanAmount.uiElements.tblRequests).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Prepare data for export
Meeting_ApprovedLoanAmount.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];

    //Add header
    dataArr.push([
        "الرقم الوظيفى",
        "الاسم",
        "الإدارة",
        "تاريخ الطلب",
        "المتبقى من القرض السابق",
        "المبلغ المطلوب",
        "المبلغ المقترح",
        "المبلغ المعتمد"
    ]);

    if (Meeting_ApprovedLoanAmount.Requests.length > 0) {
        for (var i = 0; i < Meeting_ApprovedLoanAmount.Requests.length; i++) {
            var arrElement = [
                Meeting_ApprovedLoanAmount.Requests[i].EmployeeNumber,
                Meeting_ApprovedLoanAmount.Requests[i].Name,
                Meeting_ApprovedLoanAmount.Requests[i].Department,
                Takaful.CommonMethods.GetFormattedDate(Meeting_ApprovedLoanAmount.Requests[i].RequestDate),
                Meeting_ApprovedLoanAmount.Requests[i].PreviousRemainingAmount,
                Meeting_ApprovedLoanAmount.Requests[i].RequestedAmount,
                Meeting_ApprovedLoanAmount.Requests[i].SuggestedAmount,
                Meeting_ApprovedLoanAmount.Requests[i].ApprovedAmount
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
Meeting_ApprovedLoanAmount.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_ApprovedLoanAmount.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Meeting_ApprovedLoanAmount.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Meeting_ApprovedLoanAmount.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Meeting_ApprovedLoanAmount.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save notes
Meeting_ApprovedLoanAmount.CustomMethods.AjaxCall.SaveAmount = function (empID, year, serial, amount) {

    var submittedData = {};
    submittedData.EmpID = empID;
    submittedData.Year = year;
    submittedData.Serial = serial;
    submittedData.Amount = amount;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_ApprovedLoanAmount.ServiceUrl + '/SaveAmount';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Meeting_ApprovedLoanAmount.CustomMethods.Callback.SaveAmount_Success;
    requestOptions.ErrorCallback = Meeting_ApprovedLoanAmount.CustomMethods.Callback.SaveAmount_Error;
    requestOptions.CompletedCallback = Meeting_ApprovedLoanAmount.CustomMethods.Callback.SaveAmount_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
Meeting_ApprovedLoanAmount.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = Meeting_ApprovedLoanAmount.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Meeting_ApprovedLoanAmount.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = Meeting_ApprovedLoanAmount.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = Meeting_ApprovedLoanAmount.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = Meeting_ApprovedLoanAmount.CustomMethods.Callback.ExportData_Completed;

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
Meeting_ApprovedLoanAmount.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (jsonObj && jsonObj.Requests) {
        Meeting_ApprovedLoanAmount.Requests = jsonObj.Requests;
        if (jsonObj.Requests.length > 0 && jsonObj.IsNotificationSent != true) {
            $("#" + Meeting_ApprovedLoanAmount.uiElements.btnSend).show();
        } else {
            $("#" + Meeting_ApprovedLoanAmount.uiElements.btnSend).hide();
        }

        $('#' + Meeting_ApprovedLoanAmount.uiElements.txtSerial).val(jsonObj.FormattedSerial);
        $('#' + Meeting_ApprovedLoanAmount.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.Date));

        //Fill the requests table
        Meeting_ApprovedLoanAmount.CustomMethods.LocalOperations.PopulateRequestsTable();
    }


    Meeting_ApprovedLoanAmount.InitialDataReady = true;

};

Meeting_ApprovedLoanAmount.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Meeting_ApprovedLoanAmount.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save approved amount
Meeting_ApprovedLoanAmount.CustomMethods.Callback.SaveAmount_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    //Close the modal window
    $('#' + Meeting_ApprovedLoanAmount.uiElements.NoteIn).foundation('reveal', 'close');

    if (jsonObj != "True") {
        var msg = "";
        switch (jsonObj) {
            case "AmountViolation":
                msg = "لايمكن ان يكون المبلغ المعتمد اكبر من مبلغ الطلب.";
                break;
        }
        //Show message
        setTimeout(function () {    //Delay before showing the message
            Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
        }, 500);
        return;
    }


    Meeting_ApprovedLoanAmount.Requests[Meeting_ApprovedLoanAmount.SelectedIndex].ApprovedAmount = $('#' + Meeting_ApprovedLoanAmount.uiElements.txtAmount).val().trim();
    Meeting_ApprovedLoanAmount.SelectedIndex = -1;

    //Refresh UI table
    Meeting_ApprovedLoanAmount.CustomMethods.LocalOperations.PopulateRequestsTable();

    ////Close the modal window
    //$('#' + Meeting_ApprovedLoanAmount.uiElements.NoteIn).foundation('reveal', 'close');

    //Show message
    setTimeout(function () {    //Delay before showing the message
        Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, null, "success");
    }, 500);


};

Meeting_ApprovedLoanAmount.CustomMethods.Callback.SaveAmount_Error = function (xhr, status, errorThrown) {
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
        $('#' + Meeting_ApprovedLoanAmount.uiElements.NoteIn).foundation('reveal', 'close');

        //Show message
        setTimeout(function () {    //Delay before showing the message
            Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام طلبك الأن.", null, 0, "error");
        }, 500);

    }




};

Meeting_ApprovedLoanAmount.CustomMethods.Callback.SaveAmount_Completed = function (xhr, status) {

};

//Export data
Meeting_ApprovedLoanAmount.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.URL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + Meeting_ApprovedLoanAmount.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Meeting_ApprovedLoanAmount.uiElements.btnExport).show();

    }, 5000);


};

Meeting_ApprovedLoanAmount.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

Meeting_ApprovedLoanAmount.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};

