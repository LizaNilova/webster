import { combineReducers, configureStore } from '@reduxjs/toolkit'
import CanvasSlice from './CanvasSlice'


const rootReducer = combineReducers({
    canvas: CanvasSlice,
})

export const store = configureStore({reducer: rootReducer})