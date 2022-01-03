import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  favresItems: localStorage.getItem("resItems")
    ? JSON.parse(localStorage.getItem("resItems"))
    : [],
};

const itemSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    addToFav(state, action) {
      const existingIndex = state.favresItems.findIndex(
        (item) => item === action.payload
      );
        if(existingIndex>=0){
          state.favresItems.map((favresItems) => {
            if (favresItems === action.payload) {
              const nextFavresItems = state.favresItems.filter(
                (item) => item !== favresItems
              );

              state.favresItems = nextFavresItems;

              toast.error("Product removed from favourite", {
                position: "bottom-left",
              });
            }
            localStorage.setItem("favresItems", JSON.stringify(state.favresItems));
            return state;
          })
        }else{
        let tempFavItem = action.payload;
        state.favresItems.push(tempFavItem);
        toast.success("Add to favourite", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("favresItems", JSON.stringify(state.favresItems));
    },
  },
});

export const { addToFav } = itemSlice.actions;

export default itemSlice.reducer;