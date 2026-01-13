const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const upload = require("../config/multer");
const controller = require("../controllers/menu.controller");

router.get("/", controller.getAll);

// Create menu item WITH image
router.post(
  "/",
  protect,
  upload.single("image"),
  controller.create
);

// Update menu item image
router.put(
  "/:id",
  protect,
  upload.single("image"),
  controller.update
);

router.delete("/:id", protect, controller.remove);

module.exports = router;
