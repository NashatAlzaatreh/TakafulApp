CREATE TABLE [dbo].[Meeting] (
    [Mee_ID]                  INT             IDENTITY (1, 1) NOT NULL,
    [Mee_Serial]              INT             NOT NULL,
    [Mee_Year]                INT             NOT NULL,
    [Mee_Date]                DATE            NULL,
    [Mee_Notes]               NVARCHAR (3000) NULL,
    [Mee_IsActive]            BIT             CONSTRAINT [DF_Meeting_Mee_IsActive] DEFAULT ((0)) NULL,
    [Mee_IsOpenForEvaluation] BIT             CONSTRAINT [DF_Meeting_Mee_IsOpenForEvaluation] DEFAULT ((0)) NULL,
    [Mee_IsNotificationSent]  BIT             NULL,
    CONSTRAINT [PK_Meeting] PRIMARY KEY CLUSTERED ([Mee_ID] ASC),
    CONSTRAINT [IX_Meeting] UNIQUE NONCLUSTERED ([Mee_Serial] ASC, [Mee_Year] ASC)
);

