CREATE TABLE [dbo].[MeetingTransaction] (
    [Mee_ID]                    INT      NOT NULL,
    [Emp_ID]                    BIGINT   NOT NULL,
    [SuT_Year]                  INT      NOT NULL,
    [SuT_Serial]                INT      NOT NULL,
    [SuT_SubscriptionType]      INT      NOT NULL,
    [MeT_Date]                  DATE     CONSTRAINT [DF_MeetingTransaction_MeT_Date] DEFAULT (getdate()) NULL,
    [MeT_ApprovedAmount]        INT      NULL,
    [MeT_ApprovedAmountDate]    DATETIME NULL,
    [MeT_ApprovedAmountAdminID] BIGINT   NULL,
    CONSTRAINT [PK_MeetingTransaction] PRIMARY KEY CLUSTERED ([Mee_ID] ASC, [Emp_ID] ASC, [SuT_Year] ASC, [SuT_Serial] ASC, [SuT_SubscriptionType] ASC),
    CONSTRAINT [FK_MeetingTransaction_Employee] FOREIGN KEY ([MeT_ApprovedAmountAdminID]) REFERENCES [dbo].[Employee] ([Emp_ID]),
    CONSTRAINT [FK_MeetingTransaction_Meeting] FOREIGN KEY ([Mee_ID]) REFERENCES [dbo].[Meeting] ([Mee_ID]),
    CONSTRAINT [FK_MeetingTransaction_SubscriptionTransaction1] FOREIGN KEY ([Emp_ID], [SuT_Year], [SuT_Serial], [SuT_SubscriptionType]) REFERENCES [dbo].[SubscriptionTransaction] ([Emp_ID], [SuT_Year], [SuT_Serial], [SuT_SubscriptionType])
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'1 = Participation in the fund |||
2 = Adjusted the fund''s involvement |||
3 = Cancel the fund''s involvement |||
------------------------------------
4 = Loan request |||
5 = Loan modification request |||
6 = Loan Cancel', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingTransaction', @level2type = N'COLUMN', @level2name = N'SuT_SubscriptionType';

