import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../../redux/api/movies.js";
import { useFetchGenresQuery } from "../../../redux/api/genre.js";
import SliderUtil from "../../SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-start p-4 bg-black-200 text-white">
      <nav className="flex flex-col space-y-2 mb-8 lg:mb-0 lg:w-1/4">
        {genres?.map((g) => (
          <button
            key={g._id}
            className={`transition duration-300 ease-in-out block p-2  rounded-sm text-lg font-semibold mr-[5rem] ${
              selectedGenre === g._id ? "bg-zinc-200" : "bg-white-100 hover:bg-zinc-600"
            }`}
            onClick={() => handleGenreClick(g._id)}
          >
            {g.name}
          </button>
        ))}
      </nav>

      <section className="flex flex-col w-full lg:w-3/4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Choose For You</h1>
          <SliderUtil data={randomMovies} />
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Choose Movies</h1>
          <SliderUtil data={filteredMovies} />
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
