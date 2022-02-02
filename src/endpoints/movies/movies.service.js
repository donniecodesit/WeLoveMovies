const knex = require("../../db/connection");
const mapProperties = require("../../utils/map-properties");
const criticObject = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at"
})

// Fetch all rows from movies
function list() { 
    return knex("movies").select("*");
}

// Fetch single matching row from movies
function read(movie_id) {
    return knex("movies").where({ movie_id }).first();
}

// Fetch rows from movies where movie is showing
function listMoviesShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .distinct("m.*")
        .where({ "mt.is_showing": true })
        .orderBy("m.movie_id");
}

// Fetch rows from theaters where movie is showing
function listTheatersPlaying(movie_id) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("t.*")
        .where({ "mt.movie_id": movie_id })
        .andWhere({ "mt.is_showing": true })
}

// Fetch rows from reviews where movie matches
function listReviews(movie_id) {
    return knex("movies as m")
        .join("reviews as r", "r.movie_id", "m.movie_id")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .where({ "m.movie_id": movie_id })
        .select("*")
        .then((reviews) => reviews.map(criticObject));
}

module.exports = {
    list,
    read,
    listMoviesShowing,
    listTheatersPlaying,
    listReviews
}