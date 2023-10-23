// models/messageModel.js
const messages = [];

module.exports = {
  getAllMessages: () => messages,
  addMessage: (message) => messages.push(message),
};
