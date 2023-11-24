import { TOrderItem, TUser } from './user.interface';
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

const deleteUserFromDB = async (userId: number) => {
  const existingUser = await User.isUserExists(userId);
  if (!existingUser) {
    const error = new Error('User not found');
    error.name = 'NotFoundError';
    throw error;
  }

  const result = await User.deleteOne({ userId });
  if (result.deletedCount === 0) {
    const error = new Error('Failed to delete user');
    error.name = 'DeletionError';
    throw error;
  }
  return { success: true, message: 'User deleted successfully' };
};

const AddNewProductToUser = async (orderData: TOrderItem, userId: number) => {
  const existingUser = await User.isUserExists(userId);
  if (!existingUser) {
    const error = new Error('User not found');
    error.name = 'NotFoundError';
    throw error;
  }
  existingUser.orders.push(orderData);
  const result = await User.findOneAndUpdate({ userId }, existingUser, {
    new: true,
  });

  return result;
};

export const UserService = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  AddNewProductToUser,
};
