const express = require("express");
const cars = require("./carsHelpers");
const router = express.Router();

router.get("/", (req, res) => {
  cars
    .get()
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: "Cannot get cars: " + err.message });
    });
});

router.get("/:id", (req, res) => {
  cars
    .getById(req.params.id)
    .then(car => {
      if (car) {
        res.status(200).json(car);
      } else {
        res
          .status(404)
          .json({ message: `Car with id of ${req.params.id} does not exist` });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not retrieve car with id of ${req.params.id}: ${err.message}`
      });
    });
});

router.post("/", validateCar, (req, res) => {
  cars
    .insert(req.body)
    .then(car => {
      res.status(201).json({ message: "Created successully", data: car });
    })
    .catch(err => {
      res.status(500).json({ message: `Could not add car: ${err.message}` });
    });
});

//custom middleware
function validateCar(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing car data" });
  } else if (!req.body.vin) {
    res.status(400).json({ message: "Missing required vin field" });
  } else if (!req.body.model) {
    res.status(400).json({ message: "Missing required model field" });
  } else if (!req.body.mileage) {
    res.status(400).json({ message: "Missing required mileage field" });
  } else if (!req.body.make) {
    res.status(400).json({ message: "Missing required make field" });
  } else {
    next();
  }
}

module.exports = router;
