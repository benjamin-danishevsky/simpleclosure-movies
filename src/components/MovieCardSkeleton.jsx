import styles from "./MovieCardSkeleton.module.css";

function MovieCardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.poster} />
      <div className={styles.body}>
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
    </div>
  );
}

export default MovieCardSkeleton;
