### We Love Movies!
This is a backend API service designed for users to browse movies and their reviews!
The backend was built using JavaScript, Express, Node, and Knex, using an SQL database.

## Live Example
[Backend Client on Vercel](https://dl-movies-backend.vercel.app/)
> Make requests to the backend URL, using `/movies`, `/reviews`, or `/theaters`. IDs supported.

## How To Install
- Fork/Clone/Download this repository.
- Run `npm install` to install dependencies.
- Initialize a remote SQL database.
- Copy `.env.sample` to `.env` and change any necessary database URLs.
- Run `npx knex migrate:latest` and then `npx knex seed:run` to create tables with data on your database.
- To test locally, run `npm start` and make any requests needed to see examples. (Example: `GET localhost:5000/movies/6`)
