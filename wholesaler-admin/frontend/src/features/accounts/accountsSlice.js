import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/admin";

export const fetchAccounts = createAsyncThunk("accounts/fetch", async () => {
  return await api.listAccounts();
});
export const approveAccount = createAsyncThunk("accounts/approve", async (id) => {
  await api.approveAccount(id);
  return id;
});
export const bulkApproveAccounts = createAsyncThunk("accounts/bulkApprove", async (ids) => {
  await api.bulkApprove(ids);
  return ids;
});

const slice = createSlice({
  name: "accounts",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAccounts.pending, state => { state.loading = true; });
    builder.addCase(fetchAccounts.fulfilled, (state, action) => { state.list = action.payload; state.loading = false; });
    builder.addCase(approveAccount.fulfilled, (state, action) => {
      state.list = state.list.map(a => a.id === action.payload ? { ...a, status: "approved" } : a);
    });
    builder.addCase(bulkApproveAccounts.fulfilled, (state, action) => {
      const ids = action.payload;
      state.list = state.list.map(a => ids.includes(a.id) ? { ...a, status: "approved" } : a);
    });
  }
});
export default slice.reducer;
