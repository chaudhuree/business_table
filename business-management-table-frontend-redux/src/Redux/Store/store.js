import { configureStore } from "@reduxjs/toolkit";

import settingReducer from "../StateSlice/settingSlider";
import productReducer from "../StateSlice/productSlice";

export default configureStore({
  reducer: {
    setting: settingReducer,
    product: productReducer,
  },
});
