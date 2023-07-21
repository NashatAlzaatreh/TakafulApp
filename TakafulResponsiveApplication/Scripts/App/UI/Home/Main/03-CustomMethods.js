
if (typeof Home_Main === 'undefined') {
    // Namespace does not exist, create a new one
    var Home_Main = {};
}

//Add the event handlers container object to the main namespace
Home_Main.CustomMethods = {};

//Add the event handlers container object to the main namespace
Home_Main.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Home_Main.CustomMethods.LocalOperations.ResetUI = function () {

    //UI elements
    $('#' + Home_Main.uiElements.divMsg).empty();
    $('#' + Home_Main.uiElements.divMsg).hide();


};


//Ajax functions
//--------------

//Get initial data
Home_Main.CustomMethods.AjaxCall.GetInitialData = function () {
    //debugger;
    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Home_Main.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Home_Main.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Home_Main.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Home_Main.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Send registration request
Home_Main.CustomMethods.AjaxCall.Register = function (employeeID) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Home_Main.ServiceUrl + '/Register?employeeID=' + employeeID;
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Home_Main.CustomMethods.Callback.Register_Success;
    requestOptions.ErrorCallback = Home_Main.CustomMethods.Callback.Register_Error;
    requestOptions.CompletedCallback = Home_Main.CustomMethods.Callback.Register_Completed;

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
Home_Main.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    $("#" + Home_Main.uiElements.Phrase_1).html(jsonObj.Phrase1);
    $("#" + Home_Main.uiElements.Phrase_2).html(jsonObj.Phrase2);
    $("#" + Home_Main.uiElements.Phrase_3).html(jsonObj.Phrase3);

    $("#" + Home_Main.uiElements.FilePath_1).attr("src", jsonObj.Phrase1FilePath + "?n=" + Math.floor(Math.random()));
    $("#" + Home_Main.uiElements.FilePath_2).attr("src", jsonObj.Phrase2FilePath + "?n=" + Math.floor(Math.random()));
    $("#" + Home_Main.uiElements.FilePath_3).attr("src", jsonObj.Phrase3FilePath + "?n=" + Math.floor(Math.random()));

    //$("#" + Home_Main.uiElements.InfoFile_1).attr("href", jsonObj.InfoFile1);
    //$("#" + Home_Main.uiElements.InfoFile_2).attr("href", jsonObj.InfoFile2);
    //$("#" + Home_Main.uiElements.InfoFile_3).attr("href", jsonObj.InfoFile3);

    //$("#" + Home_Main.uiElements.InfoFile2_1).attr("href", jsonObj.InfoFile1);
    //$("#" + Home_Main.uiElements.InfoFile2_2).attr("href", jsonObj.InfoFile2);
    //$("#" + Home_Main.uiElements.InfoFile2_3).attr("href", jsonObj.InfoFile3);

    //Open files in new window
    $("#" + Home_Main.uiElements.InfoFile_1).bind('click', function () { window.open(jsonObj.InfoFile1, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });
    $("#" + Home_Main.uiElements.InfoFile_2).bind('click', function () { window.open(jsonObj.InfoFile2, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });
    $("#" + Home_Main.uiElements.InfoFile_3).bind('click', function () { window.open(jsonObj.InfoFile3, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });

    $("#" + Home_Main.uiElements.InfoFile2_1).bind('click', function () { window.open(jsonObj.InfoFile1, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });
    $("#" + Home_Main.uiElements.InfoFile2_2).bind('click', function () { window.open(jsonObj.InfoFile2, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });
    $("#" + Home_Main.uiElements.InfoFile2_3).bind('click', function () { window.open(jsonObj.InfoFile3, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });


    Home_Main.InitialDataReady = true;

};

Home_Main.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");


};

Home_Main.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Send registration request
Home_Main.CustomMethods.Callback.Register_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    $('#' + Home_Main.uiElements.myModal).foundation('reveal', 'close');

    var msg = "";

    setTimeout(function () {    //Delay before showing the message
        switch (jsonObj) {
            case "SMSSent": //Success
                msg = "تم إرسال بريد إلكترونى ورسالة نصية للهاتف المتحرك الخاص بك لإستكمال الاشتراك";
                Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "success");
                break;
            case "EmailSent":   //Success
                msg = "تم إرسال رسالة إلى البريد الإلكترونى الخاص بك لإستكمال الاشتراك";
                Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "success");
                break;
            case "EmployeeNotFound":    //Error
                msg = "هذا الرقم الوظيفى غير مسجل على النظام ، يرجى مراجعة إدارة صندوق التكافل.";
                Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
                break;
            case "AlreadyRegistered":   //Warning
                msg = "أنت بالفعل مشترك بالصندوق، يرجى الدخول بإستخدام رقمك الوظيفى وكلمة المرور لتتمتع بخدمات الصندوق.";
                Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "warning");
                break;
            case "NoEmail": //Error
                msg = "يرجى مراجعة إدارة صندوق التكافل لعدم توافر بريد الكترونى يمكنك من إستكمال خطوات التسجيل.";
                Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
                break;
            case "LessPeriodForReSbubscrition": //Error
                msg = "لا تستطيع الاشتراك بسبب عدم اكمال الفترة المحددة من اخر الغاء اشتراك.";
                Takaful.CommonMethods.ShowInfoMsg(msg, null, 0, "error");
                break;
        }
    }, 500);


};

Home_Main.CustomMethods.Callback.Register_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    //Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام اجراءات الاشتراك الأن ، من فضلك حاول فى وقت لاحق.");

    Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام اجراءات الاشتراك الأن ، من فضلك حاول فى وقت لاحق.", null, 0, "error");

    //$('#' + Home_Main.uiElements.divMsg).html("لا يمكن إتمام اجراءات الاشتراك الأن ، من فضلك حاول فى وقت لاحق.");
    //$('#' + Home_Main.uiElements.divMsg).show();
    //setTimeout(function () {
    //    $('#' + Home_Main.uiElements.divMsg).hide();
    //}, 5000);
};

Home_Main.CustomMethods.Callback.Register_Completed = function (xhr, status) {

};








