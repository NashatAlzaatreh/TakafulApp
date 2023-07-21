
if (typeof Employee_CommitteeManagement === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_CommitteeManagement = {};
}

//Add the event handlers container object to the main namespace
Employee_CommitteeManagement.CustomMethods = {};

//Add the event handlers container object to the main namespace
Employee_CommitteeManagement.CustomMethods = {
    AjaxCall: {},
    Callback: {},
    LocalOperations: {},
};


//Local functions
//------------------

//Clear all the data in UI & memory object
Employee_CommitteeManagement.CustomMethods.LocalOperations.ResetUI = function () {

    ////UI elements
    $('#' + Employee_CommitteeManagement.uiElements.txtEmployeeNumber).val('');
    $('#' + Employee_CommitteeManagement.uiElements.txtName).val('');
    $('#' + Employee_CommitteeManagement.uiElements.txtTitle).val('');
    $('#' + Employee_CommitteeManagement.uiElements.tblMembers).empty();

    //The next two lines for resetting the file select control
    $('#' + Employee_CommitteeManagement.uiElements.filUpload).wrap('<form>').closest('form').get(0).reset(); //For file input control
    $('#' + Employee_CommitteeManagement.uiElements.filUpload).unwrap();  //For file input control
    $('#' + Employee_CommitteeManagement.uiElements.progUpload).hide();
    $('#' + Employee_CommitteeManagement.uiElements.btnCancelUpload).hide();

};

//Populate the UI table with the array data
Employee_CommitteeManagement.CustomMethods.LocalOperations.PopulateMembersTable = function () {

    var htmlData = '';

    if (Employee_CommitteeManagement.Members.length > 0) {
        for (var i = 0; i < Employee_CommitteeManagement.Members.length; i++) {
            var up = '<div class="large-4  columns" style="opacity:0.3;"><div class="subscribe-btn3"><i class="fa fa-arrow-up"></i></div></div>';
            if (i > 0) {
                up = '<div class="large-4  columns" onclick="Employee_CommitteeManagement.EventHandlers.btnUp_click(' + i.toString() + ')"><div class="subscribe-btn3"><i class="fa fa-arrow-up"></i></div></div>';
            }

            var down = '<div class="large-4  columns" style="opacity:0.3;"><div class="subscribe-btn3"><i class="fa fa-arrow-down"></i></div></div>';
            if (i != Employee_CommitteeManagement.Members.length - 1) {
                down = '<div class="large-4  columns" onclick="Employee_CommitteeManagement.EventHandlers.btnDown_click(' + i.toString() + ')"><div class="subscribe-btn3"><i class="fa fa-arrow-down"></i></div></div>';
            }

            htmlData += '<tr>' +
                '<td>' + Employee_CommitteeManagement.Members[i].OrganizationalStructure + '</td>' +
                '<td>' + Employee_CommitteeManagement.Members[i].Name + '</td>' +
                '<td class="hidden-for-small">' + Employee_CommitteeManagement.Members[i].Title + '</td>' +
                '<td>' +
                    '<div class="row collapse">' +
                        '<div class="large-4 columns" onclick="Employee_CommitteeManagement.EventHandlers.btnEdit_click(' + i.toString() + ')"><div class="subscribe-btn3"><i class="fa fa-edit"></i></div></div>' +
                        up +
                         down +
                    '</div>' +
                '</td>' +
                '<td class="hidden-for-small"><img src="' + Employee_CommitteeManagement.Members[i].ImagePath + '?' + Math.random() + '" class="round" alt="" /></td>' +
                '</tr>';
        }
    } else {
        htmlData = '<tr>' +
        '<td class="text-center" colspan="6">لايوجد بيانات</td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '<td class="hide"></td>' +
        '</tr>';
    }

    //Takaful.CommonMethods.TerminateDataTable('mainTable');  //Terminate table object

    $('#' + Employee_CommitteeManagement.uiElements.tblMembers).html(htmlData);

    //Initialize data table
    //Takaful.CommonMethods.InitializeDataTable('mainTable');


};

//Ajax functions
//--------------

