use master
go

drop database Medical_Schedule
go

IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'Medical_Schedule')
BEGIN
    CREATE DATABASE Medical_Schedule;
END;
go

use Medical_Schedule
go

CREATE TABLE Admin (
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    PRIMARY KEY (Username)
);

create table BacSi (
	id int identity(1,1),
	IDBacSi AS ('BS'+  RIGHT('000000'+CAST(id as varchar(6)),6)) PERSISTED,
	hoten nvarchar(50) not null,
	[password] varchar(30) not null,
	namSinh int not null,
	SDT char(10) not null,
	gioiTinh int default 0, -- 0 là nam 1 là nữ
	email varchar(30) not null UNIQUE,
	HocVan nvarchar(40) not null,
	Sonamcongtac int not null,
	MoTa nvarchar(max) not null,
	Anh varchar(max) not null default '11111',

	CONSTRAINT PK_BacSi PRIMARY KEY (IDBacSi)
);




create table BenhNhan(
	id int identity(1,1),
	IDBenhNhan AS ('BN'+ RIGHT('000000'+CAST(id as varchar(6)),6)) PERSISTED,
	hoten nvarchar(50) not null,
	username varchar(50) not null,
	[password] nvarchar(256) not null,
	namSinh int,
	diaChi nvarchar(50),
	SDT char(10),
	gioiTinh int default 0, -- 0 là nam 1 là nữ
	email varchar(30) not null,
	SoLanHuy int default 0,
	
	UNIQUE([username]),
	CONSTRAINT PK_BenhNhan PRIMARY KEY (IDBenhNhan)
);

create table CaKham(
	IDCa int identity(1,1) NOT NULL,
	KhungGio varchar(20) NOT NULL UNIQUE,

	CONSTRAINT PK_CaKham PRIMARY KEY (IDCa)
);

create table Khoa(
	IDKhoa int identity(1,1) NOT NULL,
	TenKhoa nvarchar(50) not null,
	MoTa  nvarchar(max),
	SoLuongBacSi int not null default 0,
	Anh varchar(max) not null default '11111',

	CONSTRAINT PK_Khoa PRIMARY KEY (IDKhoa) 
);

create table BacsiKhoa(
	IDBacSi varchar(8) not null,
	IDKhoa int not null, 
	ChucVu nvarchar(40) not null,

	UNIQUE(IDKhoa, IDBacSi),
	CONSTRAINT PK_BacSiKhoa PRIMARY KEY (IDKhoa,IDBacSi),
	CONSTRAINT FK_BacSiKhoa1 FOREIGN KEY (IDBacSi) REFERENCES BacSi(IDBacSi),
	CONSTRAINT FK_BacSiKhoa2 FOREIGN KEY (IDKhoa) REFERENCES Khoa(IDKhoa),
	CONSTRAINT CK_ChucVu_Format CHECK (ChucVu IN (N'Trưởng khoa', N'Phó Khoa', N'Bác sĩ', N'Thực tập sinh'))
);

go
CREATE INDEX idx_chucvu
ON BacsiKhoa (ChucVu);
go


CREATE TABLE LichLamViec (
    IDLich INT IDENTITY(1,1) ,
    IDBacSi varchar(8) not null,
	IDKhoa int not null,
    IDCa INT not null,
    Thu INT NOT NULL,

	UNIQUE(IDBacSi,Thu,IDCa),
	CONSTRAINT CK_Thu CHECK (Thu >= 2 AND Thu <= 7),
	CONSTRAINT PK_LichLamViec PRIMARY KEY (IDLich),
	CONSTRAINT FK_LichLamViec1 FOREIGN KEY (IDBacSi) REFERENCES BacSi(IDBacSi),
	CONSTRAINT FK_LichLamViec2 FOREIGN KEY (IDKhoa) REFERENCES Khoa(IDKhoa),
	CONSTRAINT FK_LichLamViec3 FOREIGN KEY (IDCa) REFERENCES CaKham(IDCa)
);

go
CREATE INDEX idx_idbsLichlamviec
ON LichLamViec (IDBacSi);
go

Create table DichVu (
	IDDichVu int identity(1,1) not null,
	IDKhoa int not null,
	TenDichVu nvarchar(200) not null,
	GiaKham int not null,
	MoTa nvarchar(max) not null,

	CONSTRAINT PK_DV PRIMARY KEY (IDDichVu) ,
	CONSTRAINT FK_DV FOREIGN KEY (IDKhoa) references Khoa(IDKhoa)
);

--CHECK trống lịch bằng cách xem bác sĩ có ca cần tìm không, sau đó check ngày đó bác sĩ đó nghỉ ca nào
CREATE TABLE LichDat(
	IDLich int identity(1,1), 
	IDCa INT not null,
	IDBenhNhan varchar(8) not null,
	IDBacSi varchar(8) not null,
	IDDichVu int not null,
	ThuDatLich int, -- cần tạo trigger
	NgayDatLich date not null default getdate(),
	TrangThai int not null default 1,
	TinhTrangThanhToan int not null default 0,
	TrangThaiHoanThanh int not null default 0,
	
	UNIQUE(IDBenhNhan, IDCa, NgayDatLich),
	CONSTRAINT CK_TrangThai CHECK (TrangThai IN (0, 1)),
	CONSTRAINT CK_TinhTrangThanhToan CHECK (TinhTrangThanhToan IN (0, 1)),
	CONSTRAINT CK_TrangThaiHoanThanh CHECK (TrangThaiHoanThanh IN (0, 1)),
	CONSTRAINT PK_Lich_Dat PRIMARY KEY (IDLich),
	CONSTRAINT FK_Lich_Dat1 FOREIGN KEY (IDCa) REFERENCES CaKham(IDCa),
	CONSTRAINT FK_Lich_Dat2 FOREIGN KEY (IDBacSi) REFERENCES BacSi(IDBacSi),
	CONSTRAINT FK_Lich_Dat3 FOREIGN KEY (IDBenhNhan) REFERENCES BenhNhan(IDBenhNhan),
	CONSTRAINT FK_Lich_Dat4 FOREIGN KEY (IDDichVu) REFERENCES DichVu(IDDichVu)
);

