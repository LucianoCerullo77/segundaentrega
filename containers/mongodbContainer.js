const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://LucianoNico77:pSWEjbrXviJ4eVy9@cluster0.phmjuvh.mongodb.net/MongoDBPrueba?retryWrites=true&w=majority");

class MongodbContainer {
  constructor(schema) {
    this.schema = schema;
  }

  async getAll() {
    try {
      const content = await this.schema.find();
      return content;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const content = await this.schema.findById(id);
      return content;
    } catch (error) {
      console.log(error);
      throw new Object({ error: "Object does not exist" });
    }
  }

  async deleteById(id) {
    try {
      const deleted = await this.schema.findByIdAndDelete(id);
      return `Deleted the product: ${deleted.title}`;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await this.schema.deleteMany();
      return "Collection was emptied";
    } catch (error) {
      return error;
    }
  }
}

module.exports = MongodbContainer;