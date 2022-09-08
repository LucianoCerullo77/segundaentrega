const MemoryContainer = require("../../containers/memoryContainer");

class MemoryDaoProducts extends MemoryContainer {
  constructor(arr) {
    super(arr);
  }
  async save(obj) {
    try {
      const time = timestamp();
      if (this.arr.length > 0) {
        this.arr.push({ ...obj, id: this.arr[this.arr.length - 1].id + 1, timestamp: time });
      } else {
        this.arr.push({ ...obj, id: 1, timestamp: time });
      }
      return this.arr[this.arr.length - 1];
    } catch (error) {
      console.log(error);
    }
  }

  async edit(numb, newObj) {
    try {
      const prodId = this.arr.findIndex((prod) => prod.id == numb);
      if (prodId < 0) {
        throw new Object({ error: "Product does not exist" });
      }

      const updatedProd = {
        title: newObj.title ? newObj.title : this.arr[prodId].title,
        price: newObj.price ? newObj.price : this.arr[prodId].price,
        thumbnail: newObj.thumbnail ? newObj.thumbnail : this.arr[prodId].thumbnail,
        code: newObj.code ? newObj.code : this.arr[prodId].code,
        stock: newObj.stock ? newObj.stock : this.arr[prodId].stock,
        description: newObj.description ? newObj.description : this.arr[prodId].description,
        timestamp: timestamp(),
        id: this.arr[prodId].id,
      };
      this.arr[prodId] = updatedProd;
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

module.exports = MemoryDaoProducts;