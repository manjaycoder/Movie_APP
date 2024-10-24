import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useDeleteMovieMutation,
  useUploadImageMutation,
  useUploadVideoMutation,
  useUpdateMovieMutation,
} from "../../../redux/api/movies.js";
import { toast } from "react-toastify";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    video: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie, error: updateMovieErrorDetails }] = useUpdateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation();
  const [uploadVideo, { isLoading: isUploadingVideo, error: uploadVideoErrorDetails }] = useUploadVideoMutation();
  const [deleteMovie, { isLoading: isDeletingMovie, error: deleteMovieErrorDetails }] = useDeleteMovieMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setSelectedVideo(file);
  };

  const handleUpdateMovie = async () => {
    try {
      if (!movieData.name || !movieData.year || !movieData.detail || !movieData.cast.length) {
        toast.error("Please fill in all required fields");
        return;
      }

      let uploadImagePath = movieData.image;
      let uploadVideoPath = movieData.video;

      if (selectedImage || selectedVideo) {
        const formData = new FormData();
        if (selectedImage) formData.append("image", selectedImage);
        if (selectedVideo) formData.append("video", selectedVideo);

        if (selectedImage) {
          const uploadImageResponse = await uploadImage(formData);
          if (uploadImageResponse.data) {
            uploadImagePath = uploadImageResponse.data.image;
          } else {
            console.error("FAILED TO UPLOAD IMAGE", uploadImageErrorDetails);
            toast.error("Failed to upload image");
            return;
          }
        }

        if (selectedVideo) {
          const uploadVideoResponse = await uploadVideo(formData);
          if (uploadVideoResponse.data) {
            uploadVideoPath = uploadVideoResponse.data.video;
          } else {
            console.error("FAILED TO UPLOAD VIDEO", uploadVideoErrorDetails);
            toast.error("Failed to upload video");
            return;
          }
        }
      }

      await updateMovie({
        id: id,
        updatedMovie: {
          ...movieData,
          image: uploadImagePath,
          video: uploadVideoPath,
        },
      });

      toast.success("Movie updated successfully!");
      navigate("/movies");
    } catch (error) {
      console.error("FAILED TO UPDATE MOVIE:", error);
      toast.error(`Failed to update Movie: ${updateMovieErrorDetails?.message}`);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(id);
      toast.success("MOVIE DELETED SUCCESSFULLY");
      navigate("/movies");
    } catch (error) {
      console.error("FAILED TO DELETE MOVIE:", error);
      toast.error(`Failed to delete Movie: ${deleteMovieErrorDetails?.message}`);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div className={`container mx-auto p-6 rounded-lg shadow-lg ${isDarkTheme ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
      <h2 className="text-3xl font-bold text-center mb-6">Update Movie</h2>
      <button
        onClick={toggleTheme}
        className="mb-4 px-4 py-2 rounded bg-teal-500 text-white hover:bg-teal-600 focus:outline-none"
      >
        {isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
      </button>
      <form>
        <div className="mb-4">
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={movieData.name}
              onChange={handleChange}
              className={`mt-1 border ${isDarkTheme ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"} px-3 py-2 w-full rounded focus:outline-none focus:ring focus:ring-teal-200`}
              placeholder="Enter movie name"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Year:
            <input
              type="number"
              name="year"
              value={movieData.year}
              onChange={handleChange}
              className={`mt-1 border ${isDarkTheme ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"} px-3 py-2 w-full rounded focus:outline-none focus:ring focus:ring-teal-200`}
              placeholder="Enter release year"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Detail:
            <textarea
              name="detail"
              value={movieData.detail}
              onChange={handleChange}
              className={`mt-1 border ${isDarkTheme ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"} px-3 py-2 w-full rounded focus:outline-none focus:ring focus:ring-teal-200`}
              placeholder="Enter movie details"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Cast (comma-separated):
            <input
              type="text"
              name="cast"
              value={movieData.cast.join(", ")}
              onChange={(e) =>
                setMovieData({
                  ...movieData,
                  cast: e.target.value.split(", ").map(c => c.trim()),
                })
              }
              className={`mt-1 border ${isDarkTheme ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"} px-3 py-2 w-full rounded focus:outline-none focus:ring focus:ring-teal-200`}
              placeholder="Enter cast members"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`mt-1 border ${isDarkTheme ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"} px-3 py-2 w-full rounded focus:outline-none focus:ring focus:ring-teal-200`}
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Upload Video:
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className={`mt-1 border ${isDarkTheme ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"} px-3 py-2 w-full rounded focus:outline-none focus:ring focus:ring-teal-200`}
            />
          </label>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleUpdateMovie}
            className={`px-4 py-2 rounded ${isDarkTheme ? "bg-teal-600" : "bg-teal-500"} text-white hover:${isDarkTheme ? "bg-teal-700" : "bg-teal-600"} focus:outline-none`}
            disabled={isUpdatingMovie || isUploadingImage || isUploadingVideo}
          >
            {isUpdatingMovie ? "Updating..." : "Update Movie"}
          </button>
          <button
            type="button"
            onClick={handleDeleteMovie}
            className={`px-4 py-2 rounded ${isDarkTheme ? "bg-red-600" : "bg-red-500"} text-white hover:${isDarkTheme ? "bg-red-700" : "bg-red-600"} focus:outline-none`}
            disabled={isDeletingMovie || isUploadingImage || isUploadingVideo}
          >
            {isDeletingMovie ? "Deleting..." : "Delete Movie"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovie;
