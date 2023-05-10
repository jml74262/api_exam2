const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Branch = require('./api/branches');
const cors = require('cors');

var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('./sslcerts/selfsigned.key', 'utf8');
var certificate = fs.readFileSync('./sslcerts/selfsigned.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/branches', Branch);

var httpsServer = https.createServer(credentials, app);

mongoose.connect(
  "mongodb://127.0.0.1/users",
  { useNewUrlParser: true}
).then(
  () => {
    app.listen(4001,()=>{
      console.log('Server is running on port 4001');
    });
    httpsServer.listen(5176,()=>{
      console.log('Server is running on port 5176');
    });
  },
  err=>{
    err && console.log(err) & console.log('Error connecting to database');
  } 
);
