// app.js

// 導入 express
const express = require("express");
// 導入 body-parser
const bodyParser = require("body-parser");
// 導入 multer
const multer = require("multer");

const app = express();
const port = 4000;

// 設置樣版為ejs
app.set("view engine", "ejs");

// 使用bodyParser處理request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 建立上傳圖片資料夾
const upload = multer({ dest: "uploads/" });

// 設置靜態資料夾
app.use(express.static("public"));
//如果收到/uploads的請求，則使用uploads資料夾
app.use("/uploads", express.static("uploads"));

// 導入controllers
const messageController = require("./controllers/messageController");

// 建立路由，收到請求時，執行getAllMessages
app.get("/", messageController.getAllMessages);

// 使用upload.single("image")處理上傳的圖片，傳遞給addMessage
app.post("/addMessage", upload.single("image"), messageController.addMessage);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
