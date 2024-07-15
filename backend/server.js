const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");
const PORT = 3018;
const path = require("path");
// ミドルウェアを使ってusers.jsをserver.jsから引き離す
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/upload", uploadRoute);

const mongoose = require("mongoose");
require("dotenv").config();

// データベース接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("DBと接続完了");
  })
  .catch((err) => {
    console.log(err);
  });

// WebSocketの処理
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", (username) => {
    console.log(`${username} joined the chat`);
    // 特定のチャットルームに参加させる場合はここで処理を追加する
  });

  socket.on("chat message", (msg) => {
    console.log(`message: ${msg}`);
    io.emit("chat message", msg); // 全てのクライアントにメッセージを送信
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// ルートの設定
app.get("/", (req, res) => {
  res.send("hello express");
});

// サーバーの起動
server.listen(PORT, () => console.log(`サーバがポート ${PORT} で起動しました`));
