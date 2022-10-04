const express = require("express");
const { Router } = express;

const User = require("../../modals/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { auth } = require("firebase-admin");
const authRouter = new Router();

authRouter.get("/register", (req, res) => {
  res.render("pages/register");
});

authRouter.post("/register", (req, res) => {
  const { username, password, direction } = req.body;
  User.findOne({ username }, async (err, user) => {
    if (err) console.log(err);
    if (user) res.render("pages/register-error");
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
        direction,
      });
      await newUser.save();
      res.redirect("/auth/login");
    }
  });
});
authRouter.get("/login", (req, res) => {
  res.render("pages/login");
});
authRouter.post("/login", passport.authenticate("local", { failureRedirect: "Loging-error" }), async (req, res) => {
  try {
    const username = req.body.username;
    console.log(username);
    req.session.username = username;
    res.redirect("/");
    return; 
  } catch (error) {
    console.log(error);
  }
});

authRouter.get("/loging-error", (req, res) => {
  res.render("pages/login-error");
});

authRouter.get("/logout", async (req, res) => {
  res.render("pages/logout", { data: req.user });
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout error", body: err });
    }
  });
});

