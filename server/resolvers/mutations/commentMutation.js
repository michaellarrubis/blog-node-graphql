import dbUserQuery from "../../db/queries/userQueries";
import dbPostQuery from "../../db/queries/postQueries";
import dbCommentQuery from "../../db/queries/commentQueries";

import { checkCurrentUserIsAuthorized } from "../../utils/helper";

export const createComment = async (
  parent,
  { data },
  { currentUser },
  info
) => {
  checkCurrentUserIsAuthorized(currentUser);

  const user = await dbUserQuery.getUser({ id: data.userId });
  const post = await dbPostQuery.getPost({ id: data.postId });

  if (!user || !post || !post.published) {
    throw new Error("Unable to comment");
  }

  return await dbCommentQuery.createComment({
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

  let comment = await dbCommentQuery.getComment({ id });

  if (!comment) {
    throw new Error("Comment Not Found");
  }

  if (typeof data.text === "string") {
    comment.text = data.text;
  }

  await dbCommentQuery.updateComment(comment);
  return comment;
};

export const deleteComment = async (parent, { id }, { currentUser }, info) => {
  checkCurrentUserIsAuthorized(currentUser);

  const comment = await dbCommentQuery.getComment({ id });

  if (!comment) {
    throw new Error("Comment not Found");
  }

  await dbCommentQuery.deleteComment(id);
  return comment;
};
