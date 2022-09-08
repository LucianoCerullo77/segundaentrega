const express = require("express");
const { Router } = express;
const router = new Router();
const productosRouter = require("./products/routeProducts");
const cartRouter = require("./cart/routeCart");
const notFoundError = require("./errors/404");

router.use("/api/productos", productosRouter);
router.use("/api/carrito", cartRouter);
router.use("*", notFoundError);

module.exports = router;