let baseURL = "http://localhost:5000/api/v1/ProductList"

export const getData = async (pageNo,perPage,searchKeyword) => {

  try {
    const response = await axios.get(`${baseURL}/${pageNo}/${perPage}/${searchKeyword}`)
    const res = await response.data.data[0]
   return res;
    // setTotal(res.data[0].Total[0].count);
  
    // setData(res.data[0].Rows)


  } catch (error) {

    console.log(error)
  }
}