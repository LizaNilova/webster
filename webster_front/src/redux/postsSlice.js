import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import postRouter from "../routes/post-router"

export const getAllPosts = createAsyncThunk(
    'get/api/posts',
    async (_) => {
      try {
        const { data } = await axios.get(postRouter.allPostsPath(), { withCredentials: true });
        console.log(data);
        return (data)
      } catch (error) {
        console.log(error)
        return ({ message: error.response.message })
      }
    }
)

export const createPost = createAsyncThunk(
    'post/api/posts',
    async ({formData}) => {
      try {
        const { data } = await axios.post(postRouter.createPostPath(), formData, { withCredentials: true });
        console.log(data);
        return (data)
      } catch (error) {
        console.log(error)
        return ({ message: error.response.message })
      }
    }
)

export const updatePost = createAsyncThunk(
    'patch/api/posts',
    async ({id, formData}) => {
      try {
        const { data } = await axios.patch(postRouter.updatePostPath(id), formData, { withCredentials: true });
        console.log(data);
        return (data)
      } catch (error) {
        console.log(error)
        return ({ message: error.response.message })
      }
    }
)





const postsSlice = createSlice({
    name: 'canvas',
    initialState: {
        posts:[]
    },
    reducers: {

    },
    extraReducers: {

    }
})

export default postsSlice.reducer;
export const {  } = postsSlice.actions;

