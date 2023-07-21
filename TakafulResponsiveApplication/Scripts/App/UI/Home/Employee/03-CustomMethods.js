
if (typeof Home_Employee === 'undefined') {
    // Namespace does not exist, create a new one
    var Home_Employee = {};
}

//Add the event handlers container object to the main namespace
Home_Employee.CustomMethods = {};

//Add the event handlers container object to the main namespace
Home_Employee.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Home_Employee.CustomMethods.LocalOperations.ResetUI = function () {

    //////UI elements
    //$('#' + Home_Employee.uiElements.Requests_Subscription_New).html('اشتراك جديد: 0');
    //$('#' + Home_Employee.uiElements.Requests_Subscription_Modification).html('تعديل قيمة الاشتراك: 0');
    //$('#' + Home_Employee.uiElements.Requests_Subscription_Cancellation).html('انسحاب من الصندوق: 0');
    //$('#' + Home_Employee.uiElements.Requests_Loan_New).html('قرض جديد: 0');
    //$('#' + Home_Employee.uiElements.Requests_Loan_Modification).html('تعديل قسط القرض: 0');
    //$('#' + Home_Employee.uiElements.Requests_Loan_Cancellation).html('سداد القرض بالكامل: 0');


};


//Ajax functions
//--------------

//Get initial data
Home_Employee.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Home_Employee.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Home_Employee.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Home_Employee.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Home_Employee.CustomMethods.Callback.GetInitialData_Completed;

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
Home_Employee.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    //Info files URL
    //$("#" + Home_Employee.uiElements.InfoFile_1).attr("href", jsonObj.InfoFile1);
    //$("#" + Home_Employee.uiElements.InfoFile_2).attr("href", jsonObj.InfoFile2);
    //$("#" + Home_Employee.uiElements.InfoFile_3).attr("href", jsonObj.InfoFile3);

    //Open files in new window
    $("#" + Home_Employee.uiElements.InfoFile_1).bind('click', function () { window.open(jsonObj.InfoFile1, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });
    $("#" + Home_Employee.uiElements.InfoFile_2).bind('click', function () { window.open(jsonObj.InfoFile2, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });
    $("#" + Home_Employee.uiElements.InfoFile_3).bind('click', function () { window.open(jsonObj.InfoFile3, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });

    //Notification area
    var temp = "";
    //Monthly subscription
    if (jsonObj.MonthlySubscriptionAmount == null) {
        temp = "غير متاح";
        //$('#' + Home_Employee.uiElements.MonthlySubscriptionAmount).html('* قيمة الاشتراك الشهرى : ' + 'غير متاح');
    } else {
        temp = jsonObj.MonthlySubscriptionAmount.toString();
        //$('#' + Home_Employee.uiElements.MonthlySubscriptionAmount).html('* قيمة الاشتراك الشهرى : ' + jsonObj.MonthlySubscriptionAmount.toString());
    }

    $('#' + Home_Employee.uiElements.MonthlySubscriptionAmount).html('* قيمة الاشتراك الشهرى : ' + temp);
    $('#' + Home_Employee.uiElements.MonthlySubscriptionAmount2).html('* قيمة الاشتراك الشهرى : ' + temp);

    //Total subscriptions
    if (jsonObj.TotalSubscriptions == null) {
        temp = "غير متاح";
        //$('#' + Home_Employee.uiElements.TotalSubscriptions).html('* رصيد الاشتراكات : ' + 'غير متاح');
    } else {
        temp = jsonObj.TotalSubscriptions.toString();
        //$('#' + Home_Employee.uiElements.TotalSubscriptions).html('* رصيد الاشتراكات : ' + jsonObj.TotalSubscriptions.toString());
    }

    $('#' + Home_Employee.uiElements.TotalSubscriptions).html('* رصيد الاشتراكات : ' + temp);
    $('#' + Home_Employee.uiElements.TotalSubscriptions2).html('* رصيد الاشتراكات : ' + temp);

    //Loan data
    if (jsonObj.LoanAmount == null) {   //No loan
        temp = '-';
        $('#' + Home_Employee.uiElements.LoanAmount).html('* مبلغ القرض : ' + temp);
        $('#' + Home_Employee.uiElements.LoanInstallment).html('* قسط القرض : ' + temp);
        $('#' + Home_Employee.uiElements.PaidLoanAmount).html('* المسدد من القرض : ' + temp);
        $('#' + Home_Employee.uiElements.RemainingLoanAmount).html('* المتبقي من القرض : ' + temp);

        $('#' + Home_Employee.uiElements.LoanAmount2).html('* مبلغ القرض : ' + temp);
        $('#' + Home_Employee.uiElements.LoanInstallment2).html('* قسط القرض : ' + temp);
        $('#' + Home_Employee.uiElements.PaidLoanAmount2).html('* المسدد من القرض : ' + temp);
        $('#' + Home_Employee.uiElements.RemainingLoanAmount2).html('* المتبقي من القرض : ' + temp);
    } else {
        //Amount
        $('#' + Home_Employee.uiElements.LoanAmount).html('* مبلغ القرض : ' + jsonObj.LoanAmount.toString());
        $('#' + Home_Employee.uiElements.LoanAmount2).html('* مبلغ القرض : ' + jsonObj.LoanAmount.toString());

        //Installment
        if (jsonObj.LoanInstallment == null) {
            temp = "غير متاح";
            //$('#' + Home_Employee.uiElements.LoanInstallment).html('* قسط القرض : ' + 'غير متاح');
        } else {
            temp = jsonObj.LoanInstallment.toString();
            //$('#' + Home_Employee.uiElements.LoanInstallment).html('* قسط القرض : ' + jsonObj.LoanInstallment.toString());
        }

        $('#' + Home_Employee.uiElements.LoanInstallment).html('* قسط القرض : ' + temp);
        $('#' + Home_Employee.uiElements.LoanInstallment2).html('* قسط القرض : ' + temp);

        //Paid amount
        if (jsonObj.PaidLoanAmount == null) {
            temp = "غير متاح";
            //$('#' + Home_Employee.uiElements.PaidLoanAmount).html('* المسدد من القرض : ' + 'غير متاح');
        } else {
            temp = jsonObj.PaidLoanAmount.toString();
            //$('#' + Home_Employee.uiElements.PaidLoanAmount).html('* المسدد من القرض : ' + jsonObj.PaidLoanAmount.toString());
        }

        $('#' + Home_Employee.uiElements.PaidLoanAmount).html('* المسدد من القرض : ' + temp);
        $('#' + Home_Employee.uiElements.PaidLoanAmount2).html('* المسدد من القرض : ' + temp);

        //Remaining amount
        if (jsonObj.LoanAmount != null && jsonObj.PaidLoanAmount != null) {
            temp = (jsonObj.LoanAmount - jsonObj.PaidLoanAmount).toString();
            //$('#' + Home_Employee.uiElements.RemainingLoanAmount).html('* المتبقي من القرض : ' + (jsonObj.LoanAmount - jsonObj.PaidLoanAmount).toString());
        } else {
            temp = "غير متاح";
            //$('#' + Home_Employee.uiElements.RemainingLoanAmount).html('* المتبقي من القرض : ' + 'غير متاح');
        }

        $('#' + Home_Employee.uiElements.RemainingLoanAmount).html('* المتبقي من القرض : ' + temp);
        $('#' + Home_Employee.uiElements.RemainingLoanAmount2).html('* المتبقي من القرض : ' + temp);
    }

    //Last submitted requset
    if (jsonObj.LastRequestType == null) {
        temp = "-";
        //$('#' + Home_Employee.uiElements.LastRequestType).html('* أخر الطلبات المقدمة : ' + "-");
    } else {
        temp = jsonObj.LastRequestType;
        //$('#' + Home_Employee.uiElements.LastRequestType).html('* أخر الطلبات المقدمة : ' + jsonObj.LastRequestType);
    }

    $('#' + Home_Employee.uiElements.LastRequestType).html('* أخر الطلبات المقدمة : ' + temp);
    $('#' + Home_Employee.uiElements.LastRequestType2).html('* أخر الطلبات المقدمة : ' + temp);


    if (jsonObj.LastRequestDate == null) {
        $('#' + Home_Employee.uiElements.LastRequestDate).html('* تاريخ الطلب : ' + '-');
        $('#' + Home_Employee.uiElements.LastRequestDate).hide();
        $('#' + Home_Employee.uiElements.LastRequestDate2).html('* تاريخ الطلب : ' + '-');
        $('#' + Home_Employee.uiElements.LastRequestDate2).hide();
    } else {
        $('#' + Home_Employee.uiElements.LastRequestDate).html('* تاريخ الطلب : ' + Takaful.CommonMethods.GetFormattedDate(jsonObj.LastRequestDate));
        $('#' + Home_Employee.uiElements.LastRequestDate).show();
        $('#' + Home_Employee.uiElements.LastRequestDate2).html('* تاريخ الطلب : ' + Takaful.CommonMethods.GetFormattedDate(jsonObj.LastRequestDate));
        $('#' + Home_Employee.uiElements.LastRequestDate2).show();
    }

    //Zakah amount
    $('#' + Home_Employee.uiElements.ZakahAmount).html('* مبلغ الزكاة : ' + jsonObj.ZakahAmount);
    $('#' + Home_Employee.uiElements.ZakahAmount2).html('* مبلغ الزكاة : ' + jsonObj.ZakahAmount);


    Home_Employee.InitialDataReady = true;

};

Home_Employee.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Home_Employee.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};









