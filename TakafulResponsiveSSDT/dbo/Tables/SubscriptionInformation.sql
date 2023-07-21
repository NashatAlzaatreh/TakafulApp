CREATE TABLE [dbo].[SubscriptionInformation] (
    [SuI_ID]                            INT IDENTITY (1, 1) NOT NULL,
    [SuI_IsActive]                      BIT NULL,
    [SuI_MinimumSubscription]           INT NULL,
    [SuI_MinimumAmount]                 INT NULL,
    [SuI_MaximumAmount]                 INT NULL,
    [SuI_NumberOfInstallments]          INT NULL,
    [SuI_LessSubscriptionPeriodForLoan] INT NULL,
    [SuI_SubscriptionAmount]            INT NULL,
    [SuI_LoanFirstAmount]               INT NULL,
    [SuI_LoanMaximumAmount]             INT NULL,
    [SuI_PeriodBetweenLoans]            INT NULL,
    [SuI_MaxDeductionPercentage]        INT NULL,
    CONSTRAINT [PK_SubscriptionInformation] PRIMARY KEY CLUSTERED ([SuI_ID] ASC)
);

