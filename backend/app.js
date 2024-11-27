const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const animalRoutes = require('./routes/animals');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // JSON verileri almak için
app.use(bodyParser.urlencoded({ extended: true })); // Form verilerini almak için

app.use('/animals', animalRoutes); // "/animals" rotasına gelen istekleri routes/animals.js'e yönlendir

app.get('/hello', (req, res) => {
    res.json({ message: "Hello World" });
});

app.get('/', (req, res) => {
    res.send('Welcome to Animal Shelter API');
  });


module.exports = app;
