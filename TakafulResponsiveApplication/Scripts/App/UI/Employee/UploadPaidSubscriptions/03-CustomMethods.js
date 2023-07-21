
if (typeof Employee_UploadPaidSubscriptions === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_UploadPaidSubscriptions = {};
}

//Add the event handlers container object to the main namespace
Employee_UploadPaidSubscriptions.CustomMethods = {};

//Add the event handlers container object to the main namespace
Employee_UploadPaidSubscriptions.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Employee_UploadPaidSubscriptions.uiElements.txtEmployeeNumber).val('');
    $('#' + Employee_UploadPaidSubscriptions.uiElements.txtDate).val('');
    $('#' + Employee_UploadPaidSubscriptions.uiElements.chkEmployees).prop('checked', false);
    $('#' + Employee_UploadPaidSubscriptions.uiElements.tblEmployees).empty();

    //The next two lines for resetting the file select control
    $('#' + Employee_UploadPaidSubscriptions.uiElements.filUpload).wrap('<form>').closest('form').get(0).reset(); //For file input control
    $('#' + Employee_UploadPaidSubscriptions.uiElements.filUpload).unwrap();  //For file input control
    $('#' + Employee_UploadPaidSubscriptions.uiElements.progUpload).hide();
    $('#' + Employee_UploadPaidSubscriptions.uiElements.btnCancelUpload).hide();

};

//Populate the employees UI table with the array data
Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.PopulateEmployeesTable = function () {

    var htmlData = '';

    if (Employee_UploadPaidSubscriptions.Employees.length > 0) {
        for (var i = 0; i < Employee_UploadPaidSubscriptions.Employees.length; i++) {
            var isSelected = '';

            if (Employee_UploadPaidSubscriptions.Employees[i].IsSelected == true) {
                isSelected = 'checked=checked';
            }

            htmlData += '<tr>' +
                '<td>' + Employee_UploadPaidSubscriptions.Employees[i].EmployeeNumber + '</td>' +
                '<td class="hide-for-small">' + Employee_UploadPaidSubscriptions.Employees[i].Name + '</td>' +
                '<td>' + Takaful.CommonMethods.GetFormattedDate(Employee_UploadPaidSubscriptions.Employees[i].LastTransactionDate) + '</td>' +
                '<td class="hide-for-small">' + Employee_UploadPaidSubscriptions.Employees[i].TotalSubscriptionAmount + '</td>' +
                '<td class="hide-for-small">' + Employee_UploadPaidSubscriptions.Employees[i].CurrentSubscriptionAmount + '</td>' +
                '<td><input id="txt_' + i.toString() + '" type="number" onchange="Employee_UploadPaidSubscriptions.EventHandlers.txtAmount_onchange(' + i.toString() + ')" value="' + Employee_UploadPaidSubscriptions.Employees[i].CurrentPaidAmount + '" /></td>' +
                '<td class="text-center"><input id="chk_' + i.toString() + '" type="checkbox" onchange="Employee_UploadPaidSubscriptions.EventHandlers.chkApprove_onchange(' + i.toString() + ')" ' + isSelected + ' /></td>' +
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

    $('#' + Employee_UploadPaidSubscriptions.uiElements.tblEmployees).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');

};

//Validate the amount
Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.IsValidAmount = function (amount) {

    //var amount = $("#txt_" + index.toString()).val();

    if (isNaN(amount) || amount == '') {
        amount = 0;
    }

    amount *= 1;

    if (amount == 0) {
        return false;
    }

    return true;

};

//Build the json collection to be saved
Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.BuildJsonCollection = function () {

    var dataCollection = [];
    var tDate = Takaful.CommonMethods.GetFormattedDate($('#' + Employee_UploadPaidSubscriptions.uiElements.txtDate).val());

    for (var i = 0; i < Employee_UploadPaidSubscriptions.Employees.length; i++) {
        if (Employee_UploadPaidSubscriptions.Employees[i].IsSelected == true) {
            if (Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.IsValidAmount(Employee_UploadPaidSubscriptions.Employees[i].CurrentPaidAmount) == true) {  //If amount a valid amount
                var temp = {};
                temp.EmployeeNumber = Employee_UploadPaidSubscriptions.Employees[i].EmployeeNumber;
                temp.Amount = Employee_UploadPaidSubscriptions.Employees[i].CurrentPaidAmount;
                temp.TransactionDate = tDate;
                dataCollection.push(temp);
            }
        }
    }

    return JSON.stringify(dataCollection);

};

//Check if employee exists
Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.IsEmployeeExists = function (empID) {

    for (var i = 0; i < Employee_UploadPaidSubscriptions.Employees.length; i++) {
        if (Employee_UploadPaidSubscriptions.Employees[i].EmployeeNumber == empID) {
            return true;
        }
    }

    return false;

};

//Prepare data for export
Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];

    //Add header
    dataArr.push([
        "الرقم الوظيفى",
        "الاسم",
        "تاريخ اخر احتساب",
        "رصيد الاشتراك",
        "قيمة الاشتراك",
        "المبلغ المسدد"
    ]);

    if (Employee_UploadPaidSubscriptions.Employees.length > 0) {
        for (var i = 0; i < Employee_UploadPaidSubscriptions.Employees.length; i++) {
            var arrElement = [
                Employee_UploadPaidSubscriptions.Employees[i].EmployeeNumber,
                Employee_UploadPaidSubscriptions.Employees[i].Name,
                Takaful.CommonMethods.GetFormattedDate(Employee_UploadPaidSubscriptions.Employees[i].LastTransactionDate),
                Employee_UploadPaidSubscriptions.Employees[i].TotalSubscriptionAmount,
                Employee_UploadPaidSubscriptions.Employees[i].CurrentSubscriptionAmount,
                Employee_UploadPaidSubscriptions.Employees[i].CurrentPaidAmount
            ];

            dataArr.push(arrElement);
        }
    }

    var jObj = JSON.stringify(dataArr);


    return jObj;
};

