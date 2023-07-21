
if (typeof Takaful === 'undefined') {
    // The application master namespace does not exist, create a new one
    var Takaful = {};
}

//Add the 'configuration' container object to the main namespace
Takaful.CommonMethods = {};

//Takaful.CommonMethods.SessionTrackingHandler = 0;



// [APPlication Specific] Methods////
//-----------------------------------

//Upload file & get the temporary file name on the server
Takaful.CommonMethods.UploadFile = function (file, progressBarID, cancelButtonID, uploadCompleteFunction, onErrorFunction, onAbortFunction, successAjaxResultFunction, errorAjaxResultFunction) {

    if (window.FormData !== undefined) {
        var data = new FormData();
        data.append("file0", file);


        $.ajax({
            async: true,
            type: "POST",
            url: Takaful.Config.ServiceUrl_FileUploads + "/Upload",
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            success: successAjaxResultFunction,
            error: errorAjaxResultFunction,
            xhr: function () {
                // get the native XmlHttpRequest object
                var xhr = $.ajaxSettings.xhr();
                // set the onprogress event handler (transfer progress)
                xhr.upload.onprogress = function (e) {
                    if (progressBarID && progressBarID != null && progressBarID != "") {
                        if (e.lengthComputable) {
                            $("#" + progressBarID).attr('value', e.loaded / e.total * 100);
                        } else {
                            $("#" + progressBarID).attr('value', 100);
                        }
                    }
                };
                // set the onload event handler (transfer complete)
                xhr.upload.onload = uploadCompleteFunction;
                xhr.upload.onerror = onErrorFunction;
                xhr.upload.onabort = onAbortFunction;
                xhr.upload.onloadend = function (e) {
                    if (progressBarID && progressBarID != null && progressBarID != "") {
                        $("#" + progressBarID).attr('value', 0);
                        $("#" + progressBarID).attr('max', 100);
                        $("#" + progressBarID).hide();
                    }

                    if (cancelButtonID && cancelButtonID != null && cancelButtonID != "") {
                        $("#" + cancelButtonID).hide();
                    }
                };

                // return the customized object
                return xhr;
            },
            beforeSend: function (xhr) {
                if (progressBarID && progressBarID != null && progressBarID != "") {
                    $("#" + progressBarID).attr('value', 0);
                    $("#" + progressBarID).attr('max', 100);
                    $("#" + progressBarID).show();
                }

                if (cancelButtonID && cancelButtonID != null && cancelButtonID != "") {
                    $("#" + cancelButtonID).show();

                    $("#" + cancelButtonID).click(function () {
                        xhr.abort();
                        if (progressBarID && progressBarID != null && progressBarID != "") {
                            $("#" + progressBarID).attr('value', 0);
                            $("#" + progressBarID).attr('max', 100);
                            $("#" + progressBarID).hide();
                        }
                        $("#" + cancelButtonID).hide();
                        return false;   //To disable page postback (in aspx)
                    });
                }
            },
        });

    }
};   // This function needs REVIEW

//Delete TEMP file (from temp location)
Takaful.CommonMethods.DeleteTempFile = function (fileName, successCallbackF, errorCallbackF, completedCallbackF) {

    //Build the ajax request options
    var requestOptions = new Takaful.Utility.AjaxOptions();
    //requestOptions.RequestUrl = Takaful.Config.ServiceUrl_FileUploads + '/DeleteTempFile/' + fileName;
    requestOptions.RequestUrl = Takaful.Config.ServiceUrl_FileUploads + '/DeleteTempFile?fileName=' + fileName;
    requestOptions.RequestType = "DELETE";
    requestOptions.DataType = "json";
    requestOptions.ContentType = "application/json";
    requestOptions.SuccessCallback = successCallbackF;
    requestOptions.ErrorCallback = errorCallbackF;
    requestOptions.CompletedCallback = completedCallbackF;

    //Execute the ajax call
    var ajxhndlr = new Takaful.Utility.AjaxHandler();
    ajxhndlr.DoAjaxCommunication(requestOptions);

};


