using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Request_SubmittedRequests
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_SubmittedRequests.MainObject GetInitialData(Common.Common.Business.RequestType requestType, DateTime fromDate, DateTime toDate)
        {

            var defaultDataObj = new DataObjects.Internal.Request_SubmittedRequests.MainObject();
            var bus = new Common.Common.Business();


            //Get unfulfilled requests
            var requests = bus.GetUnfulfilledRequests(requestType, fromDate, toDate).OrderBy(s => s.SortIndex).ToList();

            for (int i = 0; i < requests.Count; i++)
            {
                var request = new DataObjects.Internal.Request_SubmittedRequests.SubmittedRequest();
                request.EmployeeNumber = requests[i].Emp_ID;
                request.Year = requests[i].SuT_Year;
                request.Serial = requests[i].SuT_Serial;
                request.SubscriptionType = requests[i].SuT_SubscriptionType;
                request.Name = requests[i].Employee.Emp_FullName;
                request.Department = requests[i].Employee.Emp_Department;
                request.Position = requests[i].Employee.Emp_Position;
                request.JoinDate = requests[i].Employee.Emp_JoiningDate;
                request.RequestDate = requests[i].SuT_Date;
                defaultDataObj.Requests.Add(request);
            }


            return defaultDataObj;

        }

        public string ExportDataToExcel(List<List<string>> data, int type, string path)
        {

            string fileName = "";


            switch (type)
            {
                case 1:
                    fileName = "NewSubscription";
                    break;
                case 2:
                    fileName = "EditSubscription";
                    break;
                case 3:
                    fileName = "CancelSubscription";
                    break;
                case 4:
                    fileName = "NewLoan";
                    break;
                case 5:
                    fileName = "EditLoanInstallment";
                    break;
                case 6:
                    fileName = "CancelLoan";
                    break;
            }

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }

    }
}
