import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="relative group m-[2rem]" key={movie._id}>
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.name}
          className="w-[20rem] h-[20rem] rounded-2xl m-0 p-0 transition duration-300 ease-in-out transform group-hover:opacity-50"
        />
      </Link>
      <p className="absolute top-[75%] left-[2rem] right-0 bottom-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        {movie.name}
        
      </p>
    </div>
  );
};

export default MovieCard;
