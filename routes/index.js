let express = require('express');
let router = express.Router();
let user = require('../user.js');

router.get('/api/dataAsync', user.getDataAsync);

router.get('/api/data', user.getData);

module.exports = router;