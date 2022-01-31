const knexService = require("./theaters.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const {movie_id} = req.params;
    const data = movie_id ? await knexService.listTheatersByMovie(movie_id) : await knexService.list();
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
}