const express = require("express");
const sales = require("./salesHelpers");
const router = express.Router();

router.get('/:id/sales', (req, res) => {
    sales.get()
    .then(sales => {
        res.json(sales)
    })
    .catch(err => {
        res.json(err)
    })
})

module.exports = router;