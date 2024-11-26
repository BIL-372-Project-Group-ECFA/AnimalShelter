const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/hello', (req, res) => {
    res.json({ message: "Hello World" });
});

module.exports = app;