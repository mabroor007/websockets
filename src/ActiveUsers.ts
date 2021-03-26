import User from "./User";

export const users: User[] = [];

export const getAllActiveUsersIdList = () => {
  const allUsers: string[] = [];
  users.forEach((value) => {
    allUsers.push(value.id);
  });
  return allUsers;
};
