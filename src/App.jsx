import MovieGrid from "./components/MovieGrid";
import { useMovies } from "./hooks/useMovies";
import { DEFAULT_GENRE_ID } from "./constants/config";

function App() {
  const { movies } = useMovies(DEFAULT_GENRE_ID);

  const sortedMovies = [...movies].sort(
    (a, b) => b.vote_average - a.vote_average,
  );

  return (
    <>
      <header>
        <h1>Movies</h1>
      </header>
      <main>
        <MovieGrid movies={sortedMovies} />
      </main>
      <footer>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer>
    </>
  );
}

export default App;
