import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";
import { MovieApi } from "./MovieApi";
import { Movie, MovieEdit, MovieList, NewMovie, Layout } from "./views";

const app = new Elysia();
app.use(html());

app.get("/movies", () => {
  const movies = MovieApi.readAll();
  return (
    <Layout>
      <MovieList movies={movies} />
      <h2>New movie</h2>
      <NewMovie />
    </Layout>
  );
});

app.post("/movies", ({ body }) => {
  const movie = MovieApi.create(body);
  return <Movie {...movie} />;
});

app.get("/movies/:id", ({ params }) => {
  const movie = MovieApi.read(Number(params.id));
  return <Movie {...movie} />;
});

app.get("/movies/:id/edit", ({ params }) => {
  const movie = MovieApi.read(Number(params.id));
  return <MovieEdit {...movie} />;
});

app.put("/movies/:id", ({ body, params }) => {
  const movie = MovieApi.update(Number(params.id), body);
  return <Movie {...movie} />;
});

app.delete("/movies/:id", ({ params }) => {
  MovieApi.remove(Number(params.id));
  return <li>Deleted</li>;
});

app.listen(8080, () => {
  console.log(`[Elysia] Listening on port http://0.0.0.0:8080`);
});
