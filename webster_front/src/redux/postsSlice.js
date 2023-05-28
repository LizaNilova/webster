import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import $api from '../utils/api'
import postRouter from "../routes/post-router"

export const getAllPosts = createAsyncThunk(
  'get/api/posts',
  async ({ sort, filter, search, page }) => {
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

export const getMyPosts = createAsyncThunk(
  'get/api/posts/my-posts',
  async() => {
    try{
      const { data } = await axios.get(`http://localhost:8080/api/posts/my-posts`, {withCredentials: true})
      console.log(data)
      return (data)
    } catch(error) {
      console.log(error)
    }
  }
)

export const getUsersPosts = createAsyncThunk('get/api/posts/my-posts', 
async(id) => {
  try{
    const {data} = await axios.get(`http://localhost:8080/api/posts/user/${id}`, {withCredentials: true})
    console.log(data)
    return (data)
  } catch (error){
    console.log(error)
  }
})

export const createCommentPost = createAsyncThunk(
  'post/api/comments/post/:id',
  async ({ value, id }) => {
    try {
      const { data } = await $api.post(postRouter.createPostComment(id), {
        value
      });
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
  async ({ id, formData }) => {
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
  async ({ id }) => {
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

export const deletePost = createAsyncThunk(
  'delete/api/posts',
  async (id) => {
    try {
      const { data } = await $api.delete(postRouter.deletePostPath(id), { withCredentials: true });
      console.log(data);
      return (data)
    } catch (error) {
      console.log(error)
      return ({ message: error.response.message })
    }
  }
)

export const reportPost = createAsyncThunk(
  'report/api/posts',
  async ({id, reportReason}) => {
    try {
      const { data } = await $api.post(postRouter.reportPost(id), {reportReason: reportReason}, { withCredentials: true });
      console.log(data);
      return (data)
    } catch (error) {
      console.log(error)
      return ({ message: error.response.message })
    }
  }
)


export const banPost = createAsyncThunk(
  'ban/api/posts',
  async (id) => {
    try {
      const { data } = await $api.get(postRouter.banPostById(id), { withCredentials: true });
      console.log(data);
      return (data)
    } catch (error) {
      console.log(error)
      return ({ message: error.response.message })
    }
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    meta: {},
    posts: [],
    usersPosts: [],
    usersMeta: {},
    message: ''
  },
  reducers: {

  },
  extraReducers: {
    [getAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.meta = action.payload.meta
      state.message = action.payload.message;
    },
    [getMyPosts.fulfilled]: (state, action) => {
      state.usersPosts = action.payload.post.posts
      state.usersMeta = action.payload.post.meta
      state.message = action.payload.message
    },
    [getUsersPosts.fulfilled]: (state, action) => {
      state.usersPosts = action.payload.post.posts
      state.usersMeta = action.payload.post.meta
      state.message = action.payload.message
    }
  }
})

export default postsSlice.reducer;
export const { } = postsSlice.actions;

