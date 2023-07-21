
//Check for main namespace
if (typeof Employee_DataManagement === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_DataManagement = {};
}

//Add the event handlers container object to the main namespace
Employee_DataManagement.EventHandlers = {};


//Load the selected employee exception in edit mode
Employee_DataManagement.EventHandlers.btnEdit_click = function (index) {

    if (!(index >= 0)) {
        return;
    }

    //Employee number & name
    $('#' + Employee_DataManagement.uiElements.txtEmployeeNumber).val(Employee_DataManagement.Employees[index].EmployeeNumber);
    $('#' + Employee_DataManagement.uiElements.txtEmployeeNumber).attr('disabled', 'disabled');
    $('#' + Employee_DataManagement.uiElements.txtName).val(Employee_DataManagement.Employees[index].Name);

    //Position
    $('#' + Employee_DataManagement.uiElements.txtPosition).val(Employee_DataManagement.Employees[index].Position);

    //Department
    $('#' + Employee_DataManagement.uiElements.txtDepartment).val(Employee_DataManagement.Employees[index].Department);

    //Join date
    //$('#' + Employee_DataManagement.uiElements.txtJoinDate).val(Takaful.CommonMethods.GetFormattedDate(Employee_DataManagement.Employees[index].JoinDate));

    var date = Takaful.CommonMethods.GetFormattedDate(Employee_DataManagement.Employees[index].JoinDate);
    if (date != '') {
        $('#' + Employee_DataManagement.uiElements.txtJoinDate).fdatepicker('update', date);
    } else {
        $('#' + Employee_DataManagement.uiElements.txtJoinDate).val('');
    }

    //Degree
    $('#' + Employee_DataManagement.uiElements.txtJobDegree).val(Employee_DataManagement.Employees[index].JobDegree);

    //Salary
    $('#' + Employee_DataManagement.uiElements.txtSalary).val(Employee_DataManagement.Employees[index].Salary);

    //EndServiceBenefits
    $('#' + Employee_DataManagement.uiElements.txtEndServiceBenefits).val(Employee_DataManagement.Employees[index].EndServiceBenefits);

    //Nationality
    $('#' + Employee_DataManagement.uiElements.txtNationality).val(Employee_DataManagement.Employees[index].Nationality);

    //Gender
    $('#' + Employee_DataManagement.uiElements.lstGender).val(Employee_DataManagement.Employees[index].Gender);

    //IsCitizen
    $('#' + Employee_DataManagement.uiElements.chkIsCitizen).prop('checked', Employee_DataManagement.Employees[index].IsCitizen);

    //BirthDate
    //$('#' + Employee_DataManagement.uiElements.txtBirthDate).val(Takaful.CommonMethods.GetFormattedDate(Employee_DataManagement.Employees[index].BirthDate));

    date = Takaful.CommonMethods.GetFormattedDate(Employee_DataManagement.Employees[index].BirthDate);
    if (date != '') {
        $('#' + Employee_DataManagement.uiElements.txtBirthDate).fdatepicker('update', date);
    } else {
        $('#' + Employee_DataManagement.uiElements.txtBirthDate).val('');
    }

    //Email
    $('#' + Employee_DataManagement.uiElements.txtEmail).val(Employee_DataManagement.Employees[index].Email);

    //Mobile
    $('#' + Employee_DataManagement.uiElements.txtMobile).val(Employee_DataManagement.Employees[index].Mobile);


    //Cancellation buton
    $('#' + Employee_DataManagement.uiElements.btnCancel).show();
    $('#' + Employee_DataManagement.uiElements.btnUpdateFromGRP).show();

    //Current item index
    Employee_DataManagement.CurrentIndex = index;


};

//Cancel the edit mode
Employee_DataManagement.EventHandlers.btnCancelEdit_click = function () {


    //Employee number & name
    $('#' + Employee_DataManagement.uiElements.txtEmployeeNumber).val('');
    $('#' + Employee_DataManagement.uiElements.txtEmployeeNumber).removeAttr('disabled');
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


    //Cancellation buton
    $('#' + Employee_DataManagement.uiElements.btnCancel).hide();
    $('#' + Employee_DataManagement.uiElements.btnUpdateFromGRP).hide();

    //Current item index
    Employee_DataManagement.CurrentIndex = -1;


};

//Delete the employee exception
Employee_DataManagement.EventHandlers.btnDelete_click = function (index) {


    var yesResult = function () {
        var empID = Employee_DataManagement.Employees[index].EmployeeNumber;

        //Delete exception
        Employee_DataManagement.CustomMethods.AjaxCall.Delete(empID);
    };

    //Confirmation alert
    Takaful.CommonMethods.ShowConfirmMsg("سوف يتم حذف هذا الموظف نهائياً ، هل أنت متأكد؟", yesResult);



};

