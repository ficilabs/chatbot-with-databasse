const db = require("../db/database");

const create = (name, role, note) => {
  return db.prepare(
    "INSERT INTO users (name, role, note) VALUES (?, ?, ?)"
  ).run(name, role, note);
};

const findAll = () => {
  return db.prepare("SELECT * FROM users").all();
};

const findById = (id) => {
  return db.prepare(
    "SELECT * FROM users WHERE id = ?"
  ).get(id);
};

const update = (id, name, role, note) => {
  return db.prepare(`
    UPDATE users SET
      name = ?,
      role = ?,
      note = ?
    WHERE id = ?
  `).run(name, role, note, id);
};

const remove = (id) => {
  return db.prepare(
    "DELETE FROM users WHERE id = ?"
  ).run(id);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove
};
