import { combineReducers, configureStore } from '@reduxjs/toolkit'
import CanvasSlice from './CanvasSlice'
import authSlice from './authSlice'
import userSlice from './userSlice'


const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice,
    canvas: CanvasSlice,
})

export const store = configureStore({reducer: rootReducer})