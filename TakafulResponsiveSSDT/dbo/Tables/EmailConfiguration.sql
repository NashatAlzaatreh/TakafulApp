CREATE TABLE [dbo].[EmailConfiguration] (
    [SMTPServer_ID] INT            IDENTITY (1, 1) NOT NULL,
    [SMTPHost]      VARCHAR (200)  NULL,
    [SMTPPort]      INT            NULL,
    [SignInName]    VARCHAR (200)  NULL,
    [Password]      VARCHAR (20)   NULL,
    [MailFrom]      NVARCHAR (300) NULL,
    [DisplayName]   NVARCHAR (300) NULL,
    [SSLEnabled]    BIT            CONSTRAINT [DF_EmailConfiguration_SSLEnabled] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_EmailConfiguration] PRIMARY KEY CLUSTERED ([SMTPServer_ID] ASC)
);

