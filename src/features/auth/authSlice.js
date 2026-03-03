import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://movielist.develotion.com";

//THUNKS

//Obtener paises
export const fetchCountries = createAsyncThunk(
  "auth/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/paises`);
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.mensaje || "Error al obtener paises");
      }
      return data.paises;
    } catch {
      return rejectWithValue("Error de conexion");
    }
  },
);

//Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ usuario, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.mensaje);
      }
      return data;
    } catch (error) {
      return rejectWithValue("Error de conexión al iniciar sesión");
    }
  },
);

//Registro
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.mensaje);
      }
      return data;
    } catch (error) {
      return rejectWithValue("Error de conexión al registrar usuario");
    }
  },
);

//Estados iniciales
const savedToken = localStorage.getItem("token");

let savedUser = null;
try {
  const rawUser = localStorage.getItem("user");
  savedUser = rawUser ? JSON.parse(rawUser) : null;
} catch {
  savedUser = null;
}

const initialState = {
  user: savedUser,
  token: savedToken ? savedToken : null,
  loading: false,
  error: null,
  countries: [],
  countriesStatus: "idle",
};

//Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Fetch paises
      .addCase(fetchCountries.pending, (state) => {
        state.countriesStatus = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countriesStatus = "succeeded";
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.countriesStatus = "failed";
        state.error = action.payload;
      })

      //Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { usuario: action.meta.arg.usuario };
        state.token = action.payload.token;

        localStorage.setItem("token", state.token);
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Casos registro de usuario
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = { usuario: action.meta.arg.usuario };

        localStorage.setItem("token", state.token);
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
