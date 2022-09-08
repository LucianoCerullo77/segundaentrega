let admin = require("firebase-admin");
const FirebaseContainer = require("../../containers/firebaseContainer");

class FirebaseDaoCarts extends FirebaseContainer {
  constructor(collection) {
    super(collection);
  }

  async getAllInCart(cartId) {
    try {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      let doc = await query.doc(cartId).get();
      let cart = doc.data();
      return cart.products;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart() {
    try {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      let doc = query.doc();
      const time = timestamp();
      const newCart = { products: [], timestamp: time };
      await doc.create(newCart);
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(cartId, prodId) {
    try {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      const productSearcher = new FirebaseContainer("products");
      const prodToAdd = await productSearcher.getById(prodId);
      let doc = await query.doc(cartId).get();
      let oldProducts = doc.data().products;
      oldProducts.push(prodToAdd);
      const time = timestamp();

      const updatedCart = await doc.ref.update({ products: oldProducts, timestamp: time });
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  }

  async removeProduct(cartId, prodId) {
    try {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      let doc = await query.doc(cartId).get();
      let oldProducts = doc.data().products;
      let newProdList = oldProducts.filter((el) => {
        return el.id !== prodId;
      });
      const time = timestamp();

      const updatedCart = await doc.ref.update({ products: newProdList, timestamp: time });
      return updatedCart;
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

module.exports = FirebaseDaoCarts;