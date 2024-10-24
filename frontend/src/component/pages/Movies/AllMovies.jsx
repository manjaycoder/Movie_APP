import { useState, useEffect, useRef } from "react";
import {
  useGetAllMoviesQuery,
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../../redux/api/movies.js";
import { useFetchGenresQuery } from "../../../redux/api/genre.js";
import MovieCard from "../../../component/pages/Movies/MovieCard.jsx";
import Banners from "../../../assets/Banners.jpg";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMoviesYears,
  setUniqueYears,
} from "../../../redux/feature/Movies/moviesSlice.js";
import { useDispatch, useSelector } from "react-redux";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data: allMovies } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);
  const [visibleMovies, setVisibleMovies] = useState(12); // Number of movies to display initially
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (allMovies) {
      const moviesYears = allMovies.map((movie) => movie.year);
      const uniqueYears = Array.from(new Set(moviesYears));

      dispatch(setFilteredMovies(allMovies));
      dispatch(setMoviesYears(moviesYears));
      dispatch(setUniqueYears(uniqueYears));
    }
  }, [allMovies, dispatch]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    dispatch(setMoviesFilter({ searchTerm }));

    if (allMovies) {
      const filtered = allMovies.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm)
      );

      dispatch(setFilteredMovies(filtered));
    }
  };

  const handleGenreClick = (genreId) => {
    if (allMovies) {
      const filteredByGenre = allMovies.filter((movie) => movie.genre === genreId);
      dispatch(setFilteredMovies(filteredByGenre));
    }
  };

  const handleYearChange = (year) => {
    if (allMovies) {
      const filterByYear = allMovies.filter((movie) => movie.year === +year);
      dispatch(setFilteredMovies(filterByYear));
    } else {
      dispatch(setFilteredMovies([])); // Clear the filtered movies if allMovies is not available
    }
  };

  const handleSortChange = (sort) => {
    switch (sort) {
      case "new":
        dispatch(setFilteredMovies(newMovies || []));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies || []));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies || []));
        break;
      default:
        dispatch(setFilteredMovies([])); // Clear if no valid sort option is selected
        break;
    }
  };

  // Lazy loading effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleMovies((prev) => prev + 6); // Load 6 more movies
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <section>
        <div
          className="relative h-[45rem] w-screen mb-10 flex fixed items-center justify-center bg-cover"
          style={{ backgroundImage: `url(${Banners})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b to-black opacity-60"></div>
          <section className="absolute -bottom-[5rem]">
            <input
              type="text"
              className="w-full h-[3rem] border px-10 outline-none rounded-xl mb-[10rem]"
              placeholder="Search Movie"
              value={moviesFilter.searchTerm}
              onChange={handleSearchChange}
            />
            <section className="sorts-container mt-[3rem] ml-[10rem] w-[30rem]">
              <select
                className="border p-2 rounded text-black"
                value={moviesFilter.selectedGenre}
                onChange={(e) => handleGenreClick(e.target.value)}
              >
                <option value="">Genres</option>
                {genres?.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>
              <select
                className="border p-2 rounded text-black"
                value={moviesFilter.selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
              >
                <option value="">Year</option>
                {Array.from(new Set(allMovies?.map(movie => movie.year))).map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                className="border p-2 rounded text-black"
                value={moviesFilter.selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="new">New Movies</option>
                <option value="top">Top Movies</option>
                <option value="random">Random Movies</option>
              </select>
            </section>
          </section>
        </div>
        <section className="mt-[10rem] w-screen flex justify-center items-center flex-wrap">
          {filteredMovies?.slice(0, visibleMovies).map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </section>
        <div ref={loadMoreRef} className="h-16"></div> {/* Placeholder for the observer */}
      </section>
    </div>
  );
};

export default AllMovies;
