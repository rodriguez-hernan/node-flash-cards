const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
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
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(session({
      saveUninitialized: false,
      resave: false,
      secret: 'secret-mouse'
    }))
  .set('view engine', 'ejs');

// middleware
const logRequest = (req, res, next)=>{
  console.log("Received a request for: " + req.url);
  next();
}

const login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  pool.connect((err, client, done) => {
    if (err) throw err
    client.query('SELECT id, name from users WHERE email = $1 and password = $2', [email, password], (err, result) => {
      done();
      if (result.rows[0]) {
        const userName = result.rows[0].name;
        const userId = result.rows[0].id;
        console.log('results', userName, userId)

        req.session.userName = userName;
        req.session.userId = userId;
        res.redirect("/flashCards");
        next()
      } else {
        res.json({success: false});
      }
    })
  })
}

// routes
app.use(logRequest);
app.use('/login', login);
app.use('/flashCards', flashCards);
app.get('/', (req, res) => res.render('pages/index'));
/*
app.post('/login', (req, res)=> {
  const email = req.body.email;
  const password = req.body.password;

  pool.connect((err, client, done) => {
    if (err) throw err
    client.query('SELECT id, name from users WHERE email = $1 and password = $2', [email, password],(err, result) => {
      done();
      if(result.rows[0]){
        const userName = result.rows[0].name;
        const userId = result.rows[0].id;
        console.log('results type', userName, userId)

        req.session.userName = userName;
        req.session.userId = userId;
        res.redirect("/flashCards");
      }
      else{
        res.json({success: false});
      }

    });
  });
});*/

app.post('/logout', (req, res)=>{
  if(req.session.user){
    delete req.session.user;
    res.json({success: true});
  }
  else{
    res.json({success: false});
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});