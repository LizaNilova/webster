import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import $api from '../utils/api'
import postRouter from "../routes/post-router"

export const getAllPosts = createAsyncThunk(
    'get/api/posts',
    async ( {sort, filter, search, page} ) => {
      try {
        const { data } = await axios.get(postRouter.allPostsPath(sort, filter, search, page), { withCredentials: true });
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
    async (formData) => {
      try {
        const { data } = await $api.post(postRouter.createPostPath(), formData, { withCredentials: true });
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
        const { data } = await $api.patch(postRouter.updatePostPath(id), formData, { withCredentials: true });
        console.log(data);
        return (data)
      } catch (error) {
        console.log(error)
        return ({ message: error.response.message })
      }
    }
)

export const likePost = createAsyncThunk(
  'post/api/likes/post/:id',
  async ( { id } ) => {
    try {
      const { data } = await $api.post(postRouter.likePost(id));
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
        meta: {},
        posts:[],
        message: ''
    },
    reducers: {

    },
    extraReducers: {
      [getAllPosts.fulfilled]: (state, action) =>
      {
        state.posts = action.payload.posts;
        state.meta = action.payload.meta
        state.message = action.payload.message;
      }
    }
})

export default postsSlice.reducer;
export const {  } = postsSlice.actions;

