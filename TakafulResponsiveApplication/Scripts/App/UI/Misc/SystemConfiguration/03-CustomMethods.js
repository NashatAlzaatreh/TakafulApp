
if (typeof Misc_SystemConfiguration === 'undefined') {
    // Namespace does not exist, create a new one
    var Misc_SystemConfiguration = {};
}

//Add the event handlers container object to the main namespace
Misc_SystemConfiguration.CustomMethods = {};

//Add the event handlers container object to the main namespace
Misc_SystemConfiguration.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Misc_SystemConfiguration.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Misc_SystemConfiguration.uiElements.txtSubscriptionPercentage).val('');
    $('#' + Misc_SystemConfiguration.uiElements.txtMinSubscriptionAmount).val('');
    $('#' + Misc_SystemConfiguration.uiElements.txtMaxSubscriptionAmount).val('');
    $('#' + Misc_SystemConfiguration.uiElements.txtMaxInstallmentsCount).val('');
    $('#' + Misc_SystemConfiguration.uiElements.txtMinSubscriptionPeriod).val('');
    $('#' + Misc_SystemConfiguration.uiElements.txtMaxLoanAmount1).val('');
    $('#' + Misc_SystemConfiguration.uiElements.txtMaxLoanAmount2).val('');
    $('#' + Misc_SystemConfiguration.uiElements.txtTotalSubscriptionForMaxLoanAmount).val('');
    $('#' + Misc_SystemConfiguration.uiElements.txtMinPeriodBetweenLoans).val('');
    $('#' + Misc_SystemConfiguration.uiElements.txtEmail).val('');

    $('#' + Misc_SystemConfiguration.uiElements.txtSuI_LessPeriodForReSbubscrition).val('');
    $('#' + Misc_SystemConfiguration.uiElements.txtSuI_LessPeriodForLoan4ReSubscriber).val('');
    $('#' + Misc_SystemConfiguration.uiElements.txtSuI_LessPeriodForLoanNewEmployee).val('');


};


//Ajax functions
//--------------

//Get initial data
Misc_SystemConfiguration.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Misc_SystemConfiguration.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Misc_SystemConfiguration.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Misc_SystemConfiguration.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Misc_SystemConfiguration.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Submit request
Misc_SystemConfiguration.CustomMethods.AjaxCall.Save = function (subscriptionPercentage, minSubscriptionAmount, maxSubscriptionAmount, maxInstallmentsCount, minSubscriptionPeriod, maxLoanAmount1, maxLoanAmount2, totalSubscriptionForMaxLoanAmount, minPeriodBetweenLoans, maxDeductionPercentage, email, SuI_LessPeriodForLoan4ReSubscriber, SuI_LessPeriodForReSbubscrition, SuI_LessPeriodForLoanNewEmployee) {

    var subscriptionData = {};
    subscriptionData.SubscriptionPercentage = subscriptionPercentage;
    subscriptionData.MinSubscriptionAmount = minSubscriptionAmount;
    subscriptionData.MaxSubscriptionAmount = maxSubscriptionAmount;
    subscriptionData.MaxInstallmentsCount = maxInstallmentsCount;
    subscriptionData.MinSubscriptionPeriod = minSubscriptionPeriod;
    subscriptionData.MaxLoanAmount1 = maxLoanAmount1;
    subscriptionData.MaxLoanAmount2 = maxLoanAmount2;
    subscriptionData.TotalSubscriptionForMaxLoanAmount = totalSubscriptionForMaxLoanAmount;
    subscriptionData.MinPeriodBetweenLoans = minPeriodBetweenLoans;
    subscriptionData.MaxDeductionPercentage = maxDeductionPercentage;
    subscriptionData.Email = email;

    subscriptionData.SuI_LessPeriodForLoan4ReSubscriber = SuI_LessPeriodForLoan4ReSubscriber;
    subscriptionData.SuI_LessPeriodForReSbubscrition = SuI_LessPeriodForReSbubscrition;
    subscriptionData.SuI_LessPeriodForLoanNewEmployee = SuI_LessPeriodForLoanNewEmployee;

    var obj = JSON.stringify(subscriptionData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Misc_SystemConfiguration.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Misc_SystemConfiguration.CustomMethods.Callback.Submit_Success;
    requestOptions.ErrorCallback = Misc_SystemConfiguration.CustomMethods.Callback.Submit_Error;
    requestOptions.CompletedCallback = Misc_SystemConfiguration.CustomMethods.Callback.Submit_Completed;

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
Misc_SystemConfiguration.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Misc_SystemConfiguration.InitialData = jsonObj;

    $('#' + Misc_SystemConfiguration.uiElements.txtSubscriptionPercentage).val(jsonObj.SubscriptionPercentage);
    $('#' + Misc_SystemConfiguration.uiElements.txtMinSubscriptionAmount).val(jsonObj.MinSubscriptionAmount);
    $('#' + Misc_SystemConfiguration.uiElements.txtMaxSubscriptionAmount).val(jsonObj.MaxSubscriptionAmount);
    $('#' + Misc_SystemConfiguration.uiElements.txtMaxInstallmentsCount).val(jsonObj.MaxInstallmentsCount);
    $('#' + Misc_SystemConfiguration.uiElements.txtMinSubscriptionPeriod).val(jsonObj.MinSubscriptionPeriod);
    $('#' + Misc_SystemConfiguration.uiElements.txtMaxLoanAmount1).val(jsonObj.MaxLoanAmount1);
    $('#' + Misc_SystemConfiguration.uiElements.txtMaxLoanAmount2).val(jsonObj.MaxLoanAmount2);
    $('#' + Misc_SystemConfiguration.uiElements.txtTotalSubscriptionForMaxLoanAmount).val(jsonObj.TotalSubscriptionForMaxLoanAmount);
    $('#' + Misc_SystemConfiguration.uiElements.txtMinPeriodBetweenLoans).val(jsonObj.MinPeriodBetweenLoans);
    $('#' + Misc_SystemConfiguration.uiElements.txtMaxDeductionPercentage).val(jsonObj.MaxDeductionPercentage);
    $('#' + Misc_SystemConfiguration.uiElements.txtEmail).val(jsonObj.Email);

    $('#' + Misc_SystemConfiguration.uiElements.txtSuI_LessPeriodForLoan4ReSubscriber).val(jsonObj.SuI_LessPeriodForLoan4ReSubscriber);
    $('#' + Misc_SystemConfiguration.uiElements.txtSuI_LessPeriodForReSbubscrition).val(jsonObj.SuI_LessPeriodForReSbubscrition);
    $('#' + Misc_SystemConfiguration.uiElements.txtSuI_LessPeriodForLoanNewEmployee).val(jsonObj.SuI_LessPeriodForLoanNewEmployee);


    Misc_SystemConfiguration.InitialDataReady = true;

};

Misc_SystemConfiguration.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Misc_SystemConfiguration.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Submit
Misc_SystemConfiguration.CustomMethods.Callback.Submit_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    if (jsonObj == "True") {
        Takaful.CommonMethods.ShowInfoMsg("تم الحفظ", null, 0, "success");
    } else {
        var msg = "";
        switch (jsonObj) {
            case "NotValidData":
                msg = "يرجى إدخال جميع البيانات.";
                break;
        }
        Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
    }


};

Misc_SystemConfiguration.CustomMethods.Callback.Submit_Error = function (xhr, status, errorThrown) {
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

Misc_SystemConfiguration.CustomMethods.Callback.Submit_Completed = function (xhr, status) {

};








