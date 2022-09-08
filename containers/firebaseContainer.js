let admin = require("firebase-admin");
let serviceAccount = require("../modals/firebaseAuth.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class FirebaseContainer {
  constructor(collection) {
    this.collection = collection;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      query
        .get()
        .then((snapshot) => {
          const prods = [];
          snapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;
            prods.push(data);
          });

          resolve(prods);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      query
        .doc(id)
        .get()
        .then((snapshot) => {
          let prod = snapshot.data();
          prod.id = snapshot.id;

          resolve(prod);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  deleteById(id) {
    return new Promise((resolve, reject) => {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      query
        .doc(id)
        .get()
        .then((snapshot) => {
          snapshot.ref.delete();
          let deleted = snapshot.data();
          deleted.id = snapshot.id;

          resolve(`Deleted the product: ${deleted.title}`);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async deleteAll() {
    return new Promise((resolve, reject) => {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      query
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            doc.ref.delete();
          });
          resolve("Collection was emptied");
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = FirebaseContainer;