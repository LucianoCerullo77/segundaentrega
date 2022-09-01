const fs = require("fs");

class Messages {
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
  async save(obj) {
    try {
      let content = await fs.promises.readFile(this.fileName, "utf-8");

      const data = JSON.parse(content);
      const time = timestamp();
      let message = {};
      if (data.length > 0) {
        data.push({ ...obj, id: data[data.length - 1].id + 1, timestamp: time });
      } else {
        message = { ...obj, id: 1, timestamp: time };
        data.push({ ...obj, id: 1, timestamp: time });
      }
      fs.writeFileSync(this.fileName, JSON.stringify(data, null, 2));

      return message;
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

const messages = new Messages("messages");

module.exports = { messages };