//Save the employee data
Employee_DataManagement.EventHandlers.btnSave_click = function () {

    //Input validation
    //Employee number
    var empNumber = $("#" + Employee_DataManagement.uiElements.txtEmployeeNumber).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(empNumber, false) == false) {
        $("#" + Employee_DataManagement.uiElements.txtEmployeeNumber).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل الرقم الوظيفى برقم صحيح.", null, null, "error");
        return;
    }

    empNumber *= 1;

    //Employee name
    var empName = $("#" + Employee_DataManagement.uiElements.txtName).val().trim();

    if (empName == '') {
        $("#" + Employee_DataManagement.uiElements.txtName).focus();
        Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل اسم الموظف.", null, null, "error");
        return;
    }

    //Position
    var position = $("#" + Employee_DataManagement.uiElements.txtPosition).val().trim();

    //Department
    var department = $("#" + Employee_DataManagement.uiElements.txtDepartment).val().trim();

    //Join date
    var joinDate = Takaful.CommonMethods.GetFormattedDate($("#" + Employee_DataManagement.uiElements.txtJoinDate).val().trim());

    if (joinDate == '') {
        joinDate = null;
    }

    //Degree
    var degree = $("#" + Employee_DataManagement.uiElements.txtJobDegree).val().trim();

    //Salary
    var salary = $("#" + Employee_DataManagement.uiElements.txtSalary).val().trim();

    if (salary == '') {
        salary = 0;
    } else {
        if (Takaful.CommonMethods.isPositiveInteger(salary, true) == false) {
            $("#" + Employee_DataManagement.uiElements.txtSalary).focus();
            Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل مبلغ الراتب.", null, null, "error");
            return;
        }
    }

    salary *= 1;

    //End service benefits
    var endService = $("#" + Employee_DataManagement.uiElements.txtEndServiceBenefits).val().trim();

    if (endService == '') {
        endService = 0;
    } else {
        if (Takaful.CommonMethods.isPositiveInteger(endService, true) == false) {
            $("#" + Employee_DataManagement.uiElements.txtEndServiceBenefits).focus();
            Takaful.CommonMethods.ShowInfoMsg("من فضلك أدخل مبلغ مكافأة نهاية الخدمة.", null, null, "error");
            return;
        }
    }

    endService *= 1;

    //Nationality
    var nationality = $("#" + Employee_DataManagement.uiElements.txtNationality).val().trim();

    //Gender
    if ($('#' + Employee_DataManagement.uiElements.lstGender)[0].selectedIndex < 0) {
        $('#' + Employee_DataManagement.uiElements.lstGender).focus();
        Takaful.CommonMethods.ShowInfoMsg('من فضلك إختر الجنس.', null, null, "error");
        return;
    }

    var gender = $('#' + Employee_DataManagement.uiElements.lstGender + ' option:selected').val();

    //Citizen
    var isCitizen = $('#' + Employee_DataManagement.uiElements.chkIsCitizen).prop('checked');

    //Birth date
    var birthDate = Takaful.CommonMethods.GetFormattedDate($("#" + Employee_DataManagement.uiElements.txtBirthDate).val().trim());

    if (birthDate == '') {
        birthDate = null;
    }

    //Email
    var email = $("#" + Employee_DataManagement.uiElements.txtEmail).val().trim();

    //Mobile
    var mobile = $("#" + Employee_DataManagement.uiElements.txtMobile).val().trim();

    //Selected employee ID
    var id = 0;

    if (Employee_DataManagement.CurrentIndex >= 0) {
        id = Employee_DataManagement.Employees[Employee_DataManagement.CurrentIndex].EmployeeNumber;
    }

    //Save data
    Employee_DataManagement.CustomMethods.AjaxCall.Save(id, empNumber, empName, position, department, joinDate, degree, salary, endService, nationality, gender, isCitizen, birthDate, email, mobile);

    $('#' + Employee_DataManagement.uiElements.btnSave).hide();

};

