const router = require("express").Router();
const moviesController = require("../../controllers/moviesController");

// Matches with "/api/movies"
router.route("/")
  .get(moviesController.findAll)
  .post(moviesController.create);

// Matches with "/api/movies/:id"
router.route("/:id")
  .delete(moviesController.remove);

module.exports = router;
