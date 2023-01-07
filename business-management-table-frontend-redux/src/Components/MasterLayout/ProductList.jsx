import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getProductList } from "../../API_Request/API";
import ReactPaginate from "react-paginate";
import Select from "react-select";
const ProductList = () => {
  const size = [
    { value: "5", label: "5 Per Page" },
    { value: "10", label: "10 Per Page" },
    { value: "15", label: "15 Per Page" },
    { value: "20", label: "20 Per Page" },
    { value: "50", label: "50 Per Page" },
    { value: "100", label: "100 Per Page" },
  ];

  let [searchKeyword, setSearchKeyword] = useState("0");
  let [perPage, setPerPage] = useState(5);

  useEffect(() => {
    getProductList(1, perPage, searchKeyword);
  }, []);

  let AllProduct = useSelector((state) => state.product.AllProduct);
  let Total = useSelector((state) => state.product.Total);

  const handelPageClick = (event) => {
    let pageNo = event.selected;
    getProductList(pageNo + 1, perPage, searchKeyword);
  };

  const perPageOnChange = (e) => {
    setPerPage(parseInt(e.value));
    getProductList(1, e.value, searchKeyword);
    console.log(e);
  };

  const searchKeywordOnchange = (e) => {
    setSearchKeyword(e.target.value);
    if (e.target.value.length === 0) {
      getProductList(1, perPage, "0");
    } else {
      getProductList(1, perPage, e.target.value);
    }
  };

  return (
    <div className="bg-white lg:flex justify-center items-center h-screen ">
      <div className="bg-white drop-shadow-lg rounded-md w-auto md:w-[1200px] p-8">
        <div className="md:flex flex-row my-4">
          <p className="text-3xl font-bold mb-4 md:mb-0 basis-1/2">
            My Product List
          </p>
          <div className="w-auto  md:ml-auto mb-4 md:mb-0 basis-1/6">
            <Select
              className="select__color mr-2 w-full md:w-auto"
              onChange={(e) => perPageOnChange(e)}
              defaultValue={size[0]}
              options={size}
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  borderBottom: "1px solid #ddd",
                  color: state.isSelected ? "#fff" : "#666",
                  background: state.isSelected ? "#7E22CE" : "#fff",
                  cursor: "pointer",
                  margin: "0px",
                  ":active": {
                    backgroundColor: "#ddd",
                    cursor: "pointer",
                  },
                }),
                singleValue: (provided, state) => ({
                  ...provided,
                  color: "#666",
                  padding: "6px 0",
                  fontSize: "15px",
                }),
                control: (styles) => ({
                  ...styles,
                  backgroundColor: "#ffffff",
                  padding: "0px 0px",
                  margin: "0px 0px",

                  ":focus-within": {
                    ...styles[":focus-within"],
                    border: "1px solid #ddd",
                    boxShadow: "none",
                  },
                }),
                menuList: (styles) => ({
                  ...styles,
                  margin: "0px",
                  padding: "0px",
                }),
                noOptionsMessage: (styles) => ({
                  ...styles,
                  background: "red",
                  color: "#fff",
                }),
              }}
            />
          </div>
          <label class=" flex gap-3 search__option basis-1/4">
            <input
              onChange={searchKeywordOnchange}
              class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md  pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-purple-500 focus:ring-1 sm:text-sm py-2 md:py-0"
              placeholder="Search for anything..."
              type="text"
              name="search"
            />
            <span className="search">
              <ion-icon name="search-outline"></ion-icon>
            </span>
            {/* <button
              onClick={searchData}
              className="bg-purple-700 border-2 border-purple-700 text-white  px-8 rounded-md font-semibold hover:bg-white hover:text-purple-700 transition duration-300 ease-in-out"
            >
              Search
            </button> */}
          </label>
        </div>

        <div>
          <p className="font-semibold mb-2">Total Product Show : {Total}</p>
        </div>
        <div className="table__item  h-[350px] overflow-auto ">
          <table class=" lg:w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200 ">
              <tr>
                <th className="p-3 text-md font-semibold tracking-wide text-left ">
                  PRODUCT
                </th>
                <th className="p-3 text-md font-semibold tracking-wide text-left">
                  PRICE
                </th>
                <th className="p-3 text-md font-semibold tracking-wide text-left">
                  STOCK
                </th>
                <th className="p-3 text-md font-semibold tracking-wide text-left">
                  COMPANY NAME
                </th>
                <th className="p-3 text-md font-semibold tracking-wide text-left">
                  REMARK
                </th>
                <th className="p-3 text-md font-semibold tracking-wide text-left">
                  RATE
                </th>
              </tr>
            </thead>
            <tbody>
              {AllProduct.map((item, index) => (
                <tr
                  key={index}
                  className="bg-purple-50  border-b border-gray-200 "
                >
                  <td className="py-2 flex items-center ">
                    <img
                      className="w-[50px] rounded-full"
                      src={item.avatar}
                      alt=""
                    />
                    <div className="pl-4">
                      <p className="font-bold text-[16px]">{item.name}</p>
                      <p className=" text-[13px]">{item.category}</p>
                    </div>
                  </td>
                  <td className="py-2  ">{item.price} TK</td>
                  <td className="py-2 ">
                    {item.inStock === "yes" ? (
                      <span className="bg-green-400 py-1 px-3 rounded-md text-white">
                        Yes
                      </span>
                    ) : (
                      <span className="bg-red-400 py-1 px-3 rounded-md text-white">
                        No
                      </span>
                    )}
                  </td>
                  <td className="py-2 text-base ">{item.companyName}</td>
                  <td className="py-2 text-base ">{item.remark}</td>
                  <td className="py-2 text-base ">
                    {item.ratings}{" "}
                    <span className="text-yellow-500">
                      {" "}
                      <ion-icon name="star"></ion-icon>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <ReactPaginate
            className="mt-8 flex gap-1 md:gap-2"
            previousLabel="<"
            nextLabel=">"
            pageLinkClassName="ring-1  ring-gray-300 hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out cursor-pointer rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex items-center justify-center"
            previousLinkClassName="ring-1  ring-gray-300  hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out cursor-pointer rounded-full w-[30px] h-[30px] md:h-[40px] md:w-[40px] flex items-center justify-center"
            nextLinkClassName="ring-1  ring-gray-300 hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out cursor-pointer rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex items-center justify-center"
            breakLabel=". . ."
            pageCount={Total / perPage}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            activeClassName="ring-1  ring-gray-300 bg-purple-600 text-white  cursor-pointer rounded-full  flex items-center justify-center text-sm md:text-base"
            onPageChange={handelPageClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
