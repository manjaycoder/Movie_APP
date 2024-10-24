import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (newGenre) => ({
        url: GENRE_URL, // Removed template literals for simplicity
        method: "POST",
        body: newGenre,
      }),
    }),
    updateGenre: builder.mutation({
      query: ({ id, updatedGenre }) => ({
        // Corrected parameter name for clarity
        url: `${GENRE_URL}/${id}`,
        method: "PUT",
        body: updatedGenre, // Updated to match the parameter name
      }),
    }),
    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `${GENRE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    fetchGenres: builder.query({
      query: () => `${GENRE_URL}/allGenres`, // Fixed the endpoint from "allGeners" to "allGenres"
    }),
  }),
});

// Exporting hooks to be used in components
export const {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
  useUpdateGenreMutation,
} = genreApiSlice;
