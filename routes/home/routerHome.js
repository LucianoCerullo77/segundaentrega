const express = require("express");
const User = require("../../modals/user");
const { Router } = express;

const homeRouter = new Router()
// const auth = async (req, res, next) => {
//   if (req.user) {
//     const userData = await User.findById(req.user._id);
//     return next();
//   } else {
//     res.redirect("/auth/login");
//   }
// };

homeRouter.get("/", async (req, res) => {
  if (req.user) {
    const userData = await User.findById(req.user._id);
    res.render("pages/home", { data: userData });
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = homeRouter;