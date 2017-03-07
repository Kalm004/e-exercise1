'use strict';

let orm = require("orm");

module.exports = () => {
    let opts = {
        database : "postgres",
        protocol : "postgres",
        host     : "127.0.0.1",
        port     : 5432,         // optional, defaults to database default
        user     : "postgres",
        password : "admin",
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
