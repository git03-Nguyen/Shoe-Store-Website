//----------
// CONTENT IN .ENV
// PAYMENT_PORT = 4000
// SHOP_PORT = 3000

// DB_HOST=localhost

// DB_PORT=5432
// DB_USER=postgres
// DB_NAME=InfinityShop //change if necessary
// DB_PASSWORD=135792468 //change if necessary

// SESSION_SECRET=InfinityShop

// CLIENT_ID=330884762106-usntilikkm1kn780nmqg703gu9djjran.apps.googleusercontent.com
// CLIENT_SECRET=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
// REDIRECT_URI=https://localhost:4000/auth/google/callback
//-----------


const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');

require('dotenv').config();
const passport = require('./middlewares/passport');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true
    }
  }));

app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PAYMENT_PORT;

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());    


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main.hbs'
}))

app.use('/user', require('./routers/user.r'));
app.use('/home', require('./routers/home.r'));
app.use('/auth', require('./routers/auth.r'));
app.get('/', (req, res, next) => {
    if(req.user) {
        res.redirect('/home')
    } else {
        res.render('login');
    }
});


const server = https.createServer({
    key: fs.readFileSync('./certs/infinity_shop.key'),
    cert: fs.readFileSync('./certs/infinity_shop.cert')
}, app);


server.listen(PORT, () => {
    console.log(`Auth server is listening on port: ${PORT}`);
});