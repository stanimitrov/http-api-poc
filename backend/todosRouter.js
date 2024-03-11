const { Router } = require("express");
const { db } = require("./postgrePool");

const TODOS_TABLE = "todos";

const todosRouter = Router();

todosRouter.get("/todos/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: "The 'id' field must be provided!",
    });
  }

  if (isNaN(id)) {
    return res.status(400).json({
      error: "The 'id' field must a number!",
    });
  }

  try {
    const selectResult = await db.query(
      `Select * from ${TODOS_TABLE} where id = $1`,
      [id]
    );

    return res.status(200).json({ result: selectResult.rows[0] });
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong with fetching the todo. " + err,
    });
  }
});

todosRouter.get("/todos", async (_req, res) => {
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

todosRouter.post("/todos", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      error: "The 'title' and 'description' fields must be provided!",
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
  } catch (error) {
    return res.status(500).json({
      error: error.detail || "Something went wrong while creating the todo",
    });
  }
});

todosRouter.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: "The 'id' field must be provided!",
    });
  }

  if (isNaN(id)) {
    return res.status(400).json({
      error: "The 'id' field must a number!",
    });
  }

  try {
    const { rows } = await db.query(
      `SELECT * from ${TODOS_TABLE} Where id = $1`,
      [id]
    );

    const todo = rows[0];

    if (!todo) {
      return res
        .status(404)
        .json({ error: "A todo with id: '" + id + "' was not found" });
    }

    await db.query(`DELETE from ${TODOS_TABLE} where id = $1`, [id]);

    return res.status(200).json({
      result: "OK",
    });
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong with deleting the todo. " + err,
    });
  }
});

todosRouter.put("/todos/:id", async (req, res) => {
  const { id } = req.params;

  const { title, description } = req.body;

  if (!id || !title || !description) {
    return res.status(400).json({
      error: "The 'id', 'title', and 'description' fields must be provided!",
    });
  }

  if (isNaN(id)) {
    return res.status(400).json({
      error: "The 'id' field must a number!",
    });
  }

  try {
    const selectResult = await db.query(
      `SELECT * from ${TODOS_TABLE} Where id = $1`,
      [id]
    );

    if (!selectResult.rows.length) {
      return res
        .status(404)
        .json({ error: "A todo with id: '" + id + "' was not found" });
    }

    const updateResult = await db.query(
      `Update ${TODOS_TABLE} SET title = $1, description = $2 WHERE id = $3 RETURNING id`,
      [title, description, id]
    );

    return res.status(200).json({ result: updateResult.rows[0] });
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong with updating the todo. " + err,
    });
  }
});

module.exports = {
  todosRouter,
};