// [Generic] Methods////
//-----------------------------------

Takaful.CommonMethods.GetQueryStringParameter = function (paramName) {

    var queryString = new Array();
    var resultValue = '';

    if (queryString.length == 0) {
        if (window.location.search.split('?').length > 1) {
            var params = window.location.search.split('?')[1].split('&');
            for (var i = 0; i < params.length; i++) {
                var key = params[i].split('=')[0];
                var value = decodeURIComponent(params[i].split('=')[1]);
                queryString[key] = value;
            }
        }
    }

    if (queryString[paramName] != null) {
        resultValue = queryString[paramName];
    }

    return resultValue;

};

Takaful.CommonMethods.isPositiveInteger = function (num, withZero) {

    var i = +num; // convert to a number

    if (i != ~~i) return false; // make sure there's no decimal part

    if (withZero == true) {
        if (i < 0) return false; // make sure it's positive
    } else {
        if (i < 1) return false; // make sure it's positive
    }

    return true;

};

Takaful.CommonMethods.isPositiveFloat = function (num, withZero) {

    var i = +num; // convert to a number

    //if (i != ~~i) return false; // make sure there's no decimal part

    if (withZero == true) {
        if (i < 0) return false; // make sure it's positive
    } else {
        if (i < 1) return false; // make sure it's positive
    }

    return true;

};

//Popup message using jquery ui
Takaful.CommonMethods.ShowInfoMsg__ = function (message, title, showPeriod) {

    if (!title || title.trim() == "") {
        title = "معلومات";
    }

    if (!showPeriod || showPeriod < 1) {
        showPeriod = 3;
    }

    //var messageID = Math.round().toString();
    var d = new Date();
    var messageID = d.getTime();
    //alert(messageID);

    var element = '<div id="dialog-confirm' + messageID + '" title="' + title + '"><p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>' + message + '</p></div>';

    $(element).dialog({
        resizable: false,
        //height: 340,
        width: 500,
        modal: false,
        //buttons: {
        //    "موافق": function () {
        //        $(this).dialog("close");
        //    }
        //    //,
        //    //Cancel: function () {
        //    //    result = "no";
        //    //    $(this).dialog("close");
        //    //}
        //},
        open: function (event, ui) {
            setTimeout(function () {
                $('#dialog-confirm' + messageID).dialog('close');
                $("#dialog-confirm" + messageID).dialog("destroy");
                $("#dialog-confirm" + messageID).remove();
            }, (showPeriod * 1000));
        },
        close: function (event, ui) {
            $("#dialog-confirm" + messageID).dialog("destroy");
        },
        show: { effect: "blind", duration: 300 },
        hide: { effect: "explode", duration: 300 }
    });

};

