import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div>
      {/* Review Submission Section */}
      <section>
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <div className="my-2 mt-12">
              <label htmlFor="comment" className="block text-2xl mb-2">
                Write your Review
              </label>
              <textarea
                id="comment"
                rows="4"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full max-w-xl text-black focus:outline-none focus:ring-2 focus:ring-teal-600"
                placeholder="Share your thoughts..."
              />
            </div>
            <button
              type="submit"
              className="bg-teal-600 text-white py-2 px-4 rounded-lg mt-2 hover:bg-teal-700 transition"
            >
              Submit
            </button>
          </form>
        ) : (
          <p className="mt-4">
            Please{" "}
            <Link to="/login" className="text-teal-600 underline">
              Sign In
            </Link>{" "}
            to write your review.
          </p>
        )}
      </section>

      {/* Reviews Display Section */}
      <section className="mt-8">
        {movie?.reviews.length === 0 ? (
          <p className="text-gray-400">No Reviews Yet</p>
        ) : (
          movie?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-[#1A1A1A] p-4 rounded-lg w-full max-w-xl mt-4 shadow-md"
            >
              <div className="flex justify-between items-center">
                <strong className="text-[#B0B0B0]">{review.name}</strong>
                <p className="text-[#B0B0B0] text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="my-2 text-gray-200">{review.comment}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default MovieTabs;
