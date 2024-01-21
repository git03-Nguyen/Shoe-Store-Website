require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

const exphbs = require('express-handlebars');

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '/views/layouts'),
});

app.set('view engine', hbs.extname);
app.engine(hbs.extname, hbs.engine);
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', {message: ''});
})

const db = require('./utils/dbImportJSON')
app.post('/', async (req, res) => {
  let message = await db.importJSON();  
  res.render('index', {message: message});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});