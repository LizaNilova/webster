import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import $api from "../utils/api" // типо мы импортируем инстанс чтоб потом его юхать в запросах
import authRouter from "../routes/auth-router"
const initialState = {
  user: null,
  isLoading: false,
  status: null,
  userId: null,
  eventId: null,
  regErrorTexts: {
    login: null,
    email: null,
    password: null,
    passwordComfirm: null
  }
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ login, password, email, passwordComfirm }) => {
    try {
      const { data } = await axios.post(authRouter.registerPath(), {
        login,
        password,
        passwordComfirm,
        email
      }, { withCredentials: true })
      return {data}
    } catch (error) {
      console.log(error.response)
      if(error.response.status === 400){
        return {errors: {
          login: error.response.data?.login.constraints[0],
          email: error.response.data?.email.constraints[0],
          password: error.response.data?.password.constraints[0],
          passwordConfirm: error.response.data?.passwordComfirm.constraints[0]
        }}
      }
      return {message: error.message}
    }
  },
)

export const confirmRegistration = createAsyncThunk(
  'auth/confirmRegistration',
  async ({ code, id }) => {
    try {
      const { data } = await axios.post(authRouter.confirmUserPath(id), { code }, { withCredentials: true })
      return (data)
    } catch (error) {
      console.log(error)
      return ({ message: error.response.message })
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username_or_email, password }) => {
    try {
      const { data } = await axios.post(authRouter.loginPath(), {
        username: username_or_email,
        password
      }, { withCredentials: true })

      console.log(data)

      return data
    } catch (error) {
      console.log(error)
      if (error.response.status == 404) {
        return ({ message: "User is not exist." })
      }
      if (error.response.status == 401) {
        return ({ message: error.response.data.massage})
      }
    }
  },
)

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
      state.regErrorTexts = null
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.status = action.payload?.message
      state.eventId = action.payload?.eventId
      state.regErrorTexts = null
    },
    [registerUser.rejected]: (state, action) => {
      console.log(action)
      state.regErrorTexts = action.payload?.errors
      state.isLoading = false
    },

    //confirm Registration
    [confirmRegistration.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [confirmRegistration.fulfilled]: (state, action) => {
      state.isLoading = false
      // state.status = action.payload?.message
      state.regErrorTexts = action.response.errors
      
    },
    [confirmRegistration.rejected]: (state, action) => {
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
      state.status = action.payload?.message
      // state.user = action.payload?.user
      // state.userId = action.payload.user?._id

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