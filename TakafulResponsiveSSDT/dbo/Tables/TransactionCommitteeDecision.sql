CREATE TABLE [dbo].[TransactionCommitteeDecision] (
    [Emp_ID]                      BIGINT NOT NULL,
    [SuT_Year]                    INT    NOT NULL,
    [SuT_Serial]                  INT    NOT NULL,
    [SuT_SubscriptionType]        INT    NOT NULL,
    [TCD_CommitteeMemberID]       BIGINT NOT NULL,
    [TCD_CommitteeApprovalStatus] INT    NOT NULL,
    [TCD_Date]                    DATE   CONSTRAINT [DF_Table_1_MeT_Date] DEFAULT (getdate()) NULL,
    [TCD_AdminID]                 BIGINT NULL,
    CONSTRAINT [PK_TransactionCommitteeDecision] PRIMARY KEY CLUSTERED ([Emp_ID] ASC, [SuT_Year] ASC, [SuT_Serial] ASC, [SuT_SubscriptionType] ASC, [TCD_CommitteeMemberID] ASC),
    CONSTRAINT [FK_TransactionCommitteeDecision_Employee] FOREIGN KEY ([TCD_CommitteeMemberID]) REFERENCES [dbo].[Employee] ([Emp_ID]),
    CONSTRAINT [FK_TransactionCommitteeDecision_Employee1] FOREIGN KEY ([TCD_AdminID]) REFERENCES [dbo].[Employee] ([Emp_ID]),
    CONSTRAINT [FK_TransactionCommitteeDecision_SubscriptionTransaction] FOREIGN KEY ([Emp_ID], [SuT_Year], [SuT_Serial], [SuT_SubscriptionType]) REFERENCES [dbo].[SubscriptionTransaction] ([Emp_ID], [SuT_Year], [SuT_Serial], [SuT_SubscriptionType])
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'1 = Participation in the fund |||
2 = Adjusted the fund''s involvement |||
3 = Cancel the fund''s involvement |||
------------------------------------
4 = Loan request |||
5 = Loan modification request |||
6 = Loan Cancel', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TransactionCommitteeDecision', @level2type = N'COLUMN', @level2name = N'SuT_SubscriptionType';

