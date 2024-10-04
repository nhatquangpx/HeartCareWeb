# Medical_scheduling_Web
## Khởi chạy dự án
### Cài đặt nvm (cho phép tồn tại nhiều phiên bản Node.js trong máy)
- Truy cập trang https://github.com/coreybutler/nvm-windows/releases
- Tải xuống tệp cài đặt '.exe' và chạy nó
- Làm theo hướng dẫn để hoàn thành quá trình cài đặt
### Cài đặt phiên bản Node.js 14.21.3 
- Mở Command Prompt hoặc PowerShell

Chạy các lệnh:
- nvm install 14.21.3 (Để cài đặt phiên bản 14.21.3)
- nvm use 14.21.3 (Để sử dụng phiên bản 14.21.3)
- node -v (Kiểm tra xem đã cài đặt và sử dụng đúng phiên bản 14.21.3 chưa)

### Tạo lập Data Base và insert dữ liệu vào Data Base
- Mở SQL Server
- Chạy các file Create.sql và Insert.sql trong thư mục Database  

### Khởi chạy Backend
- Di chuyển vào thư mục Backend
- Khớp thông tin của DB trong máy với thông tin khai báo trong các file config/config.json và src/config/connectSQLSRV.js
- Chạy lệnh: npm start

### Khởi chạy Frontend
- Di chuyển vào thư mục Frontend
- Chạy lệnh: npm start

## Tận hưởng 
- Phần giao diện tương tác với người dùng sẽ được cấu hình trên: http://localhost:3000
- Ngoài ra khi muốn thao tác dữ liệu người dùng có thể vào: http://localhost:8080/user


