import { GENRES } from "../constants/genres";
import { LAYOUT_OPTIONS, SORT_OPTIONS } from "../constants/config";
import styles from "./Controls.module.css";

function Controls({
  genreId,
  onGenreChange,
  sortKey,
  onSortKeyChange,
  sortDirection,
  onSortDirectionChange,
  layout,
  onLayoutChange,
}) {
  return (
    <div className={styles.controls}>
      <label className={styles.field}>
        Genre
        <select
          value={genreId}
          onChange={(event) => onGenreChange(Number(event.target.value))}
        >
          {GENRES.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        Sort by
        <select
          value={sortKey}
          onChange={(event) => onSortKeyChange(event.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        className={styles.toggle}
        onClick={() =>
          onSortDirectionChange(sortDirection === "desc" ? "asc" : "desc")
        }
      >
        {sortDirection === "desc" ? "↓ Descending" : "↑ Ascending"}
      </button>

      <div className={styles.field}>
        Layout
        <div className={styles.toggleGroup}>
          {LAYOUT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={[
                styles.toggle,
                layout === option.value && styles.active,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onLayoutChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Controls;
