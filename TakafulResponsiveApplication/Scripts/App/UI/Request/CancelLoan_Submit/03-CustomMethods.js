
if (typeof Request_CancelLoan_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_CancelLoan_Submit = {};
}

//Add the event handlers container object to the main namespace
Request_CancelLoan_Submit.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_CancelLoan_Submit.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_CancelLoan_Submit.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Request_CancelLoan_Submit.uiElements.txtEmployeeNumber).val('');
    $('#' + Request_CancelLoan_Submit.uiElements.txtName).val('');
    $('#' + Request_CancelLoan_Submit.uiElements.txtDate).val('');
    $('#' + Request_CancelLoan_Submit.uiElements.txtDepartment).val('');
    $('#' + Request_CancelLoan_Submit.uiElements.txtPosition).val('');
    $('#' + Request_CancelLoan_Submit.uiElements.txtCurrentAmount).val('');
    $('#' + Request_CancelLoan_Submit.uiElements.txtTotalSubscription).val('');
    $('#' + Request_CancelLoan_Submit.uiElements.txtLoanAmount).val('');
    $('#' + Request_CancelLoan_Submit.uiElements.txtPaidLoanAmount).val('');
    $('#' + Request_CancelLoan_Submit.uiElements.txtRemainingLoanAmount).val('');
    $('#' + Request_CancelLoan_Submit.uiElements.txtNotes).val('');


};


//Ajax functions
//--------------

//Get initial data
Request_CancelLoan_Submit.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CancelLoan_Submit.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_CancelLoan_Submit.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_CancelLoan_Submit.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_CancelLoan_Submit.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Submit request
Request_CancelLoan_Submit.CustomMethods.AjaxCall.Submit = function (notes) {

    var subscriptionData = {};
    subscriptionData.Notes = notes;
    var obj = JSON.stringify(subscriptionData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_CancelLoan_Submit.ServiceUrl + '/Submit';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Request_CancelLoan_Submit.CustomMethods.Callback.Submit_Success;
    requestOptions.ErrorCallback = Request_CancelLoan_Submit.CustomMethods.Callback.Submit_Error;
    requestOptions.CompletedCallback = Request_CancelLoan_Submit.CustomMethods.Callback.Submit_Completed;

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
Request_CancelLoan_Submit.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) { //No valid loan exists for this user
        //Hide loading screen
        Takaful.CommonMethods.HideLoading();
        $("#" + Request_CancelLoan_Submit.uiElements.btnSubmit).hide();
        Takaful.CommonMethods.ShowInfoMsg("يجب تقديم طلب قرض أولاً والموافقة علية حتى يتسنى لك تقديم الطلب.", null, 3, "error");
        setTimeout(function () {
            window.history.back();
        }, 4000);
        return;
    }

    Request_CancelLoan_Submit.InitialData = jsonObj;

    $('#' + Request_CancelLoan_Submit.uiElements.txtEmployeeNumber).val(jsonObj.EmployeeNumber);
    $('#' + Request_CancelLoan_Submit.uiElements.txtName).val(jsonObj.Name);
    $('#' + Request_CancelLoan_Submit.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.Date));
    $('#' + Request_CancelLoan_Submit.uiElements.txtDepartment).val(jsonObj.Department);
    $('#' + Request_CancelLoan_Submit.uiElements.txtPosition).val(jsonObj.Position);

    if (jsonObj.TotalSubscriptionAmount != null) {
        $('#' + Request_CancelLoan_Submit.uiElements.txtTotalSubscription).val(jsonObj.TotalSubscriptionAmount);
    }

    $('#' + Request_CancelLoan_Submit.uiElements.txtLoanAmount).val(jsonObj.LoanAmount);
    $('#' + Request_CancelLoan_Submit.uiElements.txtPaidLoanAmount).val(jsonObj.PaidLoanAmount);
    $('#' + Request_CancelLoan_Submit.uiElements.txtRemainingLoanAmount).val(jsonObj.RemainingLoanAmount);


    Request_CancelLoan_Submit.InitialDataReady = true;

};

Request_CancelLoan_Submit.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_CancelLoan_Submit.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Submit data
Request_CancelLoan_Submit.CustomMethods.Callback.Submit_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("طلبك الآن قيد المراجعة", null, 0, "success");
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
            default:

                break;
        }
        Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
    }


};

Request_CancelLoan_Submit.CustomMethods.Callback.Submit_Error = function (xhr, status, errorThrown) {
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

Request_CancelLoan_Submit.CustomMethods.Callback.Submit_Completed = function (xhr, status) {

};








