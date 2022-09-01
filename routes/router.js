const express = require("express");
// import { express } from "express";
const { Router } = express;
const router = new Router();
const productosRouter = require("./products/routeProducts");
// import productosRouter from "./products/routeProducts";
const cartRouter = require("./cart/routeCart");
// import cartRouter from "./cart/routeCart";
const notFoundError = require("./errors/404");
// import notFoundError from "./errors/404";

router.use("/api/productos", productosRouter);
router.use("/api/carrito", cartRouter);
router.use("*", notFoundError);

module.exports = router;
// export default router;