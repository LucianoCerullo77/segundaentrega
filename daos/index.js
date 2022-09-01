const FileDaoCarts = require("./carts/fileDaoCarts");
const FileDaoProducts = require("./products/fileDaoProducts");

const cartsDB = new FileDaoCarts("carritos");
const prodsDB = new FileDaoProducts("products");

module.exports = { cartsDB, prodsDB };