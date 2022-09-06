const mongoose = require("mongoose");
const Product = require("./modals/mongoProductModal");
const Cart = require("./modals/mongoCartModal");
const MongodbContainer = require("./containers/mongodbContainer");
const MongodbDaoCarts = require("./daos/carts/mongodbDaoCarts");
const MongodbDaoProduct = require("./daos/products/mongodbDaoProducts");
const express = require("express");
const app = express();

const cart = {
  timestamp: "(08/09/2022 - 12:19:34)",
  products: [],
};

const product = {
  title: "Lapiz",
  price: 13,
  thumbnail:
    "https://media.istockphoto.com/id/815950992/es/foto/l%C3%A1piz.webp?s=612x612&w=is&k=20&c=Hzj7A-P8Q1WkZvsMbNPdQXwYLEMeLzNWQyNCg1YIj0U=",
  stock: 5,
  description: "This is the product",
  timestamp: "(08/03/2022 - 19:56:26)",
};

// app.get("/products", async (req, res) => {
//   try {
//     const prodsDB = new MongodbDaoProduct(Product);
//     const response = await prodsDB.save(product);
//     res.json(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).end();
//   }
// });

app.get("/products", async (req, res) => {
  try {
    const cartdb = new MongodbDaoCarts(Cart);
    // 6313dd93e4888ab87e9b671c
    // 6313dd91e4888ab87e9b671a
    const response = await cartdb.removeProduct("6313e07ba8593723c6467762", "6313dd91e4888ab87e9b671a");
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
}); 