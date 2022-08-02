// server/controllers/userController.js
import { Request, Response } from "express";
import { encryptPassword, verifyPassword } from '../config/encrypt';
import { User, UserInterface } from "../models/userModel";
import { authenticateUserUtil, getAllUsers} from "../utils/userUtil";
import { GenericController } from './generic';
// import { checkToken } from '../middlewares/token';
const readAll = async (req: Request, res: Response) => {

  try {
    let usersList = await getAllUsers();
    res.json(usersList);
  } catch (error) {
    console.log(error);
  }
}


const authenticateUser = async (req: Request, res: Response) => {
  try {
    if (req.body) {
      const model: UserInterface = req.body;
      let response = await authenticateUserUtil(model);
      res.json(response);
    }
  }
  catch (ex) { res.json(ex); }
}



export { readAll, authenticateUser}

