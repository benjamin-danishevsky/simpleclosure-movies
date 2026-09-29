import { API_BASE_URL, IMAGE_BASE_URL, POSTER_SIZE } from "../constants/config";

export async function fetchMovies(genreId, signal) {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    with_genres: genreId,
  });

  const res = await fetch(`${API_BASE_URL}/discover/movie?${params}`, {
    signal,
  });
  if (!res.ok) {
    throw new Error(`TMDB request failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.results;
}

export function posterUrl(posterPath) {
  return `${IMAGE_BASE_URL}/${POSTER_SIZE}${posterPath}`;
}
