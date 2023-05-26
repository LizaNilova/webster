import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import projectRouter from "../routes/project-router"

export const createProject = createAsyncThunk(
    'post/api/project',
    async (formData) => {
      try {
        const { data } = await axios.post(projectRouter.createProject(), formData , { withCredentials: true })
        console.log(data);
        return (data)
      } catch (error) {
        console.log(error)
        return ({ message: error.response.message })
      }
    }
)

export const updateProject = createAsyncThunk(
    'post/api/project',
    async (formData) => {
      try {
        const { data } = await axios.post(projectRouter.createProject(), formData , { withCredentials: true })
        console.log(data);
        return (data)
      } catch (error) {
        console.log(error)
        return ({ message: error.response.message })
      }
    }
)



const canvasSlice = createSlice({
    name: 'canvas',
    initialState: {
        width: null,
        height: null,
        color: '#000',
        name: '',
        json: {},
        mode: 'default',

        project: null,
        message: ''
    },
    reducers: {
        setData(state, action){
            state.width = action.payload.width;
            state.height = action.payload.height;
            state.color = action.payload.color;
            state.name = action.payload.name;
            state.json = action.payload.json;
        },
        setMode(state, action)
        {
            state.mode = action.payload;
        },
        setName(state, action) 
        {
            state.name = action.payload;
        }
    },
    extraReducers: {
        [createProject.fulfilled]: (state, action) => {
            state.project = action.payload?.project;
            state.message = action.payload?.message;
            // state.status = action.payload?.message
        }
    }
})

export default canvasSlice.reducer;
export const { setData, setMode, setName} = canvasSlice.actions;

