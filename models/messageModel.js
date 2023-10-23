// models/messageModel.js
const messages = [];

module.exports = {
  getAllMessages: () => messages,
  addMessage: (message, imageLink) => {
    // 將留言與圖片合為同一個留言顯示
    const newMessage = {
      text: message,
      image: imageLink,
    };
    messages.push(newMessage);
  },
};
