const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const controller = require("../controllers/category.controller");

router.get("/", controller.getAll);
router.post("/", protect, controller.create);
router.delete("/:id", protect, controller.remove);

module.exports = router;
