const db = require('../data/dbConfig');

module.exports = {
    get,
    getById,
    insert
}

function get() {
    return db('cars');
}

function getById(id) {
    return db('cars')
    .where({id})
    .first()
}

function insert(car) {
    return db('cars')
    .insert(car)
}