const SORTS = {
  rating: {
    valueOf: (movie) => movie.vote_average,
    compare: (a, b) => a - b,
  },
  release: {
    valueOf: (movie) => movie.release_date,
    compare: (a, b) => a.localeCompare(b),
  },
  title: {
    valueOf: (movie) => movie.title,
    compare: (a, b) => a.localeCompare(b),
  },
};

function isMissing(value) {
  return value === undefined || value === null || value === "";
}

export function sortMovies(movies, key, direction) {
  const sort = SORTS[key];
  const factor = direction === "asc" ? 1 : -1;

  return [...movies].sort((a, b) => {
    const aValue = sort.valueOf(a);
    const bValue = sort.valueOf(b);

    // Checked before the direction factor is applied so that movies with no
    // value stay at the bottom in both ascending and descending order.
    if (isMissing(aValue) || isMissing(bValue)) {
      if (isMissing(aValue) && isMissing(bValue)) return 0;
      return isMissing(aValue) ? 1 : -1;
    }

    return sort.compare(aValue, bValue) * factor;
  });
}
