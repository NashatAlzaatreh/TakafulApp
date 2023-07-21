
if (typeof User_Login === 'undefined') {
    // Namespace does not exist, create a new one
    var User_Login = {};
}

//Add the event handlers container object to the main namespace
User_Login.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
User_Login.CustomMethods.LocalOperations.ResetUI = function () {

    //Arabic localization
    //$.datepicker.setDefaults($.datepicker.regional["ar"]);

    //UI elements
    $('#' + User_Login.uiElements.txtLoginUserName).val('');
    $("#" + User_Login.uiElements.txtLoginUserName).focus();
    $('#' + User_Login.uiElements.txtLoginPassword).val('');

    //Check if marked to be remembered
    if (localStorage && localStorage.getItem("Takaful_UserName") && localStorage.getItem("Takaful_UserName").trim() != "") {
        $("#" + User_Login.uiElements.dchkLoginRememberMe).prop('checked', true);
        $("#" + User_Login.uiElements.txtLoginUserName).val(localStorage.getItem("Takaful_UserName"));
        if (localStorage && localStorage.getItem("Takaful_Password")) {
            $("#" + User_Login.uiElements.txtLoginPassword).val(localStorage.getItem("Takaful_Password"));
        }
    }


};


User_Login.CustomMethods.AjaxCall.GetInitialData = function () {
    debugger;
    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = User_Login.ServiceMainUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = User_Login.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = User_Login.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = User_Login.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

User_Login.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    //$("#" + User_Login.uiElements.Phrase_1).html(jsonObj.Phrase1);
    //$("#" + User_Login.uiElements.Phrase_2).html(jsonObj.Phrase2);
    //$("#" + User_Login.uiElements.Phrase_3).html(jsonObj.Phrase3);

    //$("#" + User_Login.uiElements.FilePath_1).attr("src", jsonObj.Phrase1FilePath + "?n=" + Math.floor(Math.random()));
    //$("#" + User_Login.uiElements.FilePath_2).attr("src", jsonObj.Phrase2FilePath + "?n=" + Math.floor(Math.random()));
    //$("#" + User_Login.uiElements.FilePath_3).attr("src", jsonObj.Phrase3FilePath + "?n=" + Math.floor(Math.random()));

    //$("#" + Home_Main.uiElements.InfoFile_1).attr("href", jsonObj.InfoFile1);
    //$("#" + Home_Main.uiElements.InfoFile_2).attr("href", jsonObj.InfoFile2);
    //$("#" + Home_Main.uiElements.InfoFile_3).attr("href", jsonObj.InfoFile3);

    //$("#" + Home_Main.uiElements.InfoFile2_1).attr("href", jsonObj.InfoFile1);
    //$("#" + Home_Main.uiElements.InfoFile2_2).attr("href", jsonObj.InfoFile2);
    //$("#" + Home_Main.uiElements.InfoFile2_3).attr("href", jsonObj.InfoFile3);

    //Open files in new window
    //$("#" + User_Login.uiElements.InfoFile_1).bind('click', function () { window.open(jsonObj.InfoFile1, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });
    //$("#" + User_Login.uiElements.InfoFile_2).bind('click', function () { window.open(jsonObj.InfoFile2, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });
    //$("#" + Home_Main.uiElements.InfoFile_3).bind('click', function () { window.open(jsonObj.InfoFile3, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });

    //$("#" + User_Login.uiElements.InfoFile2_1).bind('click', function () { window.open(jsonObj.InfoFile1, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });
    //$("#" + Home_Main.uiElements.InfoFile2_2).bind('click', function () { window.open(jsonObj.InfoFile2, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });
    $("#" + User_Login.uiElements.InfoFile_4).bind('click', function () { window.open(jsonObj.InfoFile4, '_blank', 'location=no,toolbar=no,scrollbars=yes,status=yes'); });


    User_Login.InitialDataReady = true;

};

User_Login.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);
    //alert("'GetAllEvents' ERROR: [" + errorThrown + "]");

    Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_DefaultErrorResponse, null, null, "error");


};

User_Login.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};


//Ajax functions
//--------------
User_Login.CustomMethods.IsApprovalNewRule = function (EmpId,IsApproval) {

    debugger;
    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = User_Login.ServiceUrl + '/DoSubscriptionRulesAcceptance?EmpId=' + EmpId + "&IsApproval=" + IsApproval;
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = objEvent;
    requestOptions.SuccessCallback = User_Login.CustomMethods.Callback.IsApprovalNewRule_Success;
    requestOptions.ErrorCallback = User_Login.CustomMethods.Callback.IsApprovalNewRule_Error;
    requestOptions.CompletedCallback = User_Login.CustomMethods.Callback.IsApprovalNewRule_Completed;

    //requestOptions.RequestHeaderAdd = { hkey: 'userpassword', hvalue: password };
    //requestOptions.RequestHeaderAdd = [{ hkey: 'userpassword', hvalue: password }];

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);

};

//Log in the user
User_Login.CustomMethods.LogInUser = function (userName, password) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = User_Login.ServiceUrl + '/Login?userName=' + userName.replace(".", "_-_-_");
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = objEvent;
    requestOptions.SuccessCallback = User_Login.CustomMethods.Callback.LogInUser_Success;
    requestOptions.ErrorCallback = User_Login.CustomMethods.Callback.LogInUser_Error;
    requestOptions.CompletedCallback = User_Login.CustomMethods.Callback.LogInUser_Completed;

    //requestOptions.RequestHeaderAdd = { hkey: 'userpassword', hvalue: password };
    requestOptions.RequestHeaderAdd = [{ hkey: 'userpassword', hvalue: password }];

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);

};


