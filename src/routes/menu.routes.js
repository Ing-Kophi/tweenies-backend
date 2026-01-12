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

module.exports = router;
