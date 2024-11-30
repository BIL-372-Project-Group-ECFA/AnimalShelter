const express = require('express');
const router = express.Router();

const { handleGenerateData } = require('../utils/generateData');

router.get('/generate-data/:type/:rowCount', handleGenerateData);


module.exports = router;