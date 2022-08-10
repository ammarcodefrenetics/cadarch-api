import mongoose from "mongoose";

interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  cellPhone: string;
  password: string;
  isActive: boolean;
  profilePhoto:string
}

// Create Schema
const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    cellPhone: {
      type: String,
    },
    password: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    profilePhoto:{
      type:String
    }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export interface CredentialsInterface {
  userName: String;
  password: String;
}
const User = mongoose.model('User', UserSchema);

export { User, UserInterface }