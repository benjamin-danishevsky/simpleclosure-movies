import { useEffect, useState } from "react";
import { fetchMovies } from "../api/tmdb";

export function useMovies(genreId) {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    async function loadMovies() {
      setStatus("loading");
      setError(null);

      try {
        const results = await fetchMovies(genreId);
        setMovies(results);
        setStatus("success");
      } catch (err) {
        setError(err);
        setStatus("error");
      }
    }

    loadMovies();
  }, [genreId, reloadKey]);

  function reload() {
    setReloadKey((key) => key + 1);
  }

  return { movies, status, error, reload };
}
