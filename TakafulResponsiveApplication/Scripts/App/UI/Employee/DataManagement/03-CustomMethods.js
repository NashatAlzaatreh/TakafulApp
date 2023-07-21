
if (typeof Employee_DataManagement === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_DataManagement = {};
}

//Add the event handlers container object to the main namespace
Employee_DataManagement.CustomMethods = {};

//Add the event handlers container object to the main namespace
Employee_DataManagement.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Employee_DataManagement.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Employee_DataManagement.uiElements.btnUpdateFromGRP).hide();
    $('#' + Employee_DataManagement.uiElements.txtEmployeeNumber).val('');
    $('#' + Employee_DataManagement.uiElements.txtName).val('');
    $('#' + Employee_DataManagement.uiElements.txtPosition).val('');
    $('#' + Employee_DataManagement.uiElements.txtDepartment).val('');
    $('#' + Employee_DataManagement.uiElements.txtJoinDate).val('');
    $('#' + Employee_DataManagement.uiElements.txtJobDegree).val('');
    $('#' + Employee_DataManagement.uiElements.txtSalary).val('');
    $('#' + Employee_DataManagement.uiElements.txtEndServiceBenefits).val('');
    $('#' + Employee_DataManagement.uiElements.txtNationality).val('');
    $('#' + Employee_DataManagement.uiElements.lstGender).val('1');
    $('#' + Employee_DataManagement.uiElements.chkIsCitizen).prop('checked', false);
    $('#' + Employee_DataManagement.uiElements.txtBirthDate).val('');
    $('#' + Employee_DataManagement.uiElements.txtEmail).val('');
    $('#' + Employee_DataManagement.uiElements.txtMobile).val('');
    $('#' + Employee_DataManagement.uiElements.tblEmployees).empty();

    //The next two lines for resetting the file select control
    $('#' + Employee_DataManagement.uiElements.filUpload).wrap('<form>').closest('form').get(0).reset(); //For file input control
    $('#' + Employee_DataManagement.uiElements.filUpload).unwrap();  //For file input control
    $('#' + Employee_DataManagement.uiElements.progUpload).hide();
    $('#' + Employee_DataManagement.uiElements.btnCancelUpload).hide();


};

