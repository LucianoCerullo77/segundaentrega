class MemoryContainer {
    constructor(arr) {
      this.arr = arr;
    }
  
    async getAll() {
      try {
        const content = this.arr;
        console.log(content);
        return content;
      } catch (error) {
        console.log(error);
      }
    }
  
    async getById(numb) {
      try {
        const product = this.arr.find((el) => el.id == numb);
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
        const data = this.arr.filter((el) => {
          return el.id != numb;
        });
        this.arr = data;
        return "Deleted the object";
      } catch (error) {
        console.log(error);
      }
    }
  
    deleteAll() {
      try {
        this.arr = [];
        return "File was emptied";
      } catch (error) {
        return error;
      }
    }
  }
  
  module.exports = MemoryContainer;