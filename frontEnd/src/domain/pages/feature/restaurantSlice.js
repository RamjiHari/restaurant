import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../../common/utils/config";

const initialState = {
  name:''
};

  const restaurantSlice = createSlice({
    name: "resName",
    initialState,
    reducers: {
    addResName(state, action) {
      state.name = action.payload;
    },
  },
  });
  export const { addResName } = restaurantSlice.actions;
  export default restaurantSlice.reducer;