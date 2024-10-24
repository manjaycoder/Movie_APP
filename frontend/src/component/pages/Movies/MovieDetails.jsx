import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Player } from "video-react";
import MovieTabs from "./MovieTabs.jsx";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
  
} from "../../../redux/api/movies.js";

import "video-react/dist/video-react.css"; // Import video-react styles

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] = useAddMovieReviewMutation();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview({ movieId, rating, comment }).unwrap();
      toast.success("Review added successfully!");
      refetch();
      // Reset the form after successful submission
    } catch (err) {
      toast.error("Failed to add review.");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-white font-semibold hover:underline mb-4 inline-block">
        Go Back
      </Link>

      {/* Full-width video player */}
      <div className="mb-3 mt-3">
        {movie?.video ? (
          <Player playsInline src={movie.video} className="w-full h-auto rounded-lg shadow-lg" />
        ) : (
          <div className="text-red-500">Video not available</div>
        )}
      </div>

      {/* Flex container for image and details */}
      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* Movie image */}
        <div className="flex-1 mb-6 md:mb-0">
          <img
            src={movie?.image}
            alt={movie?.name}
            className="w-[90%] h-[40rem] object-cover rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Movie details */}
        <div className="flex-1">
          <h2 className="text-5xl font-semibold text-white">{movie?.name}</h2>
          <p className="mt-2 text-gray-400">{movie?.detail}</p>
          <p className="text-2xl font-semibold text-gray-300">Release Date: {movie?.year}</p>

          <ul className="mt-4 list-disc list-inside text-gray-200">
            {movie?.cast.map((c) => (
              <li key={c._id} className="font-sans mt-1">{c}</li>
            ))}
          </ul>
          
        </div>
      </div>

      {/* Comment section */}
      <div className="mt-6">
        <MovieTabs
          loadingMovieReview={loadingMovieReview}
          userInfo={userInfo}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          movie={movie}
          submitHandler={handleReviewSubmit} // Pass submit handler to MovieTabs
        />
      </div>

      {/* Award Animation Section */}
      {movie?.awards && movie.awards.length > 0 && (
        <div className="mt-10">
          <h3 className="text-3xl font-semibold text-white mb-4">Awards</h3>
          <div className="flex flex-wrap space-x-4">
            {movie.awards.map((award) => (
              <div
                key={award.id}
                className="bg-teal-600 text-white p-4 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
                style={{ animation: 'pulse 1s infinite' }}
              >
                <p className="text-lg font-bold">{award.name}</p>
                <p className="text-sm">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
