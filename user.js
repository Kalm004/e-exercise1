let database = require('./initializers/database.js');
let userService = require('./services/userService.js');
let async = require('async');

const delta = 50000;

function getDataAsync(req, res) {
    database().then((UserTable) => {
        let startTime = new Date();
        console.time('api/data');
        console.log(startTime + '==> Call received to /api/data');
        let promises = [];
        let asyncFunctions = [];
        userService.count(UserTable).then((countResult) => {
            let currentOffset = 0;
            while (currentOffset < (countResult - (delta - 1))) {
                console.log('Requesting rows ' + (currentOffset + 1) + ' - ' + (currentOffset + delta));
                asyncFunctions.push((callBack) => {
                    promises.push(userService.getRange(UserTable, currentOffset, delta).then((users) => {
                        res.write(JSON.stringify(users));
                        console.log(users.length);
                        callBack(null, 'Returning users ' + users[0].id + ' - ' + users[users.length - 1].id);
                    }));
                });
                currentOffset += delta;
            }
            async.parallel(asyncFunctions, function(param1, param2) {
                "use strict";
                console.log(param2);
            });
            Promise.all(promises).then(() => {
                res.end();
                let endTime = new Date();
                console.log(endTime + '==> End call to /api/data')
                console.timeEnd('api/data');
            }).catch((err) => {
                console.log(err);
            });
        });
    });
}


// function getDataAsync(req, res) {
//     database().then((UserTable) => {
//         let startTime = new Date();
//         console.time('api/data');
//         console.log(startTime + '==> Call received to /api/data');
//         let promises = [];
//         userService.count(UserTable).then((countResult) => {
//             let currentOffset = 0;
//             while (currentOffset < (countResult - (delta - 1))) {
//                 console.log('Requesting rows ' + (currentOffset + 1) + ' - ' + (currentOffset + delta));
//                 promises.push(userService.getRange(UserTable, currentOffset, delta).then((users) => {
//                     res.write(JSON.stringify(users));
//                     console.log('Returning users ' + users[0].id + ' - ' + users[users.length - 1].id);
//                 }));
//                 currentOffset += delta;
//             }
//             Promise.all(promises).then(() => {
//                 res.end();
//                 let endTime = new Date();
//                 console.log(endTime + '==> End call to /api/data')
//                 console.timeEnd('api/data');
//             });
//         });
//     });
// }

function getData(req, res) {
    database().then((UserTable) => {
        let startTime = new Date();
        console.time('api/data');
        console.log(startTime + '==> Call received to /api/data');
        let promises = [];
        userService.count(UserTable).then((countResult) => {
            getUsers(UserTable, res, countResult);
        });
    });
}

function getUsers(UserTable, res, limit, offset) {
    if (!offset) offset = 0;
    console.log('Requesting rows ' + (offset + 1) + ' - ' + (offset + delta));
    userService.getRange(UserTable, offset, delta).then((users) => {
        res.write(JSON.stringify(users));
        console.log('Returning users ' + users[0].id + ' - ' + users[users.length - 1].id);
        if (offset + delta < limit) {
            getUsers(UserTable, res, limit, offset + delta);
        } else {
            res.end();
            let endTime = new Date();
            console.log(endTime + '==> End call to /api/data')
            console.timeEnd('api/data');
        }
    });
}

module.exports = {
    getData,
    getDataAsync
};