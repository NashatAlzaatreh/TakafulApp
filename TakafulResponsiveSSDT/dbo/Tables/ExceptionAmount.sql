CREATE TABLE [dbo].[ExceptionAmount] (
    [Emp_ID]              BIGINT          NOT NULL,
    [Exc_PrimaryBalancer] BIGINT          IDENTITY (1, 1) NOT NULL,
    [FSu_ID]              INT             NULL,
    [Exc_Amount]          INT             NULL,
    [Exc_IsUsed]          BIT             NULL,
    [Exc_Notes]           NVARCHAR (1000) NULL,
    CONSTRAINT [PK_ExceptionAmount] PRIMARY KEY CLUSTERED ([Emp_ID] ASC, [Exc_PrimaryBalancer] ASC),
    CONSTRAINT [FK_Exception_Employee] FOREIGN KEY ([Emp_ID]) REFERENCES [dbo].[Employee] ([Emp_ID]),
    CONSTRAINT [FK_ExceptionAmount_FundSubscription] FOREIGN KEY ([FSu_ID]) REFERENCES [dbo].[FundSubscription] ([FSu_ID])
);

