// https://medium.com/@charming_rust_oyster_221/node-js-express-%E5%AE%89%E8%A3%9D%E8%A8%AD%E7%BD%AE%E8%88%87%E7%B0%A1%E5%96%AE%E5%AF%A6%E4%BD%9C-5920e1d70d9d

var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(4000, function () {
  console.log("Example app listening on port 4000!");
});
