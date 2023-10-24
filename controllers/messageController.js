// controllers/messageController.js

const messageModel = require("../models/messageModel");
const fileService = require("../fileService");
const fs = require("fs");

module.exports = {
  // 處理獲取所有訊息的請求
  getAllMessages: (req, res) => {
    messageModel.getAllMessages((err, messages) => {
      if (err) {
        console.error("從資料庫獲取訊息時出現錯誤: " + err);
        res.status(500).send("內部伺服器錯誤");
      } else {
        res.render("index", { messages });
      }
    });
  },

  // 處理新增訊息的請求
  addMessage: (req, res) => {
    const message = req.body.message;
    const image = req.file;

    if (image) {
      // 如果有上傳的圖片
      fileService.uploadFile(image, (fileErr, imageLink) => {
        if (fileErr) {
          console.error("上傳檔案時出現錯誤: " + fileErr);
          res.status(500).send("內部伺服器錯誤");
        } else {
          messageModel.addMessage(message, imageLink, (dbErr) => {
            if (dbErr) {
              console.error("將訊息存儲到資料庫時出現錯誤: " + dbErr);
              res.status(500).send("內部伺服器錯誤");
            } else {
              fs.unlinkSync(image.path);
              res.redirect("/");
            }
          });
        }
      });
    } else {
      // 處理未上傳圖片的情況
      messageModel.addMessage(message, null, (dbErr) => {
        if (dbErr) {
          console.error("將訊息存儲到資料庫時出現錯誤: " + dbErr);
          res.status(500).send("內部伺服器錯誤");
        } else {
          res.redirect("/");
        }
      });
    }
  },
};
