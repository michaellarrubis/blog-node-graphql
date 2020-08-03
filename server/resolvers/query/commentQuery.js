import commentQuery from "../../db/queries/commentQueries";

export const comments = async (parent, args, ctx, info) => {
  return await commentQuery.getComments();
};
