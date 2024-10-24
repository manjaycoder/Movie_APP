import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        moviesFilter: {
            searchTerm: '',
            selectedGenre: '',
            selectedYear: '',
            selectedSort: '', // Keeping this as a string for consistency
        },
        filteredMovies: [],
        movieYears: [],
        uniqueYears: [], // Plural for consistency
    },
    reducers: {
        setMoviesFilter: (state, action) => {
            state.moviesFilter = { ...state.moviesFilter, ...action.payload };
        },
        setFilteredMovies: (state, action) => {
            state.filteredMovies = action.payload;
        },
        setMoviesYears: (state, action) => {
            state.movieYears = action.payload;
        },
        setUniqueYears: (state, action) => {
            state.uniqueYears = action.payload; // Consistent naming
        },
    },
});

// Exporting actions
export const {
    setMoviesFilter,
    setFilteredMovies,
    setMoviesYears,
    setUniqueYears,
} = moviesSlice.actions;

// Exporting the reducer
export default moviesSlice.reducer;
