using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.OleDb;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using DocumentFormat.OpenXml.Wordprocessing;
using TakafulResponsiveApplication.Models.DB;
using System.IO;
using static TakafulResponsiveApplication.Models.Business.Common.Common;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Employee_DataManagement
    {

        TakafulEntities tpDB = new TakafulEntities();

        public List<DataObjects.Internal.Employee_DataManagement.MainObject> GetInitialData()
        {

            var defaultDataObj = new List<DataObjects.Internal.Employee_DataManagement.MainObject>();
            var bus = new Common.Common.Business();

            var lstEmployees = tpDB.Employees.Include(e => e.EmployeeServices).OrderBy(e => e.Emp_ID).ToList();

            for (int i = 0; i < lstEmployees.Count; i++)
            {
                var temp = new DataObjects.Internal.Employee_DataManagement.MainObject();
                var service = lstEmployees[i].EmployeeServices.OrderByDescending(s => s.EmS_OnDate).ToList()[0];
                temp.EmployeeNumber = lstEmployees[i].Emp_ID;
                temp.Name = lstEmployees[i].Emp_FullName;
                temp.Position = lstEmployees[i].Emp_Position;
                temp.Department = lstEmployees[i].Emp_Department;
                temp.JoinDate = lstEmployees[i].Emp_JoiningDate;
                temp.JobDegree = lstEmployees[i].Emp_JobDegree;
                temp.Salary = service.EmS_TotalSalary.Value;
                temp.EndServiceBenefits = service.EmS_EndOfServiceBenefit.Value;
                if (lstEmployees[i].Emp_IsLocalCitizen.Value == true && service.EmS_EndOfServiceBenefit.Value == 999999999)
                {
                    temp.EndServiceBenefits = 0;
                }

                temp.Nationality = lstEmployees[i].Emp_Nationality;
                temp.Gender = lstEmployees[i].Emp_Gender.Value;
                temp.IsCitizen = lstEmployees[i].Emp_IsLocalCitizen.Value;
                temp.BirthDate = lstEmployees[i].Emp_DateOfBirth;
                temp.Email = lstEmployees[i].Emp_Email;
                temp.Mobile = lstEmployees[i].Emp_MobileNumber;
                defaultDataObj.Add(temp);
            }



            return defaultDataObj;
        }

        public List<DataObjects.Internal.Employee_DataManagement.MainObject> Save(long id, long empNumber, string empName, string position, string department, DateTime? joinDate, string degree, int salary, int endService, string nationality, int gender, bool isCitizen, DateTime? birthDate, string email, string mobile, out string resultMessage)
        {

            var serv = new EmployeeService();

            if (id > 0) //Modified employee
            {
                //Get the employee to be modified
                var employee = tpDB.Employees.FirstOrDefault(e => e.Emp_ID == id);

                if (isCitizen == true && endService == 0)
                {
                    endService = 999999999;
                }

                ////Validate aginst email duplication
                //if (tpDB.Employees.Count(e => e.Emp_ID != id && !string.IsNullOrEmpty(e.Emp_Email) && e.Emp_Email.Trim() == email.Trim()) > 0)
                //{
                //    resultMessage = "EmailExists";
                //    return new List<DataObjects.Internal.Employee_DataManagement.MainObject>();
                //}

                ////Validate aginst mobile duplication
                //if (tpDB.Employees.Count(e => e.Emp_ID != id && !string.IsNullOrEmpty(e.Emp_MobileNumber) && e.Emp_MobileNumber.Trim() == mobile.Trim()) > 0)
                //{
                //    resultMessage = "MobileExists";
                //    return new List<DataObjects.Internal.Employee_DataManagement.MainObject>();
                //}

                //Employee service
                serv = tpDB.EmployeeServices.Where(s => s.Emp_ID == id).OrderByDescending(s => s.EmS_OnDate).Take(1).FirstOrDefault();

                if (serv.EmS_TotalSalary != salary || serv.EmS_EndOfServiceBenefit != endService)   //Modified service, create new service entry
                {
                    serv = new EmployeeService();
                    serv.EmS_OnDate = DateTime.UtcNow;
                    serv.EmS_TotalSalary = salary;
                    serv.EmS_EndOfServiceBenefit = endService;
                    serv.Emp_ID = employee.Emp_ID;
                    tpDB.EmployeeServices.Add(serv);
                }

                //Update the employee entry
                employee.Emp_FullName = empName;
                employee.Emp_Position = position;
                employee.Emp_Department = department;
                employee.Emp_JoiningDate = joinDate;
                employee.Emp_JobDegree = degree;
                employee.Emp_Nationality = nationality;
                employee.Emp_Gender = gender;
                employee.Emp_IsLocalCitizen = isCitizen;
                employee.Emp_DateOfBirth = birthDate;
                employee.Emp_Email = email;
                employee.Emp_MobileNumber = mobile;
                //employee.Emp_Password = "!13@57#";  //Default value
                //employee.Emp_Password = "123";

                tpDB.Entry(employee).State = EntityState.Modified;
            }
            else    //New employee
            {
                //Validate aginst employee number duplication
                if (tpDB.Employees.Count(e => e.Emp_ID == empNumber) > 0)
                {
                    resultMessage = "EmployeeNumberExists";
                    return new List<DataObjects.Internal.Employee_DataManagement.MainObject>();
                }

                ////Validate aginst email duplication
                //if (tpDB.Employees.Count(e => !string.IsNullOrEmpty(e.Emp_Email) && e.Emp_Email.Trim() == email.Trim()) > 0)
                //{
                //    resultMessage = "EmailExists";
                //    return new List<DataObjects.Internal.Employee_DataManagement.MainObject>();
                //}

                ////Validate aginst mobile duplication
                //if (tpDB.Employees.Count(e => !string.IsNullOrEmpty(e.Emp_MobileNumber) && e.Emp_MobileNumber.Trim() == mobile.Trim()) > 0)
                //{
                //    resultMessage = "MobileExists";
                //    return new List<DataObjects.Internal.Employee_DataManagement.MainObject>();
                //}

                var employee = new Models.DB.Employee();
                employee.Emp_ID = empNumber;
                employee.Emp_FullName = empName;
                employee.Emp_Position = position;
                employee.Emp_Department = department;
                employee.Emp_JoiningDate = joinDate;
                employee.Emp_JobDegree = degree;
                employee.Emp_Nationality = nationality;
                employee.Emp_Gender = gender;
                employee.Emp_IsLocalCitizen = isCitizen;
                employee.Emp_DateOfBirth = birthDate;
                employee.Emp_Email = email;
                employee.Emp_MobileNumber = mobile;
                //employee.Emp_Password = "!13@57#";  //Default value
                //employee.Emp_Password = "123";

                employee.Emp_Password= "!13@57#"; /*Fake Password*/
                employee.SecurityStamp = Helper.EncyptDecrypt.GenerateEncryptionKey();
                employee.Emp_Password_Enc = Helper.EncyptDecrypt.Encrypt("123", employee.SecurityStamp);

                serv.EmS_OnDate = DateTime.UtcNow;
                serv.EmS_TotalSalary = salary;
                serv.EmS_EndOfServiceBenefit = endService;
                serv.Emp_ID = employee.Emp_ID;
                //tpDB.EmployeeServices.Add(serv);
                employee.EmployeeServices.Add(serv);

                tpDB.Employees.Add(employee);
            }


            //Save data
            tpDB.SaveChanges();


            resultMessage = "True";
            return this.GetInitialData();

        }

        public List<DataObjects.Internal.Employee_DataManagement.MainObject> Delete(long empNumber, out string resultMessage)
        {

            var bus = new Common.Common.Business();

            //Check if already exists
            var emp = tpDB.Employees
                .Include("CommitteeMember")
                .Include("CostingBreakdownDetails")
                .Include("EmployeeServices")
                .Include("ExceptionAmounts")
                .Include("HRSheetDatas")
                .Include("LoanAmounts")
                .Include("LoanExceptions")
                .Include("SubscriptionTransactions")
                .Include("TransactionCommitteeDecisions")
                .FirstOrDefault(e => e.Emp_ID == empNumber);

            if (emp != null)
            {
                //Check if related to another data
                if (emp.CommitteeMember != null ||
                    emp.CostingBreakdownDetails.Count > 0 ||
                    emp.EmployeeServices.Count > 1 ||
                    emp.ExceptionAmounts.Count > 0 ||
                    emp.HRSheetDatas.Count > 0 ||
                    emp.LoanAmounts.Count > 0 ||
                    emp.LoanExceptions.Count > 0 ||
                    emp.SubscriptionTransactions.Count > 0 ||
                    emp.TransactionCommitteeDecisions.Count > 0)
                {
                    resultMessage = "DataRelationExists";
                    return new List<DataObjects.Internal.Employee_DataManagement.MainObject>();
                }

                //If has a single service entry, we delete it
                if (emp.EmployeeServices.Count == 1)
                {
                    var serv = emp.EmployeeServices.ToList()[0];
                    tpDB.Entry(serv).State = EntityState.Deleted;
                }

                //Delete the employee
                tpDB.Entry(emp).State = EntityState.Deleted;

                //Save
                tpDB.SaveChanges();
            }


            resultMessage = "True";
            return this.GetInitialData();
        }

        public string ExportDataToExcel(List<List<string>> data, string path)
        {

            string fileName = "Employees";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }

        public List<DataObjects.Internal.Employee_DataManagement.MainObject> UploadFile(string filePath, out string resultMessage, out string resultErrorData)
        {

            //Validate the file type
            if (Path.GetExtension(filePath) != ".xls" && Path.GetExtension(filePath) != ".xlsx")
            {
                File.Delete(filePath);
                resultMessage = "BadRequest";
                resultErrorData = "";
                return new List<DataObjects.Internal.Employee_DataManagement.MainObject>();
            }

            //Validate file template
            if (IsValidExcelFileTemplate(filePath) == false)
            {
                File.Delete(filePath);
                resultMessage = "BadRequest";
                resultErrorData = "";
                return new List<DataObjects.Internal.Employee_DataManagement.MainObject>();
            }

            //Get the data from the file
            List<Employee> lstEmployees = GetEmployeesFromExcelFile(filePath);

            //Insert the data to DB
            List<Employee> lstEmployees_Error = InsertEmployeeList(lstEmployees);

            //Delete the file
            File.Delete(filePath);

            //Notify the user about the corrupted records
            string message = "";
            if (lstEmployees_Error.Count > 0)
            {
                //message = "بعض البيانات لم يتم تحديثها لوجود خطأ بها ، وأرقامها هى: ";
                for (int i = 0; i < lstEmployees_Error.Count; i++)
                {
                    if (i == 0)
                    {
                        message += lstEmployees_Error[i].Emp_ID.ToString();
                    }
                    else
                    {
                        message += " - " + lstEmployees_Error[i].Emp_ID.ToString();
                    }
                }
            }




            resultMessage = "True";
            resultErrorData = message;
            return this.GetInitialData();
        }

        public DataObjects.Internal.Employee_DataManagement.MainObject GetEmployeeData(long empID)
        {

            //var defaultDataObj = new DataObjects.Internal.Employee_DataManagement.MainObject();
            DataObjects.Internal.Employee_DataManagement.MainObject defaultDataObj = null;
            var bus = new Common.Common.Business();

            //Search for the employee in the GRP system
            defaultDataObj = this.GetEmployeeDataFromGRP(empID);


            return defaultDataObj;
        }

        private bool IsValidExcelFileTemplate(string filePath)
        {

            OleDbConnection excelConnection;

            string constr = string.Format(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=""Excel 12.0 Xml;HDR=YES;""", filePath);
            excelConnection = new OleDbConnection(constr);

            string Query = string.Format("Select [رقم الموظف]," +
                                         "[الإسم كاملا]," +
                                         "[الوظيفة]," +
                                         "[القسم - الإدارة - الموقع]," +
                                         "[الجنسية]," +
                                         "[مواطن: نعم(1) - لا(2)]," +
                                         "[تاريخ التعيين]," +
                                         "[الجنس: ذكر(1) - أنثى(2)]," +
                                         "[البريد الإلكترونى]," +
                                         "[الهاتف الجوال]," +
                                         "[تاريخ الميلاد]," +
                                         "[الدرجة الوظيفية]," +
                                         "[الراتب]," +
                                         "[مكافأة نهاية الخدمة] " +
                                         "FROM [{0}]", "Employee$");

            OleDbCommand Ecom = new OleDbCommand(Query, excelConnection);
            excelConnection.Open();
            var ds = new DataSet();
            var oda = new OleDbDataAdapter(Query, excelConnection);
            excelConnection.Close();

            try
            {
                oda.Fill(ds);
            }
            catch (Exception)
            {

                return false;
            }

            return true;

        }

        private List<Employee> GetEmployeesFromExcelFile(string filePath)
        {

            var lstEmployees = new List<Employee>();
            OleDbConnection excelConnection;


            string constr = string.Format(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=""Excel 12.0 Xml;HDR=YES;""", filePath);
            excelConnection = new OleDbConnection(constr);

            string Query = string.Format("Select [رقم الموظف]," +
                                         "[الإسم كاملا]," +
                                         "[الوظيفة]," +
                                         "[القسم - الإدارة - الموقع]," +
                                         "[الجنسية]," +
                                         "[مواطن: نعم(1) - لا(2)]," +
                                         "[تاريخ التعيين]," +
                                         "[الجنس: ذكر(1) - أنثى(2)]," +
                                         "[البريد الإلكترونى]," +
                                         "[الهاتف الجوال]," +
                                         "[تاريخ الميلاد]," +
                                         "[الدرجة الوظيفية]," +
                                         "[الراتب]," +
                                         "[مكافأة نهاية الخدمة] " +
                                         "FROM [{0}]", "Employee$");
            OleDbCommand Ecom = new OleDbCommand(Query, excelConnection);
            excelConnection.Open();

            var ds = new DataSet();
            var oda = new OleDbDataAdapter(Query, excelConnection);
            excelConnection.Close();
            oda.Fill(ds);
            DataTable Exceldt = ds.Tables[0];

            //Read the items to the list
            for (int i = 0; i < Exceldt.Rows.Count; i++)
            {
                long id = 0;
                double salary = 0, benefit = 0;
                DateTime employmentDate, birthDate;
                DataRow row = Exceldt.Rows[i];
                var employee = new Employee();
                var employeeService = new EmployeeService();
                int gender = 1;
                int isCitizen = 1;


                //ID
                if (row["رقم الموظف"].ToString().Trim() == "" || long.TryParse(row["رقم الموظف"].ToString().Trim(), out id) == false)
                {
                    employee.Emp_ID = 0;
                    employeeService.Emp_ID = 0;
                }
                else
                {
                    employee.Emp_ID = id;
                    employeeService.Emp_ID = id;
                }

                //Name
                if (row["الإسم كاملا"].ToString().Trim().Length > 100)
                {
                    employee.Emp_FullName = row["الإسم كاملا"].ToString().Trim().Substring(0, 100);
                }
                else
                {
                    employee.Emp_FullName = row["الإسم كاملا"].ToString().Trim();
                }

                //Position
                if (row["الوظيفة"].ToString().Trim().Length > 100)
                {
                    employee.Emp_Position = row["الوظيفة"].ToString().Trim().Substring(0, 100);
                }
                else
                {
                    employee.Emp_Position = row["الوظيفة"].ToString().Trim();
                }

                //Departmnt
                if (row["القسم - الإدارة - الموقع"].ToString().Trim().Length > 50)
                {
                    employee.Emp_Department = row["القسم - الإدارة - الموقع"].ToString().Trim().Substring(0, 50);
                }
                else
                {
                    employee.Emp_Department = row["القسم - الإدارة - الموقع"].ToString().Trim();
                }

                //Nationality
                if (row["الجنسية"].ToString().Trim().Length > 100)
                {
                    employee.Emp_Nationality = row["الجنسية"].ToString().Trim().Substring(0, 100);
                }
                else
                {
                    employee.Emp_Nationality = row["الجنسية"].ToString().Trim();
                }

                //Is Citizen
                if (row["مواطن: نعم(1) - لا(2)"].ToString().Trim() == "" || int.TryParse(row["مواطن: نعم(1) - لا(2)"].ToString().Trim(), out isCitizen) == false)
                {
                    employee.Emp_IsLocalCitizen = false;
                }
                else
                {
                    if (isCitizen == 1)
                    {
                        employee.Emp_IsLocalCitizen = true;
                    }
                    else
                    {
                        employee.Emp_IsLocalCitizen = false;
                    }
                }

                //Employment date
                if (row["تاريخ التعيين"].ToString().Trim() != "" && DateTime.TryParse(row["تاريخ التعيين"].ToString().Trim(), out employmentDate) == true)
                {
                    employee.Emp_JoiningDate = employmentDate;
                }

                //Gender
                if (row["الجنس: ذكر(1) - أنثى(2)"].ToString().Trim() == "" || int.TryParse(row["الجنس: ذكر(1) - أنثى(2)"].ToString().Trim(), out gender) == false)
                {
                    gender = 1;
                }
                else
                {
                    if (gender != 1 && gender != 2)
                    {
                        gender = 1;
                    }
                }

                employee.Emp_Gender = gender;

                //Email
                if (row["البريد الإلكترونى"].ToString().Trim().Length > 100)
                {
                    employee.Emp_Email = row["البريد الإلكترونى"].ToString().Trim().Substring(0, 100);
                }
                else
                {
                    employee.Emp_Email = row["البريد الإلكترونى"].ToString().Trim();
                }

                //Mobile
                if (row["الهاتف الجوال"].ToString().Trim().Length > 20)
                {
                    employee.Emp_MobileNumber = row["الهاتف الجوال"].ToString().Trim().Substring(0, 20);
                }
                else
                {
                    employee.Emp_MobileNumber = row["الهاتف الجوال"].ToString().Trim();
                }

                //Birth date
                if (row["تاريخ الميلاد"].ToString().Trim() != "" && DateTime.TryParse(row["تاريخ الميلاد"].ToString().Trim(), out birthDate) == true)
                {
                    employee.Emp_DateOfBirth = birthDate;
                }

                //Degree
                if (row["الدرجة الوظيفية"].ToString().Trim().Length > 100)
                {
                    employee.Emp_JobDegree = row["الدرجة الوظيفية"].ToString().Trim().Substring(0, 100);
                }
                else
                {
                    employee.Emp_JobDegree = row["الدرجة الوظيفية"].ToString().Trim();
                }

                //Salary
                //////string d = row["الراتب"].ToString().Trim();
                ////////int g = int.Parse(row["الراتب"].ToString().Trim());
                ////////double r = 0;
                //////double f = double.Parse(row["الراتب"].ToString().Trim());

                if (row["الراتب"].ToString().Trim() == "" || double.TryParse(row["الراتب"].ToString().Trim(), out salary) == false)
                {
                    employeeService.EmS_TotalSalary = 0;
                }
                else
                {
                    employeeService.EmS_TotalSalary = (int)salary;
                }

                //Benefit
                if (row["مكافأة نهاية الخدمة"].ToString().Trim() == "" || double.TryParse(row["مكافأة نهاية الخدمة"].ToString().Trim(), out benefit) == false)
                {
                    employeeService.EmS_EndOfServiceBenefit = 0;
                }
                else
                {
                    employeeService.EmS_EndOfServiceBenefit = (int)benefit;
                }

                employeeService.EmS_OnDate = DateTime.UtcNow;

                //Add remaining data
                //employee.Emp_Password = "!13@57#";
                employee.EmployeeServices.Add(employeeService);

                //Add to list
                if (employee.Emp_ID != 0 || employee.Emp_FullName.Trim() != "")
                {
                    lstEmployees.Add(employee);
                }

            }

            return lstEmployees;

        }

        private List<Employee> InsertEmployeeList(List<Employee> employeeCollection)
        {

            var result = new List<Employee>();
            //var employee = new Employee();
            var employeeService = new EmployeeService();
            var dateEmployment = new DateTime();
            var dateBirth = new DateTime();

            //Begin the saving operation in transaction scope
            using (var dbContextTransaction = tpDB.Database.BeginTransaction())
            {
                try
                {
                    for (int i = 0; i < employeeCollection.Count; i++)
                    {
                        if (i == 129)
                        {
                            int f = 0;
                        }

                        string empEmail = employeeCollection[i].Emp_Email;
                        string empMobile = employeeCollection[i].Emp_MobileNumber;
                        long empID = employeeCollection[i].Emp_ID;
                        //var employee = tpDB.Employees.Include(e => e.EmployeeServices.OrderByDescending(s => s.EmS_OnDate).Take(1)).FirstOrDefault(e => e.Emp_ID == empID);
                        var employee = tpDB.Employees.Include("EmployeeServices").FirstOrDefault(e => e.Emp_ID == empID);

                        if (employeeCollection[i].Emp_ID == 0 || employeeCollection[i].Emp_FullName == "")
                        {
                            result.Add(employeeCollection[i]);  //Copy to the collection of corrupted objects
                            continue;
                        }

                        //Check if the employee ID is already exists
                        if (employee == null)  //New employee
                        {
                            ////Check if email already exists
                            //if (employeeCollection[i].Emp_Email != "")
                            //{
                            //    if (tpDB.Employees.Count(em => em.Emp_Email == empEmail) > 0)
                            //    {
                            //        result.Add(employeeCollection[i]);  //Copy to the collection of corrupted objects
                            //        continue;
                            //    }
                            //}

                            ////Check if mobile already exists
                            //if (employeeCollection[i].Emp_MobileNumber != "")
                            //{
                            //    if (tpDB.Employees.Count(em => em.Emp_MobileNumber == empMobile) > 0)
                            //    {
                            //        result.Add(employeeCollection[i]);  //Copy to the collection of corrupted objects
                            //        continue;
                            //    }
                            //}

                            //Insert to DB
                            employee = new Employee();
                            employee.Emp_ID = employeeCollection[i].Emp_ID;
                            employee.Emp_FullName = employeeCollection[i].Emp_FullName;
                            employee.Emp_Position = employeeCollection[i].Emp_Position;
                            employee.Emp_Department = employeeCollection[i].Emp_Department;
                            employee.Emp_Nationality = employeeCollection[i].Emp_Nationality;
                            employee.Emp_IsLocalCitizen = employeeCollection[i].Emp_IsLocalCitizen;
                            employee.Emp_JoiningDate = employeeCollection[i].Emp_JoiningDate;
                            employee.Emp_Gender = employeeCollection[i].Emp_Gender;
                            employee.Emp_Email = employeeCollection[i].Emp_Email;
                            employee.Emp_MobileNumber = employeeCollection[i].Emp_MobileNumber;
                            employee.Emp_DateOfBirth = employeeCollection[i].Emp_DateOfBirth;
                            employee.Emp_JobDegree = employeeCollection[i].Emp_JobDegree;

                            //employee.Emp_Password = "!13@57#";  //Default value
                            /*OOrabi, PBI: 90 {2019-02-25}*/
                            //employee.Emp_Password = "123";  //Default value
                            employee.Emp_Password = "!13@57#";
                            employee.SecurityStamp = Helper.EncyptDecrypt.GenerateEncryptionKey();
                            employee.Emp_Password_Enc = Helper.EncyptDecrypt.Encrypt("123", employee.SecurityStamp);

                            //Save employee
                            //tpDB.Employees.Add(employee);
                            //tpDB.SaveChanges();

                            //Save employee service
                            employeeService = new EmployeeService();
                            employeeService.Emp_ID = employee.Emp_ID;
                            employeeService.EmS_TotalSalary = employeeCollection[i].EmployeeServices.FirstOrDefault().EmS_TotalSalary;
                            employeeService.EmS_EndOfServiceBenefit = employeeCollection[i].EmployeeServices.FirstOrDefault().EmS_EndOfServiceBenefit;
                            employeeService.EmS_OnDate = employeeCollection[i].EmployeeServices.FirstOrDefault().EmS_OnDate;

                            //tpDB.EmployeeServices.Add(employeeService);
                            //tpDB.SaveChanges();


                            employee.EmployeeServices.Add(employeeService);
                            tpDB.Employees.Add(employee);
                        }
                        else    //Employee exists
                        {
                            ////Check if email already exists
                            //if (employeeCollection[i].Emp_Email != "")
                            //{
                            //    if (tpDB.Employees.Count(em => em.Emp_Email == empEmail && em.Emp_ID != empID) > 0)
                            //    {
                            //        result.Add(employeeCollection[i]);  //Copy to the collection of corrupted objects
                            //        continue;
                            //    }
                            //}

                            ////Check if mobile already exists
                            //if (employeeCollection[i].Emp_MobileNumber != "")
                            //{
                            //    if (tpDB.Employees.Count(em => em.Emp_MobileNumber == empMobile && em.Emp_ID != empID) > 0)
                            //    {
                            //        result.Add(employeeCollection[i]);  //Copy to the collection of corrupted objects
                            //        continue;
                            //    }
                            //}

                            //Update it's data in DB
                            //Update main data
                            //employee = tpDB.Employees.Find(employeeCollection[i].Emp_ID);
                            employee.Emp_FullName = employeeCollection[i].Emp_FullName;
                            employee.Emp_Position = employeeCollection[i].Emp_Position;
                            employee.Emp_Department = employeeCollection[i].Emp_Department;
                            employee.Emp_Nationality = employeeCollection[i].Emp_Nationality;
                            employee.Emp_IsLocalCitizen = employeeCollection[i].Emp_IsLocalCitizen;
                            employee.Emp_JoiningDate = employeeCollection[i].Emp_JoiningDate;
                            employee.Emp_Gender = employeeCollection[i].Emp_Gender;
                            employee.Emp_Email = employeeCollection[i].Emp_Email;
                            employee.Emp_MobileNumber = employeeCollection[i].Emp_MobileNumber;
                            employee.Emp_DateOfBirth = employeeCollection[i].Emp_DateOfBirth;
                            employee.Emp_JobDegree = employeeCollection[i].Emp_JobDegree;


                            //Update employee service data
                            //employeeService = tpDB.EmployeeServices.OrderByDescending(es => es.EmS_OnDate).FirstOrDefault(es => es.Emp_ID == employee.Emp_ID);
                            employeeService = employee.EmployeeServices.OrderByDescending(es => es.EmS_OnDate).FirstOrDefault();

                            if (employeeService == null)
                            {
                                employeeService = new EmployeeService();
                                employeeService.Emp_ID = employee.Emp_ID;
                                employeeService.EmS_TotalSalary = employeeCollection[i].EmployeeServices.FirstOrDefault().EmS_TotalSalary;
                                employeeService.EmS_EndOfServiceBenefit = employeeCollection[i].EmployeeServices.FirstOrDefault().EmS_EndOfServiceBenefit;
                                employeeService.EmS_OnDate = employeeCollection[i].EmployeeServices.FirstOrDefault().EmS_OnDate;

                                //tpDB.EmployeeServices.Add(employeeService);
                                //tpDB.SaveChanges();
                                employee.EmployeeServices.Add(employeeService);
                            }
                            else    //Check if the new data is different than the old ones
                            {
                                //Compare values
                                bool isUpdated = false;

                                if (!((employeeService.EmS_TotalSalary == null || employeeService.EmS_TotalSalary.Value == 0) && employeeCollection[i].EmployeeServices.FirstOrDefault().EmS_TotalSalary == 0))
                                {
                                    if (employeeService.EmS_TotalSalary != employeeCollection[i].EmployeeServices.FirstOrDefault().EmS_TotalSalary)
                                    {
                                        isUpdated = true;
                                    }
                                }

                                if (!((employeeService.EmS_EndOfServiceBenefit == null || employeeService.EmS_EndOfServiceBenefit.Value == 0) && employeeCollection[i].EmployeeServices.FirstOrDefault().EmS_EndOfServiceBenefit == 0))
                                {
                                    if (employeeService.EmS_EndOfServiceBenefit != employeeCollection[i].EmployeeServices.FirstOrDefault().EmS_EndOfServiceBenefit)
                                    {
                                        isUpdated = true;
                                    }
                                }

                                if (isUpdated)
                                {
                                    //if (employeeService.EmS_OnDate.ToShortDateString() == DateTime.UtcNow.ToShortDateString())
                                    //{
                                    //    ////Rollback...
                                    //    //dbContextTransaction.Rollback();
                                    //    //Msg.Text = "لايمكن تعديل الراتب أو مكافأة نهاية الخدمة مرتين فى نفس اليوم";

                                    //    //The service data has been modified today, we will ignore the current update to avoid primary key violation
                                    //    continue;
                                    //}

                                    employeeService = new EmployeeService();
                                    employeeService.Emp_ID = employee.Emp_ID;
                                    employeeService.EmS_TotalSalary = employeeCollection[i].EmployeeServices.FirstOrDefault().EmS_TotalSalary;
                                    employeeService.EmS_EndOfServiceBenefit = employeeCollection[i].EmployeeServices.FirstOrDefault().EmS_EndOfServiceBenefit;
                                    employeeService.EmS_OnDate = DateTime.UtcNow;

                                    //tpDB.EmployeeServices.Add(employeeService);
                                    //tpDB.SaveChanges();

                                    employee.EmployeeServices.Add(employeeService);
                                }
                            }

                        }


                    }

                    //Save
                    tpDB.SaveChanges();

                    //All operations completed, commit...
                    dbContextTransaction.Commit();
                }
                catch (Exception)
                {
                    //Rollback...
                    dbContextTransaction.Rollback();
                    throw;
                }
            }



            return result;

        }

        private DataObjects.Internal.Employee_DataManagement.MainObject GetEmployeeDataFromGRP(long empID)
        {
            DataObjects.Internal.Employee_DataManagement.MainObject defaultDataObj = null;




            return defaultDataObj;
        }


    }
}
