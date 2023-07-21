//const { regions } = require("modernizr");

if (typeof Request_NewLoan_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_NewLoan_Submit = {};
}

//Add the event handlers container object to the main namespace
Request_NewLoan_Submit.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_NewLoan_Submit.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_NewLoan_Submit.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Request_NewLoan_Submit.uiElements.txtEmployeeNumber).val('');
    $('#' + Request_NewLoan_Submit.uiElements.txtName).val('');
    $('#' + Request_NewLoan_Submit.uiElements.txtDate).val('');
    $('#' + Request_NewLoan_Submit.uiElements.txtDepartment).val('');
    $('#' + Request_NewLoan_Submit.uiElements.txtPosition).val('');
    $('#' + Request_NewLoan_Submit.uiElements.txtAmount).val('');
    $('#' + Request_NewLoan_Submit.uiElements.txtRemainingLoanAmount).val('');
    $('#' + Request_NewLoan_Submit.uiElements.txtTotalLoanAmount).val('');
    $('#' + Request_NewLoan_Submit.uiElements.txtInstallment).val('');
    $('#' + Request_NewLoan_Submit.uiElements.txtNotes).val('');


};


//Ajax functions
//--------------

//Get initial data
Request_NewLoan_Submit.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_NewLoan_Submit.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_NewLoan_Submit.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_NewLoan_Submit.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_NewLoan_Submit.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Submit request
Request_NewLoan_Submit.CustomMethods.AjaxCall.Submit = function (loanAmount, installmentAmount, notes) {

    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Azad 2022-10-17 Disable block submit new Load even 2023
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Takaful.CommonMethods.ShowInfoMsg("تم إيقاف استلام طلبات القروض حتى نهاية العام 2022", null, 0, "warning");
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Azad 2023-03-17 Re-Enable to submit new Load in 2023
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var submittedData = {};
    submittedData.LoanAmount = loanAmount;
    submittedData.InstallmentAmount = installmentAmount;
    submittedData.Notes = notes;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_NewLoan_Submit.ServiceUrl + '/Submit';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Request_NewLoan_Submit.CustomMethods.Callback.Submit_Success;
    requestOptions.ErrorCallback = Request_NewLoan_Submit.CustomMethods.Callback.Submit_Error;
    requestOptions.CompletedCallback = Request_NewLoan_Submit.CustomMethods.Callback.Submit_Completed;

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};


//Callback functions
//------------------

//Get initial data
Request_NewLoan_Submit.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Request_NewLoan_Submit.InitialData = jsonObj;

    $('#' + Request_NewLoan_Submit.uiElements.txtEmployeeNumber).val(jsonObj.EmployeeNumber);
    $('#' + Request_NewLoan_Submit.uiElements.txtName).val(jsonObj.Name);
    $('#' + Request_NewLoan_Submit.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.Date));
    $('#' + Request_NewLoan_Submit.uiElements.txtDepartment).val(jsonObj.Department);
    $('#' + Request_NewLoan_Submit.uiElements.txtPosition).val(jsonObj.Position);
    $('#' + Request_NewLoan_Submit.uiElements.txtRemainingLoanAmount).val(jsonObj.RemainingLoanAmount);
    $('#' + Request_NewLoan_Submit.uiElements.txtTotalLoanAmount).val(jsonObj.RemainingLoanAmount);


    Request_NewLoan_Submit.InitialDataReady = true;

};

Request_NewLoan_Submit.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_NewLoan_Submit.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Submit data
Request_NewLoan_Submit.CustomMethods.Callback.Submit_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("طلبك الآن قيد المراجعة.", null, 0, "success");
    } else {
        var msg = "";
        switch (jsonObj) {
            case "MaxLoanViolation":
                msg = "الحد الأقصى لمبلغ القرض هو: " + Request_NewLoan_Submit.InitialData.MaximumAllowedLoanAmount;
                break;
            case "MaxInstallmentViolation":
                msg = "الحد الأقصى لقيمة القسط هو: " + Request_NewLoan_Submit.InitialData.MaximumLoanInstallmentAmount;
                break;
            case "MinInstallmentViolation":
                msg = "قيمة القسط أقل من الحد الأدنى.";
                break;
            case "AlreadySubmittedRequest":
                msg = "طلبك السابق لازال قيد المراجعة";
                break;
            case "EmployeeNotFound":
                msg = "هذا الرقم الوظيفى غير مسجل على النظام ، يرجى مراجعة إدارة صندوق التكافل.";
                break;
            case "NoValidSubscription":
                msg = "ليس لديك بيانات اشتراك مسجلة.";
                break;
            case "MinimumSubscriptionPeriodViolation":
                msg = "لم تكمل الحد الأدنى لفترة الاشتراك ليكون بإمكانك طلب قرض.";
                break;
            case "SubscriptionCancellationSubmitted":
                msg = "لايمكن تقديم هذا الطلب حيث أنك قمت بتقديم طلب انسحاب من الصندوق.";
                break;
            case "LoanExists":
                msg = "لا يمكن تقديم الطلب حيث أنه لديك قرض فعال.";
                break;
            case "PeriodBetweenLoansExists":
                msg = "لا يمكن طلب قرض جديد قبل مرور فترة السماح بعد القرض الأول.";
                break;
            case "NoJoininDateExist":
                msg = "لا يمكن طلب قرض جديد لعدم وجود تاريخ التحاق الموظف يرجى التواصل مع مدير النظام.";
                break;
            case "JoiningDateLessThanPeriod":
                msg = "لا يمكن طلب قرض جديد قبل مرور فترة السماح من تاريخ إنضمامك الى الدائرة.";
                break;
            case "Loan4ReSubscriberSuT_DateError":
                msg = "لا يمكن طلب قرض جديد لعدم وجود تاريخ اخر الغاء اشتراك.";
                break;
            case "Loan4ReSubscriberLessThanPeriod":
                msg = "لا يمكن طلب قرض جديد قبل مرور فترة السماح من تاريخ اخر الغاء للاشتراك.";
                break;
            default:

                break;
        }
        Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
    }


};

Request_NewLoan_Submit.CustomMethods.Callback.Submit_Error = function (xhr, status, errorThrown) {
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

Request_NewLoan_Submit.CustomMethods.Callback.Submit_Completed = function (xhr, status) {

};








