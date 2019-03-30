const express = require('express');
const bodyParser = require('body-parser');
const apiService = require('./api');

const app = express();


app.use(bodyParser.urlencoded({ extended: false})); // for parsing application/x-www-form-urlencode
app.use(bodyParser.json()); // for parsing application/json

app.use('/api', apiService);

module.exports = app;