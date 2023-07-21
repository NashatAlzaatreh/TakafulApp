CREATE TABLE [dbo].[LoanException] (
    [Emp_ID]                                  BIGINT          NOT NULL,
    [FSu_ID]                                  INT             NOT NULL,
    [LEx_MaxAmount]                           INT             NULL,
    [LEx_MaxAmount_IsUsed]                    BIT             NULL,
    [LEx_LessSubscriptionPeriodForLoan]       BIT             NULL,
    [LEx_Notes]                               NVARCHAR (1000) NULL,
    [LEx_CanRequestLoanWithCurrentActiveLoan] BIT             CONSTRAINT [DF_LoanException_LEx_CanRequestLoanWithCurrentActiveLoan] DEFAULT ((0)) NULL,
    CONSTRAINT [PK_LoanException_1] PRIMARY KEY CLUSTERED ([Emp_ID] ASC, [FSu_ID] ASC),
    CONSTRAINT [FK_LoanException_Employee] FOREIGN KEY ([Emp_ID]) REFERENCES [dbo].[Employee] ([Emp_ID]),
    CONSTRAINT [FK_LoanException_FundSubscription] FOREIGN KEY ([FSu_ID]) REFERENCES [dbo].[FundSubscription] ([FSu_ID])
);

