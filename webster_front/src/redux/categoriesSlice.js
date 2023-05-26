import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import categoriesRouter from "../routes/categories-router";

export const getAllCategories = createAsyncThunk(
    'get/api/categories',
    async (_) => {
      try {
        const { data } = await axios.get(categoriesRouter.allCategories(), { withCredentials: true });
        console.log(data);
        return (data)
      } catch (error) {
        console.log(error)
        return ({ message: error.response.message })
      }
    }
)


const categoriesSlice = createSlice({
    name: 'canvas',
    initialState: {
        categories:[]
    },
    reducers: {

    },
    extraReducers: {
      [getAllCategories.fulfilled]: (state, action) =>
      {
        state.categories = action.payload.categories;
      }
    }
})

export default categoriesSlice.reducer;
export const {  } = categoriesSlice.actions;

