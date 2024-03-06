const { Router } = require("express");
const { db } = require("./postgrePool");

const appRouter = Router();

appRouter.get("/todos", async (req, res, next) => {
  try {
    const result = await db.query("SELECT * from todos");

    res.send(result.rows);
    console.log(result.rows);
  } catch (err) {
    console.log(err);
  }
});

appRouter.post("/todos", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.send("title and description must be provided first");
  }

  const result = await db.query(
    "INSERT into todos VALUES(DEFAULT, $1, $2) RETURNING ",
    [title, description]
  );

  console.log(result.rows);
});

module.exports = {
  appRouter,
};
