const userService = require("../services/user.service");

const create = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json({
      id: result.id,
      ...req.body
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const findAll = async (req, res) => {
  res.json(await userService.getAllUsers());
};

const findOne = async (req, res) => {
  try {
    res.json(await userService.getUserById(req.params.id));
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    await userService.updateUser(req.params.id, req.body);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
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
