import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import $api from "../utils/api.js" 
import { setUserData } from './authSlice'

const initialState = {
    user: null,
    anotherUser: null,
    ban: null,
    subscriptions: null,
    subscribers: null,
    loading: false,
    status: null
}

export const updateUserData = createAsyncThunk('user/updateUserData', async (submitData) => {
    try {
        const { data } = await $api.patch(`http://localhost:8080/api/users/edit`, submitData, { withCredentials: true })
        console.log(data)
        return (data)
    } catch (error) {
        console.log(error)
    }
})

export const getUserById = createAsyncThunk('user/getUserById', async (id) => {
    try {
        const { data } = await $api.get(`http://localhost:8080/api/users/${id}`, { withCredentials: true })
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const userProfile = createAsyncThunk('user/profile', async () => {
    try {
        const { data } = await $api.get(`http://localhost:8080/api/users/profile`, {withCredentials: true})
        return (data)
    } catch (error) {
        console.log(error)
    }
})

export const deleteUser = createAsyncThunk('user/deleteUser', async () => {
    try {
        const { data } = await $api.delete(`http://localhost:8080/api/users`, { withCredentials: true })
        console.log(data.message)
        return (data)
    } catch (error) {
        console.log(error)
    }
})

export const subscribeUser = createAsyncThunk('user/subscribeUser', async (id) => {
    try{
        const { data } = await $api.post(`http://localhost:8080/api/subscriptions/subscribe/user/${id}`, {withCredentials: true})
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: {
        //User Profile
        [userProfile.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [userProfile.fulfilled]: (state, action) => {
            state.loading = false
            state.user = action.payload?.user.user
            state.ban = action.payload?.user.ban
            state.subscribers = action.payload?.user.subscribers
            state.subscriptions = action.payload?.user.subscriptions
            console.log(state.user)
            state.status = action.payload?.message
        },
        [userProfile.rejected]: (state, action) => {
            state.loading = false
            state.message = action.payload?.message
        },
        //user by id
        [getUserById.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [getUserById.fulfilled]: (state, action) => {
            state.loading = false
            state.anotherUser = action.payload.user
            console.log(action)
            state.status = action.payload?.message
        },
        [getUserById.rejected]: (state, action) => {
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
            state.user = action.payload?.user
            state.status = action.payload?.message
        },
        [updateUserData.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
            console.log(action.payload.message)
        },

        // Subscribe to user
        [subscribeUser.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [subscribeUser.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
            console.log(action.payload)
        },
        [subscribeUser.rejected]: (state, action) => {
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