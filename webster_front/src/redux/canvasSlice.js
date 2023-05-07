import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import axios from "axios"

const canvasSlice = createSlice({
    name: 'canvas',
    initialState: {
        width: null,
        height: null,
        color: '#000',
        mode: 'default',
        name: ''
    },
    reducers: {
        setData(state, action){
            state.width = action.payload.width;
            state.height = action.payload.height;
            state.color = action.payload.color;
            state.name = action.payload.name;
        },
        setMode(state, action)
        {
            state.mode = action.payload;
        }
    },
    extraReducers: {

    }
})

export default canvasSlice.reducer;
export const { setData, setMode, } = canvasSlice.actions;

