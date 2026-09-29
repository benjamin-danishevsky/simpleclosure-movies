import { useEffect, useState } from "react";
import { fetchMovies } from "../api/tmdb";

export function useMovies(genreId) {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMovies() {
      setStatus("loading");
      setError(null);

      try {
        const results = await fetchMovies(genreId, controller.signal);
        setMovies(results);
        setStatus("success");
      } catch (err) {
        // A superseded request is not a failure, and its component may already
        // be showing newer results.
        if (err.name === "AbortError") return;

        setError(err);
        setStatus("error");
      }
    }

    loadMovies();

    return () => controller.abort();
  }, [genreId, reloadKey]);

  function reload() {
    setReloadKey((key) => key + 1);
  }

  return { movies, status, error, reload };
}
