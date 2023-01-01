import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "~/stores/slices/userInfoSlice";
import cartReducer from "~/stores/slices/cartSlice";
import likeReducer from "~/stores/slices/likeSlice";
import orderReducer from "~/stores/slices/orderSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    cart: cartReducer,
    like: likeReducer,
    order: orderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
