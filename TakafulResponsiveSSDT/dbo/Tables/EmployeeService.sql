CREATE TABLE [dbo].[EmployeeService] (
    [Emp_ID]                  BIGINT   NOT NULL,
    [EmS_OnDate]              DATETIME CONSTRAINT [DF_EmployeeService_EmS_OnDate] DEFAULT (getutcdate()) NOT NULL,
    [EmS_TotalSalary]         INT      NULL,
    [EmS_EndOfServiceBenefit] INT      NULL,
    CONSTRAINT [PK_EmployeeService] PRIMARY KEY CLUSTERED ([Emp_ID] ASC, [EmS_OnDate] ASC),
    CONSTRAINT [FK_EmployeeService_Employee] FOREIGN KEY ([Emp_ID]) REFERENCES [dbo].[Employee] ([Emp_ID])
);

