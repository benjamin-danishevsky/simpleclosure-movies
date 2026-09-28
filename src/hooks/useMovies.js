import { useEffect, useState } from "react";
import { fetchMovies } from "../api/tmdb";

export function useMovies(genreId) {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovies() {
      setStatus("loading");

      try {
        const results = await fetchMovies(genreId);
        setMovies(results);
        setStatus("success");
        console.log(results);
      } catch (err) {
        setError(err);
        setStatus("error");
      }
    }

    loadMovies();
  }, [genreId]);

  return { movies, status, error };
}
