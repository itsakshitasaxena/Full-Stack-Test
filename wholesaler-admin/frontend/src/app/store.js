import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../features/accounts/accountsSlice";

const store = configureStore({
  reducer: {
    accounts: accountsReducer
  },
  devTools: import.meta.env.NODE_ENV !== "production"
});

export default store;
