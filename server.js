const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

//app.engine('.hbs', hbs());
app.engine('.hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact', {layout: 'dark'});
});

app.get('/hello/:name', (req, res) => {
  res.render('Hello', {name: req.params.name });
});

app.use((req, res) => {
  res.status(404).render('404', {});
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});