//Popup message using foundation platform
Takaful.CommonMethods.ShowInfoMsg = function (message, title, showPeriod, messageType) {



    if (showPeriod == undefined) {
        showPeriod = 5;
    }

    showPeriod = +showPeriod;
    if (isNaN(showPeriod)) {
        showPeriod = 5;
    }

    if (showPeriod < 0) {
        showPeriod = 5;
    }


    var messageClass = "", iconStyle = "";

    switch (messageType) {
        case "success":
            if (!title || title.trim() == "") {
                title = "تم بنجاح";
            }
            messageClass = "MsSuccess";
            iconStyle = '<i class="fa fa-check fa "></i>';
            break;
        case "error":
            if (!title || title.trim() == "") {
                title = "خطأ";
            }
            messageClass = "MsError";
            iconStyle = '<i class="fa fa-remove fa "></i>';
            break;
        case "warning":
            if (!title || title.trim() == "") {
                title = "تحذير";
            }
            messageClass = "MsWarning";
            iconStyle = '<i class="fa fa-warning fa "></i>';
            break;

        default:    //Info (default style)
            if (!title || title.trim() == "") {
                title = "معلومات";
            }
            messageClass = "MsInfo";
            iconStyle = '<i class="fa fa-info-circle fa "></i>';
    }



    //var messageID = Math.round().toString();
    var d = new Date();
    var messageID = d.getTime();
    //alert(messageID);

    var element = '<div id="dialog-info' + messageID + '" class="reveal-modal text-center ' + messageClass + ' small" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog" data-options="close_on_background_click:false;close_on_esc:false;" ><h2 id="modalTitle">' + title + iconStyle + '</h2><p class="lead">' + message + '</p><a id="close' + messageID + '" class="close-reveal-modal" aria-label="Close">&#215;</a></div>';

    $('body').append(element);    //Append the reveal to the page
    //$(document).foundation();   //Reinitiate  the foundation plugin


    $('#dialog-info' + messageID).foundation({
        reveal: {
            multiple_opened: true,
        }
    });

    $('#dialog-info' + messageID).foundation('reveal', 'open');

    //The message close button
    $('#close' + messageID).bind("click", function () {
        $('#dialog-info' + messageID).fadeOut(400);
        setTimeout(function () {
            $('#dialog-info' + messageID).remove();
            $('.reveal-modal-bg').remove();
        }, (400));
    });

    if (showPeriod > 0) {
        //$('.reveal-modal-bg').hide();
        $('.reveal-modal-bg').remove();
        setTimeout(function () {
            //$('#dialog-info' + messageID).foundation('reveal', 'close');
            $('#dialog-info' + messageID).fadeOut(400);
            setTimeout(function () {
                $('#dialog-info' + messageID).remove();
            }, (400));
        }, (showPeriod * 1000));
    }






};

//Confirmation message using jquery ui
Takaful.CommonMethods.ShowConfirmMsg__ = function (message, title, yesFunction, noFunction) {

    if (!title || title.trim() == "") {
        title = "تأكيد";
    }

    var d = new Date();
    var messageID = d.getTime();

    var element = '<div id="dialog-confirm' + messageID + '" title="' + title + '"><p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>' + message + '</p></div>';

    $(element).dialog({
        closeOnEscape: false,
        dialogClass: "noclose",
        resizable: false,
        //height: 340,
        width: 500,
        modal: true,
        buttons: {
            "نعم": function () {
                if (yesFunction) {
                    yesFunction();
                }
                $(this).dialog("close");
                $(this).dialog("destroy");
            }
            ,
            "لا": function () {
                if (noFunction) {
                    noFunction();
                }
                $(this).dialog("close");
                $(this).dialog("destroy");
            }
        },
        open: function (event, ui) {
            //Set the default button
            $(this).closest('.ui-dialog').find('.ui-dialog-buttonpane button:eq(1)').focus();
            $(".ui-dialog-titlebar-close").hide();
            //$(this).closest('.ui-dialog').find('.ui-dialog-buttonpane button:eq(0)').blur();
        },
        show: { effect: "blind", duration: 300 },
        hide: { effect: "explode", duration: 300 }
    });

};

