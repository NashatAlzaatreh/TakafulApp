CREATE TABLE [dbo].[HRSheet] (
    [HRS_ID]                                   INT             IDENTITY (1, 1) NOT NULL,
    [HRS_Serial]                               INT             NOT NULL,
    [HRS_Date]                                 DATE            NOT NULL,
    [HRS_Notes]                                NVARCHAR (3000) NULL,
    [HRS_IsClosedNormalSheet]                  BIT             NULL,
    [HRS_IsClosedNewSubsSheet]                 BIT             NULL,
    [HRS_IsClosedCancelledSubsSheet]           BIT             NULL,
    [HRS_IsClosedModificationSheet]            BIT             NULL,
    [HRS_IsClosedNewLoansSheet]                BIT             NULL,
    [HRS_IsClosedCancelledLoansSheet]          BIT             CONSTRAINT [DF_HRSheet_HRS_IsClosedCancelldLoansSheet] DEFAULT ((0)) NULL,
    [HRS_IsSubsequentSheet]                    BIT             CONSTRAINT [DF_HRSheet_HRS_IsSubsequentSheet] DEFAULT ((0)) NOT NULL,
    [HRS_IsClosedInstallmentModificationSheet] BIT             NULL,
    CONSTRAINT [PK_HRSheet] PRIMARY KEY CLUSTERED ([HRS_ID] ASC),
    CONSTRAINT [IX_HRSheet] UNIQUE NONCLUSTERED ([HRS_Serial] ASC, [HRS_IsSubsequentSheet] ASC)
);

