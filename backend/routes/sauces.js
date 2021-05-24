const express = require("express");
const router = express.Router();

const sauceController = require("../controllers/sauces");
const auth = require("../middleware/auth"); // add token
const multer = require("../middleware/multer-config"); // add image
const isowner = require("../middleware/isowner");

router.post("/", auth, multer, sauceController.addSauce);
router.put("/:id", auth, isowner, multer, sauceController.modifySauce);
router.delete("/:id", auth, isowner, sauceController.deleteSauce);
router.get("/:id", auth, sauceController.getOneSauce);
router.get("/", auth, sauceController.getAllSauces);
router.post("/:id/like", auth, sauceController.likeSauce);

module.exports = router;
