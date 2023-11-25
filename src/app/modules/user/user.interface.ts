/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUserFullName = {
  firstName: string;
  lastName: string;
};
export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};
export type TOrderItem = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TUserAddress;
  orders: TOrderItem[];
};

export type TUserFullNameUpdate = {
  firstName?: string;
  lastName?: string;
};

export type TUserAddressUpdate = {
  street?: string;
  city?: string;
  country?: string;
};

export type TOrderItemUpdate = {
  productName?: string;
  price?: number;
  quantity?: number;
};

export type TUserUpdate = {
  userId?: number;
  username?: string;
  password?: string;
  fullName?: TUserFullNameUpdate;
  age?: number;
  email?: string;
  isActive?: boolean;
  hobbies?: string[];
  address?: TUserAddressUpdate;
  orders?: TOrderItemUpdate[];
};
export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}
