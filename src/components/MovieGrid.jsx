import MovieCard from "./MovieCard";
import styles from "./MovieGrid.module.css";

function MovieGrid({ movies }) {
  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}

export default MovieGrid;
