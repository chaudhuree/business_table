> base url

```
http://localhost:5000/api/v1/ProductList/:pageNo/:perPage/:searchKeyword
```

```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:5000/api/v1/ProductList/1/5/0',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
