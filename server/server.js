var express = require('express');
var bodyParser = require('body-parser');
var api = require('./routes/api');
const cors = require('cors');
var ejs = require('ejs');
var app = express();
// const multer = require('multer');
app.use(express.static('public'));
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs');



global.__basedir = __dirname;

app.use('/api', api);
app.listen(port, () => {
    console.log('App is running on ' + port);
});

