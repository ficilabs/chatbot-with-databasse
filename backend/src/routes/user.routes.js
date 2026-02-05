const express = require("express");
const controller = require("../controllers/user.controller");
const apiKey = require("../middlewares/apiKey.middleware");

const router = express.Router();

router.use(apiKey);

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
