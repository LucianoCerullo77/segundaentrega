const MongoDaoProducts = require("./daos/products/mongodbDaoProducts");
const MongoDaoCarts = require("./daos/carts/mongodbDaoCarts");
const Product = require("./modals/mongoProductModal");
const Cart = require("./modals/mongoCartModal");
const MemoryDaoProducts = require("./daos/products/memoryDaoProducts");
const MemoryDaoCarts = require("./daos/carts/memoryDaoCarts");
const express = require("express");
const app = express();

const cart = {
  timestamp: "(08/09/2022 - 12:19:34)",
  products: [],
};

const product = {
  title: "Lapiz",
  price: 13,
  thumbnail:
    "https://media.istockphoto.com/id/815950992/es/foto/l%C3%A1piz.webp?s=612x612&w=is&k=20&c=Hzj7A-P8Q1WkZvsMbNPdQXwYLEMeLzNWQyNCg1YIj0U=",
  stock: 5,
  description: "This is the product",
  timestamp: "(08/03/2022 - 19:56:26)",
};

const prodUpedate = {
  title: "Hotest dog",
  price: 50,
  stock: 5,
  description: "It´s a hot dog, not much to say about it. Comes with some ketchup and mustard",
};

let productsArray = [
  {
    title: "Car",
    price: 15,
    thumbnail:
      "https://media.istockphoto.com/id/1150931120/es/foto/ilustraci%C3%B3n-3d-del-coche-blanco-compacto-gen%C3%A9rico-vista-frontal-lateral.webp?s=612x612&w=is&k=20&c=XzGv6h3_nR0r5TUwTyybdmrdTY7IHdtePdd6h-wwspc=",
    id: 1,
  },
  {
    title: "Laptop",
    price: 4567,
    thumbnail:
      "https://media.istockphoto.com/id/1157789866/es/foto/computadora-moderna-laptop-con-pantalla-en-blanco-en-la-barra-de-mostrador-y-vista-de-ventana.webp?s=612x612&w=is&k=20&c=SzHYp303Ey2tuY4mtmG66ShYiIuRvfbsqKxZf-Y1p9E=",
    id: 2,
  },
];
let cartsArray = [
  {
    id: 1,
    timestamp: "(08/09/2022 - 12:19:32)",
    products: [
      {
        title: "Helmet",
        price: 555,
        thumbnail:
          "https://media.istockphoto.com/id/171326814/es/foto/casco-duro-amarillo-en-blanco-con-trazado-de-recorte.webp?s=612x612&w=is&k=20&c=YJz37TCSVWjKp-gg0a5Jn0x_2542joKYJJZtz4G6Oqc=",
        id: 5,
        timestamp: "(08/08/2022 - 14:58:29)",
      },
    ],
  },
  {
    id: 2,
    timestamp: "(08/09/2022 - 12:19:35)",
    products: [
      {
        title: "Car",
        price: 15,
        thumbnail:
          "https://media.istockphoto.com/id/1150931120/es/foto/ilustraci%C3%B3n-3d-del-coche-blanco-compacto-gen%C3%A9rico-vista-frontal-lateral.webp?s=612x612&w=is&k=20&c=XzGv6h3_nR0r5TUwTyybdmrdTY7IHdtePdd6h-wwspc=",
        id: 1,
      },
      {
        title: "Laptop",
        price: 4567,
        thumbnail:
          "https://media.istockphoto.com/id/1157789866/es/foto/computadora-moderna-laptop-con-pantalla-en-blanco-en-la-barra-de-mostrador-y-vista-de-ventana.webp?s=612x612&w=is&k=20&c=SzHYp303Ey2tuY4mtmG66ShYiIuRvfbsqKxZf-Y1p9E=",
        id: 2,
      },
      {
        title: "Tree",
        price: 444,
        thumbnail:
          "https://media.istockphoto.com/id/470604022/es/foto/%C3%A1rbol-de-manzano.webp?s=612x612&w=is&k=20&c=aV8JifRYM6BqA-0kj8RzrPg_z89gk1Gdk15jjJ5f5ZE=",
        id: 3,
      },
    ],
  },
];
const prodsDB = new MongoDaoProducts(Product);
const cartsDB = new MongoDaoCarts(Cart);

app.get("/products2", async (req, res) => {
  try {
    const response = await cartsDB.testeando("6313e22eef7626e1aa09a919", "6313dd91e4888ab87e9b671a");
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

app.get("/products", async (req, res) => {
  try {
    const response = await cartsDB.getAllInCart(2);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

app.post("/products", async (req, res) => {
  try {
    const response = await cartsDB.addProduct("6313e22eef7626e1aa09a919", "6317a853674c1e06a613cb2f");
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

app.post("/products2", async (req, res) => {
  try {
    const response = await prodsDB.save(product);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

app.put("/products", async (req, res) => {
  try {
    const response = await cartsDB.edit(4, prodUpedate);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

app.delete("/products", async (req, res) => {
  try {
    const response = await cartsDB.testeando("631f72bbcd68eafe3738fe2d", "6313dd91e4888ab87e9b671a");
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

module.exports = prodsDB;