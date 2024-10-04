const express = require('express');
const cors = require('cors');
const configViewEngine = require('./config/viewEngine');
const initWebRoute = require('./route/web');
const initApiRoute = require('./route/Api');
var bodyParser = require('body-parser');
const connecDB = require('./config/connectDB');
require('dotenv').config();

const app = express()
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

const port = process.env.PORT || 8080;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));


//setup view engine
configViewEngine(app);
initWebRoute(app);
initApiRoute(app);

connecDB();


//handle 404 Not Found
app.use((req, res) => {
    res.send('404 Not Found');
})

app.listen(port, () => {
    console.log(`Server chạy thành công trên cổng ${port}!!!`)
})