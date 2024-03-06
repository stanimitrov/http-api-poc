const { Router } = require("express");
const { db } = require("./postgrePool");

const TODOS_TABLE = "todos";

const appRouter = Router();

appRouter.get("/todos", async (_req, res) => {
  try {
    const result = await db.query(`SELECT * from ${TODOS_TABLE}`);
    const idsOnly = result.rows.map((r) => r.id);

    return res.status(200).json({ result: idsOnly });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Something went wrong with fetching the todos. " + err });
  }
});

appRouter.post("/todos", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      error: "The 'title' and 'description' fields must be provided",
    });
  }

  try {
    const result = await db.query(
      `INSERT into ${TODOS_TABLE} (title, description) VALUES ($1, $2) RETURNING id`,
      [title, description]
    );

    return res.status(200).json({
      result: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong with creating a new todo. " + err,
    });
  }
});

module.exports = {
  appRouter,
};
