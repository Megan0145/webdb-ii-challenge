const db = require('../data/dbConfig');

module.exports = {
    get,
    getById
}

function get() {
    return db('cars');
}

function getById(id) {
    return db('cars')
    .where({id})
}