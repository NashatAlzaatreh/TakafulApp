CREATE TABLE [dbo].[ApprovalStatus] (
    [ApS_ID]             INT            NOT NULL,
    [ApS_ApprovalStatus] NVARCHAR (100) NULL,
    CONSTRAINT [PK_ApprovalStatus] PRIMARY KEY CLUSTERED ([ApS_ID] ASC)
);

