let express = require('express');
let router = express.Router();
let user = require('../user.js');
let example = require('../example.js');

//Endpoints for exercise 1
router.get('/api/dataAsync', user.getDataAsync);
router.get('/api/data', user.getData);

//Endpoints for example
router.get('/api/example', example.getExample);
router.post('/api/example', example.postExample);

module.exports = router;