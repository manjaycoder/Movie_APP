import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
  useUploadVideoMutation,
} from "../../../redux/api/movies.js";
import { useFetchGenresQuery } from "../../../redux/api/genre.js";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    video: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const [
    uploadVideo,
    { isLoading: isUploadingVideo, error: uploadVideoErrorDetails },
  ] = useUploadVideoMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "genre") {
      const selectedGenre = genres.find((genre) => genre._id === value);
      setMovieData((prevData) => ({
        ...prevData,
        genre: selectedGenre ? selectedGenre._id : "",
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setSelectedVideo(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast.length ||
        !selectedImage ||
        !selectedVideo
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImagePath = null;
      let uploadedVideoPath = null;

      // Upload Image
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        const uploadImageResponse = await uploadImage(formData);
        
        if (uploadImageResponse.error) {
          toast.error(uploadImageErrorDetails?.data?.message || "Failed to upload image");
          return;
        }
        
        uploadedImagePath = uploadImageResponse.data?.file; // Adjust if the response structure is different
      }

      // Upload Video
      if (selectedVideo) {
        const videoFormData = new FormData();
        videoFormData.append("video", selectedVideo);
        const uploadVideoResponse = await uploadVideo(videoFormData);
        
        if (uploadVideoResponse.error) {
          toast.error(uploadVideoErrorDetails?.data?.message || "Failed to upload video");
          return;
        }
        
        uploadedVideoPath = uploadVideoResponse.data?.file; // Adjust if the response structure is different
      }

      // Create Movie
      await createMovie({
        ...movieData,
        image: uploadedImagePath,
        video: uploadedVideoPath,
      }).unwrap();

      toast.success("Movie Added To Database");
      navigate("/admin/movies-list");

      // Reset form data
      setMovieData({
        name: "",
        year: 0,
        detail: "",
        cast: [],
        rating: 0,
        image: null,
        video: null,
        genre: "",
      });
      
    } catch (err) {
      console.error(err)
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
    }
  };

  return (
    <div className="container flex justify-center items-center mt-4">
      <form>
        <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>
        <div className="mb-4">
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={movieData.name}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
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
              className="border px-2 py-1 w-full"
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
              className="border px-2 py-1 w-full text-black"
            ></textarea>
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
                setMovieData({ ...movieData, cast: e.target.value.split(", ") })
              }
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Genre:
            <select
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            >
              {isLoadingGenres ? (
                <option>Loading genres...</option>
              ) : (
                genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))
              )}
            </select>
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border px-2 py-1 w-full"
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
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleCreateMovie}
          className="bg-teal-500 text-white px-4 py-2 rounded"
          disabled={isCreatingMovie || isUploadingImage || isUploadingVideo}
        >
          {isCreatingMovie || isUploadingImage || isUploadingVideo ? "Creating..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
