import express from 'express';
import { forgetpassword, setforgetpassword, signin, signup } from '../controller/admin.controller.js';
import { body } from 'express-validator';

const router = express.Router();

router.post("/signup",
    body("username", "username contains only letters").isAlpha(),
    body("username", "username is require").notEmpty(),
    body("password", "password contains at lest 5 letter").isLength({ min: 5 }),
    body("password", "password is require").notEmpty(),
    body("email", "plese enter valid email").isEmail(),
    body("email", "email is require").notEmpty(),
    signup);

router.post("/signin",
    body("username", "invalid username").isAlpha(),
    body("username", "username is require").notEmpty(),
    body("password", "invalid password").isLength({ min: 5 }),
    body("password", "password is require").notEmpty(),
    signin);

router.post("/forgetpassword",
    body("username", "invalid username").isAlpha(),
    body("username", "username is require").notEmpty(),
    body("email", "plese enter valid email").isEmail(),
    body("email", "email is require").notEmpty(),
    forgetpassword);

router.put("/setforgetpassword",
    body("username", "username contains only letters").isAlpha(),
    body("username", "username is require").notEmpty(),
    body("password", "password contains at lest 5 letter").isLength({ min: 5 }),
    body("password", "password is require").notEmpty(),
    body("email", "plese enter valid email").isEmail(),
    body("email", "email is require").notEmpty(),
    setforgetpassword);

export default router;