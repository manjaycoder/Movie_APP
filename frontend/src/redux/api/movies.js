import { apiSlice } from "./apiSlice";
import { MOVIE_URL, UPLOAD_URL } from "../constants";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `${MOVIE_URL}/all-movies`,
    }),
    createMovie: builder.mutation({
      query: (newMovie) => ({
        url: `${MOVIE_URL}/create-movie`,
        method: "POST",
        body: newMovie,
      }),
    }),
    updateMovie: builder.mutation({
      query: ({ id, updateMovie }) => ({
        url: `${MOVIE_URL}/update-movie/${id}`,
        method: "PUT",
        body: updateMovie,
      }),
    }),
    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIE_URL}/${id}/reviews`,
        method: "POST",
        body: { rating, comment },
      }),
    }),
    deleteComment: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIE_URL}/delete-comment`,
        method: "DELETE",
        body: { movieId, reviewId },
      }),
    }),
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIE_URL}/delete-movie/${id}`,
        method: "DELETE",
      }),
    }),
    getSpecificMovie: builder.query({
      query: (id) => `${MOVIE_URL}/specific-movie/${id}`,
    }),
    uploadImage: builder.mutation({ // Added uploadImage mutation
      query: (formData) => ({
        url: `${UPLOAD_URL}/image`,  // Your image upload endpoint
        method: "POST",
        body: formData,
      }),
    }),
    uploadVideo: builder.mutation({ // Added uploadVideo mutation
      query: (formData) => ({
        url: `${UPLOAD_URL}/video`,  // Your video upload endpoint
        method: "POST",
        body: formData,
      }),
    }),
    getNewMovies: builder.query({
      query: () => `${MOVIE_URL}/new-movies`,
      method:'GET',
    }),
    getTopMovies: builder.query({
      query: () => `${MOVIE_URL}/top-movies`,
    }),
    getRandomMovies: builder.query({
      query: () => `${MOVIE_URL}/random-movies`,
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useAddMovieReviewMutation,
  useDeleteMovieMutation,
  useDeleteCommentMutation,
  useGetSpecificMovieQuery,
  useUploadImageMutation,  // Export the image upload hook
  useUploadVideoMutation,  // Export the video upload hook
  useGetRandomMoviesQuery,
  useGetTopMoviesQuery,
  useGetNewMoviesQuery,
} = moviesApiSlice;
