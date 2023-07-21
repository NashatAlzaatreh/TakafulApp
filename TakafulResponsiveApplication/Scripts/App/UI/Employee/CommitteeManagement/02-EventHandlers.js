
//Check for main namespace
if (typeof Employee_CommitteeManagement === 'undefined') {
    // Namespace does not exist, create a new one
    var Employee_CommitteeManagement = {};
}

//Add the event handlers container object to the main namespace
Employee_CommitteeManagement.EventHandlers = {};


//Load the selected employee exception in edit mode
Employee_CommitteeManagement.EventHandlers.btnEdit_click = function (index) {

    if (!(index >= 0)) {
        return;
    }

    //Employee ID
    $('#' + Employee_CommitteeManagement.uiElements.txtEmployeeNumber).val(Employee_CommitteeManagement.Members[index].EmpID);

    //Name
    $('#' + Employee_CommitteeManagement.uiElements.txtName).val(Employee_CommitteeManagement.Members[index].Name);

    //Title
    $('#' + Employee_CommitteeManagement.uiElements.txtTitle).val(Employee_CommitteeManagement.Members[index].Title);

    //Cancellation buton
    $('#' + Employee_CommitteeManagement.uiElements.btnCancel).show();

    //Current item index
    Employee_CommitteeManagement.CurrentIndex = index;


};

//Cancel the edit mode
Employee_CommitteeManagement.EventHandlers.btnCancelEdit_click = function () {

    $('#' + Employee_CommitteeManagement.uiElements.txtEmployeeNumber).val('');
    $('#' + Employee_CommitteeManagement.uiElements.txtName).val('');
    $('#' + Employee_CommitteeManagement.uiElements.txtTitle).val('');

    //The next two lines for resetting the file select control
    $('#' + Employee_CommitteeManagement.uiElements.filUpload).wrap('<form>').closest('form').get(0).reset(); //For file input control
    $('#' + Employee_CommitteeManagement.uiElements.filUpload).unwrap();  //For file input control
    $('#' + Employee_CommitteeManagement.uiElements.progUpload).hide();
    $('#' + Employee_CommitteeManagement.uiElements.btnCancelUpload).hide();

    //Cancellation buton
    $('#' + Employee_CommitteeManagement.uiElements.btnCancel).hide();

    //Current item index
    Employee_CommitteeManagement.CurrentIndex = -1;


};

//Save the employee data
Employee_CommitteeManagement.EventHandlers.btnSave_click = function () {

    //Selected employee ID
    var index = Employee_CommitteeManagement.CurrentIndex;

    if (!(index >= 0)) {
        Takaful.CommonMethods.ShowInfoMsg("قم بإختيار عضو اللجنة أولاً ليتسنى لك التعديل.", null, null, "error");
        return;
    }

    var empID = Employee_CommitteeManagement.Members[index].EmpID;
    var title = $('#' + Employee_CommitteeManagement.uiElements.txtTitle).val();

    //Check if file is selected
    var file = $('#' + Employee_CommitteeManagement.uiElements.filUpload)[0].files[0];

    if (file == undefined) {
        //Save data
        Employee_CommitteeManagement.CustomMethods.AjaxCall.Save(empID, title, '');
        $('#' + Employee_CommitteeManagement.uiElements.btnSave).hide();
        return;
    }

    //File exists
    //Check file size
    if (file.size > (5 * 1024 * 1024)) {
        Takaful.CommonMethods.ShowInfoMsg("أقصى حجم للملف هو 5 ميجابايت.", null, null, "error");
        return;
    }

    //Upload file then save data
    //Callback functions
    var uploadComplete = function (e) {

    };

    var uploadError = function (e) {

        //Show error notification
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_Error, null, 0, "error");

    };

    var uploadCancelled = function (e) {

    };

    var uploadAjaxSuccessResult = function (e) {

        //Save data
        var id = Employee_CommitteeManagement.Members[Employee_CommitteeManagement.CurrentIndex].EmpID;
        var tit = $('#' + Employee_CommitteeManagement.uiElements.txtTitle).val();

        Employee_CommitteeManagement.CustomMethods.AjaxCall.Save(id, tit, e);
        $('#' + Employee_CommitteeManagement.uiElements.btnSave).hide();

    };

    var uploadAjaxErrorResult = function (xhr, status, errorThrowni) {

        //Show error notification
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_Error, null, 0, "error");

    };


    //Upload the file
    Takaful.CommonMethods.UploadFile(
        file,
        Employee_CommitteeManagement.uiElements.progUpload,
        Employee_CommitteeManagement.uiElements.btnCancelUpload,
        uploadComplete,
        uploadError,
        uploadCancelled,
        uploadAjaxSuccessResult,
        uploadAjaxErrorResult
    );









};

//Move level up
Employee_CommitteeManagement.EventHandlers.btnUp_click = function (index) {

    if (!(index >= 0)) {
        return;
    }

    var empID = Employee_CommitteeManagement.Members[index].EmpID;
    Employee_CommitteeManagement.CustomMethods.AjaxCall.Move(empID, 1);

};

//Move level down
Employee_CommitteeManagement.EventHandlers.btnDown_click = function (index) {

    if (!(index >= 0)) {
        return;
    }

    var empID = Employee_CommitteeManagement.Members[index].EmpID;
    Employee_CommitteeManagement.CustomMethods.AjaxCall.Move(empID, 2);

};

