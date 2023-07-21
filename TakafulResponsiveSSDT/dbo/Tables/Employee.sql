CREATE TABLE [dbo].[Employee] (
    [Emp_ID]             BIGINT         NOT NULL,
    [Emp_Password]       VARCHAR (20)   CONSTRAINT [DF_Employee_Emp_Password] DEFAULT ('!13@57#') NOT NULL,
    [Emp_Role]           INT            NULL,
    [Emp_IsAdmin]        BIT            CONSTRAINT [DF_Employee_Emp_IsAdmin] DEFAULT ((0)) NULL,
    [Emp_IsHelpDesk]     BIT            CONSTRAINT [DF_Employee_Emp_IsHelpDesk] DEFAULT ((0)) NULL,
    [Emp_AccountStatus]  BIT            NULL,
    [Emp_FullName]       NVARCHAR (100) NULL,
    [Emp_Position]       NVARCHAR (100) NULL,
    [Emp_Department]     NVARCHAR (300) NULL,
    [Emp_Nationality]    NVARCHAR (100) NULL,
    [Emp_JoiningDate]    DATE           NULL,
    [Emp_Gender]         INT            CONSTRAINT [DF_Employee_Emp_Gender] DEFAULT ((1)) NULL,
    [Emp_Email]          VARCHAR (100)  NULL,
    [Emp_MobileNumber]   VARCHAR (20)   NULL,
    [Emp_DateOfBirth]    DATE           NULL,
    [Emp_JobDegree]      NVARCHAR (100) NULL,
    [Emp_IsLocalCitizen] BIT            CONSTRAINT [DF_Employee_Emp_IsLocalCitizen] DEFAULT ((0)) NULL,
    [Emp_Password_Enc] NVARCHAR(50) NULL, 
    CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED ([Emp_ID] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'1 = Admin ||| 2 = Employee', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Employee', @level2type = N'COLUMN', @level2name = N'Emp_Role';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'True = Active ||| False = Not Active', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Employee', @level2type = N'COLUMN', @level2name = N'Emp_AccountStatus';

