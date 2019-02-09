const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
mongoose.connect('mongodb://localhost:27017/practice-app-db', {useNewUrlParser: true});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

// API routes
require('./routes')(app);

app.listen(8080, () => {
    console.log('App is running on port 8080');
});
