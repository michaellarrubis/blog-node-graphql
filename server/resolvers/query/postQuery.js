import dbPostQuery from "../../db/queries/postQueries";

export const posts = async (parent, { limit, page }, ctx, info) => {
  const postsResults = await dbPostQuery.getPosts({
    limit: parseInt(limit),
    page: parseInt(page),
  });

  return postsResults;
};

export const post = async (parent, { id }, ctx, info) => {
  const post = await dbPostQuery.getPost({ id });

  if (!post) {
    throw new Error(`Post with ID: ${id} is not found.`);
  }

  return post;
};

export const postBySlug = async (parent, { slug }, ctx, info) => {
  const post = await dbPostQuery.getPostBySlug({ slug });

  if (!post) {
    throw new Error(`Post with Slug: ${slug} is not found.`);
  }

  return post;
};
