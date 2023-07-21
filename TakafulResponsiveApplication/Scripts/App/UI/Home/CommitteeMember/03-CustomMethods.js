
if (typeof Home_CommitteeMember === 'undefined') {
    // Namespace does not exist, create a new one
    var Home_CommitteeMember = {};
}

//Add the event handlers container object to the main namespace
Home_CommitteeMember.CustomMethods = {};

//Add the event handlers container object to the main namespace
Home_CommitteeMember.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Home_CommitteeMember.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Home_CommitteeMember.uiElements.Requests_Subscription_New).html('اشتراك جديد: 0');
    $('#' + Home_CommitteeMember.uiElements.Requests_Subscription_Modification).html('تعديل قيمة الاشتراك: 0');
    $('#' + Home_CommitteeMember.uiElements.Requests_Subscription_Cancellation).html('انسحاب من الصندوق: 0');
    $('#' + Home_CommitteeMember.uiElements.Requests_Loan_New).html('قرض جديد: 0');
    $('#' + Home_CommitteeMember.uiElements.Requests_Loan_Modification).html('تعديل قسط القرض: 0');
    $('#' + Home_CommitteeMember.uiElements.Requests_Loan_Cancellation).html('سداد القرض بالكامل: 0');


};


//Ajax functions
//--------------

//Get initial data
Home_CommitteeMember.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Home_CommitteeMember.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Home_CommitteeMember.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Home_CommitteeMember.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Home_CommitteeMember.CustomMethods.Callback.GetInitialData_Completed;

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
Home_CommitteeMember.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    //Info files URL
    //$("#" + Home_CommitteeMember.uiElements.InfoFile_1).attr("href", jsonObj.InfoFile1);
    //$("#" + Home_CommitteeMember.uiElements.InfoFile_2).attr("href", jsonObj.InfoFile2);
    //$("#" + Home_CommitteeMember.uiElements.InfoFile_3).attr("href", jsonObj.InfoFile3);

    //Open files in new window
    $("#" + Home_CommitteeMember.uiElements.InfoFile_1).bind('click', function () { window.open(jsonObj.InfoFile1, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });
    $("#" + Home_CommitteeMember.uiElements.InfoFile_2).bind('click', function () { window.open(jsonObj.InfoFile2, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });
    $("#" + Home_CommitteeMember.uiElements.InfoFile_3).bind('click', function () { window.open(jsonObj.InfoFile3, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });

    //Requests count
    var info = "";
    if (jsonObj.Requests_Subscription_New > 0) {
        info = '<a href="../../UI/Request/CommiteeSubmittedRequests.html">اشتراك جديد: ' + jsonObj.Requests_Subscription_New + '</a>';
    } else {
        info = 'اشتراك جديد: 0';
    }

    $('#' + Home_CommitteeMember.uiElements.Requests_Subscription_New).html(info);
    $('#' + Home_CommitteeMember.uiElements.Requests_Subscription_New2).html(info);


    if (jsonObj.Requests_Subscription_Modification > 0) {
        info = '<a href="../../UI/Request/CommiteeSubmittedRequests.html">تعديل قيمة الاشتراك: ' + jsonObj.Requests_Subscription_Modification + '</a>';
    } else {
        info = 'تعديل قيمة الاشتراك: 0';
    }

    $('#' + Home_CommitteeMember.uiElements.Requests_Subscription_Modification).html(info);
    $('#' + Home_CommitteeMember.uiElements.Requests_Subscription_Modification2).html(info);


    if (jsonObj.Requests_Subscription_Cancellation > 0) {
        info = '<a href="../../UI/Request/CommiteeSubmittedRequests.html">انسحاب من الصندوق: ' + jsonObj.Requests_Subscription_Cancellation + '</a>';
    } else {
        info = 'انسحاب من الصندوق: 0';
    }

    $('#' + Home_CommitteeMember.uiElements.Requests_Subscription_Cancellation).html(info);
    $('#' + Home_CommitteeMember.uiElements.Requests_Subscription_Cancellation2).html(info);


    if (jsonObj.Requests_Loan_New > 0) {
        info = '<a href="../../UI/Request/CommiteeSubmittedRequests.html">قرض جديد: ' + jsonObj.Requests_Loan_New + '</a>';
    } else {
        info = 'قرض جديد: 0';
    }

    $('#' + Home_CommitteeMember.uiElements.Requests_Loan_New).html(info);
    $('#' + Home_CommitteeMember.uiElements.Requests_Loan_New2).html(info);


    if (jsonObj.Requests_Loan_Modification > 0) {
        info = '<a href="../../UI/Request/CommiteeSubmittedRequests.html">تعديل قسط القرض: ' + jsonObj.Requests_Loan_Modification + '</a>';
    } else {
        info = 'تعديل قسط القرض: 0';
    }

    $('#' + Home_CommitteeMember.uiElements.Requests_Loan_Modification).html(info);
    $('#' + Home_CommitteeMember.uiElements.Requests_Loan_Modification2).html(info);


    if (jsonObj.Requests_Loan_Cancellation > 0) {
        info = '<a href="../../UI/Request/CommiteeSubmittedRequests.html">سداد القرض: ' + jsonObj.Requests_Loan_Cancellation + '</a>';
    } else {
        info = 'سداد القرض: 0';
    }

    $('#' + Home_CommitteeMember.uiElements.Requests_Loan_Cancellation).html(info);
    $('#' + Home_CommitteeMember.uiElements.Requests_Loan_Cancellation2).html(info);


    Home_CommitteeMember.InitialDataReady = true;

};

Home_CommitteeMember.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Home_CommitteeMember.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};









