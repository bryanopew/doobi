import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "~/constants/constants";
import { getProductIndex, hasProduct } from "~/util/reduxUtil";

interface ILikeState {
  likeFoods: Array<IProduct>;
}

const initialState: ILikeState = {
  likeFoods: [],
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    setLikeFoods: (state, action: PayloadAction<Array<IProduct>>) => {
      state.likeFoods = action.payload;
    },
    addLikeFood: (state, action: PayloadAction<Array<IProduct>>) => {
      [...state.likeFoods, action.payload];
    },
    // payload: food productNo
    deleteLikeFood: (state, action: PayloadAction<string>) => {
      // console.log("actionType: ", action.type);
      if (hasProduct(state.likeFoods, action.payload)) {
        const productIndex = getProductIndex(state.likeFoods, action.payload);
        state.likeFoods.splice(productIndex, 1);
      }
    },
  },
});

export const { setLikeFoods, addLikeFood, deleteLikeFood } = likeSlice.actions;
export default likeSlice.reducer;
