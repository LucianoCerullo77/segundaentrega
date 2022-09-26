const express = require("express");
const { Router } = express;

const homeRouter = new Router();
const auth = (req, res, next) => {
  if (req.session.username) {
    return next();
  } else {
    res.redirect("/auth/login");
  }
};

homeRouter.get("/", auth, (req, res) => {
  res.render("pages/home", { username: req.session.username });
});

module.exports = homeRouter;