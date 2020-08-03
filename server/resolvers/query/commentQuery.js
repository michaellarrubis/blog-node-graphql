import queryComment from "../../db/queries/commentQueries";

export const comments = async (parent, args, ctx, info) => {
  return await queryComment.getComments();
};
