const fs = require("fs");
const FileContainer = require("../../containers/fileContainer");

class FileDaoProducts extends FileContainer {
  constructor(filename) {
    super(filename);
  }
  async save(obj) {
    try {
      let content = await fs.promises.readFile(this.fileName, "utf8");
      if (content == "") {
        fs.writeFileSync(this.fileName, "[]");
        content = "[]";
      }
      const data = JSON.parse(content);
      const time = timestamp();
      if (data.length > 0) {
        data.push({ ...obj, id: data[data.length - 1].id + 1, timestamp: time });
      } else {
        data.push({ ...obj, id: 1, timestamp: time });
      }
      fs.writeFileSync(this.fileName, JSON.stringify(data, null, 2));
      return data[data.length - 1];
    } catch (error) {
      console.log(error);
    }
  }

  async edit(numb, newObj) {
    try {
      const content = await fs.promises.readFile(this.fileName, "utf-8");
      const products = JSON.parse(content);
      const prodId = products.findIndex((prod) => prod.id == numb);
      if (prodId < 0) {
        throw new Object({ error: "Product does not exist" });
      }

      const updatedProd = {
        title: newObj.title ? newObj.title : products[prodId].title,
        price: newObj.price ? newObj.price : products[prodId].price,
        thumbnail: newObj.thumbnail ? newObj.thumbnail : products[prodId].thumbnail,
        code: newObj.code ? newObj.code : products[prodId].code,
        stock: newObj.stock ? newObj.stock : products[prodId].stock,
        description: newObj.description ? newObj.description : products[prodId].description,
        timestamp: timestamp(),
        id: products[prodId].id,
      };
      products[prodId] = updatedProd;
      fs.writeFileSync(this.fileName, JSON.stringify(products, null, 2));
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

module.exports = FileDaoProducts;