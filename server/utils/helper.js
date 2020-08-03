export const checkCurrentUserIsAuthorized = (currentUser) => {
  if (!currentUser) {
    throw new Error("Not Logged In.");
  }
};
