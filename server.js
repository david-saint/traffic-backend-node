const dotenv = require('dotenv');
const express = require('express');
const routes = require('./app/routes/index');
const errorHandler = require('./app/routes/handlers/errorHandler');

dotenv.config();

const app = express();

// Takes the raw requests and turns them into usable properties on req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://torussiawithcoke.ml');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});

// After allllll that above middleware, we finally handle our own routes!
app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandler.notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandler.developmentErrors);
}

// production error handler
app.use(errorHandler.productionErrors);

// set the port for the server
app.set('port', process.env.PORT || 7777);

// start listening on the port
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
