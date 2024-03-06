const { Router } = require("express");
const { db } = require("./postgrePool");

const TODOS_TABLE = "todos";

const appRouter = Router();

appRouter.get("/todos", async (_req, res) => {
  try {
    const result = await db.query(`SELECT * from ${TODOS_TABLE}`);
    const idsOnly = result.rows.map((r) => r.id);

    res.status(200).json({ result: idsOnly });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong with fetching the todos" });
  }
});

appRouter.post("/todos", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      error: "The 'title' and 'description' fields must be provided",
    });
  }

  const result = await db.query(
    `INSERT into ${TODOS_TABLE} VALUES(DEFAULT, $1, $2) RETURNING *`,
    [title, description]
  );

  console.log(result.rows);
});

module.exports = {
  appRouter,
};
