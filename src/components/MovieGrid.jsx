import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import { FEATURED_RATING, SKELETON_COUNT } from "../constants/config";
import styles from "./MovieGrid.module.css";

function MovieGrid({ movies, sortKey, layout, loading }) {
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

  const items = loading
    ? Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <li key={index}>
          <MovieCardSkeleton />
        </li>
      ))
    : movies.map((movie) => (
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
      ));

  return <ul className={gridClassName}>{items}</ul>;
}

export default MovieGrid;
