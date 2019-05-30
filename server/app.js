const express = require('express');
const app = express();
var axios = require('axios');
var morgan = require('morgan');
var info = {};

app.use(morgan('dev'));

app.get('/', function (req, res) {
  if (info[req.url] === undefined) {
    axios.get('http://www.omdbapi.com' + req.url + '&apikey=8730e0e')
      .then(function (response) {
        info[req.url] = response.data;
        res.json(response.data);
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).send({ error: 'Service is down' });
      })
  } else {
    res.json(info[req.url]);
  }
});
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;
