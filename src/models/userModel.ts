import mongoose from "mongoose";

interface UserInterface {
  fullName: string;
  userName: string;
  email: string;
  phoneNo: number;
  password: string;
  isActive: boolean;
  address: UserAddress[];
  createdBy: number;
  updatedBy: number;
}

interface UserAddress {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
}
// Create Schema
const UserSchema = new mongoose.Schema(
  {
    fullName: String,
    userName: String,
    email: String,
    phoneNo: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    address: String,
    createdBy: {
      type: Number,
      required: true
    },
    updatedBy: {
      type: Number,
      required: true
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export interface CredentialsInterface {
  userName: String;
  password: String;
}
const User = mongoose.model('User', UserSchema);

export { User, UserInterface }