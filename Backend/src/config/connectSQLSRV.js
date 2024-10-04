
const config = {
    user: 'sa',
    password: '12345678',
    server: 'DESKTOP-RS1LLAS\\SQLEXPRESS', 
    port: 1433, // Cổng mặc định của SQL Server
    database: 'Medical_Schedule',
    options: {
      encrypt: false, 
      enableArithAbort: true, 
      trustServerCertificate: true,
    }
  };
  
  module.exports = config;
  