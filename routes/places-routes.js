const express = require("express");
const {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace,
  getAllPlaces,
} = require("../controller/places-controller");

const router = express.Router();

router.get("/", getAllPlaces);
router.get("/:pid", getPlaceById);
router.get("/user/:uid", getPlaceByUserId);

router.post("/create", createPlace);

router.patch("/:pid", updatePlace);

router.delete("/:pid", deletePlace);

module.exports = router;
