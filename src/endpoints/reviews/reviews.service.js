const knex = require("../../db/connection");

// Fetch all rows from reviews
function list() {
    return knex("reviews").select("*");
}

// Fetch single matching row from reviews
function read(review_id) {
    return knex("reviews").where({ review_id }).first();
}

// Delete single matching row from reviews
function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
}

// Update single matching row from reviews
function update(updatedReview) {
    return knex("reviews").where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*")
        .then(() => {
            return knex("critics")
                .select("*")
                .where({ critic_id: updatedReview.critic_id })
                .first();
        })
}

module.exports = {
    list,
    read,
    destroy,
    update
}