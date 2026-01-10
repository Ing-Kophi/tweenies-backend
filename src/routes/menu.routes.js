const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const controller = require("../controllers/menu.controller");

router.get("/", controller.getAll);
router.post("/", protect, controller.create);

module.exports = router;
