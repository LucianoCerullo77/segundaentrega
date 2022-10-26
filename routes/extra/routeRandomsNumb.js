const express = require("express");
const { Router } = express;
const { fork } = require("child_process");

const randomsNumbRouter = new Router();

function generator(rad) {
  const arr = [];
  const obj = {};

  for (let index = 1; index <= 1000; index++) {
    arr.push({ id: index, amount: 0 });
  }

  for (let index = 0; index < rad; index++) {
    let numb = Math.floor(Math.random() * 1000 + 1);
    ++arr[numb - 1].amount;
  }
  arr.forEach((element) => {
    obj[element.id] = element.amount;
  });
  return obj;
}

randomsNumbRouter.get("/", (req, res) => {
  try {
    const childProcess = fork("./modals/processRandoms");
    childProcess.send({ type: "calculate", radius: 100000000 });
    childProcess.on("message", (result) => {
      console.log("completed");
      res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});
randomsNumbRouter.get("/:cant", (req, res) => {
  try {
    const childProcess = fork("./modals/processRandoms");
    childProcess.send({ type: "calculate", radius: req.params.cant });
    childProcess.on("message", (result) => {
      console.log("completed");
      res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = randomsNumbRouter;