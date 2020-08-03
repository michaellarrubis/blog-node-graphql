import { post, comment, user } from "../models";

const getPosts = async ({ limit, page }) => {
  const order = limit > 3 ? [["id", "DESC"]] : [["id", "ASC"]];

  return await post.findAndCountAll({
    limit: limit,
    offset: (page - 1) * limit,
    include: [{ model: user, required: true }, comment],
    where: { published: true },
    order,
  });
};

const getPost = async (filter) => {
  return await post.findOne({
    include: [{ model: user, required: true }, comment],
    where: { ...filter },
  });
};

const createPost = async (data) => {
  return await post.create({ ...data });
};

const updatePost = async (data) => {
  let post = await post.findByPk(data.id);
  post = data;
  return await post.save();
};

const deletePost = async (id) => {
  return await post.destroy({ where: { id } });
};

const queries = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};

export { queries as default };