//Confirmation message using foundation platform
Takaful.CommonMethods.ShowConfirmMsg = function (message, yesFunction, title) {


    if (!title) {
        title = "حذف";
    }

    var messageClass = "MsWarning";
    var iconStyle = '<i class="fa fa-warning fa "></i>';

    var d = new Date();
    var messageID = d.getTime();

    var element = '<div id="dialog-info' + messageID + '" class="reveal-modal text-center ' + messageClass + ' small" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog" data-options="close_on_background_click:false;close_on_esc:false;" >' +
        '<h2 id="modalTitle">' + title + iconStyle + '</h2>' +
        '<p class="lead">' + message + '</p>' +
        //'<a id="close' + messageID + '" class="close-reveal-modal" aria-label="Close">&#215;</a>' +
        '<div class="row text-center">' +
        '<div class="medium-3 columns">&nbsp;</div>' +
        '<div class="medium-3 columns"><a id="yes' + messageID + '" class="subscribe-btn2 hover round medium-12 column">نعم</a></div>' +
        '<div class="medium-3 columns"><a id="close' + messageID + '" class="subscribe-btn2 hover round medium-12 column">لا</a></div>' +
        '<div class="medium-3 columns">&nbsp;</div>' +
        '</div>' +
        '</div>';

    $('body').append(element);    //Append the reveal to the page


    $('#dialog-info' + messageID).foundation({
        reveal: {
            multiple_opened: true,
        }
    });

    $('#dialog-info' + messageID).foundation('reveal', 'open');

    //The message close button
    $('#close' + messageID).bind("click", function () {
        $('#dialog-info' + messageID).fadeOut(400);
        setTimeout(function () {
            $('#dialog-info' + messageID).remove();
            $('.reveal-modal-bg').remove();
        }, (400));
    });

    //The message close button
    $('#yes' + messageID).bind("click", function () {
        $('#dialog-info' + messageID).fadeOut(400);
        setTimeout(function () {
            yesFunction();
            $('#dialog-info' + messageID).remove();
            $('.reveal-modal-bg').remove();
        }, (400));
    });



};

Takaful.CommonMethods.ShowLoading_ = function () {

    $("#divLoading").show();

};

Takaful.CommonMethods.ShowLoading = function () {

    $("html").addClass("actionloading");

};

//Popup modal message for progress waiting
Takaful.CommonMethods.ShowProgressLoading = function (message) {


    var title = "معلومات";
    var messageClass = "MsInfo";
    var iconStyle = '<i class="fa fa-info-circle fa "></i>';

    var messageID = "dialog-info_ProgressLoadingMessage";

    var element = '<div id="' + messageID + '" class="reveal-modal text-center ' + messageClass + ' small" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog" data-options="close_on_background_click:false;close_on_esc:false;" ><h2 id="modalTitle">' + title + iconStyle + '</h2><p class="lead">' + message + '</p></div>';

    $('body').append(element);    //Append the reveal to the page
    //$(document).foundation();   //Reinitiate  the foundation plugin


    $('#' + messageID).foundation({
        reveal: {
            multiple_opened: true,
        }
    });

    $('#' + messageID).foundation('reveal', 'open');



};

Takaful.CommonMethods.HideLoading_ = function () {

    $("#divLoading").hide();
    $("#divInitialLoading").hide();

};

Takaful.CommonMethods.HideLoading = function () {

    $("html").removeClass("loading actionloading");

};

//Popup modal message for progress waiting
Takaful.CommonMethods.HideProgressLoading = function () {


    var messageID = "dialog-info_ProgressLoadingMessage";

    $('#' + messageID).fadeOut(400);
    setTimeout(function () {
        $('#' + messageID).remove();
        $('.reveal-modal-bg').remove();
    }, (400));



};

Takaful.CommonMethods.IsValidDateTime = function (DateTimeValue) {

    var result = false;
    var dateObj = new Date(DateTimeValue);

    if (Object.prototype.toString.call(dateObj) === "[object Date]") {
        // it is a date
        if (isNaN(dateObj.getTime())) {  // d.valueOf() could also work
            // date is not valid
        }
        else {
            // date is valid
            result = true;
        }
    }
    else {
        // not a date
    }

    return result;

};

