// app.js

const express = require("express"); // 使用 Express 框架
const bodyParser = require("body-parser"); // 用於解析傳入的資料
const multer = require("multer"); // 用於處理檔案上傳
require("dotenv").config(); // 從 .env 檔案載入環境變數

// 建立 Express 應用程式
const app = express();
const port = 4000; // 設定伺服器監聽的埠口

// 設定視圖引擎為 EJS
app.set("view engine", "ejs");

// 解析請求主體中的表單數據
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 配置檔案上傳的中介軟體，指定上傳檔案的暫存目錄
const upload = multer({ dest: "uploads/" });

// 設定靜態檔案目錄和路由，用於提供靜態檔案
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// 引入控制器
const messageController = require("./controllers/messageController");

// 定義路由和相對應的控制器處理函式
app.get("/", messageController.getAllMessages); // 處理獲取所有訊息的請求
app.post("/addMessage", upload.single("image"), messageController.addMessage); // 處理新增訊息的請求，同時處理上傳檔案

// 啟動伺服器，監聽指定埠口
app.listen(port, () => {
  console.log(`伺服器正在埠口 ${port} 上運行`);
});
