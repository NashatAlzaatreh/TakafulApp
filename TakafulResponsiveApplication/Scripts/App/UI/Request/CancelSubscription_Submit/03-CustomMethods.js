
if (typeof Request_CancelSubscription_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CancelSubscription_Submit = {};
}

//Add the event handlers container object to the main namespace
Request_CancelSubscription_Submit.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_CancelSubscription_Submit.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_CancelSubscription_Submit.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Request_CancelSubscription_Submit.uiElements.txtEmployeeNumber).val('');
    $('#' + Request_CancelSubscription_Submit.uiElements.txtName).val('');
    $('#' + Request_CancelSubscription_Submit.uiElements.txtDate).val('');
    $('#' + Request_CancelSubscription_Submit.uiElements.txtDepartment).val('');
    $('#' + Request_CancelSubscription_Submit.uiElements.txtPosition).val('');
    $('#' + Request_CancelSubscription_Submit.uiElements.txtCurrentAmount).val('');
    $('#' + Request_CancelSubscription_Submit.uiElements.txtTotalSubscription).val('');
    $('#' + Request_CancelSubscription_Submit.uiElements.txtLoanAmount).val('');
    $('#' + Request_CancelSubscription_Submit.uiElements.txtPaidLoanAmount).val('');
    $('#' + Request_CancelSubscription_Submit.uiElements.txtRemainingLoanAmount).val('');
    $('#' + Request_CancelSubscription_Submit.uiElements.txtNotes).val('');


};


//Ajax functions
//--------------

//Get initial data
Request_CancelSubscription_Submit.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CancelSubscription_Submit.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_CancelSubscription_Submit.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_CancelSubscription_Submit.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_CancelSubscription_Submit.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Submit request
Request_CancelSubscription_Submit.CustomMethods.AjaxCall.Submit = function (notes) {

    var subscriptionData = {};
    subscriptionData.Notes = notes;
    var obj = JSON.stringify(subscriptionData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CancelSubscription_Submit.ServiceUrl + '/Submit';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Request_CancelSubscription_Submit.CustomMethods.Callback.Submit_Success;
    requestOptions.ErrorCallback = Request_CancelSubscription_Submit.CustomMethods.Callback.Submit_Error;
    requestOptions.CompletedCallback = Request_CancelSubscription_Submit.CustomMethods.Callback.Submit_Completed;

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
Request_CancelSubscription_Submit.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Request_CancelSubscription_Submit.InitialData = jsonObj;

    $('#' + Request_CancelSubscription_Submit.uiElements.txtEmployeeNumber).val(jsonObj.EmployeeNumber);
    $('#' + Request_CancelSubscription_Submit.uiElements.txtName).val(jsonObj.Name);
    $('#' + Request_CancelSubscription_Submit.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.Date));
    $('#' + Request_CancelSubscription_Submit.uiElements.txtDepartment).val(jsonObj.Department);
    $('#' + Request_CancelSubscription_Submit.uiElements.txtPosition).val(jsonObj.Position);
    if (jsonObj.CurrentSubscriptionAmount != null) {
        $('#' + Request_CancelSubscription_Submit.uiElements.txtCurrentAmount).val(jsonObj.CurrentSubscriptionAmount);
    }

    if (jsonObj.TotalSubscriptionAmount != null) {
        $('#' + Request_CancelSubscription_Submit.uiElements.txtTotalSubscription).val(jsonObj.TotalSubscriptionAmount);
    }

    $('#' + Request_CancelSubscription_Submit.uiElements.txtLoanAmount).val(jsonObj.LoanAmount);
    $('#' + Request_CancelSubscription_Submit.uiElements.txtPaidLoanAmount).val(jsonObj.PaidLoanAmount);
    $('#' + Request_CancelSubscription_Submit.uiElements.txtRemainingLoanAmount).val(jsonObj.RemainingLoanAmount);


    Request_CancelSubscription_Submit.InitialDataReady = true;

};

Request_CancelSubscription_Submit.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_CancelSubscription_Submit.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Get initial data
Request_CancelSubscription_Submit.CustomMethods.Callback.Submit_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("طلبك الآن قيد المراجعة ... بمجرد اعتماد الطلب سوف يتم ارسال بريد الكترونى ورسالة نصية إلى الهاتف الخاص بك وسيتم ايقاف الحساب الخاص بك للدخول على الموقع", null, 0, "success");
    } else {
        var msg = "";
        switch (jsonObj) {
            case "EmployeeNotFound":
                msg = "هذا الرقم الوظيفى غير مسجل على النظام ، يرجى مراجعة إدارة صندوق التكافل.";
                break;
            case "NoValidSubscription":
                msg = "ليس لديك بيانات اشتراك مسجلة.";
                break;
            case "AlreadySubmittedRequest":
                msg = "طلبك السابق لازال قيد المراجعة";
                break;
            case "LoanExists":
                msg = "لا يمكن تقديم الطلب حيث أنه لديك قرض فعال.";
                break;
            default:

                break;
        }
        Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
    }


};

Request_CancelSubscription_Submit.CustomMethods.Callback.Submit_Error = function (xhr, status, errorThrown) {
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

Request_CancelSubscription_Submit.CustomMethods.Callback.Submit_Completed = function (xhr, status) {

};








