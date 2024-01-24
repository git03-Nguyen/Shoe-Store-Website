const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./ShoePayment/middlewares/hbs.mw')(app);
require('./ShoePayment/routes/index.r')(app);

const PORT = process.env.PAYMENT_PORT || 4000;


const server = https.createServer({
    key: fs.readFileSync('./certificates/demo.key'),
    cert: fs.readFileSync('./certificates/demo.crt')
}, app);

server.listen(PORT, () => {
    console.log(`Payment server is listening on URL: https://localhost:${PORT}`);
})