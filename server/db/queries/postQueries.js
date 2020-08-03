import db from "../models";

const getPosts = async ({ limit, page }) => {
  const order = limit > 3 ? [["id", "DESC"]] : [["id", "ASC"]];

  const allPosts = await db.post.findAndCountAll({
    limit: limit,
    offset: (page - 1) * limit,
    include: [{ model: db.user, required: true }, db.comment],
    where: { published: true },
    order,
  });

  const publishePosts = await db.post.findAll({
    where: { published: true },
  });

  return {
    posts: allPosts.rows,
    count: publishePosts.length,
  };
};

const countPublishedPosts = async () => {
  return await db.post.findAll({
    where: { published: true },
  });
};

const getPost = async (filter) => {
  return await db.post.findOne({
    include: [{ model: db.user, required: true }, db.comment],
    where: { ...filter },
  });
};

const createPost = async (data) => {
  return await db.post.create({ ...data });
};

const updatePost = async (data) => {
  let post = await db.post.findByPk(data.id);
  post = data;
  return await post.save();
};

const deletePost = async (id) => {
  return await db.post.destroy({ where: { id } });
};

const queries = {
  getPosts,
  getPost,
  countPublishedPosts,
  createPost,
  updatePost,
  deletePost,
};

export { queries as default };
