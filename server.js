const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");


const api = require('./backend/routes/api');
const port = 3000;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api', api);

app.get('/', function (req, res) {
  res.send('Hello from server')
});

app.listen(port, function () {
  console.log('Server is running on ' + port)
});
