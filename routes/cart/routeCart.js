const express = require("express");
const { Router } = express;

const cartRouter = new Router();

const { cartsDB } = require("../../daos/index.js");

cartRouter.get("/:id/productos", async (req, res) => {
  try {
    const products = await cartsDB.getAllInCart(req.params.id);
    res.json(products);
  } catch (error) {
    console.log(error);
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    const cartID = await cartsDB.createCart();
    res.json({ cartID });
  } catch (error) {
    console.log(error);
  }
});

cartRouter.post("/:id/productos", async (req, res) => {
  try {
    const prodsInCart = await cartsDB.addProduct(req.params.id, req.body.id);
    res.json(prodsInCart);
  } catch (error) {
    console.log(error);
  }
});

cartRouter.delete("/", async (req, res) => {
  try {
    const cart = await cartsDB.deleteAll();
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

cartRouter.delete("/:id", async (req, res) => {
  try {
    const cart = await cartsDB.deleteById(req.params.id);
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    const cart = await cartsDB.removeProduct(parseInt(req.params.id), parseInt(req.params.id_prod));
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

module.exports = cartRouter;