
if (typeof Exception_Subscription_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Exception_Subscription_Submit = {};
}

//Add the event handlers container object to the main namespace
Exception_Subscription_Submit.CustomMethods = {};

//Add the event handlers container object to the main namespace
Exception_Subscription_Submit.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Exception_Subscription_Submit.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Exception_Subscription_Submit.uiElements.lstEmployees).empty();
    $('#' + Exception_Subscription_Submit.uiElements.txtDepartment).val('');
    $('#' + Exception_Subscription_Submit.uiElements.txtAmount).val('');
    $('#' + Exception_Subscription_Submit.uiElements.txtNotes).val('');
    $('#' + Exception_Subscription_Submit.uiElements.tblExceptions).empty();


};

//Populate the UI table with the array data
Exception_Subscription_Submit.CustomMethods.LocalOperations.PopulateExceptionsTable = function () {

    var htmlData = '';

    if (Exception_Subscription_Submit.InitialData.Exceptions.length > 0) {
        for (var i = 0; i < Exception_Subscription_Submit.InitialData.Exceptions.length; i++) {
            var isUsed = "تم إستخدامة";
            if (Exception_Subscription_Submit.InitialData.Exceptions[i].IsUsed == false) {
                isUsed = "لم يتم إستخدامة";
            }
            htmlData += '<tr>' +
                '<td class="">' + Exception_Subscription_Submit.InitialData.Exceptions[i].EmpID + '</td>' +
                '<td>' + Exception_Subscription_Submit.InitialData.Exceptions[i].Name + '</td>' +
                '<td class="hidden-for-small">' + Exception_Subscription_Submit.InitialData.Exceptions[i].Department + '</td>' +
                '<td>' + Exception_Subscription_Submit.InitialData.Exceptions[i].Amount + '</td>' +
                '<td class="hidden-for-small">' + isUsed + '</td>' +
                '<td>' +
                    '<div class="row collapse">' +
                        '<div class="large-6 columns" onclick="Exception_Subscription_Submit.EventHandlers.btnEditException_click(' + i.toString() + ')"><div class="subscribe-btn3"><i class="fa fa-edit"></i></div></div>' +
                        '<div class="large-6  columns" onclick="Exception_Subscription_Submit.EventHandlers.btnDeleteException_click(' + i.toString() + ')"><div class="subscribe-btn3"><i class="fa fa-remove"></i></div></div>' +
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

    $('#' + Exception_Subscription_Submit.uiElements.tblExceptions).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Prepare data for export
Exception_Subscription_Submit.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];

    //Add header
    dataArr.push([
        "الرقم الوظيفى",
        "الاسم",
        "الإدارة",
        "المبلغ",
        "حالة الإستثناء"
    ]);

    if (Exception_Subscription_Submit.InitialData.Exceptions.length > 0) {
        for (var i = 0; i < Exception_Subscription_Submit.InitialData.Exceptions.length; i++) {
            var isUsed = "تم إستخدامة";
            if (Exception_Subscription_Submit.InitialData.Exceptions[i].IsUsed == false) {
                isUsed = "لم يتم إستخدامة";
            }
            var arrElement = [
                Exception_Subscription_Submit.InitialData.Exceptions[i].EmpID,
                Exception_Subscription_Submit.InitialData.Exceptions[i].Name,
                Exception_Subscription_Submit.InitialData.Exceptions[i].Department,
                Exception_Subscription_Submit.InitialData.Exceptions[i].Amount,
                isUsed
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
Exception_Subscription_Submit.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Exception_Subscription_Submit.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Exception_Subscription_Submit.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Exception_Subscription_Submit.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Exception_Subscription_Submit.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save exception data
Exception_Subscription_Submit.CustomMethods.AjaxCall.Save = function (empID, amount, notes) {

    var submittedData = {};
    submittedData.EmpID = empID;
    submittedData.Amount = amount;
    submittedData.Notes = notes;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Exception_Subscription_Submit.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Exception_Subscription_Submit.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = Exception_Subscription_Submit.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = Exception_Subscription_Submit.CustomMethods.Callback.Save_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Delete exception data
Exception_Subscription_Submit.CustomMethods.AjaxCall.Delete = function (empID) {

    var submittedData = {};
    submittedData.EmpID = empID;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Exception_Subscription_Submit.ServiceUrl + '/Delete';
    requestOptions.RequestType = "DELETE";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Exception_Subscription_Submit.CustomMethods.Callback.Delete_Success;
    requestOptions.ErrorCallback = Exception_Subscription_Submit.CustomMethods.Callback.Delete_Error;
    requestOptions.CompletedCallback = Exception_Subscription_Submit.CustomMethods.Callback.Delete_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
Exception_Subscription_Submit.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = Exception_Subscription_Submit.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Exception_Subscription_Submit.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = Exception_Subscription_Submit.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = Exception_Subscription_Submit.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = Exception_Subscription_Submit.CustomMethods.Callback.ExportData_Completed;

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
Exception_Subscription_Submit.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Exception_Subscription_Submit.InitialData = jsonObj;

    //Fill the employees dropdown list
    var empList = "";
    for (var i = 0; i < jsonObj.Employees.length; i++) {
        var id = jsonObj.Employees[i].EmployeeNumber;
        var name = jsonObj.Employees[i].Name;
        empList += '<option value="' + id + '">' + id + " / " + name + '</option>';
    }

    if (empList != '') {
        $('#' + Exception_Subscription_Submit.uiElements.lstEmployees).html(empList);
        $('#' + Exception_Subscription_Submit.uiElements.lstEmployees).val('');
    }

    //Fill the exceptions table
    Exception_Subscription_Submit.CustomMethods.LocalOperations.PopulateExceptionsTable();

    //$('#' + Exception_Subscription_Submit.uiElements.txtEmployeeNumber).val(jsonObj.EmployeeNumber);
    //$('#' + Exception_Subscription_Submit.uiElements.txtName).val(jsonObj.Name);
    //$('#' + Exception_Subscription_Submit.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.Date));
    //$('#' + Exception_Subscription_Submit.uiElements.txtDepartment).val(jsonObj.Department);
    //$('#' + Exception_Subscription_Submit.uiElements.txtPosition).val(jsonObj.Position);
    //$('#' + Exception_Subscription_Submit.uiElements.txtRemainingLoanAmount).val(jsonObj.RemainingLoanAmount);
    //$('#' + Exception_Subscription_Submit.uiElements.txtTotalLoanAmount).val(jsonObj.RemainingLoanAmount);


    Exception_Subscription_Submit.InitialDataReady = true;

};

Exception_Subscription_Submit.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Exception_Subscription_Submit.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save data
Exception_Subscription_Submit.CustomMethods.Callback.Save_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, null, "success");
        //Wait 3 seconds for the message then, refresh the page
        setTimeout(function () {
            //location.replace("Subscription.html");
            location.reload();
        }, 3000);
    } else {
        var msg = "";
        switch (jsonObj) {
            case "AlreadyUsed":
                msg = "تم إستخدام هذا الإستثناء ولا يمكن التعديل فيه.";
                break;
            case "WillBeUsed":
                msg = "يوجد طلب اشتراك معلق يعتمد على هذا الإستثناء.";
                break;
            default:

                break;
        }
        Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
        $('#' + Exception_Subscription_Submit.uiElements.btnSave).show();
    }





};

Exception_Subscription_Submit.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {
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
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام طلبك الأن.", null, 0, "error");
        $('#' + Exception_Subscription_Submit.uiElements.btnSave).show();
    }




};

Exception_Subscription_Submit.CustomMethods.Callback.Save_Completed = function (xhr, status) {

};

//Delete data
Exception_Subscription_Submit.CustomMethods.Callback.Delete_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم الحذف.", null, null, "success");
        //Wait 3 seconds for the message then, refresh the page
        setTimeout(function () {
            //location.replace("Subscription.html");
            location.reload();
        }, 3000);
    } else {
        var msg = "";
        switch (jsonObj) {
            case "AlreadyUsed":
                msg = "تم إستخدام هذا الإستثناء ولا يمكن حذفة.";
                break;
            case "WillBeUsed":
                msg = "يوجد طلب اشتراك معلق يعتمد على هذا الإستثناء.";
                break;
            default:

                break;
        }
        Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
    }





};

Exception_Subscription_Submit.CustomMethods.Callback.Delete_Error = function (xhr, status, errorThrown) {
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
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام طلبك الأن.", null, 0, "error");
    }




};

Exception_Subscription_Submit.CustomMethods.Callback.Delete_Completed = function (xhr, status) {

};

//Export data
Exception_Subscription_Submit.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.URL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + Exception_Subscription_Submit.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Exception_Subscription_Submit.uiElements.btnExport).show();

    }, 5000);


};

Exception_Subscription_Submit.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

Exception_Subscription_Submit.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};




