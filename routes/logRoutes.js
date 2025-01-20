// const express = require("express");
// const { getLogs } = require("../controller/logController");
// const { protect, isAdmin } = require("../middleware/auth");

// const router = express.Router();

// // Protect all routes and require admin access
// router.use(protect);
// router.use(isAdmin);

// router.get("/", getLogs);

// module.exports = router;

const express = require("express");
const { getLogs } = require("../controller/logController");
const { protect, isAdmin } = require("../middleware/auth");

const router = express.Router();

// Protect all routes and require admin access
router.use(protect);
router.use(isAdmin);

// Fetch logs with pagination & filtering
router.get("/", getLogs);

module.exports = router;
