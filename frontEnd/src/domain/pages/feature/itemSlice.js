import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  favresItems: localStorage.getItem("favresItems")
    ? JSON.parse(localStorage.getItem("favresItems"))
    : [],
  setFavItems:'',
};
const itemSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    addToFav(state, action) {
if(action.payload!=null){
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

              // toast.error("Product removed from favourite", {
              //   position: "bottom-left",
              // });
            }
            localStorage.setItem("favresItems", JSON.stringify(state.favresItems));
            return state;
          })
        }else{
        let tempFavItem = action.payload;
        state.favresItems.push(tempFavItem);
        // toast.success("Add to favourite", {
        //   position: "bottom-left",
        // });
      }
      localStorage.setItem("favresItems", JSON.stringify(state.favresItems));
    }else{
      state.favresItems= localStorage.getItem("favresItems")
      ? JSON.parse(localStorage.getItem("favresItems"))
      : []
    }
    },
    setFavItems(state, action) {

       state.setFavItems=action.payload
    },
    removeFavItems(state,action){
      state.setFavItems=''

    },


  },
});

export const { addToFav,setFavItems ,removeFavItems} = itemSlice.actions;

export default itemSlice.reducer;