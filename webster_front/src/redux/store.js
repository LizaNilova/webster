import { combineReducers, configureStore } from '@reduxjs/toolkit'
import CanvasSlice from './CanvasSlice'
import authSlice from './authSlice'
import userSlice from './userSlice'
import postsSlice from './postsSlice'


const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice,
    canvas: CanvasSlice,
    posts: postsSlice
})

export const store = configureStore({reducer: rootReducer})