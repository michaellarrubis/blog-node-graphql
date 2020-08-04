import postQuery from "../../db/queries/postQueries";
import { checkCurrentUserIsAuthorized } from "../../utils/helper";

export const upsertPost = async (
  parent,
  { id, data },
  { currentUser },
  info
) => {
  checkCurrentUserIsAuthorized(currentUser);

  if (!id) {
    if (!data.title) {
      throw new Error("Must provide a title.");
    }

    return await postQuery.createPost({
      title: data.title,
      slug: data.title.replace(/\W+/g, "-").replace(/\-$/, "").toLowerCase(),
      body: data.body,
      published: data.published,
      imageUrl: data.imageUrl || "",
      userId: data.userId,
    });
  } else {
    let post = await postQuery.getPost({ id });

    if (!post) {
      throw new Error("Post not found");
    }

    post.title = data.title;
    post.body = data.body;
    post.slug = data.title
      .replace(/\W+/g, "-")
      .replace(/\-$/, "")
      .toLowerCase();
    post.published = data.published;
    post.imageUrl = data.imageUrl;

    return await postQuery.updatePost(post);
  }
};

export const deletePost = async (parent, { id }, { currentUser }, info) => {
  checkCurrentUserIsAuthorized(currentUser);

  const post = await postQuery.getPost({ id });

  if (!post) {
    throw new Error("Post not Found");
  }

  await postQuery.deletePost(id);
  return post;
};
