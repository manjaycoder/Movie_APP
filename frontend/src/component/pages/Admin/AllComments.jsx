import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../../redux/api/movies";
import { toast } from "react-toastify";
const AllComments = () => {
  const { data: movie, refetech } = useGetAllMoviesQuery();
  const [deleteComment] = useDeleteCommentMutation();
  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment deleted");
      refetech();
    } catch (error) {
      console.error("error delete", error);
    }
  };
  return (
    <div>
      {movie?.map((m) => (
        <section
          key={m._id}
          className="flex flex-col justify-center items-center"
        >
          {m?.reviews.map((r) => (
            <div
              key={r._id}
              className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem] "
            >
              <div className="flex justify-between">
                <strong className="text-[#B0B0B0]">{r.name}</strong>
                <p className="text-[#B0B0B0]">{r.createdAt.substring(0, 10)}</p>
              </div>
              <p className="my-4">{r.comment}</p>
              <button
                className="text-red-500"
                onClick={() => handleDeleteComment(m._id, r._id)}
              ></button>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default AllComments;
