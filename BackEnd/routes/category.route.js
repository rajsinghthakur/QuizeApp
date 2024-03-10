import express from 'express';
import { add, list, search } from '../controller/category.controller.js';
import { body } from 'express-validator';

const router = express.Router();

router.post("/add",
    body("categoryname", "categoryname contains only letters").isAlpha().notEmpty(),
    add);

router.get("/list",list);

router.get("/search",
    body("categoryname", "categoryname contains only letters").isAlpha().notEmpty(),
    search);

export default router;