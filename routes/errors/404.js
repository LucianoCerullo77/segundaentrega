const express = require("express");
const { Router } = express;
const notFoundError = Router();

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