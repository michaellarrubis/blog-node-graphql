import { post, comment, user } from "../models";

const getUsers = async () => {
  return await user.findAll({ include: [post, comment] });
};

const getUser = async (filter) => {
  return await user.findOne({
    include: [post, comment],
    where: { ...filter },
  });
};

const registerUser = async (data) => {
  return await user.create({ ...data });
};

const updateUser = async (data) => {
  let _user = await user.findByPk(data.id);
  _user = data;
  return await _user.save();
};

const deleteUser = async (id) => {
  return await user.destroy({ where: { id } });
};

const queries = {
  getUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
};

export { queries as default };
