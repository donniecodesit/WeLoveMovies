const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../../errors/methodNotAllowed");

// Return all reviews
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

// Return, update, or delete a specific review.
router.route("/:review_id")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

module.exports = router;