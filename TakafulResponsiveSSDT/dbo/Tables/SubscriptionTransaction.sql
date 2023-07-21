CREATE TABLE [dbo].[SubscriptionTransaction] (
    [Emp_ID]                BIGINT          NOT NULL,
    [SuT_Year]              INT             NOT NULL,
    [SuT_Serial]            INT             NOT NULL,
    [SuT_SubscriptionType]  INT             NOT NULL,
    [SuT_Date]              DATE            NULL,
    [SuT_Amount]            INT             NULL,
    [SuT_Notes]             NVARCHAR (1000) NULL,
    [SuT_ApprovalStatus]    INT             NULL,
    [SuT_ApprovalDate]      DATE            NULL,
    [SuT_ApprovalNotes]     NVARCHAR (1000) NULL,
    [SuI_ID]                INT             NULL,
    [SortIndex]             INT             IDENTITY (1, 1) NOT NULL,
    [SuT_ServiceEmployeeID] BIGINT          NULL,
    [SuT_NotesForCommittee] NVARCHAR (1000) NULL,
    [FSu_ID]                INT             NULL,
    [LAm_ID]                INT             NULL,
    [SuT_AdminID]           BIGINT          NULL,
    CONSTRAINT [PK_SubscriptionTransaction] PRIMARY KEY CLUSTERED ([Emp_ID] ASC, [SuT_Year] ASC, [SuT_Serial] ASC, [SuT_SubscriptionType] ASC),
    CONSTRAINT [FK_SubscriptionTransaction_ApprovalStatus] FOREIGN KEY ([SuT_ApprovalStatus]) REFERENCES [dbo].[ApprovalStatus] ([ApS_ID]),
    CONSTRAINT [FK_SubscriptionTransaction_Employee] FOREIGN KEY ([Emp_ID]) REFERENCES [dbo].[Employee] ([Emp_ID]),
    CONSTRAINT [FK_SubscriptionTransaction_Employee1] FOREIGN KEY ([SuT_ServiceEmployeeID]) REFERENCES [dbo].[Employee] ([Emp_ID]),
    CONSTRAINT [FK_SubscriptionTransaction_Employee2] FOREIGN KEY ([SuT_AdminID]) REFERENCES [dbo].[Employee] ([Emp_ID]),
    CONSTRAINT [FK_SubscriptionTransaction_FundSubscription] FOREIGN KEY ([FSu_ID]) REFERENCES [dbo].[FundSubscription] ([FSu_ID]),
    CONSTRAINT [FK_SubscriptionTransaction_LoanAmount] FOREIGN KEY ([LAm_ID]) REFERENCES [dbo].[LoanAmount] ([LAm_ID]),
    CONSTRAINT [FK_SubscriptionTransaction_SubscriptionInformation] FOREIGN KEY ([SuI_ID]) REFERENCES [dbo].[SubscriptionInformation] ([SuI_ID]),
    CONSTRAINT [IX_SubscriptionTransaction] UNIQUE NONCLUSTERED ([SortIndex] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'1 = Participation in the fund |||
2 = Adjusted the fund''s involvement |||
3 = Cancel the fund''s involvement |||
------------------------------------
4 = Loan request |||
5 = Loan modification request |||
6 = Loan Cancel', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SubscriptionTransaction', @level2type = N'COLUMN', @level2name = N'SuT_SubscriptionType';

