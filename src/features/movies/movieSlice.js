import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await fetch(
        "https://movielist.develotion.com/peliculas",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.mensaje);
      }

      return data.peliculas;
    } catch (error) {
      return rejectWithValue("Error al obtener películas");
    }
  },
);

const initialState = {
  list: [],
  loading: false,
  error: null,
  filter: "all",
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        })
        .addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
  },
});

export const { addMovie, deleteMovie, setFilter } = movieSlice.actions;

export default movieSlice.reducer;
