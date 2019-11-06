const db = require("../data/dbConfig");

module.exports = {
  get,
  getById,
  insert,
  remove,
  update,
  getCarSales,
  addCarSale
};

function get() {
  return db("cars");
}

function getCarSales(id) {
    return db("sales")
    .where('car_id', id)
}

function addCarSale(sale) {
    return db("sales")
    .insert(sale)
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
