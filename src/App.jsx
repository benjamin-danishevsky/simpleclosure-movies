import { useMemo, useState } from "react";
import Controls from "./components/Controls";
import MovieGrid from "./components/MovieGrid";
import { useMovies } from "./hooks/useMovies";
import { sortMovies } from "./utils/sortMovies";
import {
  DEFAULT_GENRE_ID,
  DEFAULT_LAYOUT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SORT_KEY,
} from "./constants/config";

function App() {
  const [genreId, setGenreId] = useState(DEFAULT_GENRE_ID);
  const [sortKey, setSortKey] = useState(DEFAULT_SORT_KEY);
  const [sortDirection, setSortDirection] = useState(DEFAULT_SORT_DIRECTION);
  const [layout, setLayout] = useState(DEFAULT_LAYOUT);

  const { movies } = useMovies(genreId);

  const sortedMovies = useMemo(
    () => sortMovies(movies, sortKey, sortDirection),
    [movies, sortKey, sortDirection],
  );

  return (
    <>
      <header>
        <h1>Movies</h1>
        <Controls
          genreId={genreId}
          onGenreChange={setGenreId}
          sortKey={sortKey}
          onSortKeyChange={setSortKey}
          sortDirection={sortDirection}
          onSortDirectionChange={setSortDirection}
          layout={layout}
          onLayoutChange={setLayout}
        />
      </header>
      <main>
        <MovieGrid movies={sortedMovies} sortKey={sortKey} layout={layout} />
      </main>
      <footer>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer>
    </>
  );
}

export default App;
