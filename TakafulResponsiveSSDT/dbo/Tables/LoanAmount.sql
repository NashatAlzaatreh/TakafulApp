CREATE TABLE [dbo].[LoanAmount] (
    [LAm_ID]                  INT    IDENTITY (1, 1) NOT NULL,
    [Emp_ID]                  BIGINT NOT NULL,
    [LAm_Date]                DATE   CONSTRAINT [DF_LoanAmount_LAm_Date] DEFAULT (CONVERT([date],getdate())) NOT NULL,
    [LAm_LoanAmount]          INT    NULL,
    [LAm_Status]              INT    NULL,
    [LAm_SuggestedLoanAmount] INT    NULL,
    [LAm_OriginalLoanAmount]  INT    CONSTRAINT [DF_LoanAmount_LAm_OriginalLoanAmount] DEFAULT ((0)) NULL,
    CONSTRAINT [PK_LoanAmount_1] PRIMARY KEY CLUSTERED ([LAm_ID] ASC),
    CONSTRAINT [FK_LoanAmount_Employee] FOREIGN KEY ([Emp_ID]) REFERENCES [dbo].[Employee] ([Emp_ID])
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'1 = Active ||| 2 = Paid, Closed, and Not Active ||| 3 = Rejected', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LoanAmount', @level2type = N'COLUMN', @level2name = N'LAm_Status';

