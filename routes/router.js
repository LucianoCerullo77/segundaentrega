const express = require("express")
const {Router} = express;
const router = new Router();
const homeRouter = require("./home/routerHome");
const authRouter = require("./auth/routeAuth");
const infoRouter = require("./extra/routeInfo");
const randomsRouter = require("./extra/routeRandoms");
const productosRouter = require("./products/routeProducts");
const cartRouter = require("./cart/routeCart");
const notFoundError = require("./errors/404");

router.use("/", homeRouter);
router.use("/auth", authRouter);
router.use("/info", infoRouter);
router.use("/api/randoms", randomsRouter)
router.use("/api/productos", productosRouter);
router.use("/api/carrito", cartRouter);
router.use("*", notFoundError);
module.exports = router;