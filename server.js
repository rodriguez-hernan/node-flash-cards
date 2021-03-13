const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const flashCards = require('./routes/flashCards');

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

app.set('port', (process.env.PORT || 5000));
app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .set('view engine', 'ejs');

// routes
app.use('/flashCards', flashCards);
app.get('/', (req, res) => res.render('pages/index'))

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});