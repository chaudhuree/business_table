import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./Redux/Store/store";
import LazyLoader from "./Components/MasterLayout/Loader";
import ProductListPage from "./Page/ProductListPage";
import { faker } from "@faker-js/faker";
function App() {
  // const product = [...Array(2000)].map(() => ({
  //   id: faker.datatype.uuid(),
  //   name: faker.commerce.product(),
  //   avatar: faker.image.transport(200, 200, true),
  //   // avatar: faker.image.food(200, 200, true),
  //   price: faker.commerce.price(),
  //   special_price: faker.helpers.arrayElement(["yes", "No"]),
  //   category: faker.commerce.product(),
  //   sub_category: faker.commerce.productAdjective(),
  //   description: faker.commerce.productDescription(),
  //   companyName: faker.company.companyName(),
  //   remark: faker.helpers.arrayElement(["NEW", "OLD"]),
  //   inStock: faker.helpers.arrayElement(["yes", "No"]),
  //   fastDelivery: faker.datatype.boolean(),
  //   ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  // }));

  // console.log(product);
  return (
    <Provider store={store}>
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
        </Routes>
      </BrowserRouter>{" "}
      <LazyLoader />
    </Provider>
  );
}

export default App;
