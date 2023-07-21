IF NOT EXISTS (SELECT * FROM SYS.COLUMNS WHERE NAME = 'Emp_Password_Enc' AND object_id = object_id('Employee'))
BEGIN
	ALTER TABLE [dbo].[Employee]
		ADD [Emp_Password_Enc] NVARCHAR (100) NULL;
END
GO


IF NOT EXISTS (SELECT * FROM SYS.COLUMNS WHERE NAME = 'SecurityStamp' AND object_id = object_id('Employee'))
BEGIN
	ALTER TABLE [dbo].[Employee]
		ADD SecurityStamp NVARCHAR (50) NULL;
END
GO