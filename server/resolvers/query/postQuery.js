import postQuery from "../../db/queries/postQueries";

export const posts = async (parent, { limit, page }, ctx, info) => {
  const postsResults = await postQuery.getPosts({
    limit: parseInt(limit),
    page: parseInt(page),
  });

  return postsResults;
};

export const post = async (parent, { id }, ctx, info) => {
  const post = await postQuery.getPost({ id });

  if (!post) {
    throw new Error(`Post with ID: ${id} is not found.`);
  }

  return post;
};
