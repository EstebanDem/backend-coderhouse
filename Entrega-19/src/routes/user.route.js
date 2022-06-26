import express from "express";
import * as userController from '../controllers/user.controller.js';
import {logIn} from "../controllers/user.controller.js";

const router = express.Router();

router.get('/login', userController.logInView);
router.get('/signup', userController.signUpView);
router.get('/', userController.homeView);
router.get('/logout', userController.logOutView);

router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);

export default router;