//Callback functions
//------------------
User_Login.CustomMethods.Callback.IsApprovalNewRule_Success = function (jsonObj) {
    if (!jsonObj) {
        Takaful.CommonMethods.HideProgressLoading();
        return;
    }

    debugger;
    var tmpval = false;
    tmpval=jsonObj;
    if (tmpval == true)
    {

       

        //Takaful.CommonMethods.ShowProgressLoading('جارى تسجيل الدخول ، من فضلك انتظر...');

        ////Add the user to the local storage
        //if (localStorage) {
        //    //Check remember me
        //    if ($("#" + User_Login.uiElements.chkLoginRememberMe).prop('checked')) {
        //        localStorage.setItem("Takaful_UserName", $("#" + User_Login.uiElements.txtLoginUserName).val());
        //        localStorage.setItem("Takaful_Password", $("#" + User_Login.uiElements.txtLoginPassword).val());
        //    } else {
        //        if (localStorage.getItem("Takaful_UserName")) {
        //            localStorage.removeItem("Takaful_UserName");
        //        }
        //        if (localStorage.getItem("Takaful_Password")) {
        //            localStorage.removeItem("Takaful_Password");
        //        }
        //    }
        //}

        $('#' + User_Login.uiElements.myModal).foundation('reveal', 'close');


        if ($("#" + User_Login.uiElements.txtLoginUserName).val().trim() == "") {
            $("#" + User_Login.uiElements.txtLoginUserName).focus();
            Takaful.CommonMethods.ShowInfoMsg("أدخل اسم المستخدم", null, null, "error");
            return;
        }

        //Password
        if ($("#" + User_Login.uiElements.txtLoginPassword).val() == "") {
            $("#" + User_Login.uiElements.txtLoginPassword).focus();
            Takaful.CommonMethods.ShowInfoMsg("أدخل كلمة السر", null, null, "error");
            return;
        }

        //Takaful.CommonMethods.ShowInfoMsg('جارى تسجيل الدخول ، من فضلك انتظر...', null, 0, "info");


        User_Login.CustomMethods.LogInUser($("#" + User_Login.uiElements.txtLoginUserName).val(), $("#" + User_Login.uiElements.txtLoginPassword).val());



        ////window.location.reload();
        ////Wait 2 seconds then, redirect to my page
        ////setTimeout(function () { window.location.href = "../../UI/Home/Start.html"; }, 2000);
        //setTimeout(function () { window.location.href = "../../UI/Home/Main.html"; }, 2000);
        //setTimeout(function () { window.location.href = "https://www.google.com/"; }, 2000);

        
    }
}


//Log in user
User_Login.CustomMethods.Callback.LogInUser_Success = function (jsonObj) {

    debugger;

    if (!jsonObj) {
        //Hide progress loading
        Takaful.CommonMethods.HideProgressLoading();
        Takaful.CommonMethods.ShowInfoMsg("لايمكن إتمام تسجيل الدخول الأن ، من فضلك حاول لاحقاً                                .", null, null, "error");
        return;
    }
    debugger;
    var tmpval = jsonObj;

    if (tmpval == "NeedApproval")
    {
        $('#myModal').foundation('reveal', 'open');

    }
    else if (tmpval == "Success")
    {
        Takaful.CommonMethods.ShowProgressLoading('جارى تسجيل الدخول ، من فضلك انتظر...');

        //Add the user to the local storage
        if (localStorage) {
            //Check remember me
            if ($("#" + User_Login.uiElements.chkLoginRememberMe).prop('checked')) {
                localStorage.setItem("Takaful_UserName", $("#" + User_Login.uiElements.txtLoginUserName).val());
                localStorage.setItem("Takaful_Password", $("#" + User_Login.uiElements.txtLoginPassword).val());
            } else {
                if (localStorage.getItem("Takaful_UserName")) {
                    localStorage.removeItem("Takaful_UserName");
                }
                if (localStorage.getItem("Takaful_Password")) {
                    localStorage.removeItem("Takaful_Password");
                }
            }
        }

        //Wait 2 seconds then, redirect to my page
        setTimeout(function () { window.location.href = "../../UI/Home/Start.html"; }, 2000);
    }

    //Takaful.CommonMethods.ShowInfoMsg('مرحباً بك ، سوف يتم الأن تحويلك إلى صفحتك الشخصية.', null, 0, "success");


};

User_Login.CustomMethods.Callback.IsApprovalNewRule_Error = function (xhr, status, errorThrown) {
};

User_Login.CustomMethods.Callback.IsApprovalNewRule_Completed = function (xhr, status) {


};

User_Login.CustomMethods.Callback.LogInUser_Error = function (xhr, status, errorThrown) {

    //redirect the user to the error page
    //...........HERE......

    //alert("Sorry, there was a problem!");
    //console.log("Error: " + errorThrown);
    //console.log("Status: " + status);
    //console.dir(xhr);

    //Hide progress loading
    Takaful.CommonMethods.HideProgressLoading();

    if (xhr.responseText == "NotFound") {
        Takaful.CommonMethods.ShowInfoMsg("من فضلك تأكد من اسم المستخدم وكلمة السر", null, null, "error");
    } else {
        Takaful.CommonMethods.ShowInfoMsg("لايمكن إتمام تسجيل الدخول الأن ، من فضلك حاول لاحقاً", null, null, "error");
    }


};

User_Login.CustomMethods.Callback.LogInUser_Completed = function (xhr, status) {


};




