import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import $api from "../utils/api.js" 
import { setUserData } from './authSlice'

const initialState = {
    user: null,
    updatedUser: null,
    loading: false,
    status: null
}

export const updateUserData = createAsyncThunk('user/updateUserData', async (submitData, { dispatch }) => {
    try {
        const { data } = await axios.patch(`http://localhost:8080/api/users`, submitData, { withCredentials: true })
        console.log(data.user)
        dispatch(setUserData(data.user))
        return (data)
    } catch (error) {
        console.log(error)
    }
})

export const userProfile = createAsyncThunk('user/profile', async () => {
    try {
        const { data } = await $api.get(`http://localhost:8080/api/users/profile`, {withCredentials: true})
        console.log(data.user)
        return (data)
    } catch (error) {
        console.log(error)
    }
})

export const uploadUserAvatar = createAsyncThunk('user/uploadUserAvatar', async (req, { dispatch }) => {
    try {
        const { data } = await $api.patch(`http://localhost:8080/api/users/pic-load`, req, { withCredentials: true })
        console.log(data)
        if (data.user) dispatch(setUserData(data.user))
        return (data)
    } catch (error) {
        console.log(error)
    }
})

export const deleteUser = createAsyncThunk('user/deleteUser', async () => {
    try {
        const { data } = await axios.delete(`http://localhost:8080/api/users`, { withCredentials: true })
        console.log(data.message)
        return (data)
    } catch (error) {
        console.log(error)
    }
})



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action){
            state.user = action.payload;
        }
    },
    extraReducers: {
        //User Profile
        [userProfile.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [userProfile.fulfilled]: (state, action) => {
            state.loading = false
            state.user = action.payload?.user
            console.log(action.payload?.user)
            state.status = action.payload?.message
        },
        [userProfile.rejected]: (state, action) => {
            state.loading = false
            state.message = action.payload?.message
        },
        // Update user data
        [updateUserData.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [updateUserData.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        },
        [updateUserData.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
            console.log(action.payload.message)
        },
        [uploadUserAvatar.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [uploadUserAvatar.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        },
        [uploadUserAvatar.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        },

        // Delete user
        [deleteUser.pending]: (state) => {
            state.loading = true
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        }
    }
})

export default userSlice.reducer