import { posterUrl } from "../api/tmdb";
import { MOVIE_PAGE_URL } from "../constants/config";
import styles from "./MovieCard.module.css";

function MovieCard({ movie }) {
  const year = movie.release_date?.slice(0, 4);

  return (
    <a
      className={styles.card}
      href={`${MOVIE_PAGE_URL}/${movie.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className={styles.poster}
        src={posterUrl(movie.poster_path)}
        alt=""
        loading="lazy"
      />
      <div className={styles.body}>
        <h2 className={styles.title}>{movie.title}</h2>
        <p className={styles.meta}>
          <span className={styles.rating}>{movie.vote_average}</span>
          <span>{year}</span>
        </p>
      </div>
    </a>
  );
}

export default MovieCard;
