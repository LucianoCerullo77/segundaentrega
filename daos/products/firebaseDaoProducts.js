const FirebaseContainer = require("../../containers/firebaseContainer");

let admin = require("firebase-admin");

class FirebaseDaoProducts extends FirebaseContainer {
  constructor(collection) {
    super(collection);
  }

  async save(obj) {
    try {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      let doc = query.doc();
      const time = timestamp();
      const newProduct = { ...obj, timestamp: time };
      await doc.create(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }
  async edit(id, newProd) {
    try {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      let doc = await query.doc(id).get();
      const time = timestamp();
      const updatedProd = await doc.ref.update({ ...newProd, timestamp: time });
      return updatedProd;
    } catch (error) {
      console.log(error);
      return error;
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

module.exports = FirebaseDaoProducts;