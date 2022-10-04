const mongoose = require("mongoose");
const MongodbContainer = require("../../containers/mongodbContainer");
const Product = require("../../modals/mongoProductModal");
const Cart = require("../../modals/mongoCartModal");
const MONGOKEY = process.env.MONGOKEY;
mongoose.connect(MONGOKEY);
class MongodbDaoCarts extends MongodbContainer {
  constructor(schema) {
    super(schema);
  }

  async getAllInCart(cartId) {
    try {
      const searchResult = await this.schema.findById(cartId, { products: 1 });
      return searchResult;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart() {
    try {
      const time = timestamp();
      const newCart = new this.schema({ timestamp: time, products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(cartId, prodId) {
    try {
      const productSearcher = new MongodbContainer(Product);
      const prodToAdd = await productSearcher.getById(prodId);
      if (prodToAdd) {
        await this.schema.findByIdAndUpdate(cartId, { $push: { products: prodToAdd } });
        const cartSearcher = new MongodbContainer(Cart);
        const updatedCart = await cartSearcher.getById(cartId);
        return updatedCart;
      } else {
        throw new Object({ error: "Product does not exist" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removeProduct(cartId, prodId) {
    try {
      const currentCart = await this.schema.find();
      console.log(currentCart);
      const indexCart = currentCart.findIndex((el) => el._id == cartId);
      const indexProduct = currentCart[indexCart].products.findIndex((el) => el._id == prodId);
      currentCart[indexCart].products.splice(indexProduct, 1);
      console.log(indexProduct);
      await this.schema.findByIdAndUpdate(cartId, {
        products: currentCart[indexCart].products,
        timestamp: timestamp(),
      });

      return currentCart[indexCart];
    } catch (error) {
      console.log(error);
    }
  }
}

function timestamp() {
  let date = new Date();
  let dateStr =
    "(" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    ("00" + date.getDate()).slice(-2) +
    "/" +
    date.getFullYear() +
    " - " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2) +
    ")";

  return dateStr;
}

module.exports = MongodbDaoCarts;