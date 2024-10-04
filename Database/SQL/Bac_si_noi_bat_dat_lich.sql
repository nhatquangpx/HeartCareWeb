use Medical_Schedule
go

--Lấy ra danh sách bác sĩ nổi bật
select * from BacSi, BacsiKhoa
where BacSi.IDBacSi = BacsiKhoa.IDBacSi and ( BacsiKhoa.ChucVu = N'Trưởng Khoa')

-- Giả sử bệnh nhân chọn bác sĩ có id là @idbs
declare @idbs varchar(8) = 'BS000001'
select IDCa, Thu from LichLamViec
where LichLamViec.IDBacSi = @idbs

-- Giả sử người dùng chọn ca có idca là @idka va thu là @thu, @ngay, tiến hành đặt lịch
declare @idka int = 1
declare @thu int = 2

/* - NẾU ĐÃ TẠO Ở PHẦN KIA RỒI THÌ THÔI
CREATE PROCEDURE Insert_LichDat
    @IDCa INT,
    @IDBenhNhan VARCHAR(8),
    @IDBacSi VARCHAR(8),
    @IDDichVu INT,
    @ThuDatLich INT,
    @NgayDatLich DATE,
    @TrangThai INT = 1,
    @TinhTrangThanhToan INT = 0
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra xem NgayDatLich đã tồn tại trong bảng chưa
    IF EXISTS (SELECT 1 FROM LichDat WHERE IDCa = @IDCa AND IDBacSi = @IDBacSi AND NgayDatLich = @NgayDatLich)
    BEGIN
        RAISERROR ('Bac si da ban.', 16, 1);
        RETURN;
    END;


    INSERT INTO LichDat (IDCa, IDBenhNhan, IDBacSi, IDDichVu, ThuDatLich, NgayDatLich, TrangThai, TinhTrangThanhToan)
    VALUES (@IDCa, @IDBenhNhan, @IDBacSi, @IDDichVu, @ThuDatLich, @NgayDatLich, @TrangThai, @TinhTrangThanhToan);

    IF @@ERROR <> 0
    BEGIN
        RAISERROR ('Lỗi khi chèn thông tin vào bảng LichDat.', 16, 1);
        RETURN;
    END;

    PRINT 'Thông tin đã được chèn thành công vào bảng LichDat.';
END;
*/

/*
EXEC Insert_LichDat 
    @IDCa = @idka,
    @IDBenhNhan = 'BN000002',
    @IDBacSi = @idbs,
    @IDDichVu = @idpickdv,
    @ThuDatLich = @thu,
    @NgayDatLich = '2024-06-01'; -- ngày đặt lịch lấy từ trên hệ thống
	*/

