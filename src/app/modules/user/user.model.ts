import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TOrderItem,
  TUser,
  TUserAddress,
  TUserFullName,
  UserModel,
} from './user.interface';
import config from '../../config';

const userNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const userAddressSchema = new Schema<TUserAddress>({
  street: {
    type: String,
    required: [true, 'Street is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
});

const orderItemSchema = new Schema<TOrderItem>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: [true, 'ID is required'], unique: true },
  username: {
    type: String,
    required: [true, 'User Name is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [15, 'Password can not be more than 20 characters'],
  },
  fullName: {
    type: userNameSchema,
    required: [true, 'Full Name is Required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  hobbies: {
    type: [String],
    default: [],
  },
  address: {
    type: userAddressSchema,
    required: [true, 'Address information is required'],
  },
  orders: {
    type: [orderItemSchema],
    default: [],
  },
});

//pre save middleware hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  //hasing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.pre('aggregate', function (next) {
  const pipeline = this.pipeline();
  const projectStage = {
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
  };

  pipeline.push(projectStage);

  next();
});

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.orders;
    if (ret.fullName && ret.fullName._id) {
      delete ret.fullName._id;
    }
    if (ret.address && ret.address._id) {
      delete ret.address._id;
    }
    return ret;
  },
});

//creating a custom static method
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
