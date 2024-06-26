import * as elements from "typed-html"
import { IMovie } from "./MovieApi";

export const Layout = ({ children }: elements.Children) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <script src="https://unpkg.com/htmx.org@1.9.5"></script>
    </head>
    <body>
      <header>
        <h1>My watchlist</h1>
      </header>
      <main>{children}</main>
    </body>
  </html>
)

export const Movie = ({ title, year, id }: any) => (
  <li>
    {title} ({year})
    <button
      hx-get={`/movies/${id}/edit`}
      hx-target="closest li"
      hx-swap="outerHTML"
    >
      Edit
    </button>
    <button
      hx-delete={`/movies/${id}`}
      hx-target="closest li"
      hx-swap="outerHTML"
    >
      Delete
    </button>
  </li>
);

export const MovieEdit = ({ title, year, id }: any) => (
  <li>
    <form hx-put={`/movies/${id}`} hx-target="closest li" hx-swap="outerHTML">
      <label>Title</label>
      <input type="text" name="title" value={title} />

      <label>Year</label>

      <input type="number" name="year" value={year} />
      <button type="submit">Update</button>
      <button
        hx-get={`/movies/${id}`}
        hx-target="closest li"
        hx-swap="outerHTML"
      >
        Cancel
      </button>
    </form>
  </li>
);

export const MovieList = ({ movies }: { movies: IMovie[] }) => (
  <ul id="movieList">
    {movies.map((movie, i) => (
      <Movie {...movie} id={i} />
    ))}
  </ul>
);

export const NewMovie = () => (
  <form hx-post="/movies" hx-target="#movieList" hx-swap="beforeend">
    <label for="titleInput">Title</label>
    <input type="text" name="title" id="titleInput" />
    <label for="yearInput">Year</label>
    <input type="number" name="year" id="yearInput" />
    <button type="submit">Add</button>
  </form>
);