Takaful.CommonMethods.GetFormattedDateTime = function (DateTimeValue) {

    var result = "";
    var vMonth, vDay, vHour, vMinute, vSecond;
    var dateObj = new Date(DateTimeValue);
    //var dateObj = new Date(DateTimeValue+" UTC");


    if (Takaful.CommonMethods.IsValidDateTime(dateObj) != true) {
        return result;
    }

    //Month
    if (dateObj.getMonth() + 1 < 10) {
        vMonth = "0" + (dateObj.getMonth() + 1).toString();
    } else {
        vMonth = (dateObj.getMonth() + 1).toString();
    }

    //Day
    if (dateObj.getDate() < 10) {
        vDay = "0" + dateObj.getDate().toString();
    } else {
        vDay = dateObj.getDate().toString();
    }

    //Hour
    if (dateObj.getHours() < 10) {
        vHour = "0" + dateObj.getHours().toString();
    } else {
        vHour = dateObj.getHours().toString();
    }

    //Minute
    if (dateObj.getMinutes() < 10) {
        vMinute = "0" + dateObj.getMinutes().toString();
    } else {
        vMinute = dateObj.getMinutes().toString();
    }

    //Second
    if (dateObj.getSeconds() < 10) {
        vSecond = "0" + dateObj.getSeconds().toString();
    } else {
        vSecond = dateObj.getSeconds().toString();
    }

    result = dateObj.getFullYear() + '/' + vMonth + "/" + vDay + " " + vHour + ":" + vMinute + ":" + vSecond;

    return result;

};

Takaful.CommonMethods.GetFormattedDate = function (DateTimeValue) {

    var result = "";
    var vMonth, vDay;

    if (!DateTimeValue) {
        return result;
    }

    var dateObj = new Date(DateTimeValue);

    if (Takaful.CommonMethods.IsValidDateTime(dateObj) != true) {
        return result;
    }

    //Month
    if (dateObj.getMonth() + 1 < 10) {
        vMonth = "0" + (dateObj.getMonth() + 1).toString();
    } else {
        vMonth = (dateObj.getMonth() + 1).toString();
    }

    //Day
    if (dateObj.getDate() < 10) {
        vDay = "0" + dateObj.getDate().toString();
    } else {
        vDay = dateObj.getDate().toString();
    }

    result = dateObj.getFullYear() + '/' + vMonth + "/" + vDay;

    return result;

};

Takaful.CommonMethods.GetFormattedDate_StyleSheet = function (DateTimeValue) {

    var result = "";
    var vMonth, vDay;
    var dateObj = new Date(DateTimeValue);

    //Month
    if (dateObj.getMonth() + 1 < 10) {
        vMonth = "0" + (dateObj.getMonth() + 1).toString();
    } else {
        vMonth = (dateObj.getMonth() + 1).toString();
    }

    //Day
    if (dateObj.getDate() < 10) {
        vDay = "0" + dateObj.getDate().toString();
    } else {
        vDay = dateObj.getDate().toString();
    }

    result = "_" + dateObj.getFullYear() + '_' + vMonth + "_" + vDay;

    return result;

};

Takaful.CommonMethods.GetFormattedTime = function (DateTimeValue) {

    var result = "";
    var vHour, vMinute, vSecond;
    var dateObj = new Date(DateTimeValue);

    //Hour
    if (dateObj.getHours() < 10) {
        vHour = "0" + dateObj.getHours().toString();
    } else {
        vHour = dateObj.getHours().toString();
    }

    //Minute
    if (dateObj.getMinutes() < 10) {
        vMinute = "0" + dateObj.getMinutes().toString();
    } else {
        vMinute = dateObj.getMinutes().toString();
    }

    //Second
    if (dateObj.getSeconds() < 10) {
        vSecond = "0" + dateObj.getSeconds().toString();
    } else {
        vSecond = dateObj.getSeconds().toString();
    }

    result = vHour + ":" + vMinute + ":" + vSecond;

    return result;

};

