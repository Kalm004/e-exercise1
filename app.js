let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json

app.use('/', require('./routes'));

app.listen(3000, () => {
    console.log('Listening on port 3000!')
});