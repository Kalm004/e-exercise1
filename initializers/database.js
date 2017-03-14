'use strict';

let orm = require("orm");

module.exports = () => {
    let opts = {
        database : "ex_db",
        protocol : "postgres",
        host     : "postgresdb.edata.local",
        port     : 5432,         // optional, defaults to database default
        user     : "ex_role",
        password : "ex_pass",
    };
    return new Promise(function (resolve, reject) {
        orm.connect(opts, function (err, db) {
            if (err) {
                //There was an error connection to the database
                reject(err);
            } else {
                let User = db.define('ex01_schema.tm_user', {
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
