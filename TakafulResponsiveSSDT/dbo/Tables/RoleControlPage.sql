CREATE TABLE [dbo].[RoleControlPage] (
    [Emp_Role]     INT            NOT NULL,
    [RCP_PageURL]  NVARCHAR (100) NULL,
    [RCP_LinkName] NVARCHAR (100) NULL,
    CONSTRAINT [PK_RoleControlPage] PRIMARY KEY CLUSTERED ([Emp_Role] ASC)
);

