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
  const result = await User.aggregate([
    {
      $project: {
        username: 1,
        fullName: {
          firstName: '$fullName.firstName',
          lastName: '$fullName.lastName',
        },
        age: 1,
        email: 1,
        address: {
          street: '$address.street',
          city: '$address.city',
          country: '$address.country',
        },
        _id: 0,
      },
    },
  ]);
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

const getUserOrders = async (userId: number) => {
  const existingUser = await User.isUserExists(userId);
  if (!existingUser) {
    const error = new Error('User not found');
    error.name = 'NotFoundError';
    throw error;
  }
  return existingUser.orders;
};

const getOrderPrice = async (userId: number) => {
  const existingUser = await User.isUserExists(userId);
  if (!existingUser) {
    const error = new Error('User not found');
    error.name = 'NotFoundError';
    throw error;
  }
  const aggregationResult = await User.aggregate([
    { $match: { userId: userId } },

    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  return aggregationResult.length > 0 ? aggregationResult[0] : 0;
};
export const UserService = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  AddNewProductToUser,
  getUserOrders,
  getOrderPrice,
};
