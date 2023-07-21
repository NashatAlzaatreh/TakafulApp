
if (typeof Request_EditLoan_Submit === 'undefined') {
    // Namespace does not exist, create a new one
    var Request_EditLoan_Submit = {};
}

//Add the event handlers container object to the main namespace
Request_EditLoan_Submit.CustomMethods = {};

//Add the event handlers container object to the main namespace
Request_EditLoan_Submit.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Request_EditLoan_Submit.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Request_EditLoan_Submit.uiElements.txtEmployeeNumber).val('');
    $('#' + Request_EditLoan_Submit.uiElements.txtName).val('');
    $('#' + Request_EditLoan_Submit.uiElements.txtDate).val('');
    $('#' + Request_EditLoan_Submit.uiElements.txtDepartment).val('');
    $('#' + Request_EditLoan_Submit.uiElements.txtPosition).val('');
    $('#' + Request_EditLoan_Submit.uiElements.txtCurrentAmount).val('');
    $('#' + Request_EditLoan_Submit.uiElements.txtRequiredAmount).val('0');
    $('#' + Request_EditLoan_Submit.uiElements.txtNotes).val('');


};


//Ajax functions
//--------------

//Get initial data
Request_EditLoan_Submit.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_EditLoan_Submit.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Request_EditLoan_Submit.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Request_EditLoan_Submit.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Request_EditLoan_Submit.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Submit request
Request_EditLoan_Submit.CustomMethods.AjaxCall.Submit = function (amount, notes) {

    var subscriptionData = {};
    subscriptionData.Amount = amount;
    subscriptionData.Notes = notes;
    var obj = JSON.stringify(subscriptionData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Request_EditLoan_Submit.ServiceUrl + '/Submit';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Request_EditLoan_Submit.CustomMethods.Callback.Submit_Success;
    requestOptions.ErrorCallback = Request_EditLoan_Submit.CustomMethods.Callback.Submit_Error;
    requestOptions.CompletedCallback = Request_EditLoan_Submit.CustomMethods.Callback.Submit_Completed;

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
Request_EditLoan_Submit.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) { //No valid loan exists for this user
        //Hide loading screen
        Takaful.CommonMethods.HideLoading();
        $("#" + Request_EditLoan_Submit.uiElements.btnSubmit).hide();
        Takaful.CommonMethods.ShowInfoMsg("يجب تقديم طلب قرض أولاً والموافقة علية حتى يتسنى لك التعديل.", null, 3, "error");
        setTimeout(function () {
            window.history.back();
        }, 4000);
        return;
    }

    Request_EditLoan_Submit.InitialData = jsonObj;

    $('#' + Request_EditLoan_Submit.uiElements.txtEmployeeNumber).val(jsonObj.EmployeeNumber);
    $('#' + Request_EditLoan_Submit.uiElements.txtName).val(jsonObj.Name);
    $('#' + Request_EditLoan_Submit.uiElements.txtDate).val(Takaful.CommonMethods.GetFormattedDate(jsonObj.Date));
    $('#' + Request_EditLoan_Submit.uiElements.txtDepartment).val(jsonObj.Department);
    $('#' + Request_EditLoan_Submit.uiElements.txtPosition).val(jsonObj.Position);
    $('#' + Request_EditLoan_Submit.uiElements.txtCurrentAmount).val(jsonObj.CurrentInstallmentAmount);


    Request_EditLoan_Submit.InitialDataReady = true;

};

Request_EditLoan_Submit.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Request_EditLoan_Submit.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Submit
Request_EditLoan_Submit.CustomMethods.Callback.Submit_Success = function (jsonObj) {

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
            case "SubscriptionCancellationSubmitted":
                msg = "لايمكن تقديم هذا الطلب حيث أنك قمت بتقديم طلب انسحاب من الصندوق.";
                break;
            case "AlreadySubmittedRequest":
                msg = "طلبك السابق لازال قيد المراجعة";
                break;
            case "MaxInstallmentViolation":
                msg = "الحد الأقصى لقيمة القسط هو: " + Request_EditLoan_Submit.InitialData.MaximumLoanInstallmentAmount;
                break;
            case "MinInstallmentViolation":
                msg = "الحد الأدنى لقيمة القسط هو: " + Request_EditLoan_Submit.InitialData.MinimumLoanInstallmentAmount;
                break;

            default:

                break;
        }
        Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
    }


};

Request_EditLoan_Submit.CustomMethods.Callback.Submit_Error = function (xhr, status, errorThrown) {
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

Request_EditLoan_Submit.CustomMethods.Callback.Submit_Completed = function (xhr, status) {

};








