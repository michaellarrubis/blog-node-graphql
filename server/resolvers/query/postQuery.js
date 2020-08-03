import queryPost from "../../db/queries/postQueries";

export const posts = async (parent, { limit, page }, ctx, info) => {
  const postResults = await queryPost.getPosts({
    limit: parseInt(limit),
    page: parseInt(page),
  });

  return {
    posts: postResults.rows,
    count: postResults.count,
  };
};
export const post = async (parent, { id }, ctx, info) => {
  const post = await queryPost.getPost({ id });

  if (!post) {
    throw new Error(`Post with ID: ${id} is not found.`);
  }

  return post;
};
