import express from 'express';
import bodyParser from 'body-parser';
import AdminRouter from './routes/admin.route.js';
import UserRouter from './routes/user.route.js';
import CategoryRouter from './routes/category.route.js';

import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", AdminRouter);
app.use("/user", UserRouter);
app.use("/category", CategoryRouter);

app.listen(3000, () => { console.log("Server Started....") });