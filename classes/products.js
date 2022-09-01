const { options } = require("../data/knexDB");
const knex = require("knex")(options);

class Productos {
  constructor(fileName) {
    this.fileName = "./data/" + fileName + ".txt";
  }
  async getAll() {
    try {
      const content = await knex.from("products").select("*");
      return content;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(numb) {
    try {
      const product = await knex.from("products").where("id", numb);
      if (product.length > 0) {
        return product[0];
      } else {
        throw new Object({ error: "Product does not exist" });
      }
    } catch (error) {
      return error;
    }
  }

  async save(obj) {
    try {
      let content = await knex.from("products").select("*");

      const data = JSON.parse(JSON.stringify(content));
      const time = timestamp();
      let prod = {};
      if (data.length > 0) {
        prod = { ...obj, id: data[data.length - 1].id + 1, timestamp: time };
        await knex("products").insert(prod);
      } else {
        prod = { ...obj, id: 1, timestamp: time };
        await knex("products").insert(prod);
      }

      return prod;
    } catch (error) {
      console.log(error);
    }
  }

  async edit(numb, newObj) {
    try {
      await knex.from("products").where({ id: numb }).update({
        title: newObj.title,
        price: newObj.price,
        thumbnail: newObj.thumbnail,
        code: newObj.code,
        stock: newObj.stock,
        description: newObj.description,
        timestamp: timestamp(),
      });
    } catch (err) {
      console.log(err);
      throw new Object({ error: "Product does not exist" });
    }
  }
  async deleteById(numb) {
    try {
      await knex.from("products").where({ id: numb }).del();
      return "Deleted the product";
    } catch (err) {
      console.log(err);
      throw new Object({ error: "Product does not exist" });
    }
  }
  async deleteAll() {
    try {
      await knex.from("products").del();
      return "All products were deleted";
    } catch (err) {
      console.log(err);
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

const prods = new Productos("products");

module.exports = { prods };