const express = require('express');
const router = express.Router();

const { handleGenerateData } = require('../utils/generateData');

router.get('/generate-data/:type', handleGenerateData);


module.exports = router;