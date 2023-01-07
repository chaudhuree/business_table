import { createSlice } from "@reduxjs/toolkit";

export const SettingSlice = createSlice({
  name: "setting",
  initialState: {
    loader: "!hidden",
  },
  reducers: {
    ShowLoader: (state) => {
      state.loader = "";
    },
    HideLoader: (state) => {
      state.loader = "!hidden";
    },
  },
});

export const { ShowLoader, HideLoader } = SettingSlice.actions;
export default SettingSlice.reducer;
