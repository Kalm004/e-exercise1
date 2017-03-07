'use strict';

let waterline = require("waterline");
let orm = new waterline();

var postgreAdapter = require('sails-postgresql'),

module.exports = () => {
    var config = {

        // Setup Adapters
        // Creates named adapters that have been required
        adapters: {
            'default': postgreAdapter,
            postgresql: postgreAdapter
        },

        // Build Connections Config
        // Setup connections using the named adapter configs
        connections: {
            myLocalPostgreSql: {
                adapter: 'postgresql',
                host: 'localhost',
                database: 'foobar'
            }
        },

        defaults: {
            migrate: 'alter'
        }

    };

    var User = Waterline.Model.extend({

        identity: 'user',
        connection: 'myLocalDisk',

        attributes: {
            first_name: 'string',
            last_name: 'string'
        }
    });

    orm.registerModel(User);

    let opts = {
        database : "postgres",
        protocol : "postgres",
        host     : "127.0.0.1",
        port     : 5432,         // optional, defaults to database default
        user     : "postgres",
        password : "postgres",
    };
    return new Promise(function (resolve, reject) {
        orm.connect(opts, function (err, db) {
            if (err) {
                //There was an error connection to the database
                reject(err);
            } else {
                let User = db.define('public.tm_user', {
                    id: Number,
                    name: String,
                    age: Number,
                    address: String
                });

                resolve(User);
            }
        });
    });
};