//Update total paid amount
Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.UpdateTotalPaidAmount = function () {

    var totalPaid = 0;

    for (var i = 0; i < Employee_UploadPaidSubscriptions.Employees.length; i++) {
        if (Employee_UploadPaidSubscriptions.Employees[i].IsSelected == true) {
            totalPaid += Employee_UploadPaidSubscriptions.Employees[i].CurrentPaidAmount;
        }
    }

    $("#" + Employee_UploadPaidSubscriptions.uiElements.txtTotalPaid).val(totalPaid);

};


//Ajax functions
//--------------

//Get uploaded data
Employee_UploadPaidSubscriptions.CustomMethods.AjaxCall.GetUploadedData = function (uploadedFileName) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_UploadPaidSubscriptions.ServiceUrl + '/UploadedData?fileName=' + uploadedFileName;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Employee_UploadPaidSubscriptions.CustomMethods.Callback.GetUploadedData_Success;
    requestOptions.ErrorCallback = Employee_UploadPaidSubscriptions.CustomMethods.Callback.GetUploadedData_Error;
    requestOptions.CompletedCallback = Employee_UploadPaidSubscriptions.CustomMethods.Callback.GetUploadedData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save
Employee_UploadPaidSubscriptions.CustomMethods.AjaxCall.Save = function () {

    var data = Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.BuildJsonCollection();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_UploadPaidSubscriptions.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = data;
    requestOptions.SuccessCallback = Employee_UploadPaidSubscriptions.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = Employee_UploadPaidSubscriptions.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = Employee_UploadPaidSubscriptions.CustomMethods.Callback.Save_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
Employee_UploadPaidSubscriptions.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_UploadPaidSubscriptions.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = Employee_UploadPaidSubscriptions.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = Employee_UploadPaidSubscriptions.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = Employee_UploadPaidSubscriptions.CustomMethods.Callback.ExportData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Callback functions
//------------------

//Get uploaded data
Employee_UploadPaidSubscriptions.CustomMethods.Callback.GetUploadedData_Success = function (jsonObj) {

    //Hide loading
    Takaful.CommonMethods.HideLoading();

    //if (!jsonObj || !jsonObj.Employees) {
    //    return;
    //}

    if (jsonObj.Message == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم تحميل البيانات.", null, null, "success");
    } else if (jsonObj.ErrorDataMessage == "") {
        Takaful.CommonMethods.ShowInfoMsg("نوع الملف غير مطابق أو الملف غير مهيأ للرفع ، تأكد من تحميل أخر إصدار لملف قالب الرفع من على النظام.", null, null, "error");
    }

    Employee_UploadPaidSubscriptions.Employees = jsonObj.Employees;

    //Fill the employees table
    Employee_UploadPaidSubscriptions.CustomMethods.LocalOperations.PopulateEmployeesTable();

    if (jsonObj.Employees.length > 0) {
        $('#' + Employee_UploadPaidSubscriptions.uiElements.btnSave).show();
    } else {
        $('#' + Employee_UploadPaidSubscriptions.uiElements.btnSave).hide();
    }


    //Show the upload button
    $("#" + Employee_UploadPaidSubscriptions.uiElements.btnUpload).show();

    //Reset the file upload control
    $('#' + Employee_UploadPaidSubscriptions.uiElements.filUpload).wrap('<form>').closest('form').get(0).reset(); //For file input control
    $('#' + Employee_UploadPaidSubscriptions.uiElements.filUpload).unwrap();  //For file input control

};

Employee_UploadPaidSubscriptions.CustomMethods.Callback.GetUploadedData_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    //Show the upload button
    $("#" + Employee_UploadPaidSubscriptions.uiElements.btnUpload).show();

    //Hide loading
    Takaful.CommonMethods.HideLoading();

    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../User/Login.html");
    } else if (xhr.responseText == "BadRequest") {
        Takaful.CommonMethods.ShowInfoMsg("نوع الملف غير مطابق أو الملف غير مهيأ للرفع ، تأكد من تحميل أخر إصدار لملف قالب الرفع من على النظام.", null, null, "error");
    } else {
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    }



};

