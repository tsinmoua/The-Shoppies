const router = require("express").Router();
const bookRoutes = require("./movies");

// Book routes
router.use("/movies", bookRoutes);

module.exports = router;
