import { describe, expect, it } from "vitest";
import { sortMovies } from "./sortMovies";

const movies = [
  { id: 1, title: "Blade", vote_average: 6.1, release_date: "2013-01-01" },
  { id: 2, title: "Alien", vote_average: 8.4, release_date: "2020-05-05" },
  { id: 3, title: "Crash", vote_average: 7.0, release_date: "" },
];

const titles = (list) => list.map((movie) => movie.title);

describe("sortMovies", () => {
  it("sorts by rating, highest first", () => {
    expect(titles(sortMovies(movies, "rating", "desc"))).toEqual([
      "Alien",
      "Crash",
      "Blade",
    ]);
  });

  it("sorts by rating, lowest first", () => {
    expect(titles(sortMovies(movies, "rating", "asc"))).toEqual([
      "Blade",
      "Crash",
      "Alien",
    ]);
  });

  it("sorts by title alphabetically", () => {
    expect(titles(sortMovies(movies, "title", "asc"))).toEqual([
      "Alien",
      "Blade",
      "Crash",
    ]);
  });

  it("keeps a movie with no release date last in both directions", () => {
    expect(titles(sortMovies(movies, "release", "desc"))).toEqual([
      "Alien",
      "Blade",
      "Crash",
    ]);
    expect(titles(sortMovies(movies, "release", "asc"))).toEqual([
      "Blade",
      "Alien",
      "Crash",
    ]);
  });

  it("does not change the array it was given", () => {
    sortMovies(movies, "title", "asc");
    expect(titles(movies)).toEqual(["Blade", "Alien", "Crash"]);
  });
});
