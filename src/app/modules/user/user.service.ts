import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists!');
  }
  const result = await User.create(userData);
  return result;
};

const getUsersFromDB = async () => {
  const result = await User.aggregate();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const user = await User.isUserExists(userId);
  if (!user) {
    const error = new Error('User not found');
    error.name = 'NotFoundError';
    throw error;
  }

  return user;
};

const updateUserIntoDB = async (userData: TUser, id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.findOneAndUpdate({ userId: id }, userData, {
      new: true,
    });
    return result;
  } else {
    const error = new Error('User not found');
    error.name = 'NotFoundError';
    throw error;
  }
};

export const UserService = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
};
