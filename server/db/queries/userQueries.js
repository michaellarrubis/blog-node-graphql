import db from "../models";

const getUsers = async () => {
  return await db.user.findAll({ include: [post, comment] });
};

const getUser = async (filter) => {
  return await db.user.findOne({
    include: [db.post, db.comment],
    where: { ...filter },
  });
};

const registerUser = async (data) => {
  return await db.user.create({ ...data });
};

const updateUser = async (data) => {
  let _user = await db.user.findByPk(data.id);
  _user = data;
  return await _user.save();
};

const deleteUser = async (id) => {
  return await db.user.destroy({ where: { id } });
};

const queries = {
  getUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
};

export { queries as default };