Employee_UploadPaidSubscriptions.CustomMethods.Callback.GetUploadedData_Completed = function (xhr, status) {

};

//Save
Employee_UploadPaidSubscriptions.CustomMethods.Callback.Save_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    //Hide loading
    Takaful.CommonMethods.HideLoading();

    if (jsonObj.Message == "True") {
        Takaful.CommonMethods.ShowInfoMsg("عدد المعاملات المسجلة : " + jsonObj.TransactionCount + "<br/>اجمالى المبلغ الدائن : " + jsonObj.TotalCredit + "<br/>اجمالى المبلغ المدين : " + jsonObj.TotalDebit + "", null, 0, "success");
        $('#' + Employee_UploadPaidSubscriptions.uiElements.btnSave).hide();
        //setTimeout(function () {
        //    window.history.back();
        //}, 5000);
        return;
    } else {
        if (jsonObj == "NotValid") {
            Takaful.CommonMethods.ShowInfoMsg("البيانات غير سليمة ولا تحقق الشروط المطلوبة.", null, 0, "error");
            return;
        }
    }


};

Employee_UploadPaidSubscriptions.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    //Hide loading
    Takaful.CommonMethods.HideLoading();

    if (xhr.responseText == "NotAuthorized") {
        //Redirect to login page
        location.replace("../User/Login.html");
    } else {
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام طلبك الأن.", null, 0, "error");
    }




};

Employee_UploadPaidSubscriptions.CustomMethods.Callback.Save_Completed = function (xhr, status) {

};

//Export data
Employee_UploadPaidSubscriptions.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.URL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + Employee_UploadPaidSubscriptions.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Employee_UploadPaidSubscriptions.uiElements.btnExport).show();

    }, 5000);


};

Employee_UploadPaidSubscriptions.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

Employee_UploadPaidSubscriptions.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};


