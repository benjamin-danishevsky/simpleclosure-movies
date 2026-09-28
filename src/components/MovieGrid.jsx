import MovieCard from "./MovieCard";
import { FEATURED_RATING } from "../constants/config";
import styles from "./MovieGrid.module.css";

function MovieGrid({ movies, sortKey, layout }) {
  const isGrid = layout === "grid";

  // Dense packing backfills gaps with later movies, which only reads correctly
  // when the featured cards are clustered at one end of the order.
  const gridClassName = [
    styles.grid,
    !isGrid && styles.list,
    isGrid && sortKey === "rating" && styles.dense,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ul className={gridClassName}>
      {movies.map((movie) => (
        <li
          key={movie.id}
          className={
            isGrid && movie.vote_average >= FEATURED_RATING
              ? styles.featured
              : undefined
          }
        >
          <MovieCard movie={movie} layout={layout} />
        </li>
      ))}
    </ul>
  );
}

export default MovieGrid;
