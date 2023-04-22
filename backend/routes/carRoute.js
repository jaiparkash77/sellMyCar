const express = require("express");
const { addNewCar } = require("../controllers/carController");
const router = express.Router();

router.route("/addCar").post(addNewCar);

module.exports = router;