//Populate the UI table with the array data
Employee_DataManagement.CustomMethods.LocalOperations.PopulateEmployeesTable = function () {

    var htmlData = '';

    if (Employee_DataManagement.Employees.length > 0) {
        for (var i = 0; i < Employee_DataManagement.Employees.length; i++) {

            //var isUsed = "تم إستخدامة";
            //if (Employee_DataManagement.InitialData.Employees[i].IsUsed == false) {
            //    isUsed = "لم يتم إستخدامة";
            //}


            htmlData += '<tr>' +
                '<td class="">' + Employee_DataManagement.Employees[i].EmployeeNumber + '</td>' +
                '<td>' + Employee_DataManagement.Employees[i].Name + '</td>' +
                '<td class="hide-for-small">' + Employee_DataManagement.Employees[i].Position + '</td>' +
                '<td class="hide-for-small">' + Employee_DataManagement.Employees[i].Department + '</td>' +
                '<td class="hide-for-small">' + Takaful.CommonMethods.GetFormattedDate(Employee_DataManagement.Employees[i].JoinDate) + '</td>' +
                '<td class="hide-for-small">' + Employee_DataManagement.Employees[i].Salary + '</td>' +
                '<td>' +
                    '<div class="row collapse">' +
                        '<div class="large-6 columns" onclick="Employee_DataManagement.EventHandlers.btnEdit_click(' + i.toString() + ')"><div class="subscribe-btn3"><i class="fa fa-edit"></i></div></div>' +
                        '<div class="large-6  columns" onclick="Employee_DataManagement.EventHandlers.btnDelete_click(' + i.toString() + ')"><div class="subscribe-btn3"><i class="fa fa-remove"></i></div></div>' +
                    '</div>' +
                '</td>' +
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

    $('#' + Employee_DataManagement.uiElements.tblEmployees).html(htmlData);

    //Initialize data table
    Takaful.CommonMethods.InitializeDataTable('mainTable');


};

//Search for employee
Employee_DataManagement.CustomMethods.LocalOperations.SearchForEmployee = function () {

    var empID = $('#' + Employee_DataManagement.uiElements.txtEmployeeNumber).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(empID, false) == false) {
        $('#' + Employee_DataManagement.uiElements.txtEmployeeNumber).focus();
        Takaful.CommonMethods.ShowInfoMsg("ادخل الرقم الوظيفى.", null, null, "error");
        return;
    }

    empID *= 1;

    //Clear the ui
    Employee_DataManagement.EventHandlers.btnCancelEdit_click();
    $('#' + Employee_DataManagement.uiElements.txtEmployeeNumber).val(empID);

    //Search for the employee
    for (var i = 0; i < Employee_DataManagement.Employees.length; i++) {
        if (Employee_DataManagement.Employees[i].EmployeeNumber == empID) { //Load the employee in edit mode
            Employee_DataManagement.EventHandlers.btnEdit_click(i);
            return;
        }
    }

    var fYes = function () {
        Employee_DataManagement.CustomMethods.AjaxCall.GetEmployeeData(empID);
    };

    Takaful.CommonMethods.ShowConfirmMsg("هذا الرقم الوظيفى غير مسجل بداخل النظام ، هل تريد البحث فى قاعدة بيانات الحكومة الذكية؟.", fYes, "تأكيد");

};

//Prepare data for export
Employee_DataManagement.CustomMethods.LocalOperations.PrepareDataForExport = function () {

    var dataArr = [];

    //Add header
    dataArr.push([
        "الرقم الوظيفى",
        "الاسم",
        "الوظيفة",
        "الإدارة",
        "تاريخ التعيين",
        "الدرجة الوظيفية",
        "الراتب",
        "مكافأة نهاية الخدمة",
        "الجنسية",
        "الجنس",
        "مواطن",
        "تاريخ الميلاد",
        "البريد الإلكترونى",
        "الهاتف الجوال"
    ]);

    if (Employee_DataManagement.Employees.length > 0) {
        for (var i = 0; i < Employee_DataManagement.Employees.length; i++) {
            var gender = "";
            var isCitizen = "لا";

            if (Employee_DataManagement.Employees[i].Gender == 1) {
                gender = "ذكر";
            } else if (Employee_DataManagement.Employees[i].Gender == 2) {
                gender = "أنثى";
            }

            if (Employee_DataManagement.Employees[i].IsCitizen == true) {
                isCitizen = "نعم";
            }

            var arrElement = [
                Employee_DataManagement.Employees[i].EmployeeNumber,
                Employee_DataManagement.Employees[i].Name,
                Employee_DataManagement.Employees[i].Position,
                Employee_DataManagement.Employees[i].Department,
                Takaful.CommonMethods.GetFormattedDate(Employee_DataManagement.Employees[i].JoinDate),
                Employee_DataManagement.Employees[i].JobDegree,
                Employee_DataManagement.Employees[i].Salary,
                Employee_DataManagement.Employees[i].EndServiceBenefits,
                Employee_DataManagement.Employees[i].Nationality,
                gender,
                isCitizen,
                Takaful.CommonMethods.GetFormattedDate(Employee_DataManagement.Employees[i].BirthDate),
                Employee_DataManagement.Employees[i].Email,
                Employee_DataManagement.Employees[i].Mobile
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
Employee_DataManagement.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_DataManagement.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Employee_DataManagement.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Employee_DataManagement.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Employee_DataManagement.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save data
Employee_DataManagement.CustomMethods.AjaxCall.Save = function (id, empNumber, empName, position, department, joinDate, degree, salary, endService, nationality, gender, isCitizen, birthDate, email, mobile) {

    var submittedData = {};
    submittedData.ID = id;
    submittedData.EmpNumber = empNumber;
    submittedData.Name = empName;
    submittedData.Position = position;
    submittedData.Department = department;
    submittedData.JoinDate = joinDate;
    submittedData.Degree = degree;
    submittedData.Salary = salary;
    submittedData.EndService = endService;
    submittedData.Nationality = nationality;
    submittedData.Gender = gender;
    submittedData.IsCitizen = isCitizen;
    submittedData.BirthDate = birthDate;
    submittedData.Email = email;
    submittedData.Mobile = mobile;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_DataManagement.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Employee_DataManagement.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = Employee_DataManagement.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = Employee_DataManagement.CustomMethods.Callback.Save_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Delete exception data
Employee_DataManagement.CustomMethods.AjaxCall.Delete = function (empID) {

    var submittedData = {};
    submittedData.EmpID = empID;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_DataManagement.ServiceUrl + '/Delete';
    requestOptions.RequestType = "DELETE";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Employee_DataManagement.CustomMethods.Callback.Delete_Success;
    requestOptions.ErrorCallback = Employee_DataManagement.CustomMethods.Callback.Delete_Error;
    requestOptions.CompletedCallback = Employee_DataManagement.CustomMethods.Callback.Delete_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Export data
Employee_DataManagement.CustomMethods.AjaxCall.ExportData = function () {

    var exportData = Employee_DataManagement.CustomMethods.LocalOperations.PrepareDataForExport();

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_DataManagement.ServiceUrl + '/Export';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = exportData;
    requestOptions.SuccessCallback = Employee_DataManagement.CustomMethods.Callback.ExportData_Success;
    requestOptions.ErrorCallback = Employee_DataManagement.CustomMethods.Callback.ExportData_Error;
    requestOptions.CompletedCallback = Employee_DataManagement.CustomMethods.Callback.ExportData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Get employee data from GRP system
Employee_DataManagement.CustomMethods.AjaxCall.GetEmployeeData = function (empID) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_DataManagement.ServiceUrl + '/GRP?empID=' + empID;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Employee_DataManagement.CustomMethods.Callback.GetEmployeeData_Success;
    requestOptions.ErrorCallback = Employee_DataManagement.CustomMethods.Callback.GetEmployeeData_Error;
    requestOptions.CompletedCallback = Employee_DataManagement.CustomMethods.Callback.GetEmployeeData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};


//Callback functions
//------------------

//Get initial data
Employee_DataManagement.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Employee_DataManagement.Employees = jsonObj;

    //Fill the exceptions table
    Employee_DataManagement.CustomMethods.LocalOperations.PopulateEmployeesTable();

    Employee_DataManagement.InitialDataReady = true;

};

Employee_DataManagement.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Employee_DataManagement.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save data
Employee_DataManagement.CustomMethods.Callback.Save_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    //Employee_DataManagement.CurrentIndex = -1;  //Reset the selected item


    if (jsonObj.Message == "True") {
        Employee_DataManagement.Employees = jsonObj.Employees;  //Store the data to local object
        Employee_DataManagement.CustomMethods.LocalOperations.PopulateEmployeesTable();    //Populate the data to UI table
        Employee_DataManagement.EventHandlers.btnCancelEdit_click();
        Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, null, "success");
    } else {
        var msg = "";
        switch (jsonObj.Message) {
            case "EmployeeNumberExists":
                msg = "الرقم الوظيفى مسجل من قبل.";
                break;
            case "EmailExists":
                msg = "البريد الإلكترونى مسجل من قبل.";
                break;
            case "MobileExists":
                msg = "رقم الهاتف الجوال مسجل من قبل.";
                break;
            case "EmployeeServiceViolation":
                msg = "لا يمكن تحديث مبلغ الراتب أو مكافأة نهاية الخدمة مرتين فى نفس اليوم.";
                break;
            default:

                break;
        }
        Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
    }

    $('#' + Employee_DataManagement.uiElements.btnSave).show();



};

Employee_DataManagement.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {
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
        $('#' + Employee_DataManagement.uiElements.btnSave).show();
    }




};

Employee_DataManagement.CustomMethods.Callback.Save_Completed = function (xhr, status) {

};

//Delete data
Employee_DataManagement.CustomMethods.Callback.Delete_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj.Message == "True") {
        Employee_DataManagement.Employees = jsonObj.Employees;  //Store the data to local object
        Employee_DataManagement.CustomMethods.LocalOperations.PopulateEmployeesTable();    //Populate the data to UI table
        Employee_DataManagement.EventHandlers.btnCancelEdit_click();
        Takaful.CommonMethods.ShowInfoMsg("تم الحذف.", null, null, "success");
    } else if (jsonObj.Message == "DataRelationExists") {
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_ErrorDeleteWithRelatedData, null, 0, "error");
        return;
    }



};

