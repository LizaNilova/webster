import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import $api from "../utils/api" // типо мы импортируем инстанс чтоб потом его юхать в запросах
import authRouter from "../routes/auth-router"
const initialState = {
  user: null,
  isLoading: false,
  status: null,
  userId: null
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, full_name, password, email, repeatPassword }) => {
    try {
      const { data } = await axios.post(authRouter.registerPath(), {
        username,
        full_name,
        password,
        repeatPassword,
        email
      }, { withCredentials: true })
      return data
    } catch (error) {
      console.log(error)
    }
  },
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username_or_email, password }) => {
    try {
      const { data } = await axios.post(authRouter.loginPath(), {
        login: username_or_email,
        password
      }, { withCredentials: true })

      console.log(data)

      return data
    } catch (error) {
      console.log(error)
    }
  },
)
export const getUserData = createAsyncThunk('auth/getUserData', async () => {
  try {
    const { data } = await axios.get('http://localhost:8080/api/auth/me', { withCredentials: true })
    // console.log('Get me:',data)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const passwordForgot = createAsyncThunk(
  "auth/passwordForgot",
  async ({ email }) => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/auth/recover", {
        email,
      }, { withCredentials: true });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// export const resetPassword = createAsyncThunk(
//   "auth/resetPassword",
//   async ({ newPassword, repeatPassword, token }) => {
//     try {
//       const { data } = await axios.post(`http://localhost:5000/api/auth/recover/${token}}`,
//         {
//           new_password: newPassword,
//           confirm_password: repeatPassword
//         })
//         return data
//     } catch (error) {
//       console.log(error)
//     }
//   }
// )

export const verifyPassword = createAsyncThunk(
  "auth/verifyPassword",
  async ({ new_password, confirm_password, token }) => {
    try {
      console.log(new_password)
      const { data } = await axios.post(`http://localhost:8080/api/auth/recover/${token}`, {
        new_password,
        confirm_password,
      }, { withCredentials: true });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);


export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/auth/logout', { withCredentials: true })
      console.log(data)
      return data
    }
    catch (error) {
      console.log(error)
    }
  }
)


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData(state, action) {
      state.user = action.payload;
    }
  },
  extraReducers: {
    //Registration
    [registerUser.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.status = action.payload.message
      state.user = action.payload.user
    },
    [registerUser.rejected]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    },

    //Login
    [loginUser.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.status = action.payload.message
      state.user = action.payload.user
      state.userId = action.payload.user?._id
    },
    [loginUser.rejected]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    },

    //Logout
    [logout.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [logout.fulfilled]: (state, action) => {
      state.user = null
      state.isLoading = false
      state.status = action.payload?.message
      state.userId = null
    },
    [logout.rejected]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    },

    //Check authorization (Get ME)
    [getUserData.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [getUserData.fulfilled]: (state, action) => {
      state.isLoading = false
      state.status = null
      console.log(action.payload);
      state.user = action.payload?.user
      state.userId = action.payload?.user._id
    },
    [getUserData.rejected]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    },

    // Forgot password
    [passwordForgot.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [passwordForgot.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
    },
    [passwordForgot.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    // Verify password
    [verifyPassword.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [verifyPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
    },
    [verifyPassword.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
  }
})

export default authSlice.reducer
export const { setUserData } = authSlice.actions;