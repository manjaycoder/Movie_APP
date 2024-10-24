import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../../redux/api/movies";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">
        All Movies ({movies?.length})
      </h1>
      <div className="flex flex-col">
        <div className="overflow-y-auto h-[90vh] p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies?.map((movie) => (
              <Link
                key={movie._id}
                to={`/admin/movies/update/${movie._id}`}
                className="block rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 border-t border-gray-300">
                    <h2 className="font-bold text-xl mb-2">{movie.name}</h2>
                    <p className="text-zinc-200 text-base">{movie.detail}</p>
                    <div className="mt-4">
                      <Link
                        to={`/admin/movies/update/${movie._id}`}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                      >
                        Update Movie
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;
