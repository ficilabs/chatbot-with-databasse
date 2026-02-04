const userService = require("../services/user.service");

const create = (req, res) => {
  try {
    const result = userService.createUser(req.body);
    res.status(201).json({
      id: result.lastInsertRowid,
      ...req.body
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const findAll = (req, res) => {
  res.json(userService.getAllUsers());
};

const findOne = (req, res) => {
  try {
    res.json(userService.getUserById(req.params.id));
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const update = (req, res) => {
  try {
    userService.updateUser(req.params.id, req.body);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const remove = (req, res) => {
  try {
    userService.deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove
};