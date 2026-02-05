const userRepo = require("../repositories/user.repository");

const createUser = ({ name, role, note }) => {
  if (!name || !role) {
    throw new Error("name and role are required");
  }

  return userRepo.create(name, role, note);
};

const getAllUsers = () => {
  return userRepo.findAll();
};

const getUserById = (id) => {
  const user = userRepo.findById(id);
  if (!user) throw new Error("User not found");
  return user;
};

const updateUser = (id, data) => {
  const user = userRepo.findById(id);
  if (!user) throw new Error("User not found");

  return userRepo.update(
    id,
    data.name ?? user.name,
    data.role ?? user.role,
    data.note ?? user.note
  );
};

const deleteUser = (id) => {
  const result = userRepo.remove(id);
  if (result.changes === 0) {
    throw new Error("User not found");
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
