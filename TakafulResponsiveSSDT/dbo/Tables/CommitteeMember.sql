CREATE TABLE [dbo].[CommitteeMember] (
    [Emp_ID]                      BIGINT         NOT NULL,
    [CoM_Title]                   NVARCHAR (50)  NULL,
    [CoM_ImagePath]               NVARCHAR (500) NULL,
    [CoM_OrganizationalStructure] NVARCHAR (100) NULL,
    [CoM_OSSortingOrder]          INT            NULL,
    CONSTRAINT [PK_CommitteeMember] PRIMARY KEY CLUSTERED ([Emp_ID] ASC),
    CONSTRAINT [FK_CommitteeMember_Employee] FOREIGN KEY ([Emp_ID]) REFERENCES [dbo].[Employee] ([Emp_ID]),
    CONSTRAINT [IX_CommitteeMember] UNIQUE NONCLUSTERED ([CoM_OSSortingOrder] ASC)
);

