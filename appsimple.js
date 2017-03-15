let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let orm = require("orm");

let delta = 1000;

app.use(bodyParser.json()); // for parsing application/json

let opts = {
    database : "postgres",
    protocol : "postgres",
    host     : "localhost",
    port     : 5432,         // optional, defaults to database default
    user     : "postgres",
    password : "admin",
};

app.use(orm.express(opts, {
    define: function(db, models, next) {
        models.user = db.define('public.tm_user', {
            id: Number,
            name: String,
            age: Number,
            address: String
        });
        next();
    }
}));

app.get('/api/data', function(req, resp) {
    "use strict";
    let promises = [];
    req.models.user.count((err, count) => {
        for (let i = 0; i < count; i += delta) {
            promises.push(new Promise((resolve, reject) => {
                req.models.user.find({}).limit(delta).offset(i).run(function (err, models) {
                    resp.write(JSON.stringify(models));
                    resolve();
                    console.log('Returning values from '+ i + ' to ' + (i + delta));
                });
            }));
        }
        Promise.all(promises).then(() => {
            resp.end();
        });
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000!')
});