const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
PORT=3000
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use(express.static('public'));

app.set('view engine', 'ejs');


const isWorkingHours = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const hourOfDay = date.getHours();
  if (dayOfWeek === 0 || dayOfWeek === 6 || hourOfDay < 9 || hourOfDay > 17) {
    return res.status(404).send('Page not found.');
  }
  next();
};

app.get('/', isWorkingHours, (req, res) => {
    res.render('home');
  });
  
  app.get('/services', isWorkingHours, (req, res) => {
    res.render('services');
  });
  
  app.get('/contact', isWorkingHours, (req, res) => {
    res.render('contact');
  });
  




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
