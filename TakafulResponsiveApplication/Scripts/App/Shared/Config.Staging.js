
if (typeof Takaful === 'undefined') {
    // The application master namespace does not exist, create a new one
    var Takaful = {};
}

//Add the 'configuration' container object to the main namespace
Takaful.Config = {};


Takaful.Config.CurrentUser = null;
Takaful.Config.SessionIdle = 20;    //By minutes
Takaful.Config.RememberUser = false;
Takaful.Config.UserName = "";
Takaful.Config.Message_Saved = "تم الحفظ.";
Takaful.Config.Message_Deleted = "تم الحذف.";
Takaful.Config.Message_FileDeleted = "تم حذف الملف.";
Takaful.Config.Message_DefaultErrorResponse = "بعض الاجراءات الخاصة بالنظام لم يمكن إتمام تنفيذها.";
Takaful.Config.Message_ErrorResponse = "بعض الاجراءات لم يستطع النظام إتمام تنفيذها ، إذا كنت تحاول تنفيذ اجراء معين الرجاء المحاولة مرة أخرى .";
Takaful.Config.Message_Error = "لايمكن إتمام طلبك الأن.";
Takaful.Config.Message_ErrorDeleteWithRelatedData = "لا يمكن الحذف للإرتباط ببيانات أخرى.";
Takaful.Config.Message_ErrorAuthorizationValidation = "لايمكن التحقق من صلاحية الدخول الأن.";

//Staging Server
Takaful.Config.ServiceUrl_Main = "http://172.16.120.164:8088/api/Main";    //For deploying on the production server

Takaful.Config.ServiceUrl_FileUploads = Takaful.Config.ServiceUrl_Main + "/Misc/FileUploads";





