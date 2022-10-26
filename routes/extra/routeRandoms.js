const express = require("express");
const { Router } = express;
const minimist = require("minimist");

const randomsRouter = new Router();



randomsRouter.get("/", (req, res) => {
  console.log(`port: ${Object.values(minimist(process.argv.slice(2)))[0][0] || 8080} -> Fyh: ${Date.now()}`);
  res.send(
    `Servidor express <span style="color:blueviolet;">(Nginx)</span> en ${
      Object.values(minimist(process.argv.slice(2)))[0][0] || 8080
    } - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`
  );
});

module.exports = randomsRouter;