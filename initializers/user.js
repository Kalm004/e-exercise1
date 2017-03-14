'use strict';

let postgresAdapter = require('sails-postgresql');
let Waterline = require('Waterline');

let User = Waterline.Collection.extend({
    identity: 'user',
    connection: 'myPostgres',
    tableName: 'users',
    meta: {
        schemaName: 'ex01_schema'
    },

    attributes: {

        id: {
            type: 'number',
            required: true,
            unique: true
        },

        name: {
            type: 'string',
            required: true,
        },

        age: {
            type: 'number',
            required: true
        },

        address: {
            type: 'string',
            required: false
        },

        toJSON: function () {
            let obj = this.toObject();
            return obj;
        }
    }
});

module.exports = User;

