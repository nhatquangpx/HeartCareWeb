const sql = require('mssql');
const dbConfig = require('./config/connectSQLSRV'); // Import cấu hình kết nối
const express = require("express");
const app = express();
const cors = require('cors');
const configViewEngine = require('./config/viewEngine');
const initWebRoute = require('./route/web');
const initApiRoute = require('./route/Api');
const bodyParser = require('body-parser');
const port = 8080;

// Kết nối đến SQL Server
sql.connect(dbConfig).then(pool => {
  if (pool.connecting) {
    console.log('Connecting to the database...');
  }

  if (pool.connected) {
    console.log('Connected to the database.');
  }

  // Thực hiện các truy vấn SQL
  return pool.request()
    .query('SELECT 1 AS Number'); // Ví dụ về truy vấn đơn giản
}).then(result => {
  console.log(result.recordset); // Kết quả của truy vấn
}).catch(err => {
  console.error('Database connection failed: ', err);
});

// Đảm bảo rằng bạn đóng kết nối khi không sử dụng nữa
sql.on('error', err => {
  console.error('SQL Server error: ', err);
});

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(function (req, res, next) {
  if (req.headers.origin || req.headers['access-control-request-method']) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  next();
});

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// // Setup view engine
configViewEngine(app);
initWebRoute(app);
initApiRoute(app);

// Handle 404 Not Found
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
