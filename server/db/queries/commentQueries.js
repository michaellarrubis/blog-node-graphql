import { post, comment, user } from "../models";

const getComments = async () => {
  return await comment.findAll({
    order: [["id", "DESC"]],
  });
};

const getComment = async (filter) => {
  return await comment.findOne({
    include: [
      {
        model: user,
        required: true,
      },
      {
        model: post,
        required: true,
      },
    ],
    where: { ...filter },
  });
};

const createComment = async (data) => {
  return await comment.create({ ...data });
};

const updateComment = async (data) => {
  let comment = await comment.findByPk(data.id);
  comment = data;
  return await comment.save();
};

const deleteComment = async (id) => {
  return await comment.destroy({ where: { id } });
};

const queries = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};

export { queries as default };
