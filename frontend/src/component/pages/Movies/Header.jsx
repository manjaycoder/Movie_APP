import { useGetNewMoviesQuery } from "../../../redux/api/movies.js";
import { Link } from "react-router-dom";
import SliderUtil from "../../SliderUtil.jsx";

const Header = () => {
  const { data, isLoading, isError } = useGetNewMoviesQuery();

  return (
    <div className="flex flex-col mt-[2rem] ml-[2rem] md:flex-row justify-between items-center md:items-start">
      <nav className="w-full md:w-[10rem] ml-0 md:ml-2 mb-4 md:mb-0">
        <Link
          to="/"
          className="transform duration-300 ease-in-out hover:bg-teal-200 block p-2 rounded mb-1 md:mb-2 text-lg"
        >
          Home
        </Link>
        <Link
          to="/all-movies"
          className="transform duration-300 ease-in-out hover:bg-teal-200 block p-2 rounded mb-1 md:mb-2 text-lg"
        >
          Browse Movies
        </Link>
      </nav>

      <div className="w-full md:w-[80%] mr-0 md:mr-2">
        {isLoading ? (
          <div className="text-center">Loading movies...</div>
        ) : isError ? (
          <div className="text-center">Error loading movies</div>
        ) : (
          <SliderUtil data={data} />
        )}
      </div>
    </div>
  );
};

export default Header;
