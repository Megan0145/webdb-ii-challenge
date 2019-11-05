const db = require("../data/dbConfig");

module.exports = {
  get,
  getById,
  insert,
  remove,
  update
};

function get() {
  return db("cars");
}

function getById(id) {
  return db("cars")
    .where({ id })
    .first();
}

function insert(car) {
  return db("cars")
    .insert(car)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
    return db("cars")
    .where({id})
    .update(changes);
}

function remove(id) {
    return db("cars")
    .where('id', id)
    .del();
}