Employee_DataManagement.CustomMethods.Callback.Delete_Error = function (xhr, status, errorThrown) {
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

Employee_DataManagement.CustomMethods.Callback.Delete_Completed = function (xhr, status) {

};

//Export data
Employee_DataManagement.CustomMethods.Callback.ExportData_Success = function (jsonObj) {

    if (!jsonObj || !jsonObj.URL || !jsonObj.Name) {
        return;
    }

    var encodedUri = encodeURI(jsonObj.FullURL);
    //window.open(encodedUri);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "ParticipantAttendance.csv");
    link.click();

    $("#" + Employee_DataManagement.uiElements.btnExport).hide();

    //Delete the file from server after 5 seconds
    setTimeout(function () {
        //delete
        Takaful.CommonMethods.DeleteTempFile(jsonObj.Name, null, null, null);

        //Show export button
        $("#" + Employee_DataManagement.uiElements.btnExport).show();

    }, 10000);


};

Employee_DataManagement.CustomMethods.Callback.ExportData_Error = function (xhr, status, errorThrown) {
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

Employee_DataManagement.CustomMethods.Callback.ExportData_Completed = function (xhr, status) {

};

//Get employee data from GRP system
Employee_DataManagement.CustomMethods.Callback.GetEmployeeData_Success = function (jsonObj) {

    //Hide loading
    Takaful.CommonMethods.HideLoading();

    if (!jsonObj) {
        Takaful.CommonMethods.ShowInfoMsg("هذا الرقم الوظيفى غير مسجل بقاعدة بيانات الحكومة الذكية.", null, null, "info");
        return;
    }

    //Clear the UI
    //Employee number & name
    $('#' + Employee_DataManagement.uiElements.txtName).val('');
    //Position
    $('#' + Employee_DataManagement.uiElements.txtPosition).val('');
    //Department
    $('#' + Employee_DataManagement.uiElements.txtDepartment).val('');
    //Join date
    $('#' + Employee_DataManagement.uiElements.txtJoinDate).val('');
    //Degree
    $('#' + Employee_DataManagement.uiElements.txtJobDegree).val('');
    //Salary
    $('#' + Employee_DataManagement.uiElements.txtSalary).val('');
    //EndServiceBenefits
    $('#' + Employee_DataManagement.uiElements.txtEndServiceBenefits).val('');
    //Nationality
    $('#' + Employee_DataManagement.uiElements.txtNationality).val('');
    //Gender
    $('#' + Employee_DataManagement.uiElements.lstGender).val('1');
    //IsCitizen
    $('#' + Employee_DataManagement.uiElements.chkIsCitizen).prop('checked', false);
    //BirthDate
    $('#' + Employee_DataManagement.uiElements.txtBirthDate).val('');
    //Email
    $('#' + Employee_DataManagement.uiElements.txtEmail).val('');
    //Mobile
    $('#' + Employee_DataManagement.uiElements.txtMobile).val('');

    //Load data to UI
    //Employee number & name
    $('#' + Employee_DataManagement.uiElements.txtEmployeeNumber).val(jsonObj.EmployeeNumber);
    $('#' + Employee_DataManagement.uiElements.txtName).val(jsonObj.Name);

    //Position
    $('#' + Employee_DataManagement.uiElements.txtPosition).val(jsonObj.Position);

    //Department
    $('#' + Employee_DataManagement.uiElements.txtDepartment).val(jsonObj.Department);

    //Join date
    var date = Takaful.CommonMethods.GetFormattedDate(jsonObj.JoinDate);
    if (date != '') {
        $('#' + Employee_DataManagement.uiElements.txtJoinDate).fdatepicker('update', date);
    } else {
        $('#' + Employee_DataManagement.uiElements.txtJoinDate).val('');
    }

    //Degree
    $('#' + Employee_DataManagement.uiElements.txtJobDegree).val(jsonObj.JobDegree);

    //Salary
    $('#' + Employee_DataManagement.uiElements.txtSalary).val(jsonObj.Salary);

    //EndServiceBenefits
    $('#' + Employee_DataManagement.uiElements.txtEndServiceBenefits).val(jsonObj.EndServiceBenefits);

    //Nationality
    $('#' + Employee_DataManagement.uiElements.txtNationality).val(jsonObj.Nationality);

    //Gender
    $('#' + Employee_DataManagement.uiElements.lstGender).val(jsonObj.Gender);

    //IsCitizen
    $('#' + Employee_DataManagement.uiElements.chkIsCitizen).prop('checked', jsonObj.IsCitizen);

    //BirthDate
    date = Takaful.CommonMethods.GetFormattedDate(jsonObj.BirthDate);
    if (date != '') {
        $('#' + Employee_DataManagement.uiElements.txtBirthDate).fdatepicker('update', date);
    } else {
        $('#' + Employee_DataManagement.uiElements.txtBirthDate).val('');
    }

    //Email
    $('#' + Employee_DataManagement.uiElements.txtEmail).val(jsonObj.Email);

    //Mobile
    $('#' + Employee_DataManagement.uiElements.txtMobile).val(jsonObj.Mobile);


};

Employee_DataManagement.CustomMethods.Callback.GetEmployeeData_Error = function (xhr, status, errorThrown) {
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
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");
    }




};

Employee_DataManagement.CustomMethods.Callback.GetEmployeeData_Completed = function (xhr, status) {

};




