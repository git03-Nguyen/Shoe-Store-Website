require('dotenv').config();
 const fs=require('fs');

const handlebars = require('express-handlebars');

const express = require('express');
const https = require('https');

const path=require('path');
const app= express();


app.use(express.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
const hphbs=handlebars.create({
    helpers: {
        checkValidAvatar(imagePath){
            return imagePath!=='';
        },
    },
    extname: '.hbs',
});

app.engine('hbs', hphbs.engine);

app.set('view engine', 'hbs');
app.set('views','./views');

const session = require('express-session');

app.use(session({
    secret: process.env.SECRET_KEY_SESSION, // Replace with your secret key for session encryption
    resave: false,
    saveUninitialized: false,
}));
//  require('./middlewares/passport')(app);

 const homeRouter=require('./routes/home.r');

app.use('/',homeRouter);

const PORT= process.env.PORT || 3000;

const server = https.createServer({
    key: fs.readFileSync('./certificates/demo.key'),
    cert: fs.readFileSync('./certificates/demo.crt')
}, app);

server.listen(PORT, ()=>{
    console.log('Server is listening on port '+PORT);
});