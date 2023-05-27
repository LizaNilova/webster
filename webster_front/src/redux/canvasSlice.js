import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import projectRouter from "../routes/canvas-router"

export const getAllProjects = createAsyncThunk(
    'get/api/projects',
    async () => {
      try {
        const { data } = await $api.get(projectRouter.allProjects(), { withCredentials: true })
        console.log(data);
        return (data)
      } catch (error) {
        console.log(error)
        return ({ message: error.response.message })
      }
    }
)

export const createProject = createAsyncThunk(
    'post/api/project',
    async (formData) => {
      try {
        const { data } = await $api.post(projectRouter.createProject(), formData , { withCredentials: true })
        console.log(data);
        return (data)
      } catch (error) {
        console.log(error)
        return ({ message: error.response.message })
      }
    }
)

export const updateProject = createAsyncThunk(
    'patch/api/project',
    async ({id, formData}) => {
      console.log(id, formData);
      try {
        const { data } = await $api.patch(projectRouter.updateProject(id), formData , { withCredentials: true })
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

        mode: 'default',

        curProject: null,
        message: '',
        projects: []
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
        },
        setCurProject(state, action)
        {
            state.curProject = action.payload;
        }
    },
    extraReducers: {
        [createProject.fulfilled]: (state, action) => {
            state.curProject = action.payload?.project;
            state.message = action.payload?.message;
            // state.status = action.payload?.message
        },
        [getAllProjects.fulfilled]: (state, action) => {
            state.projects = action.payload.projects
        }
    }
})

export default canvasSlice.reducer;
export const { setData, setMode, setName, setCurProject} = canvasSlice.actions;

