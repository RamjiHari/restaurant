import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../../common/utils/config";

const initialState = {
  items: [],
  status: null,
  name:''
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    let formData = new FormData();
    formData.append('request', 'getAllItems')
    try {
        const response = await axios.post(
          config.HOST_NAME,formData
        );
        return response.data.data;
      } catch (error) {
        console.log(`errorerrorerror`, error)
        console.log(error);
      }

  }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
      [productsFetch.pending]: (state, action) => {
        state.status = "pending";
      },
      [productsFetch.fulfilled]: (state, action) => {
        state.name = action.payload;
        state.status = "success";
      },
      [productsFetch.rejected]: (state, action) => {
        state.status = "rejected";
      },
    },
  });


  export default productsSlice.reducer;