CREATE TABLE [dbo].[HRSheetData_New] (
    [HRSD_ID]                      BIGINT IDENTITY (1, 1) NOT NULL,
    [HRS_ID]                       INT    NOT NULL,
    [Emp_ID]                       BIGINT NOT NULL,
    [SuT_Year]                     INT    NOT NULL,
    [SuT_Serial]                   INT    NOT NULL,
    [SuT_SubscriptionType]         INT    NOT NULL,
    [HRSD_IsIncluded]              BIT    CONSTRAINT [DF_HRSheetData_New_HRSD_IsIncludedInNormalSheet] DEFAULT ((0)) NOT NULL,
    [HRSD_TransactionApprovalDate] DATE   NOT NULL,
    CONSTRAINT [PK_HRSheetData_New] PRIMARY KEY CLUSTERED ([HRSD_ID] ASC),
    CONSTRAINT [FK_HRSheetData_New_HRSheet] FOREIGN KEY ([HRS_ID]) REFERENCES [dbo].[HRSheet] ([HRS_ID]),
    CONSTRAINT [FK_HRSheetData_New_SubscriptionTransaction] FOREIGN KEY ([Emp_ID], [SuT_Year], [SuT_Serial], [SuT_SubscriptionType]) REFERENCES [dbo].[SubscriptionTransaction] ([Emp_ID], [SuT_Year], [SuT_Serial], [SuT_SubscriptionType])
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'1 = Participation in the fund |||
2 = Adjusted the fund''s involvement |||
3 = Cancel the fund''s involvement |||
------------------------------------
4 = Loan request |||
5 = Loan modification request |||
6 = Loan Cancel', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'HRSheetData_New', @level2type = N'COLUMN', @level2name = N'SuT_SubscriptionType';