//Get initial data
Employee_CommitteeManagement.CustomMethods.AjaxCall.GetInitialData = function () {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_CommitteeManagement.ServiceUrl + '/InitialData';
    requestOptions.RequestType = "GET";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    //requestOptions.DataToSend = obj2;
    requestOptions.SuccessCallback = Employee_CommitteeManagement.CustomMethods.Callback.GetInitialData_Success;
    requestOptions.ErrorCallback = Employee_CommitteeManagement.CustomMethods.Callback.GetInitialData_Error;
    requestOptions.CompletedCallback = Employee_CommitteeManagement.CustomMethods.Callback.GetInitialData_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    //Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Save data
Employee_CommitteeManagement.CustomMethods.AjaxCall.Save = function (empID, title, imageFileName) {

    var submittedData = {};
    submittedData.EmpID = empID;
    submittedData.Title = title;
    submittedData.ImageFileName = imageFileName;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_CommitteeManagement.ServiceUrl + '/Save';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Employee_CommitteeManagement.CustomMethods.Callback.Save_Success;
    requestOptions.ErrorCallback = Employee_CommitteeManagement.CustomMethods.Callback.Save_Error;
    requestOptions.CompletedCallback = Employee_CommitteeManagement.CustomMethods.Callback.Save_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Move up or down
Employee_CommitteeManagement.CustomMethods.AjaxCall.Move = function (empID, direction) {

    var submittedData = {};
    submittedData.EmpID = empID;
    submittedData.Direction = direction;
    var obj = JSON.stringify(submittedData);

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    requestOptions.RequestUrl = Employee_CommitteeManagement.ServiceUrl + '/Move';
    requestOptions.RequestType = "POST";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.DataToSend = obj;
    requestOptions.SuccessCallback = Employee_CommitteeManagement.CustomMethods.Callback.Move_Success;
    requestOptions.ErrorCallback = Employee_CommitteeManagement.CustomMethods.Callback.Move_Error;
    requestOptions.CompletedCallback = Employee_CommitteeManagement.CustomMethods.Callback.Move_Completed;

    //requestOptions.RequestHeaderAdd = {hkey:'userid',hvalue:'135'};

    //Show loading
    Takaful.CommonMethods.ShowLoading();

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);
};

//Callback functions
//------------------

//Get initial data
Employee_CommitteeManagement.CustomMethods.Callback.GetInitialData_Success = function (jsonObj) {

    if (!jsonObj) {
        return;
    }

    Employee_CommitteeManagement.Members = jsonObj;

    //Fill the exceptions table
    Employee_CommitteeManagement.CustomMethods.LocalOperations.PopulateMembersTable();

    Employee_CommitteeManagement.InitialDataReady = true;

};

Employee_CommitteeManagement.CustomMethods.Callback.GetInitialData_Error = function (xhr, status, errorThrown) {
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

Employee_CommitteeManagement.CustomMethods.Callback.GetInitialData_Completed = function (xhr, status) {

};

//Save data
Employee_CommitteeManagement.CustomMethods.Callback.Save_Success = function (jsonObj) {

    if (!jsonObj || jsonObj.Message != "True") {
        return;
    }

    Takaful.CommonMethods.HideLoading();

    Employee_CommitteeManagement.Members = jsonObj.Members;  //Store the data to local object
    Employee_CommitteeManagement.CustomMethods.LocalOperations.PopulateMembersTable();    //Populate the data to UI table
    Employee_CommitteeManagement.EventHandlers.btnCancelEdit_click();
    Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, null, "success");

    $('#' + Employee_CommitteeManagement.uiElements.btnSave).show();


    //Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, 0, "success");

    ////Wait 3 seconds then reload
    //setTimeout(function () {
    //    location.reload();
    //}, 3000);



};

Employee_CommitteeManagement.CustomMethods.Callback.Save_Error = function (xhr, status, errorThrown) {
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
        Takaful.CommonMethods.HideLoading();
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام طلبك الأن.", null, 0, "error");
        $('#' + Employee_CommitteeManagement.uiElements.btnSave).show();
    }




};

Employee_CommitteeManagement.CustomMethods.Callback.Save_Completed = function (xhr, status) {

};

//Move
Employee_CommitteeManagement.CustomMethods.Callback.Move_Success = function (jsonObj) {

    if (!jsonObj || jsonObj.Message != "True") {
        return;
    }

    Takaful.CommonMethods.HideLoading();

    Employee_CommitteeManagement.Members = jsonObj.Members;  //Store the data to local object
    Employee_CommitteeManagement.CustomMethods.LocalOperations.PopulateMembersTable();    //Populate the data to UI table
    Employee_CommitteeManagement.EventHandlers.btnCancelEdit_click();
    Takaful.CommonMethods.ShowInfoMsg("تم التعديل.", null, 1, "success");


    //Takaful.CommonMethods.ShowInfoMsg("تم الحفظ.", null, 0, "success");

    ////Wait 3 seconds then reload
    //setTimeout(function () {
    //    location.reload();
    //}, 3000);



};

Employee_CommitteeManagement.CustomMethods.Callback.Move_Error = function (xhr, status, errorThrown) {
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
        Takaful.CommonMethods.HideLoading();
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن إتمام طلبك الأن.", null, 0, "error");
    }




};

Employee_CommitteeManagement.CustomMethods.Callback.Move_Completed = function (xhr, status) {

};


