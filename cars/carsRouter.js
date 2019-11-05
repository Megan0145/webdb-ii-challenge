const express = require('express');
const cars = require('./carsHelpers');
const router = express.Router();

router.get("/", (req, res) => {
    cars.get()
    .then(cars => {
       res.status(200).json(cars);
    })
    .catch(err => {
        res.status(500).json({ message: "Cannot get cars: " + err.message})
    })
})

module.exports = router;