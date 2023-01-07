import store from "../Redux/Store/store";
import { HideLoader, ShowLoader } from "../Redux/StateSlice/settingSlider";
import axios from "axios";
import { setAllProducts, setTotal } from "../Redux/StateSlice/productSlice";
import { ErrorTost } from "../Helper/FormHelper";
// const BaseURL = "http://localhost:5000/api/v1";
const BaseURL = "https://product-management-table-amit.herokuapp.com/api/v1";

export const getProductList = async (pageNo, perPage, searchKeyword) => {
  let URL =
    BaseURL + "/productList/" + pageNo + "/" + perPage + "/" + searchKeyword;
  store.dispatch(ShowLoader());
  try {
    const result = await axios.get(URL);
    if (result.status === 200 && result.data["status"] === "Success") {
      store.dispatch(HideLoader());
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(setAllProducts(result.data["data"][0]["Rows"]));
        store.dispatch(setTotal(result.data["data"][0]["Total"][0]["count"]));
      } else {
        store.dispatch(setAllProducts([]));
        store.dispatch(setTotal(0));
      }
    } else {
      ErrorTost("Something Went Wrong!");
    }
  } catch (e) {
    ErrorTost("Something Went Wrong! 2");
    store.dispatch(HideLoader());
  }
};
