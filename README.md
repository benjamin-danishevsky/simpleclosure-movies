# Movies

A single-page app that fetches movies from [TMDB](https://www.themoviedb.org/) and
presents them as a responsive grid of cards. Filter by genre, sort by rating,
release date, or title in either direction, and switch between a grid and a list
layout. Highly rated films get larger cards.

## Setup

Requires Node 22 or later.

```bash
npm i
npm start
```

The app runs at the URL Vite prints, usually <http://localhost:5173>.

No further configuration is needed. The TMDB API key is read from
`import.meta.env.VITE_TMDB_API_KEY` and lives in a committed `.env` file, so the
app works immediately after cloning.

Other scripts:

| Command | Purpose |
| --- | --- |
| `npm start` | Start the dev server |
| `npm run dev` | Same as `npm start` |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Features

### Requirements

| Requirement | Where it is met |
| --- | --- |
| Runs with `npm i && npm start` | `start` script in `package.json` |
| `GET /discover/movie`, first page only | `fetchMovies` in `src/api/tmdb.js`. No `page` parameter is sent, and TMDB defaults to page 1. |
| One filter applied in the API request | `with_genres` — the genre select drives the request, so filtering happens server-side |
| Sorted with a method and property of choice | `Array.prototype.sort` on `vote_average`, descending by default, in `src/utils/sortMovies.js` |
| Grid of cards with poster, title, one more property | `MovieCard` shows the poster, title, rating, and release year |
| One interactive element per card | Hover and keyboard focus scale the card, raise a shadow, and reveal the overview |

### Extras

| Extra | Notes |
| --- | --- |
| Responsive grid | `repeat(auto-fill, minmax(180px, 1fr))` — one column on a phone through five on a wide desktop, with no media queries driving the columns |
| Filter and sort UI | Genre select, sort select, and a direction toggle in `Controls` |
| CSS transitions | `transform`, `box-shadow`, and `opacity` only, so animation stays off the main thread |
| Larger cards for higher ratings | Ratings of 8 or above span two columns and two rows |
| Alternate layout | Grid and list toggle; list collapses to one column with horizontal cards |

### Beyond the brief

- **Loading, error, and empty states.** Skeleton cards that hold the exact
  dimensions of real cards, so the grid does not shift when data arrives; an
  error message with a Retry button that refetches without a page reload.
- **Reduced motion.** Every transition and the skeleton pulse are disabled under
  `prefers-reduced-motion: reduce`.
- **Keyboard parity.** `:focus-visible` mirrors every hover style and adds an
  outline, so keyboard users get the same overview reveal as mouse users.
- **No layout shift.** Posters sit in an `aspect-ratio: 2 / 3` box, reserving
  their space before the image loads.

## How it works

Genre filtering happens in the request as `with_genres`, so the server does the
filtering. Sorting happens locally in `sortMovies`, a pure function that copies
the array with `[...movies]` before sorting, because `Array.prototype.sort`
mutates in place. Movies with a missing value sort last in both directions — the
missing-value check runs before the direction multiplier is applied.

Release dates are compared as strings. ISO `YYYY-MM-DD` sorts lexicographically
in the same order it sorts chronologically, so no date parsing is involved, and
the displayed year is `release_date.slice(0, 4)`.

`grid-auto-flow: dense` backfills the gaps that spanning cards leave behind, but
it fills them with later items, so it is enabled only when sorting by rating,
where the large cards cluster at one end of the order.

Design tokens live in `:root` in `src/index.css`. Custom properties inherit,
which is what lets scoped CSS Modules read `var(--space-3)` without importing
anything. Everything that can appear more than once is a module, so class names
are hashed and cannot collide. The page shell — `header`, `main`, `footer` — is
styled globally because there is exactly one of each.

## Project structure

```
src/
├── api/
│   └── tmdb.js              Request building and response shaping
├── components/
│   ├── Controls.jsx         Genre, sort, direction, and layout inputs
│   ├── MovieCard.jsx        One movie
│   ├── MovieCardSkeleton.jsx  Loading placeholder matching card dimensions
│   └── MovieGrid.jsx        Layout, spanning, and flow decisions
├── constants/
│   ├── config.js            URLs, thresholds, defaults
│   └── genres.js            Genre ids and names
├── hooks/
│   └── useMovies.js         Fetch state: movies, status, error, reload
├── utils/
│   └── sortMovies.js        Pure sorting
├── App.jsx                  Owns all UI state, branches on status
└── index.css                Design tokens and page shell
```

Each component pairs with a `.module.css` file of the same name.

Only `api/tmdb.js` knows TMDB's wire format, so nothing else knows results
arrive wrapped in a pagination envelope. Only `App.jsx` holds state, so every
other component is a function of its props. `sortMovies` knows nothing about
React.

## Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.