Takaful.CommonMethods.GetFormattedDateTimeForFileName = function (DateTimeValue) {

    var result = "";
    var vMonth, vDay, vHour, vMinute, vSecond, vMiSecond;

    if (!DateTimeValue) {
        DateTimeValue = Date.now();
    }

    var dateObj = new Date(DateTimeValue);

    //Month
    if (dateObj.getMonth() + 1 < 10) {
        vMonth = "0" + (dateObj.getMonth() + 1).toString();
    } else {
        vMonth = (dateObj.getMonth() + 1).toString();
    }

    //Day
    if (dateObj.getDate() < 10) {
        vDay = "0" + dateObj.getDate().toString();
    } else {
        vDay = dateObj.getDate().toString();
    }

    //Hour
    if (dateObj.getHours() < 10) {
        vHour = "0" + dateObj.getHours().toString();
    } else {
        vHour = dateObj.getHours().toString();
    }

    //Minute
    if (dateObj.getMinutes() < 10) {
        vMinute = "0" + dateObj.getMinutes().toString();
    } else {
        vMinute = dateObj.getMinutes().toString();
    }

    //Second
    if (dateObj.getSeconds() < 10) {
        vSecond = "0" + dateObj.getSeconds().toString();
    } else {
        vSecond = dateObj.getSeconds().toString();
    }

    //Milli second
    vMiSecond = dateObj.getMilliseconds().toString();

    result = dateObj.getFullYear() + '-' + vMonth + "-" + vDay + "_" + vHour + "-" + vMinute + "-" + vSecond + "-" + vMiSecond;

    return result;

};

Takaful.CommonMethods.IsDateRangeOverlappingAnother = function (startDate1, endDate1, startDate2, endDate2) {

    var result = false;
    var tStartDate1 = new Date(startDate1);
    var tEndDate1 = new Date(endDate1);
    var tStartDate2 = new Date(startDate2);
    var tEndDate2 = new Date(endDate2);

    //Check if the first
    if ((tStartDate1 <= tEndDate2) & (tEndDate1 >= tStartDate2)) {
        result = true;
    }

    return result;

};

Takaful.CommonMethods.GetAllDatesInDateRange = function (startDate, endDate) {

    var tStartDate = new Date(Takaful.CommonMethods.GetFormattedDate(startDate));
    var currentDate = new Date(tStartDate);
    var tEndDate = new Date(Takaful.CommonMethods.GetFormattedDate(endDate));
    var result = [];

    while (currentDate <= tEndDate) {
        result.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;


};

Takaful.CommonMethods.EncryptTempValue = function (stringValue) {

    var passPhrase = Takaful.CommonMethods.GetFormattedDate(new Date());
    //var iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    //var salt = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    var iv = Takaful.CommonMethods.GetFormattedDate(new Date()).toString(CryptoJS.enc.Hex);
    var salt = Takaful.CommonMethods.GetFormattedDate(new Date()).toString(CryptoJS.enc.Hex);
    var key = CryptoJS.PBKDF2(
        passPhrase,
        CryptoJS.enc.Hex.parse(salt),
        { keySize: 4, iterations: 1000 });


    var encrypted = CryptoJS.AES.encrypt(
        stringValue,
        key,
        { iv: CryptoJS.enc.Hex.parse(iv) });

    var ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

    return ciphertext;

};

Takaful.CommonMethods.DecryptTempValue = function (stringEncryptedValue) {

    var passPhrase = Takaful.CommonMethods.GetFormattedDate(new Date());
    //var iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    //var salt = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    var iv = Takaful.CommonMethods.GetFormattedDate(new Date()).toString(CryptoJS.enc.Hex);
    var salt = Takaful.CommonMethods.GetFormattedDate(new Date()).toString(CryptoJS.enc.Hex);
    var key = CryptoJS.PBKDF2(

        passPhrase,
        CryptoJS.enc.Hex.parse(salt),
        { keySize: 4, iterations: 1000 });


    var cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(stringEncryptedValue)
    });

    var decrypted = CryptoJS.AES.decrypt(
        cipherParams,
        key,
        { iv: CryptoJS.enc.Hex.parse(iv) });

    var plaintext = decrypted.toString(CryptoJS.enc.Utf8);

    return plaintext;

};

