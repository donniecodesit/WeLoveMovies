const knexService = require("./reviews.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const {review_id} = req.params;
    const data = await knexService.read(review_id);
    if (data) {
        res.locals.review = data;
        return next();
    } else {
        next({ status: 404, message: `Review ${review_id} cannot be found.`});
    }
}

async function list(req, res, next) {
    const data = await knexService.list();
    res.json({ data });
}

async function read(req, res, next) {
    res.json({ data: res.locals.review });
}

async function destroy(req, res, next) {
    await knexService.destroy(res.locals.review.review_id);
    res.sendStatus(204);
}

async function update(req, res, next) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,
    }
    const data = await knexService.update(updatedReview);
    updatedReview.critic = data;
    console.log(updatedReview);
    res.json({ data: updatedReview });
}


module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)]
}