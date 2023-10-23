// controllers/messageController.js
const messageModel = require("../models/messageModel");

module.exports = {
  getAllMessages: (req, res) => {
    const messages = messageModel.getAllMessages();
    //渲染views資料夾內的index.ejs
    res.render("index", { messages });
  },
  addMessage: (req, res) => {
    //取得表單留言
    const message = req.body.message;
    //如果有圖片，就轉成圖片位置連結，沒有的話就是null
    const imageLink = req.file ? `/uploads/${req.file.filename}` : null;

    messageModel.addMessage(message, imageLink);

    res.redirect("/");
  },
};
