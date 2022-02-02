const router = require("express").Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../../errors/methodNotAllowed");

// Return all theaters
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

// Return a specific theater
router.route("/:movie_id")
    .get(controller.list)
    .all(methodNotAllowed);
    
module.exports = router;