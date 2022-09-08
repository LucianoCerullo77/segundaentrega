const dotenv = require("dotenv");
dotenv.config();

let prodsDB;
let cartsDB;

switch (process.env.PERS) {
  case "memory":
    const MemoryDaoProducts = require("./products/memoryDaoProducts");
    const MemoryDaoCarts = require("./carts/memoryDaoCarts");

    let prodsArr = [];
    let cartArr = [];

    prodsDB = new MemoryDaoProducts(prodsArr);
    cartsDB = new MemoryDaoCarts(cartArr);

    break;
  case "files":
    const FileDaoProducts = require("./products/fileDaoProducts");
    const FileDaoCarts = require("./carts/fileDaoCarts");

    prodsDB = new FileDaoProducts("products");
    cartsDB = new FileDaoCarts("carts");
    break;

  case "firebase":
    const FirebaseDaoProducts = require("./products/firebaseDaoProducts");
    const FirebaseDaoCarts = require("./carts/firebaseDaoCarts");

    prodsDB = new FirebaseDaoProducts("products");
    cartsDB = new FirebaseDaoCarts("carts");
    break;

  case "mongo":
    const MongoDaoProducts = require("./products/mongodbDaoProducts");
    const MongoDaoCarts = require("./carts/mongodbDaoCarts");
    const Product = require("../modals/mongoProductModal");
    const Cart = require("../modals/mongoCartModal");

    prodsDB = new MongoDaoProducts(Product);
    cartsDB = new MongoDaoCarts(Cart);

    break;
  default:
    break;
}

module.exports = { cartsDB, prodsDB };