import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import $api from "../utils/api" // типо мы импортируем инстанс чтоб потом его юхать в запросах
import authRouter from "../routes/auth-router"
const initialState = {
  isLoading: false,
  status: null,
  eventId: null,
  regErrorTexts: null
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
        console.log(error.response.data.messages?.email.constraints[0])
        let passError;
        let loginError;
        let emailError;
        let passConfError;
        if(error.response.data?.messages?.login?.constraints[0]) {
          loginError =  error.response.data.messages?.login?.constraints[0]
        } else {
          loginError = null
        }
        if(error.response.data?.messages?.email?.constraints[0]) {
          emailError = error.response.data.messages?.email?.constraints[0]
        } else {
          emailError = null
        }
        if(error.response.data?.messages?.password?.constraints[0]){
          passError = error.response.data.messages?.password?.constraints[0]
        } else {
          passError = null
        }
        if(error.response.data?.messages?.passwordComfirm?.constraints[0]){
          passConfError = error.response.data.messages?.passwordComfirm?.constraints[0]
        } else {
          passConfError = null
        }
        const errors = {
          'login': loginError,
          'email': emailError,
          'password': passError,
          'passwordConfirm': passConfError
        }
        console.log(errors)
        return ({errors})
      } else {
        return {errors: error.message}
      }
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
      const { data } = await axios.get(authRouter.logoutPath(), { withCredentials: true })
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
    },

    setRegErrorTexts(state) {
      state.regErrorTexts = null
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
      console.log(action.payload)
      if(action.payload?.data?.message){
        state.status = action.payload?.data?.message
      }      
      state.eventId = action.payload?.data?.eventId
      state.regErrorTexts = action.payload?.errors

    },
    [registerUser.rejected]: (state, action) => {
      // console.log(action)
      console.log(action)
      state.regErrorTexts = action.payload?.errors
      state.eventId = null
      // console.log(action)
      state.isLoading = false
    },

    //confirm Registration
    [confirmRegistration.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [confirmRegistration.fulfilled]: (state, action) => {
      state.isLoading = false
      state.status = action.payload?.message
      // state.regErrorTexts = action.response.errors
      
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
export const { setUserData, setRegErrorTexts } = authSlice.actions;