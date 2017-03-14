let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var postgresAdapter = require('sails-postgresql');
var Waterline = require('waterline');
var User = require('./initializers/user.js');
var orm = new Waterline();

let config = {
    adapters: {
        postgresql: postgresAdapter
    },

    connections: {
        myPostgres: {
            adapter: 'postgresql',
            host: 'postgresdb.edata.local',
            user: 'ex_role',
            password: 'ex_pass',
            database: 'ex_db',
            port: 5432
        }
    }
};

orm.loadCollection(User);

app.use(bodyParser.json()); // for parsing application/json

app.get('/users', function(req, res) {
    app.models.user.find().exec(function(err, models) {
        if(err) return res.json({ err: err }, 500);
        res.json(models);
    });
});

orm.initialize(config, function(err, models) {
    if (err) throw err;

    app.models = models.collections;
    app.connections = models.connections;

    app.listen(3000, () => {
        console.log('Listening on port 3000!')
    });
});