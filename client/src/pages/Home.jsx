import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export const Home = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageNo, setpageNo] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [searchKeyword, setSearchKeyword] = useState("0")
  const [Total, setTotal] = useState(0)
  // data fetching
  let baseURL = "http://localhost:5000/api/v1/ProductList"
  const getData = async (pageNo, perPage, searchKeyword) => {

    try {

      setLoading(true)
      const response = await axios.get(`${baseURL}/${pageNo}/${perPage}/${searchKeyword}`)
      console.log(`${baseURL}/${pageNo}/${perPage}/${searchKeyword}`)
      const res = await response.data
      // console.log(res.data)
      setTotal(res.data[0].Total[0].count);
      // console.log(res.data[0])
      setData(res.data[0].Rows)
      setLoading(false)

    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getData(pageNo, perPage, searchKeyword)
  }, [perPage, searchKeyword, pageNo])

  // select button
  const handleSelect = (e) => {
    setPerPage(e.target.value)


  }

  // search query
  const handleSearch = (e) => {

    setSearchKeyword(e.target.value)

    if (e.target.value === "") {
      setSearchKeyword("0")
    }
  }
  // pagination
  const handlePageClick = (e) => {
    setpageNo(e.selected + 1)
  }
  
  // fontend filter
  const handleFiter = (e) => {
    document.querySelectorAll('tbody tr').forEach((item) => {
      item.innerText.toLowerCase().includes(e.target.value.toLowerCase()) ? item.style.display = "" : item.style.display = "none"

    })
  }
  return (

    <div className="grid justify-center items-center h-full my-16 px-20 ">
      <h1 className="underline-offset-8 mb-10 text-center font-bold text-xl underline decoration-sky-500 ">Products List</h1>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Per Page</label>
          <select value={perPage} onChange={handleSelect} className="rounded-sm bg-gray-50 border border-gray-300 w-20  px-4 text-center">

            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search Query:</label>
          <input onChange={handleSearch} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search.."></input>
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filter Item:</label>
          <input onChange={handleFiter} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search.."></input>
        </div>

      </div>

      {/* table component */}
      {loading ? <h1>Loading...</h1> : <div className="flex items-center justify-between pb-4">
        <table cellPadding="15px" className="w-full  table-fixed text-sm text-left text-gray-500 ">
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th className="pr-15 py-3">Product </th>
              <th>Price</th>
              <th>Stock</th>
              <th>Code</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="pr-20 py-3">{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td>{item.id}</td>
                  <td><img src={item.image
                  } alt="" className='w-10 h-auto rounded shadow-md shadow-gray-500/15' /></td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
      }
      {/* pagination */}
      <div className="mx-auto">
        {Total && <ReactPaginate
          pageClassName="page-item"
          pageLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          marginPagesDisplayed={2}
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(Number(Total / perPage))}
          previousLabel="< "

        />}
      </div>
    </div>
  )
}
