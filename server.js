const dotenv = require('dotenv');
const express = require('express');
const routes = require('./app/routes/index');
const errorHandler = require('./app/routes/handlers/errorHandler');

dotenv.config();

const app = express();

// Takes the raw requests and turns them into usable properties on req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
