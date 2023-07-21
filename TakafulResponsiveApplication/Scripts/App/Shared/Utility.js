
//This file contains all the helper objects with common functionality
/////////////////////////////////////////////////////////////////////

if (typeof Takaful === 'undefined') {
    // The application master namespace does not exist, create a new one
    var Takaful = {};
}

//Add the utility container object to the main namespace
Takaful.Utility = {};


//The object to hold the jquery ajax request options..............................
Takaful.Utility.AjaxOptions = function () {

    var _temp;  //Used to give initial value to the properties

    this.RequestUrl = _temp;
    this.DataToSend = _temp;
    this.RequestType = _temp;
    this.DataType = _temp;
    this.ContentType = _temp;
    this.SuccessCallback = _temp;
    this.ErrorCallback = _temp;
    this.CompletedCallback = _temp;
    this.RequestHeaderAdd = _temp;

}



//The object responsible for ajax requests..........................................
Takaful.Utility.AjaxHandler = function () {
    this.DoAjaxCommunication = function (ajaxOptionsObj) {
        jQuery.ajax({
            // the URL for the request
            url: ajaxOptionsObj.RequestUrl,
            // The data to be sent to the server. This can either be an object or a query string, 
            //such as foo=bar&amp;baz=bim.
            data: ajaxOptionsObj.DataToSend,
            // whether this is a POST or GET request
            type: ajaxOptionsObj.RequestType,
            // the type of data we expect back
            dataType: ajaxOptionsObj.DataType,
            //Content type sent in the header
            contentType: ajaxOptionsObj.ContentType,
            // code to run if the request succeeds;
            // the response is passed to the function
            success: ajaxOptionsObj.SuccessCallback,
            // code to run if the request fails; the raw request and
            // status codes are passed to the function
            error: ajaxOptionsObj.ErrorCallback,
            // code to run regardless of success or failure
            complete: ajaxOptionsObj.CompletedCallback,
            //Request Header
            beforeSend: function (xhr) {
                //if (ajaxOptionsObj.RequestHeaderAdd && ajaxOptionsObj.RequestHeaderAdd.hkey && ajaxOptionsObj.RequestHeaderAdd.hvalue) {
                //    xhr.setRequestHeader(ajaxOptionsObj.RequestHeaderAdd.hkey, ajaxOptionsObj.RequestHeaderAdd.hvalue);
                //}

                if (ajaxOptionsObj.RequestHeaderAdd) {
                    for (var i = 0; i < ajaxOptionsObj.RequestHeaderAdd.length; i++) {
                        xhr.setRequestHeader(ajaxOptionsObj.RequestHeaderAdd[i].hkey, ajaxOptionsObj.RequestHeaderAdd[i].hvalue);
                    }

                }

            }
            //beforeSend: function (xhr) {
            //    xhr.setRequestHeader('userid', '13579');
            //    xhr.setRequestHeader('usertype', 'admin');
            //}
        });
    };
}





//A template of the ajax request callback functions..................................

// code to run if the request succeeds, the response is passed to the function
//success:    function( json ) { }

// code to run if the request fails, the raw request and status codes are passed to the function
//error:    function( xhr, status, errorThrown ) { }

// code to run regardless of success or failure
//complete:    function( xhr, status ) { }



