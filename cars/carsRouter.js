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
      res
        .status(500)
        .json({
          message: `Could not retrieve car with id of ${req.params.id}: ${err.message}`
        });
    });
});

router.post("/", (req, res) => {
    cars.insert(req.body)
    .then(car => {
        res.status(201).json({message: "Created successully", data: car})
    })
    .catch(err => {
        res.json(err.message)
    })
})

module.exports = router;
