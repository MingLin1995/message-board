// models/messageModel.js
const mysql = require("mysql2");

// 創建 MySQL 連接池
const pool = mysql.createPool({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
});

// 從連接池中創建 promise 連接
const db = pool.promise();

module.exports = {
  // 非同步函數，用於檢索所有留言
  getAllMessages: async (callback) => {
    try {
      // 使用 promise 連接執行 SQL 查詢，獲得結果和字段
      const [results, fields] = await db.query("SELECT * FROM messages");
      //console.log("從資料庫檢索到的留言:", results);
      callback(null, results);
    } catch (err) {
      console.error("從資料庫查詢留言時出現錯誤: " + err);
      callback(err, null);
    }
  },

  // 非同步函數，用於新增留言和圖片連結
  addMessage: async (message, imageLink, callback) => {
    // 定義 SQL 查詢語句
    const sql = "INSERT INTO messages (message, imageLink) VALUES (?, ?)";
    try {
      // 使用 promise 連接執行 SQL 查詢，傳入留言內容和圖片連結
      await db.query(sql, [message, imageLink]);
      callback(null);
    } catch (err) {
      console.error("在資料庫中存儲留言時出現錯誤: " + err);
      callback(err);
    }
  },
};
