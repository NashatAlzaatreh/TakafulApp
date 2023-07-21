CREATE TABLE [dbo].[SystemExceptionLog] (
    [ID]              BIGINT         IDENTITY (1, 1) NOT NULL,
    [ExceptionData]   NVARCHAR (MAX) NOT NULL,
    [CreatedDateTime] DATETIME       CONSTRAINT [DF_ExceptionLog_CreatedDateTime] DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_SystemExceptionLog] PRIMARY KEY CLUSTERED ([ID] ASC)
);

