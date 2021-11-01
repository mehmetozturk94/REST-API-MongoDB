const express = require("express");
const { check } = require("express-validator");
const placesControllers = require("../controllers/places-controllers");

const router = express.Router();

//GET Routes
router.get("/:pid", placesControllers.getPlaceById);
router.get("/user/:uid", placesControllers.getPlacesByUserId);

//POST Routes
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

//Update Place
router.patch("/:pid", placesControllers.updatePlace);

//DELETE Places
router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
