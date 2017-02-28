function count(UserTable) {
    return new Promise((resolve, reject) => {
        UserTable.count((err, countResult) => {
            if (!err) {
                resolve(countResult);
            } else {
                reject(err);
            }
        });
    });
}

function getRange(UserTable, offset, limit) {
    return new Promise((resolve, reject) => {
        UserTable.find({}).order('id').limit(limit).offset(offset).run(function (err, users) {
            if (!err) {
                resolve(users);
            } else {
                reject(err);
            }
        });
    });
}

module.exports = {
    count: count,
    getRange
};