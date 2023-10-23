// controllers/messageController.js
const messageModel = require("../models/messageModel");

module.exports = {
  getAllMessages: (req, res) => {
    const messages = messageModel.getAllMessages();
    res.render("index", { messages });
  },
  addMessage: (req, res) => {
    const message = req.body.message;
    messageModel.addMessage(message);
    res.redirect("/");
  },
};
