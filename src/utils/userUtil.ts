import { verifyPassword, encryptPassword } from "../config/encrypt";
import { User, UserInterface } from "../models/userModel";
import { GenericController } from "../controllers/generic";
import { ResponseInterface } from "../models/responseModel";
import { truncate } from "fs/promises";

export async function authenticateUserUtil(model: UserInterface) {
  if (model.email && model.password) {
    const user: UserInterface = await User.findOne({
      email: model.email,
      IsActive: true,
    });
    if (user) {
      const isVerified = await verifyPassword(model.password, user.password);
      if (isVerified) {
        let tokenController = new GenericController();
        const token = tokenController.generateTokenForUser(user);
        if (token) {
          user.password = null;
          console.log("Successfully login");
          let response: ResponseInterface = {
            responseCode: 1,
            responseStatus: "success",
            responseMessage: "Authentication successful!",
            data: {
              token: token,
              user: user,
            },
          };
          return response;
        }
      } else {
        let response: ResponseInterface = {
          responseCode: 0,
          responseStatus: "error",
          responseMessage: "Password verification failed",
          data: {},
        };
        return response;
      }
    } else {
      let response: ResponseInterface = {
        responseCode: 0,
        responseStatus: "error",
        responseMessage: "No user found",
        data: {},
      };
      return response;
    }
  } else {
    let response: ResponseInterface = {
      responseCode: 0,
      responseStatus: "error",
      responseMessage: "Please provide username and password",
      data: {},
    };
    return response;
  }
}

export async function getAllUsers() {
  let users = await User.find();
  if (users) {
    let response: ResponseInterface = {
      responseCode: 1,
      responseStatus: "success",
      responseMessage: "List of all users",
      data: {
        users: users,
      },
    };
    return response;
  } else {
    let response: ResponseInterface = {
      responseCode: 0,
      responseStatus: "error",
      responseMessage: "Error occurred",
      data: {},
    };
    return response;
  }
}
