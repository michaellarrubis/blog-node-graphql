import {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
} from "./userMutation";
import { deletePost, upsertPost } from "./postMutation";
import { createComment, updateComment, deleteComment } from "./commentMutation";

export default {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,

  deletePost,
  upsertPost,

  createComment,
  updateComment,
  deleteComment,
};
