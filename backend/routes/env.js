// backend/routes/env.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// .env dosyasındaki değerleri okuma
router.get('/get-backend-url', (req, res) => {
    const envFilePath = path.join(__dirname, '../../.env'); // .env dosyasının yolu
    let envContent = '';

    try {
        if (fs.existsSync(envFilePath)) {
            envContent = fs.readFileSync(envFilePath, 'utf-8');

            const envLines = envContent.split('\n');
            let backendUrl = '';

            for (let line of envLines) {
                const [key, value] = line.trim().split('=');
                if (key === 'BACKEND_URL') {
                    backendUrl = value;
                    break;
                }
            }

            res.json({ backendUrl }); // .env'deki BACKEND_URL'i gönderiyoruz
        } else {
            res.status(404).json({ error: 'Env file not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error reading env file' });
    }
});

module.exports = router;