Takaful.CommonMethods.IsSpecialCharactersInUserName = function (stringValue) {

    if (stringValue == undefined || stringValue == null) {
        return "";
    }

    var specialCharacters = '!_@_#_$_%_^_&_*_(_)_=_+_\\_/_"_;_:_,_?_|_[_]_{_}' + "_ _'";
    var arrSpecialCharacters = specialCharacters.split("_");

    for (var i = 0; i < arrSpecialCharacters.length; i++) {
        if (stringValue.indexOf(arrSpecialCharacters[i]) >= 0) {
            return arrSpecialCharacters[i];
        }
    }

    return "";

};

//For drawing the barchart in div element
Takaful.CommonMethods.InitializeBarChart = function (barChartDivElementName, barColor, chartData, barClickEvent) {

    $('#' + barChartDivElementName).empty();

    //Get the biggest value as the base of calculations
    var maxValue = 0;
    $.each(chartData, function (i, l) {
        $.each(l.barsValues, function (i2, l2) {
            if (l2 > maxValue) {
                maxValue = l2;
            }
        });
    });

    $('#' + barChartDivElementName).append('<div class="ChartConiner"><div id="' + barChartDivElementName + '_internalContainer" class="responChart"></div></div>');


    $.each(chartData, function (i, l) {

        //Adding the main item element
        $('#' + barChartDivElementName + '_internalContainer').append(
            '<div id="' + barChartDivElementName + '_chartMainItem' + i.toString() + '" class="ColCahrt" title="' + l.label + '">' +
                '<div class="titleChart">' + l.label + '</div>' +
                '<div id="' + barChartDivElementName + '_divChartItem_' + i.toString() + '" class="divContentMoreChar"></div>' +
            '</div>'
            );

        //Adding the bars for the main item
        $.each(l.barsValues, function (i2, l2) {
            var barValue = (l2 / maxValue) * 100;
            if (maxValue == 0) {
                barValue = 0;
            }
            $('#' + barChartDivElementName + '_divChartItem_' + i.toString()).append(
                '<div id="' + barChartDivElementName + '_bar_' + i.toString() + '_' + i2.toString() + '" class="BarChart" style=" background-color: ' + barColor + ';  width:' + barValue + '%;" tabindex="-1" ><div class="ValueBarChart">' + l2 + '</div></div>'
            );

            //Add click event handler
            $('#' + barChartDivElementName + '_bar_' + i.toString() + '_' + i2.toString()).bind('click', (function (currentItem) {
                return function () {//return function, \/ access to closure scope
                    barClickEvent(currentItem);
                };
            }(l)));
        });

        $('#' + barChartDivElementName + '_chartMainItem' + i.toString()).height((chartData[0].barsValues.length * 25) + 5);

    });


    $(document).tooltip({ track: true });

};

//Initializing a data table plugin (foundation & jquery)
Takaful.CommonMethods.InitializeDataTable = function (tableName) {

    //if ($.fn.dataTable.isDataTable('#' + tableName)) {
    //    var table = $('#' + tableName).DataTable();
    //    table.destroy();
    //}

    //$('#' + tableName).DataTable({
    //    //"paging": false,
    //    "ordering": false,
    //    "searching": false,
    //    "lengthChange": false,
    //    "pageLength": 10,
    //    "info": false
    //});

    $('#' + tableName).DataTable({
        //"paging": false,
        "ordering": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 10,
        "info": false,
        "bAutoWidth": false
        //stateSave: true
    });

};

//Terminate a data table plugin (foundation & jquery)
Takaful.CommonMethods.TerminateDataTable = function (tableName) {

    if ($.fn.dataTable.isDataTable('#' + tableName)) {
        var table = $('#' + tableName).DataTable();
        table.destroy();
        //table.fnClearTable();
    }

};






