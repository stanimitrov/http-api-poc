const { Router } = require("express");
const { db } = require("./postgrePool");

const appRouter = Router();

appRouter.get("/todos", async (_req, res) => {
  try {
    const result = await db.query("SELECT * from todos");

    res.status(200).json({ result: result.rows });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong with fetching the todos" });
  }
});

appRouter.post("/todos", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.send("title and description must be provided first");
  }

  const result = await db.query(
    "INSERT into todos VALUES(DEFAULT, $1, $2) RETURNING *",
    [title, description]
  );

  console.log(result.rows);
});

module.exports = {
  appRouter,
};
