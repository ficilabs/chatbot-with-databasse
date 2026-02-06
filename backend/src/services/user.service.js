const userRepo = require("../repositories/user.repository");

const createUser = async ({ name, role, note }) => {
  if (!name || !role) {
    throw new Error("name and role are required");
  }

  return await userRepo.create(name, role, note);
};

const getAllUsers = async () => {
  return await userRepo.findAll();
};

const getUserById = async (id) => {
  const user = await userRepo.findById(id);
  if (!user) throw new Error("User not found");
  return user;
};

const updateUser = async (id, data) => {
  const user = await userRepo.findById(id);
  if (!user) throw new Error("User not found");

  return await userRepo.update(
    id,
    data.name ?? user.name,
    data.role ?? user.role,
    data.note ?? user.note
  );
};

const deleteUser = async (id) => {
  const result = await userRepo.remove(id);
  if (result === 0) {
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
