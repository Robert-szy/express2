const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer  = require('multer')
const upload = multer({ dest: './public' })

const app = express();

app.engine('.hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/history', (req, res) => {
  res.render('history', {layout: 'dark'});
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact/send-message', upload.single('file'), (req, res) => {
  const { author, sender, title, message } = req.body;
  const { file } = req;
  if(author && sender && title && message && file) {
    res.render('contact', { isSent: true, fileName: file.originalname, fileSource: file.filename });
  } else {
      res.render('contact', { isError: true });
  }
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