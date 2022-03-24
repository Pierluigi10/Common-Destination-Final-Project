import UsersModel from "../models/usersModel.js";

export const createUser = async (frontendUser) => {
  return await UsersModel.create(frontendUser);
};

export const readAllUsers = async () => {
  return await UsersModel.find({});
};

export const readOneUser = async (id) => {
  return await UsersModel.findById(id);
};

export const loginUser = async (username) => {
  const userArray = await UsersModel.find(username);
  return userArray.length === 0 ? null : userArray[0];
};

export const findOneUser = async (username) => {
  return await UsersModel.findOne(username);
};

export const userByUsername = async () => {
  return await UsersModel.findOne({ username });
};

export const readOneUserWithUsername = async () => {
  return await UsersModel.find({ username });
 ;
};


export const updateUser = async (id, updateUser) => {
  return await UsersModel.findByIdAndUpdate(id, updateUser, {
    new: true,
  });
};

export const deleteUser = async (id) => {
  return await UsersModel.findByIdAndRemove(id);
};

