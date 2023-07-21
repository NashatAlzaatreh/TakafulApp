
//Check for main namespace
if (typeof Report_AdminDecisions === 'undefined') {
    // Namespace does not exist, create a new one
    var Report_AdminDecisions = {};
}

//Add the event handlers container object to the main namespace
Report_AdminDecisions.EventHandlers = {};


//Export the data
Report_AdminDecisions.EventHandlers.btnExport_click = function () {

    var from = Takaful.CommonMethods.GetFormattedDate($('#' + Report_AdminDecisions.uiElements.txtDateFrom).val());
    if (from.trim() == '') {
        from = '1900-01-01';
    }

    var to = Takaful.CommonMethods.GetFormattedDate($('#' + Report_AdminDecisions.uiElements.txtDateTo).val());
    if (to.trim() == '') {
        to = '2099-12-31';
    }


    //Export data
    Report_AdminDecisions.CustomMethods.AjaxCall.Export(from, to);

    $('#' + Report_AdminDecisions.uiElements.btnExport).hide();

};




