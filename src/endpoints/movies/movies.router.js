const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../../errors/methodNotAllowed");

// Return all movies, or movies that are showing
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

// Return a single movie by ID
router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed)

// Return theaters playing this movie
router.route("/:movieId/theaters")
    .get(controller.listTheaters)
    .all(methodNotAllowed)

// Return reviews for this movie
router.route("/:movieId/reviews")
    .get(controller.listReviews)
    .all(methodNotAllowed)

module.exports = router;