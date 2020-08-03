import db from "../models";

const getComments = async () => {
  return await db.comment.findAll({
    order: [["id", "DESC"]],
  });
};

const getComment = async (filter) => {
  return await db.comment.findOne({
    include: [
      {
        model: db.user,
        required: true,
      },
      {
        model: db.post,
        required: true,
      },
    ],
    where: { ...filter },
  });
};

const createComment = async (data) => {
  return await db.comment.create({ ...data });
};

const updateComment = async (data) => {
  let comment = await db.comment.findByPk(data.id);
  comment = data;
  return await db.comment.save();
};

const deleteComment = async (id) => {
  return await db.comment.destroy({ where: { id } });
};

const queries = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};

export { queries as default };
