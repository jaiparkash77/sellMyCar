const express = require("express");
const { addNewCar, getAllCars, getCarDetails, updateCar, deleteCar } = require("../controllers/carController");
const router = express.Router();

router.route("/addNewCar").post(addNewCar);
router.route("/cars").get(getAllCars);
router.route("/car/:id").get(getCarDetails);
router.route("/collections/car/:id").delete(deleteCar);
router.route("/collections/car/:id").put(updateCar);

module.exports = router;