CREATE TABLE [dbo].[FundSubscription] (
    [FSu_ID]     INT    IDENTITY (1, 1) NOT NULL,
    [Emp_ID]     BIGINT NOT NULL,
    [FSu_Date]   DATE   CONSTRAINT [DF_FundSubscription_LAm_Date] DEFAULT (CONVERT([date],getdate())) NOT NULL,
    [FSu_Status] INT    NULL,
    CONSTRAINT [PK_FundSubscription] PRIMARY KEY CLUSTERED ([FSu_ID] ASC),
    CONSTRAINT [FK_FundSubscription_Employee] FOREIGN KEY ([Emp_ID]) REFERENCES [dbo].[Employee] ([Emp_ID])
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'1 = Active ||| 2 = Closed, and Not Active ||| 3 = Rejected', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'FundSubscription', @level2type = N'COLUMN', @level2name = N'FSu_Status';

