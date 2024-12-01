const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const animalRoutes = require('./routes/animals');
const userRoutes = require('./routes/users');
const shelterroutes = require('./routes/shelters');
const vaccineRoutes = require('./routes/vaccines');
const veterinariansRoutes = require('./routes/veterinarians');
const vaccinationDetailsRoutes = require('./routes/vaccinationDetails');
const adoptionHistoryRoutes = require('./routes/adoptionHistory');
const currentAdoptionRoutes = require('./routes/currentAdoption');
const currentShelterResidenceRoutes = require('./routes/currentShelterResidences');
const donationRoutes = require('./routes/donations');
const medicalRecordsRoutes = require('./routes/medicalRecords');
const shelterHistoryRoutes = require('./routes/shelterHistory');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // JSON verileri almak için
app.use(bodyParser.urlencoded({ extended: true })); // Form verilerini almak için

app.use('/animals', animalRoutes); // "/animals" rotasına gelen istekleri routes/animals.js'e yönlendir
app.use('/users', userRoutes); // "/users" rotasına gelen istekleri routes/users.js'e yönlendir
app.use('/shelters', shelterroutes); // "/shelters" rotasına gelen istekleri routes/shelters.js'e yönlendir
app.use('/vaccines', vaccineRoutes); // "/vaccines" rotasına gelen istekleri routes/vaccines.js'e yönlendir
app.use('/veterinarians', veterinariansRoutes); // "/veterinarians" rotasına gelen istekleri routes/veterinarians.js'e yönlendir
app.use('/vaccination-details', vaccinationDetailsRoutes); // "/vaccination-details" rotasına gelen istekleri routes/veterinarians.js'e yönlendir
app.use('/adoption-history', adoptionHistoryRoutes); // "/adoption-history" rotasına gelen istekleri routes/veterinarians.js'e yönlendir
app.use('/current-adoption', currentAdoptionRoutes); // "/current-adoption" rotasına gelen istekleri routes/veterinarians.js'e yönlendir
app.use('/current-shelter-residences', currentShelterResidenceRoutes); // "/current-shelter-residences" rotasına gelen istekleri routes/veterinarians.js'e yönlendir
app.use('/donations', donationRoutes); // "/donations" rotasına gelen istekleri routes/veterinarians.js'e yönlendir
app.use('/medical-records', medicalRecordsRoutes); // "/medical-records" rotasına gelen istekleri routes/veterinarians.js'e yönlendir
app.use('/shelter-history', shelterHistoryRoutes); // "/shelter-history" rotasına gelen istekleri routes/veterinarians.js'e yönlendir
app.use('/admin', adminRoutes); // "/admin" rotasına gelen istekleri routes/adminRoutes.js'e yönlendir


app.get('/hello', (req, res) => {
    res.json({ message: "Hello World" });
});

app.get('/', (req, res) => {
    res.send('Welcome to Animal Shelter API');
  });


module.exports = app;
