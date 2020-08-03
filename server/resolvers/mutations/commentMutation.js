import userQuery from "../../db/queries/userQueries";
import postQuery from "../../db/queries/postQueries";
import commentQuery from "../../db/queries/commentQueries";

import { checkCurrentUserIsAuthorized } from "../../utils/helper";

export const createComment = async (
  parent,
  { data },
  { currentUser },
  info
) => {
  checkCurrentUserIsAuthorized(currentUser);

  const user = await userQuery.getUser({ id: data.userId });
  const post = await postQuery.getPost({ id: data.postId });

  if (!user || !post || !post.published) {
    throw new Error("Unable to comment");
  }

  return await commentQuery.createComment({
    text: data.text,
    userId: data.userId,
    postId: data.postId,
  });
};

export const updateComment = async (
  parent,
  { id, data },
  { currentUser },
  info
) => {
  checkCurrentUserIsAuthorized(currentUser);

  let comment = await commentQuery.getComment({ id });

  if (!comment) {
    throw new Error("Comment Not Found");
  }

  if (typeof data.text === "string") {
    comment.text = data.text;
  }

  await commentQuery.updateComment(comment);
  return comment;
};

export const deleteComment = async (parent, { id }, { currentUser }, info) => {
  checkCurrentUserIsAuthorized(currentUser);

  const comment = await commentQuery.getComment({ id });

  if (!comment) {
    throw new Error("Comment not Found");
  }

  await commentQuery.deleteComment(id);
  return comment;
};
