import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Thunk paises
export const fetchCountries = createAsyncThunk(
  "auth/fetchCountries",
  async () => {
    const response = await fetch("https://movielist.develotion.com/paises");
    const data = await response.json();
    return data.paises;
  },
);

//Thunk login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ usuario, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("https://movielist.develotion.com/login", {
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

//Thunk registro
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("Enviando", userData);
      const response = await fetch(
        "https://movielist.develotion.com/usuarios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );
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
      //Casos fetch paises
      .addCase(fetchCountries.pending, (state) => {
        state.countriesStatus = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countriesStatus = "succeeded";
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state) => {
        state.countriesStatus = "failed";
      })
      //Casos login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null; // El backend no devuelve el usuario, así que se deja como null
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
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
        state.user = null; // El backend no devuelve el usuario, así que se deja como null
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
