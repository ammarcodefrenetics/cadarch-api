import express from 'express';
const router = express.Router();
import { checkToken } from '../middlewares/token';
import { readAll, authenticateUser } from '../controllers/userController';


router.post('/login', authenticateUser);
router.get('/all', checkToken, readAll);


export default router