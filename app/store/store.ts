import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/userSlice";
import { chatSlice } from "./chat/chatSlice";

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [chatSlice.reducerPath]: chatSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      userSlice.middleware,
      chatSlice.middleware
    );
  },
});
export type RootType = ReturnType<typeof store.getState>;
export const AppDispatch = typeof store.dispatch;
