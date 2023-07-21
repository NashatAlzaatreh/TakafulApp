CREATE TABLE [dbo].[CostingBreakdownDetail] (
    [Emp_ID]         BIGINT   NOT NULL,
    [CBD_Date]       DATETIME CONSTRAINT [DF_CostingBreakdownDetail_CBD_Date] DEFAULT (CONVERT([date],getdate())) NOT NULL,
    [CBD_Details]    INT      CONSTRAINT [DF_CostingBreakdownDetail_CBD_Details] DEFAULT ((0)) NOT NULL,
    [CBD_PaidAmount] INT      NULL,
    [LAm_ID]         INT      NULL,
    [FSu_ID]         INT      NULL,
    CONSTRAINT [PK_CostingBreakdownDetail] PRIMARY KEY CLUSTERED ([Emp_ID] ASC, [CBD_Date] ASC, [CBD_Details] ASC),
    CONSTRAINT [FK_CostingBreakdownDetail_Employee] FOREIGN KEY ([Emp_ID]) REFERENCES [dbo].[Employee] ([Emp_ID]),
    CONSTRAINT [FK_CostingBreakdownDetail_FundSubscription] FOREIGN KEY ([FSu_ID]) REFERENCES [dbo].[FundSubscription] ([FSu_ID]),
    CONSTRAINT [FK_CostingBreakdownDetail_LoanAmount] FOREIGN KEY ([LAm_ID]) REFERENCES [dbo].[LoanAmount] ([LAm_ID])
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'Fund = 1 ||| Loan = 2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CostingBreakdownDetail', @level2type = N'COLUMN', @level2name = N'CBD_Details';

