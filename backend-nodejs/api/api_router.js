const express = require('express')
const router = express.Router();

const s3Routes = require('./routes/s3_api')

// This is api route
router.use('/s3', s3Routes);

module.exports = router