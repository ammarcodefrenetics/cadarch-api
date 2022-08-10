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

export async function updateProfileUtil(req:any , model:any){
  if(req.files.length > 0){
    model.profilePhoto = req.files[0].path
  }
  if (model) {
    let res = await User.findOneAndUpdate({ _id: req.query.id }, model,{new:true});
    if (res) {
      let response: ResponseInterface = {
        responseCode: 1,
        responseStatus: "success",
        responseMessage: "profile updated successfully",
        data: res
      };
      return response;
    } else {
      let response: ResponseInterface = {
        responseCode: 0,
        responseStatus: "error",
        responseMessage: "Failed to update profile",
        data: {},
      };
      return response;
    }
  } else {
    return {
      responseCode: 0,
      responseStatus: "error",
      responseMessage: "Model doesn't exist",
      data: {},
    };
  }
}

export async function updatePasswordUtil(req:any , model:any){
  if (model) {
    let res = await User.findOne({ _id: req.query.id });
    if (res) {
      let passwordCheck = await verifyPassword(model.OldPassword , res.password)
      if(passwordCheck){
        if(model.NewPassword === model.ConfirmPassword){
          const password = await encryptPassword(model.NewPassword)
          let result = await User.findOneAndUpdate({ _id: req.query.id },{password : password},{new:true});
          if(result){
            let response: ResponseInterface = {
              responseCode: 1,
              responseStatus: "success",
              responseMessage: "password updated successfully",
              data: res
            };
            return response;
          }
          else{
            let response: ResponseInterface = {
              responseCode: 0,
              responseStatus: "error",
              responseMessage: "Failed to update password",
              data: {},
            };
            return response;
          }
        }
        else{
          let response: ResponseInterface = {
            responseCode: 0,
            responseStatus: "error",
            responseMessage: "passwords dont match",
            data: {},
          };
          return response;
        }
      }
      else{
        let response: ResponseInterface = {
          responseCode: 0,
          responseStatus: "error",
          responseMessage: "wrong password",
          data: {},
        };
        return response;
      }
    
    } else {
      let response: ResponseInterface = {
        responseCode: 0,
        responseStatus: "error",
        responseMessage: "Failed to update password",
        data: {},
      };
      return response;
    }
  } else {
    return {
      responseCode: 0,
      responseStatus: "error",
      responseMessage: "Model doesn't exist",
      data: {},
    };
  }
}