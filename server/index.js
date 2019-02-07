const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/node-test', {useNewUrlParser: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

app.get('/', (req, res) => {
  console.log("test");
  res.end('');
});

app.listen(8080, () => {
    console.log('App is running on port 8080');
});
