const FileDaoCarts = require("./carts/fileDaoCarts");
const FileDaoProducts = require("./products/fileDaoProducts");

const cartsDB = new FileDaoCarts("carts");
const prodsDB = new FileDaoProducts("products");

// const Product = require("../modals/mongoProductModal");
// const Cart = require("../modals/mongoCartModal");
// const MongodbDaoProduct = require("../daos/products/mongodbDaoProducts");
// const MongodbContainer = require("../containers/mongodbContainer");

// const prodsDB = new MongodbDaoProduct(Product);
// const cartsDB = new MongodbContainer(Cart);

module.exports = { cartsDB, prodsDB };