import { combineReducers, configureStore } from '@reduxjs/toolkit'
import CanvasSlice from './CanvasSlice'
import authSlice from './authSlice'
import userSlice from './userSlice'
import postsSlice from './postsSlice'
import categoriesSlice from './categoriesSlice'


const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice,
    canvas: CanvasSlice,
    posts: postsSlice,
    categories: categoriesSlice
})

export const store = configureStore({reducer: rootReducer})