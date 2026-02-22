import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    filter: "all"
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addMovie: (state, action) => {
            state.list.push(action.payload);
        },
        deleteMovie: (state, action) => {
            state.list = state.list.filter(movie => movie.id !== action.payload);
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    }
});

export const { addMovie, deleteMovie, setFilter } = movieSlice.actions;

export default movieSlice.reducer;