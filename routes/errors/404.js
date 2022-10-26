const express = require("express");
const { Router } = express;
const notFoundError = Router();

const { loggerDefault, loggerNotFound, loggerApiError } = require("../../middlewares/log4js/class32");

notFoundError.use((req, res, next) => {
  loggerNotFound.warn(`WARNING, route "${req.originalUrl}" does not exist`);
  next();
});

notFoundError.get("*", (req, res) => {
  res.json({ error: -2, descripcion: `ruta inexistente` });
});

notFoundError.post("*", (req, res) => {
  res.json({ error: -2, descripcion: `ruta inexistente` });
});

notFoundError.delete("*", (req, res) => {
  res.json({ error: -2, descripcion: `ruta inexistente` });
});

notFoundError.put("*", (req, res) => {
  res.json({ error: -2, descripcion: `ruta inexistente` });
});

module.exports = notFoundError;