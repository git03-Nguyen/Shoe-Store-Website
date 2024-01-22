require('dotenv').config();
const express = require('express');
const app = express();

const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
require('./middlewares/favicon.mw')(app);
require('./middlewares/hbs/hbs.mw')(app);
require('./middlewares/passport.mw')(app);
require('./routers/index.r')(app);

// read the ssl certificates from certificates/shoeStore.crt and certificates/shoeStore.key
const fs = require('fs');
const privateKey = fs.readFileSync('certificates/shoeStore.key', 'utf8');
const certificate = fs.readFileSync('certificates/shoeStore.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const https = require('https');
const httpsServer = https.createServer(credentials, app);
const port = process.env.PORT || 3000;

httpsServer.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});