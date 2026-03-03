import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://movielist.develotion.com";

//Thunk para cargar peliculas
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await fetch(`${API_URL}/peliculas`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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

//Thunk para agregar peliculas
export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movieData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await fetch(`${API_URL}/peliculas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movieData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.mensaje);
      }

      return data.pelicula;
    } catch (error) {
      return rejectWithValue("Error al agragar pelicula");
    }
  },
);

//Thunk para borrar peliculas
export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await fetch(`${API_URL}/peliculas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.mensaje);
      }

      return id;
    } catch (error) {
      return rejectWithValue("Error al eliminar película");
    }
  },
);

//Thunk para traer categorias
export const fetchCategories = createAsyncThunk(
  "movies/fetchCategories",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await fetch(`${API_URL}/categorias`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.mensaje);
      }

      return data.categorias;
    } catch (error) {
      return rejectWithValue("Error al obtener categorías");
    }
  },
);

const initialState = {
  list: [],
  categories: [],
  loading: false,
  error: null,
  filter: "all",
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Casos traer peliculas
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
      //Casos agregar peliculas
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Casos elimiar peliculas
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.list = state.list.filter((movie) => movie.id !== action.payload);
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Casos para traer categorias
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setFilter } = movieSlice.actions;
export default movieSlice.reducer;
