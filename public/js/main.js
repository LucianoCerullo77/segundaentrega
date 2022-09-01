const socket = io.connect();

let formSMT = document.getElementById("product-form");
let chatSMT = document.getElementById("chatbox");

// {{PRODUCT LIST}} client listener
socket.on("product-load", (products) => {
  console.log(products);
  fetch("partials/allProducts.ejs")
    .then((r) => r.text())
    .then((partial) => {
      const template = ejs.compile(partial);
      const html = template(products);
      return html;
    })
    .then((html) => {
      document.getElementById("product-list").innerHTML = html;
    });
});

// {{CHAT}} client listenerthe
socket.on("chat-load", (chat) => {
  console.log(chat);
  fetch("partials/chatroom.ejs")
    .then((r) => r.text())
    .then((partial) => {
      const template = ejs.compile(partial);
      const html = template(chat);
      return html;
    })
    .then((html) => {
      document.getElementById("chatroom").innerHTML = html;
    });
});

formSMT.addEventListener("submit", (e) => {
  e.preventDefault();
  const product = {
    title: e.target[0].value,
    price: e.target[1].value,
    thumbnail: e.target[2].value,
    code: e.target[3].value,
    stock: e.target[4].value,
    description: e.target[5].value,
  };

  socket.emit("new-product", product);
  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";
  e.target[3].value = "";
  e.target[4].value = "";
  e.target[5].value = "";
});

chatSMT.addEventListener("submit", (e) => {
  e.preventDefault();
  let date = new Date();
  let dateStr =
    "(" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    ("00" + date.getDate()).slice(-2) +
    "/" +
    date.getFullYear() +
    " - " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2) +
    ")";
  const message = {
    email: e.target[0].value,
    text: e.target[1].value,
    timestamp: dateStr,
  };

  socket.emit("new-message", message);

  e.target[1].value = "";
});