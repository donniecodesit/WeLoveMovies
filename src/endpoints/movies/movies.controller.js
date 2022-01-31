const knexService = require("./movies.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const data = await knexService.read(movieId);
    if (data) {
        res.locals.movie = data;
        return next();
    } else {
        next({ status: 404, message: `Movie ${movieId} was not found.`})
    }
}

async function list(req, res, next) {
    const data = req.query.is_showing ? await knexService.listMoviesShowing() : await knexService.list();
    res.json({ data });
}

async function read(req, res, next) {
    res.json({ data: res.locals.movie });
}

async function listTheatersPlaying(req, res, next) {
    const data = await knexService.listTheatersPlaying(res.locals.movie.movie_id);
    res.json({ data });
}

async function listReviews(req, res, next) {
    const data = await knexService.listReviews(res.locals.movie.movie_id);
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    listTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheatersPlaying)],
    listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)]
}