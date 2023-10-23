// app.js

// 導入express
const express = require("express");
const app = express();
const port = 4000;
// 導入body-parser解析前端回傳的數據
const bodyParser = require("body-parser");

// 設置樣版引擎
app.set("view engine", "ejs");
// 指定目錄
app.set("views", "views");
// 使用bodyParser解析post請求表單的數據
app.use(bodyParser.urlencoded({ extended: true }));
// 設置靜態資料夾
app.use(express.static("public"));

// 導入controllers
const messageController = require("./controllers/messageController");

// 建立路由
app.get("/", messageController.getAllMessages);
app.post("/addMessage", messageController.addMessage);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
