const express = require("express");
// import { express } from "express";
const app = express();
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
// import { createServer } from "http";
// import { Server } from "socket.io";
const router = require("./routes/router");
// import router from "./routes/router";
const PORT = process.env.PORT || 8080;
const { prodsDB } = require("./daos/index");
const { messages } = require("./containers/messagesContainer");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.set("view engine", "ejs");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
// const httpServer = createServer();
// const io = new Server(httpServer);

io.on("connection", async function (socket) {
  console.log("Un cliente se ha conectado");
  let products = await prodsDB.getAll();
  socket.emit("product-load", { products });

  let chat = await messages.getAll();
  socket.emit("chat-load", { chat });

  socket.on("new-product", async (product) => {
    await prodsDB.save(product);
    products = await prodsDB.getAll();
    io.sockets.emit("product-load", { products });
  });

  socket.on("new-message", async (message) => {
    await messages.save(message);
    chat = await messages.getAll();
    io.sockets.emit("chat-load", { chat });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening on port number ${PORT}`);
});

httpServer.on("error", (error) => console.log(`Error on the server${error}`));