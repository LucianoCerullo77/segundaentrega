const fs = require("fs");

class FileContainer {
  constructor(fileName) {
    this.fileName = "./data/" + fileName + ".txt";
  }

  async getAll() {
    try {
      const content = await fs.promises.readFile(this.fileName, "utf-8");
      const data = JSON.parse(content);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(numb) {
    try {
      const content = await fs.promises.readFile(this.fileName, "utf-8");
      const data = JSON.parse(content);
      const product = data.find((el) => el.id == numb);
      if (product) {
        return product;
      } else {
        throw new Object({ error: "Object does not exist" });
      }
    } catch (error) {
      return error;
    }
  }

  async deleteById(numb) {
    try {
      const content = await fs.promises.readFile(this.fileName, "utf-8");
      const arr = JSON.parse(content);
      const data = arr.filter((el) => {
        return el.id != numb;
      });
      fs.writeFileSync(this.fileName, JSON.stringify(data, null, 2));
      return "Deleted the object";
    } catch (error) {
      console.log(error);
    }
  }

  deleteAll() {
    try {
      fs.writeFileSync(this.fileName, "[]");
      return "File was emptied";
    } catch (error) {
      return error;
    }
  }
}

module.exports = FileContainer;
// export default FileContainer;