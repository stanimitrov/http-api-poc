const { Router } = require("express");

const appRouter = Router();

appRouter.get("/todos", (req, res, next) => {});

module.exports = {
  appRouter,
};
