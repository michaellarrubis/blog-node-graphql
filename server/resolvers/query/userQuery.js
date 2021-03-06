import dbUserQuery from "../../db/queries/userQueries";

export const users = async (parent, args, ctx, info) => {
  return await dbUserQuery.getUsers();
};

export const user = async (parent, { id }, ctx, info) => {
  const user = await dbUserQuery.getUser({ id });

  if (!user) {
    throw new Error(`User with ID: ${id} is not found.`);
  }

  return user;
};
