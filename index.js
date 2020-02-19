require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('helpers/jwt');
const errorHandler = require('helpers/error-handler');
const path = require('path');
const { PORT } = require('dotenv').config({ path: path.resolve('.env') });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());
// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
