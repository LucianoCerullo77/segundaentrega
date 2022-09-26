const express = require("express");
const { Router } = express;

const authRouter = new Router();

authRouter.get("/login", (req, res) => {
  res.render("pages/login");
});

authRouter.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    if (username == "pepe") {
      req.session.username = username;
      res.redirect("/");
      return;
    }
    res.send("Loging error");
  } catch (error) {
    console.log(error);
  }
});

authRouter.get("/logout", async (req, res) => {
  res.render("pages/logout", { username: req.session.username });
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout error", body: err });
    }
  });
});

module.exports = authRouter;