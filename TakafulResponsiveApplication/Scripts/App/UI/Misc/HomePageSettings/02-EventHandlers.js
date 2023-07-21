
//Check for main namespace
if (typeof Misc_HomePageSettings === 'undefined') {
    // Namespace does not exist, create a new one
    var Misc_HomePageSettings = {};
}

//Add the event handlers container object to the main namespace
Misc_HomePageSettings.EventHandlers = {};


//Save
Misc_HomePageSettings.EventHandlers.btnSave_onclick = function () {

    //Input validation
    var title1 = $('#' + Misc_HomePageSettings.uiElements.txtTitle1).val().trim();
    if (title1 == "") {
        $('#' + Misc_HomePageSettings.uiElements.txtTitle1).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل النص الأول.", null, null, "error");
        return;
    }

    var title2 = $('#' + Misc_HomePageSettings.uiElements.txtTitle2).val().trim();
    if (title2 == "") {
        $('#' + Misc_HomePageSettings.uiElements.txtTitle2).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل النص الثانى.", null, null, "error");
        return;
    }

    var title3 = $('#' + Misc_HomePageSettings.uiElements.txtTitle3).val().trim();
    if (title3 == "") {
        $('#' + Misc_HomePageSettings.uiElements.txtTitle3).focus();
        Takaful.CommonMethods.ShowInfoMsg("أدخل النص الثالث.", null, null, "error");
        return;
    }

    //Save
    Misc_HomePageSettings.CustomMethods.AjaxCall.Save(title1, title2, title3);


};

//Export button
Misc_HomePageSettings.EventHandlers.btnExport_onclick = function () {

    if (Misc_HomePageSettings.Employees.length == 0) {
        Takaful.CommonMethods.ShowInfoMsg("لا توجد بيانات.", null, null, "error");
        return;
    }

    Misc_HomePageSettings.CustomMethods.AjaxCall.ExportData();


};

//File upload button
Misc_HomePageSettings.EventHandlers.btnUpload_onclick = function (event) {

    var fileIndex = event.data.index;
    Misc_HomePageSettings.FileIndex = fileIndex;
    var file;

    //Input validation
    switch (fileIndex) {
        case 1:
            file = $('#' + Misc_HomePageSettings.uiElements.filUpload1)[0].files[0];
            break;
        case 2:
            file = $('#' + Misc_HomePageSettings.uiElements.filUpload2)[0].files[0];
            break;
        case 3:
            file = $('#' + Misc_HomePageSettings.uiElements.filUpload3)[0].files[0];
            break;
        case 4:
            file = $('#' + Misc_HomePageSettings.uiElements.filUpload4)[0].files[0];
            break;
        case 5:
            file = $('#' + Misc_HomePageSettings.uiElements.filUpload5)[0].files[0];
            break;
        case 6:
            file = $('#' + Misc_HomePageSettings.uiElements.filUpload6)[0].files[0];
            break;
    }


    //Check if file is selected
    if (file == undefined) { //No file attached
        Takaful.CommonMethods.ShowInfoMsg("من فضلك إختر الملف أولاً.", null, null, "error");
        return;
    }

    //Check file size
    if (file.size > (5 * 1024 * 1024)) {
        Takaful.CommonMethods.ShowInfoMsg("أقصى حجم للملف هو 5 ميجابايت.", null, null, "error");
        return;
    }

    //Callback functions
    var uploadComplete = function (e) {

    };

    var uploadError = function (e) {

        //Show the upload button
        $("#" + Misc_HomePageSettings.uiElements.btnUpload1).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload2).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload3).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload4).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload5).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload6).show();

        //Show error notification
        Takaful.CommonMethods.ShowInfoMsg(Takaful.Config.Message_Error, null, 0, "error");

    };

    var uploadCancelled = function (e) {

        //Show the upload button
        $("#" + Misc_HomePageSettings.uiElements.btnUpload1).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload2).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload3).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload4).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload5).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload6).show();
    };

    var uploadAjaxSuccessResult = function (e) {

        Misc_HomePageSettings.CustomMethods.AjaxCall.SaveFile(e);

    };

    var uploadAjaxErrorResult = function (xhr, status, errorThrowni) {

        //Show the upload button
        $("#" + Misc_HomePageSettings.uiElements.btnUpload1).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload2).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload3).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload4).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload5).show();
        $("#" + Misc_HomePageSettings.uiElements.btnUpload6).show();

        //Show error notification
        Takaful.CommonMethods.ShowInfoMsg("لا يمكن انمام تحميل الملف الأن.", null, 0, "error");

    };


    //Hide the upload button until upload complete, aborted or error
    var progress = null, cancel = null;
    if (fileIndex == 1) {
        $("#" + Misc_HomePageSettings.uiElements.btnUpload1).hide();
        progress = Misc_HomePageSettings.uiElements.progUpload1;
        cancel = Misc_HomePageSettings.uiElements.btnCancelUpload1;
    } else if (fileIndex == 2) {
        $("#" + Misc_HomePageSettings.uiElements.btnUpload2).hide();
        progress = Misc_HomePageSettings.uiElements.progUpload2;
        cancel = Misc_HomePageSettings.uiElements.btnCancelUpload2;
    } else if (fileIndex == 3) {
        $("#" + Misc_HomePageSettings.uiElements.btnUpload3).hide();
        progress = Misc_HomePageSettings.uiElements.progUpload3;
        cancel = Misc_HomePageSettings.uiElements.btnCancelUpload3;
    } else if (fileIndex == 4) {
        $("#" + Misc_HomePageSettings.uiElements.btnUpload4).hide();
        progress = Misc_HomePageSettings.uiElements.progUpload4;
        cancel = Misc_HomePageSettings.uiElements.btnCancelUpload4;
    } else if (fileIndex == 5) {
        $("#" + Misc_HomePageSettings.uiElements.btnUpload5).hide();
        progress = Misc_HomePageSettings.uiElements.progUpload5;
        cancel = Misc_HomePageSettings.uiElements.btnCancelUpload5;
    } else if (fileIndex == 6) {
        $("#" + Misc_HomePageSettings.uiElements.btnUpload6).hide();
        progress = Misc_HomePageSettings.uiElements.progUpload6;
        cancel = Misc_HomePageSettings.uiElements.btnCancelUpload6;
    }


    //Upload the file
    Takaful.CommonMethods.UploadFile(
        file,
        progress,
        cancel,
        uploadComplete,
        uploadError,
        uploadCancelled,
        uploadAjaxSuccessResult,
        uploadAjaxErrorResult
    );



};



