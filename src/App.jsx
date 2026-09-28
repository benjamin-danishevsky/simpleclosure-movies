import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`;

    async function loadMovies() {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`TMDB request failed with status ${res.status}`);
      }
      const data = await res.json();
      setMovies(data.results);
    }

    loadMovies();
  }, []);

  return (
    <>
      <h1>Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
