const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const animalRoutes = require('./routes/animals');
const userRoutes = require('./routes/users');
const adoptionHistoryRoutes = require('./routes/adoption_history');
const shelterroutes = require('./routes/shelters');
const vaccineRoutes = require('./routes/vaccines');
const veterinariansRoutes = require('./routes/veterinarians');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // JSON verileri almak için
app.use(bodyParser.urlencoded({ extended: true })); // Form verilerini almak için

app.use('/animals', animalRoutes); // "/animals" rotasına gelen istekleri routes/animals.js'e yönlendir
app.use('/users', userRoutes); // "/users" rotasına gelen istekleri routes/users.js'e yönlendir
app.use('/adoption_histories', adoptionHistoryRoutes); // "/adoption_histories" rotasına gelen istekleri routes/adoption_history.js'e yönlendir
app.use('/shelters', shelterroutes); // "/shelters" rotasına gelen istekleri routes/shelters.js'e yönlendir
app.use('/vaccines', vaccineRoutes); // "/vaccines" rotasına gelen istekleri routes/vaccines.js'e yönlendir
app.use('/veterinarians', veterinariansRoutes); // "/veterinarians" rotasına gelen istekleri routes/veterinarians.js'e yönlendir

app.get('/hello', (req, res) => {
    res.json({ message: "Hello World" });
});

app.get('/', (req, res) => {
    res.send('Welcome to Animal Shelter API');
  });


module.exports = app;
