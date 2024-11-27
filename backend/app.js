const express = require('express');
const cors = require('cors');
const path = require('path');
const { animals } = require('./models/init-models')(require('./utils/db').sequelize);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/hello', (req, res) => {
    res.json({ message: "Hello World" });
});

// Yeni rota: /animals
app.get('/animals', async (req, res) => {
    try {
        const animalList = await animals.findAll(); // Veritabanından tüm hayvanları çek
        res.json(animalList); // JSON olarak döndür
    } catch (error) {
        console.error('Error fetching animals:', error);
        res.status(500).json({ error: 'Failed to fetch animals' });
    }
});

module.exports = app;
