const express = require("express");
const app = express();
const router = require("./routes/router");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const bcrypt = require("bcrypt");


const { prodsDB } = require("./daos/index");
const { messages } = require("./containers/messagesContainer");

const passport = require("passport");
const { Strategy } = require("passport-local");
const localStrategy = Strategy;


const minimist = require("minimist");
const compression = require("compression");

const PORT = Object.values(minimist(process.argv.slice(2)))[0][0] || 8080;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new MongoStore({
      mongoUrl: MONGOKEY,
      rolling: true,
      //change to 600 for 10 minutes
      ttl: 60,
    }),
    secret: "coder",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(compression());
app.use("/", router);
app.set("view engine", "ejs");
passport.use(
  new localStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) console.log(err);
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) console.log(err);
        if (isMatch) return done(null, user);
        return done(null, false);
      });
    });
  })
);
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  return done(null, user);
});

io.on("connection", async function (socket) {
  console.log("Un cliente se ha conectado");
  let products = await prodsDB.getAll();
  if (products[0]._id) {
    products = JSON.stringify(products);
    products = JSON.parse(products);
    products = products.map((el) => {
      return { ...el, id: el._id };
    });
  }

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