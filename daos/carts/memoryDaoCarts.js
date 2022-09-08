const MemoryContainer = require("../../containers/memoryContainer");
const prodsDB = require("../../mongueame");

class MemoryDaoCarts extends MemoryContainer {
  constructor(arr) {
    super(arr);
  }

  async getAllInCart(cartId) {
    let searchId = parseInt(cartId);
    try {
      const data = this.arr;
      const index = data.findIndex((el) => el.id === searchId);
      return data[index].products;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart() {
    try {
      const time = timestamp();
      if (this.arr.length > 0) {
        this.arr.push({ id: this.arr[this.arr.length - 1].id + 1, timestamp: time, products: [] });
      } else {
        this.arr.push({ id: 1, timestamp: time, products: [] });
      }

      return this.arr[this.arr.length - 1].id;
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(cartId, prodId) {
    try {
      const obj = await prodsDB.getById(prodId);
      const cartIndex = this.arr.findIndex((el) => el.id === parseInt(cartId));

      if (cartIndex >= 0 && !obj.error) {
        this.arr[cartIndex].products.push(obj);
        return this.arr[cartIndex].products;
      } else {
        if (cartIndex >= 0) {
          throw new Object({ error: "Cart does not exist" });
        } else {
          throw new Object({ error: "Product does not exist" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removeProduct(cartId, prodId) {
    try {
      const cartIndex = this.arr.findIndex((el) => el.id === parseInt(cartId));

      if (cartIndex >= 0) {
        this.arr[cartIndex].products = this.arr[cartIndex].products.filter((el) => el.id !== prodId);

        return this.arr[cartIndex].products;
      } else {
        throw new Object({ error: "Cart does not exist" });
      }
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

module.exports = MemoryDaoCarts;