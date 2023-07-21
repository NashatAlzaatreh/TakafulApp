CREATE TABLE [dbo].[SolidarityFundInformation] (
    [SFI_ID]                       INT            IDENTITY (1, 1) NOT NULL,
    [SFI_GeneralEmail]             NVARCHAR (256) NULL,
    [SFI_SFInfoFilePath1]          NVARCHAR (100) NULL,
    [SFI_HomePageBannerPhrase_1]   NVARCHAR (100) NULL,
    [SFI_HomePageBannerFilePath_1] NVARCHAR (100) NULL,
    [SFI_HomePageBannerPhrase_2]   NVARCHAR (100) NULL,
    [SFI_HomePageBannerFilePath_2] NVARCHAR (100) NULL,
    [SFI_HomePageBannerPhrase_3]   NVARCHAR (100) NULL,
    [SFI_HomePageBannerFilePath_3] NVARCHAR (100) NULL,
    [SFI_SFInfoFilePath2]          NVARCHAR (100) NULL,
    [SFI_SFInfoFilePath3]          NVARCHAR (100) NULL,
    CONSTRAINT [PK_SolidarityFundInformation] PRIMARY KEY CLUSTERED ([SFI_ID] ASC)
);

