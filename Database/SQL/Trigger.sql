use Medical_Schedule
go

--Trigger chuyển ngày sang thứ ngày đặt lịch

CREATE TRIGGER trg_ThemThu
ON LichDat
AFTER INSERT
AS
BEGIN
    UPDATE LichDat 
    SET ThuDatLich = DATEPART(WEEKDAY, inserted.NgayDatLich)
    FROM LichDat INNER JOIN inserted ON LichDat.NgayDatLich = inserted.NgayDatLich;
END;

go


--Trigger khi thêm 1 bác sĩ thò tự động tăng số lượng bác sĩ của Khoa 

CREATE TRIGGER trg_ThayDoiBacSi
ON BacsiKhoa
AFTER INSERT, DELETE, UPDATE
AS
BEGIN
    -- Cập nhật số lượng bác sĩ trong mỗi khoa sau khi thêm hoặc xóa bác sĩ
    UPDATE Khoa
    SET SoLuongBacSi = (
        SELECT COUNT(*)
        FROM BacsiKhoa
        WHERE BacsiKhoa.IDKhoa = Khoa.IDKhoa
    );
END;

go

-- Create the trigger to enforce the constraint
CREATE TRIGGER trg_GioiHanChucVu
ON BacsiKhoa
AFTER INSERT, UPDATE
AS
BEGIN
    -- Declare variables to hold the counts
    DECLARE @IDKhoa int;
    DECLARE @ChucVu nvarchar(40);

    -- Get the IDKhoa and ChucVu from the inserted rows
    SELECT TOP 1 @IDKhoa = IDKhoa, @ChucVu = ChucVu
    FROM inserted;

    -- Check the number of 'Trưởng khoa' in the department
    IF @ChucVu = N'Trưởng khoa'
    BEGIN
        IF (SELECT COUNT(*) FROM BacsiKhoa WHERE IDKhoa = @IDKhoa AND ChucVu = N'Trưởng khoa') > 1
        BEGIN
            ROLLBACK TRANSACTION;
            RAISERROR ('Each department can have only one "Truong khoa".', 16, 1);
            RETURN;
        END
    END

    -- Check the number of 'Phó Khoa' in the department
    IF @ChucVu = N'Phó Khoa'
    BEGIN
        IF (SELECT COUNT(*) FROM BacsiKhoa WHERE IDKhoa = @IDKhoa AND ChucVu = N'Phó Khoa') > 2
        BEGIN
            ROLLBACK TRANSACTION;
            RAISERROR ('Each department can have only two "Pho Khoa".', 16, 1);
            RETURN;
        END
    END
END;

