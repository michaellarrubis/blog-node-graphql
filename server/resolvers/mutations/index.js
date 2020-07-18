import { loginUser, registerUser, updateUser, deleteUser } from './user';
import { deletePost, upsertPost } from './post';
import { createComment, updateComment, deleteComment } from './comment';

export default {
	loginUser,
	registerUser,
	updateUser,
	deleteUser,

	deletePost,
	upsertPost,

	createComment,
	updateComment,
	deleteComment
}