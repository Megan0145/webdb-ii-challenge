
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { VIN: "1HGCP2F62BA072137", make: "BMW", model: "535I GT XDRIVE", mileage: 4000.00, transmissionType: "CVT", status: "" },
        { VIN: "1NPGLU9X42D506299", make: "POLARIS", model: "600 IQ WIDETRACK", mileage: 10000.0, transmissionType: "", status: "" },
        { VIN: "1N4GB22B2LC713672", make: "SKI-DOO", model: "MX Z 500 ADRENALINE", mileage: 3000.0, transmissionType: "Semi-Automatic", status: "" },
        { VIN: "JM1BJ222631691212", make: "HONDA", model: "TRX500TM FOURTRAX FOREMAN", mileage: 20000.0, transmissionType: "", status: "" },
        { VIN: "1FUYDSEB5XL904022", make: "YAMAHA", model: "VT600 VENTURE 600", mileage: 15000.0, transmissionType: "", status: "" },
      ]);
    });
};
