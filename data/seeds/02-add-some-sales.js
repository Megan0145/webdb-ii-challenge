
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sales').del()
    .then(function () {
      // Inserts seed entries
      return knex('sales').insert([
        {car_id: 1, price: 10000.0},
        {car_id: 2, price: 20000.0},
        {car_id: 2, price: 15000.0},
        {car_id: 2, price: 21000.0},
        {car_id: 1, price: 19000.0},
      ]);
    });
};
