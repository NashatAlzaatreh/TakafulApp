CREATE TABLE [dbo].[ContactUs] (
    [CU_ID]           INT             IDENTITY (1, 1) NOT NULL,
    [CU_Name]         NVARCHAR (250)  NOT NULL,
    [CU_Mobile]       NVARCHAR (20)   NULL,
    [CU_Email]        NVARCHAR (300)  NULL,
    [CU_Message]      NVARCHAR (3000) NOT NULL,
    [CreatedDateTime] DATETIME        CONSTRAINT [DF_ContactUs_CU_CreatedDateTime] DEFAULT (getutcdate()) NULL,
    CONSTRAINT [PK_ContactUs] PRIMARY KEY CLUSTERED ([CU_ID] ASC)
);

