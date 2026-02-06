const db = require("../db/database");

const create = async (name, role, note) => {
  const result = await db.query(
    "INSERT INTO users (name, role, note) VALUES ($1, $2, $3) RETURNING id",
    [name, role, note]
  );
  return result.rows[0];
};

const findAll = async () => {
  const result = await db.query("SELECT * FROM users ORDER BY id ASC");
  return result.rows;
};

const findById = async (id) => {
  const result = await db.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
};

const update = async (id, name, role, note) => {
  const result = await db.query(
    `
    UPDATE users SET
      name = $1,
      role = $2,
      note = $3
    WHERE id = $4
    `,
    [name, role, note, id]
  );
  return result.rowCount;
};

const remove = async (id) => {
  const result = await db.query(
    "DELETE FROM users WHERE id = $1",
    [id]
  );
  return result.rowCount;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove
};