//Export button
Employee_DataManagement.EventHandlers.btnExport_onclick = function () {

    if (Employee_DataManagement.Employees.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Employee_DataManagement.CustomMethods.AjaxCall.ExportData();


};

//File upload button
Employee_DataManagement.EventHandlers.btnUpload_onclick = function () {

    //Input validation
    //Check if file is selected
    var file = $('#' + Employee_DataManagement.uiElements.filUpload)[0].files[0];
    if (file == undefined) { //No file attached
        Takaful.CommonMethods.ShowInfoMsg("من فضلك إختر الملف أولاً.", null, null, "error");
        return;
    }

    //Check file size
    if (file.size > (5 * 1024 * 1024)) {
        Takaful.CommonMethods.ShowInfoMsg("أقصى حجم للملف هو 5 ميجابايت.", null, null, "error");
        return;
    }

    //Callback functions
    var uploadComplete = function (e) {

    };

    var uploadError = function (e) {

        //Show the upload button
        $("#" + Employee_DataManagement.uiElements.btnUpload).show();

        //Show error notification
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_Error, null, 0, "error");

    };

    var uploadCancelled = function (e) {

        //Show the upload button
        $("#" + Employee_DataManagement.uiElements.btnUpload).show();
    };

    var uploadAjaxSuccessResult = function (e) {

        //Get the file data from server
        var successF = function (jsonObj) {

            //Hide loading
            Takaful.CommonMethods.HideLoading();

            if (jsonObj.Message == "True") {
                Employee_DataManagement.Employees = jsonObj.Employees;  //Store the data to local object
                Employee_DataManagement.CustomMethods.LocalOperations.PopulateEmployeesTable();    //Populate the data to UI table
                Employee_DataManagement.EventHandlers.btnCancelEdit_click();
                if (jsonObj.ErrorDataMessage == "") {
                    Takaful.CommonMethods.ShowInfoMsg("تم رفع وحفظ البيانات.", null, 0, "success");
                } else {
                    Takaful.CommonMethods.ShowInfoMsg("تم رفع وحفظ البيانات ، ولكن بعض البيانات لم يمكن حفظها لوجود أخطاء بها وأرقامها الوظيفية هى : " + jsonObj.ErrorDataMessage, null, 0, "success");
                }
            }
            //else {
            //    var msg = "";
            //    switch (jsonObj.Message) {
            //        case "EmployeeNumberExists":
            //            msg = "الرقم الوظيفى مسجل من قبل.";
            //            break;
            //        case "EmailExists":
            //            msg = "البريد الإلكترونى مسجل من قبل.";
            //            break;
            //        case "MobileExists":
            //            msg = "رقم الهاتف الجوال مسجل من قبل.";
            //            break;
            //        case "EmployeeServiceViolation":
            //            msg = "لا يمكن تحديث مبلغ الراتب أو مكافأة نهاية الخدمة مرتين فى نفس اليوم.";
            //            break;
            //        default:

            //            break;
            //    }
            //    Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
            //}


            //Show the upload button
            $("#" + Employee_DataManagement.uiElements.btnUpload).show();

            //Reset the file upload control
            $('#' + Employee_DataManagement.uiElements.filUpload).wrap('<form>').closest('form').get(0).reset(); //For file input control
            $('#' + Employee_DataManagement.uiElements.filUpload).unwrap();  //For file input control




        };

        var errorF = function (xhr, status, errorThrown) {

            //Show the upload button
            $("#" + Employee_DataManagement.uiElements.btnUpload).show();

            //Hide loading
            Takaful.CommonMethods.HideLoading();

            if (xhr.responseText == "NotAuthorized") {
                //Redirect to login page
                location.replace("../User/Login.html");
            } else if (xhr.responseText == "BadRequest") {
                Takaful.CommonMethods.ShowInfoMsg("نوع الملف غير مطابق أو الملف غير مهيأ للرفع ، تأكد من تحميل أخر إصدار لملف قالب الرفع من على النظام.", null, null, "error");
            }

        };

        var completeF = function (xhr, status) { };

        //Build the ajax request options
        var requestOptions = new Takaful.Utility.AjaxOptions();
        requestOptions.RequestUrl = Employee_DataManagement.ServiceUrl + '/Upload?fileName=' + e;
        requestOptions.RequestType = "GET";
        requestOptions.DataType = "json";
        requestOptions.SuccessCallback = successF;
        requestOptions.ErrorCallback = errorF;
        requestOptions.CompletedCallback = completeF;

        //Execute the ajax call
        var ajxhndlr = new Takaful.Utility.AjaxHandler();
        ajxhndlr.DoAjaxCommunication(requestOptions);

        //Show loading
        Takaful.CommonMethods.ShowLoading();

    };

    var uploadAjaxErrorResult = function (xhr, status, errorThrowni) {

        //Show the upload button
        $("#" + Employee_DataManagement.uiElements.btnUpload).show();

        //Show error notification
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_Error, null, 0, "error");

    };


    //Hide the upload button until upload complete, aborted or error
    $("#" + Employee_DataManagement.uiElements.btnUpload).hide();

    //Upload the file
    Takaful.CommonMethods.UploadFile(
        file,
        Employee_DataManagement.uiElements.progUpload,
        Employee_DataManagement.uiElements.btnCancelUpload,
        uploadComplete,
        uploadError,
        uploadCancelled,
        uploadAjaxSuccessResult,
        uploadAjaxErrorResult
    );



};

//Update from GRP button
Employee_DataManagement.EventHandlers.btnUpdateFromGRP_click = function () {

    var empID = $('#' + Employee_DataManagement.uiElements.txtEmployeeNumber).val().trim();

    if (Takaful.CommonMethods.isPositiveInteger(empID, false) == false) {
        $('#' + Employee_DataManagement.uiElements.txtEmployeeNumber).focus();
        Takaful.CommonMethods.ShowInfoMsg("ادخل الرقم الوظيفى.", null, null, "error");
        return;
    }

    empID *= 1;


    //Get the data
    Employee_DataManagement.CustomMethods.AjaxCall.GetEmployeeData(empID);

};





