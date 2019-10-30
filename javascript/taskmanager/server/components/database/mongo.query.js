function insertDataIntoCollection(data, dataMapper, collectionName) {
    return new Promise(function(resolve, reject) {
        let db_data = new collectionName({});
        // console.log("data mapper>>>", dataMapper);
        dataMapper(db_data, data);
        console.log("db data>>", db_data);
        db_data.save((err, done) => {
            if (err) {
                return reject(err);
            }
            resolve(done);
        });
    });
}

function getDataFromCollection(condition, collectionName) {
    console.log("condition to retrieve data>>", condition);
    return new Promise(function(resolve, reject) {
        collectionName.find(condition).exec(function(err, data) {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });

    });
}

function getDataById(id, collectionName) {
    return collectionName.findById(id);
}

function editDataInCollectionById(id, newData, dataMapper, collectionName) {
    return new Promise(function(resolve, reject) {
        getDataById(id, collectionName).exec(function(err, data) {
            if (err) {
                return reject(err);
            }
            if (!data) {
                return reject({
                    msg: 'no data with given id'
                })
            }
            console.log("data extracted from db>>", data);
            dataMapper(data, newData);
            console.log("mapped data>>>", data);
            data.save(function(err, done) {
                if (err) {
                    return reject(err);
                }
                console.log("updated data>>", done);
                resolve(done);
            });
        })
    });
}

function deleteManyFromCollection(condition, collectionName) {
    return new Promise(function(resolve, reject) {
        collectionName.deleteMany(condition).exec(function(err, done) {
            if (err) {
                return reject(err);
            }
            return resolve(done);
        });
    });
}

function deleteDataFromCollection(id, collectionName) {
    return new Promise(function(resolve, reject) {
        collectionName.findByIdAndRemove(id).exec(function(err, done) {
            if (err) {
                return reject(err);
            }
            return resolve(done);
        });
    });
}

module.exports = {
    insertDataIntoCollection,
    getDataFromCollection,
    editDataInCollectionById,
    deleteDataFromCollection,
    deleteManyFromCollection
}