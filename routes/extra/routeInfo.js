const express = require("express");
const { Router } = express;

const infoRouter = new Router();

infoRouter.get("/", async (req, res) => {
  let info = {
    args: process.argv,
    platform: process.platform,
    nodeVersion: process.version,
    rss: process.memoryUsage().rss,
    execPath: process.execPath,
    processId: process.pid,
    filePath: process.cwd(),
  };
  res.send(info);
  // res.render("pages/info", { info: info });
});

module.exports = infoRouter;