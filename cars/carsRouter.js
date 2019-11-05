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

router.get("/:id", validateCarId, (req, res) => {
  res.status(200).json(req.car);
});

router.post("/", validateCar, (req, res) => {
  cars
    .insert(req.body)
    .then(car => {
      res.status(201).json({ message: "Created successfully", data: car });
    })
    .catch(err => {
      res.status(500).json({ message: `Could not add car: ${err.message}` });
    });
});

router.delete("/:id", validateCarId, (req, res) => {
  cars
    .remove(req.params.id)
    .then(() => {
      res
        .status(200)
        .json({ message: "Car successfully deleted", id: req.params.id });
    })
    .catch(err => {
      res.status(500).json({
        message: `Something terrible happened trying to delete the car with id of ${req.params.id}: ${err.message}`
      });
    });
});

router.put("/:id", validateCarId, validateCar, (req, res) => {
  cars
    .update(req.car.id, req.body)
    .then(() => {
      res.status(200).json({
        message: `Car with id ${req.car.id} successfully updated`,
        changes: req.body
      });
    })
    .catch(err => {
      res.status(500).json({
        message: `Something terrible happened trying to update car with id of ${req.car.id}: ${err.message}`
      });
    });
});

//SALES
router.get("/:id/sales", validateCarId, (req, res) => {
  cars
    .getCarSales(req.params.id)
    .then(sales => {
      if (sales) {
        res.status(200).json(sales);
      } else {
        res
          .status(200)
          .json({ message: "This car doesn't have any sales yet" });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not retrieve sales for car with id ${req.params.id}: ${err.message}`
      });
    });
});

router.post("/:id/sales", validateCarId, validateSale, (req, res) => {
  cars
    .addCarSale({ car_id: req.params.id, price: req.body.price })
    .then(sale => {
      res.status(201).json({
        message: "Sale created successfully",
        sale: { id: sale[0], price: req.body.price, car_id: req.params.id }
      });
    })
    .catch(err => {
      res.status(500).json({ message: "Could not create sale" + err.message });
    });
});

//custom middleware
function validateCarId(req, res, next) {
  cars
    .getById(req.params.id)
    .then(car => {
      if (car) {
        req.car = car;
        next();
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
}

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

function validateSale(req, res, next) {
  if (!req.body.price) {
    res.status(400).json({ message: "Must provide sale price" });
  } else {
    next();
  }
}

module.exports = router;
