const { Router } = require("express");
const { todosRouter } = require("./todosRouter");

const appRouter = Router();

appRouter.use(todosRouter);

module.exports = {
  appRouter,
};
